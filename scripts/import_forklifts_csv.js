#!/usr/bin/env node
/**
 * Import forklifts from a semicolon-delimited CSV (old app export) into db.sqlite
 * Usage:
 *   node scripts/import_forklifts_csv.js "DB Aplikasi lama/forklifts.csv"
 * If no path is provided, defaults to ./DB Aplikasi lama/forklifts.csv
 */
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

function log(...args){ console.log('[import-forklifts]', ...args); }

// Minimal CSV parser for semicolon-delimited lines supporting quoted fields
function parseSemicolonCSVLine(line){
  const out = [];
  let i = 0; const n = line.length;
  while (i < n){
    if (line[i] === '"'){
      // quoted field
      i++; let start = i; let val = '';
      while (i < n){
        if (line[i] === '"'){
          // lookahead for escaped quote
          if (i + 1 < n && line[i+1] === '"'){ val += '"'; i += 2; continue; }
          // end of quoted
          break;
        }
        val += line[i]; i++;
      }
      // move past closing quote
      if (i < n && line[i] === '"') i++;
      // next should be ; or end
      if (i < n && line[i] === ';') i++;
      out.push(val);
    } else {
      // unquoted field (e.g., NULL)
      let start = i; while (i < n && line[i] !== ';') i++;
      let raw = line.slice(start, i).trim();
      if (i < n && line[i] === ';') i++;
      out.push(raw);
    }
  }
  return out;
}

function parseCSV(content){
  const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = parseSemicolonCSVLine(lines[0]).map(h => String(h).trim().toLowerCase());
  const rows = [];
  for (let idx = 1; idx < lines.length; idx++){
    const cols = parseSemicolonCSVLine(lines[idx]);
    if (cols.length === 0) continue;
    const obj = {};
    for (let c = 0; c < headers.length; c++){
      const key = headers[c];
      const val = c < cols.length ? cols[c] : '';
      obj[key] = val;
    }
    rows.push(obj);
  }
  return { headers, rows };
}

function normalizeForkliftRow(row){
  // Map old CSV headers to current schema fields
  const brand = (row.brand || '').trim();
  const type = (row.type || '').trim();
  const eq_no = (row.eq_no || '').trim();
  const serial = (row.serial_number || row.serial || '').trim();
  const location = (row.location || '').trim();
  const powertrain = (row.powertrain || '').trim();
  const owner = (row.owner || '').trim();
  const tahunRaw = (row.mfg_year || row.tahun || '').trim();
  const statusRaw = (row.status || '').trim();

  const tahun = /^\d{4}$/.test(tahunRaw) ? parseInt(tahunRaw, 10) : null;
  const statusMap = { 'active': 'active', 'maintenance': 'maintenance', 'retired': 'retired' };
  const status = statusMap[String(statusRaw).toLowerCase()] || 'active';

  const nullIf = (v) => (v === '' || v.toUpperCase() === 'NULL') ? null : v;
  return {
    brand: nullIf(brand),
    type: nullIf(type),
    eq_no: nullIf(eq_no),
    serial: nullIf(serial),
    location: nullIf(location),
    powertrain: nullIf(powertrain),
    owner: nullIf(owner),
    tahun,
    status,
  };
}

function run(db, sql, params = []){
  return new Promise((resolve, reject)=>{
    db.run(sql, params, function(err){ if (err) return reject(err); resolve({ id: this.lastID, changes: this.changes }); });
  });
}
function get(db, sql, params = []){
  return new Promise((resolve, reject)=>{
    db.get(sql, params, function(err, row){ if (err) return reject(err); resolve(row); });
  });
}

async function upsertForklift(db, data){
  const { eq_no, serial } = data;
  if (!eq_no && !serial) throw new Error('skip: missing eq_no and serial');

  // Find existing by eq_no first, then serial
  let existing = null;
  if (eq_no) existing = await get(db, 'SELECT * FROM forklifts WHERE eq_no = ?', [eq_no]);
  if (!existing && serial) existing = await get(db, 'SELECT * FROM forklifts WHERE serial = ?', [serial]);

  if (existing){
    // Update existing; ensure updated_at refreshed, restore if soft-deleted
    const fields = ['brand','type','eq_no','serial','location','powertrain','owner','tahun','status'];
    const setClause = fields.map(f => `${f} = ?`).join(', ') + ", deleted_at = NULL, updated_at = datetime('now','+7 hours')";
    const params = fields.map(f => data[f]);
    await run(db, `UPDATE forklifts SET ${setClause} WHERE id = ?`, [...params, existing.id]);
    return { action: 'update', id: existing.id };
  } else {
    // Insert new
    const cols = ['brand','type','eq_no','serial','location','powertrain','owner','tahun','status'];
    const placeholders = cols.map(()=>'?').join(', ');
    const params = cols.map(c => data[c]);
    const res = await run(db, `INSERT INTO forklifts (${cols.join(', ')}, created_at, updated_at) VALUES (${placeholders}, datetime('now','+7 hours'), datetime('now','+7 hours'))`, params);
    return { action: 'insert', id: res.id };
  }
}

async function main(){
  try{
    const csvArg = process.argv[2] || path.join(process.cwd(), 'DB Aplikasi lama', 'forklifts.csv');
    const csvPath = path.resolve(csvArg);
    if (!fs.existsSync(csvPath)){
      console.error('CSV tidak ditemukan:', csvPath);
      process.exit(1);
    }
    const content = fs.readFileSync(csvPath, 'utf-8');
    const { headers, rows } = parseCSV(content);
    if (!headers.length){
      console.error('CSV kosong atau header tidak terbaca');
      process.exit(1);
    }
    log('Header:', headers.join(', '));
    const dbPath = path.resolve(process.cwd(), 'db.sqlite');
    const db = new sqlite3.Database(dbPath);
    // Apply PRAGMAs similar to server
    try{
      db.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA temp_store = MEMORY; PRAGMA cache_size = -8000; PRAGMA busy_timeout = 3000;");
    }catch(e){ /* ignore */ }

    let inserted = 0, updated = 0, skipped = 0, errors = 0;
    for (const r of rows){
      try{
        const data = normalizeForkliftRow(r);
        if (!data.eq_no && !data.serial){ skipped++; continue; }
        const res = await upsertForklift(db, data);
        if (res.action === 'insert') inserted++; else if (res.action === 'update') updated++;
      }catch(e){ errors++; log('Row error:', e.message); }
    }

    log(`Selesai. inserted=${inserted}, updated=${updated}, skipped=${skipped}, errors=${errors}`);
    db.close();
  }catch(e){
    console.error('Gagal import:', e);
    process.exit(1);
  }
}

main();