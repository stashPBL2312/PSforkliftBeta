#!/usr/bin/env node
/**
 * Import workshop jobs from CSV into archive_workshop_jobs
 * Usage:
 *   node scripts/import_workshop_jobs_csv.js "DB Aplikasi lama/workshop_jobs.csv"
 * If no path is provided, defaults to ./DB Aplikasi lama/workshop_jobs.csv
 */
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

function log(...args){ console.log('[import-workshop]', ...args); }

function parseCSVFlexible(content){
  const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (!lines.length) return { headers: [], rows: [] };
  const headerLine = lines[0];
  const delimiter = headerLine.includes(';') ? ';' : ',';
  function parseLine(line){
    const out = [];
    let i = 0; const n = line.length; const d = delimiter;
    while (i < n){
      if (line[i] === '"'){
        i++; let val = '';
        while (i < n){
          if (line[i] === '"'){
            if (i + 1 < n && line[i+1] === '"'){ val += '"'; i += 2; continue; }
            break;
          }
          val += line[i]; i++;
        }
        if (i < n && line[i] === '"') i++;
        if (i < n && line[i] === d) i++;
        out.push(val);
      } else {
        let start = i; while (i < n && line[i] !== d) i++;
        let raw = line.slice(start, i).trim();
        if (i < n && line[i] === d) i++;
        out.push(raw);
      }
    }
    return out;
  }
  const headers = parseLine(lines[0]).map(h => String(h).trim().toLowerCase());
  const rows = [];
  for (let idx = 1; idx < lines.length; idx++){
    const cols = parseLine(lines[idx]);
    if (!cols.length) continue;
    const obj = {};
    for (let c = 0; c < headers.length; c++){
      obj[headers[c]] = c < cols.length ? cols[c] : '';
    }
    rows.push(obj);
  }
  return { headers, rows };
}

function nullIf(val){
  if (val === undefined || val === null) return null;
  const s = String(val).trim();
  if (s === '' || s.toUpperCase() === 'NULL') return null;
  return s;
}

function toIntOrNull(val){
  const s = nullIf(val);
  if (s === null) return null;
  const n = parseInt(String(s).replace(/\D+/g,'') || '0', 10);
  return Number.isNaN(n) || n <= 0 ? null : n;
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

async function ensureTable(db){
  await run(db, `CREATE TABLE IF NOT EXISTS archive_workshop_jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    forklift_id INTEGER,
    tanggal TEXT,
    pekerjaan TEXT,
    notes TEXT,
    item_dipakai TEXT,
    created_at TEXT DEFAULT (datetime('now','+7 hours')),
    updated_at TEXT DEFAULT (datetime('now','+7 hours')),
    deleted_at TEXT,
    report_no TEXT,
    FOREIGN KEY(forklift_id) REFERENCES forklifts(id) ON DELETE SET NULL
  )`);
  await run(db, `CREATE INDEX IF NOT EXISTS idx_awj_forklift ON archive_workshop_jobs(forklift_id)`);
  await run(db, `CREATE INDEX IF NOT EXISTS idx_awj_tanggal ON archive_workshop_jobs(tanggal)`);
  await run(db, `CREATE INDEX IF NOT EXISTS idx_awj_report ON archive_workshop_jobs(report_no)`);
}

async function findExisting(db, row){
  const reportNo = nullIf(row.report_no);
  const forkliftId = toIntOrNull(row.forklift_id);
  const tanggal = nullIf(row.tanggal);
  if (reportNo && forkliftId){
    const byReport = await get(db, `SELECT id FROM archive_workshop_jobs WHERE report_no = ? AND forklift_id = ?`, [reportNo, forkliftId]);
    if (byReport) return byReport.id;
  }
  if (reportNo && !forkliftId){
    const byReportOnly = await get(db, `SELECT id FROM archive_workshop_jobs WHERE report_no = ?`, [reportNo]);
    if (byReportOnly) return byReportOnly.id;
  }
  if (forkliftId && tanggal){
    const byCombo = await get(db, `SELECT id FROM archive_workshop_jobs WHERE forklift_id = ? AND tanggal = ?`, [forkliftId, tanggal]);
    if (byCombo) return byCombo.id;
  }
  return null;
}

async function forkliftExists(db, id){
  if (id == null) return false;
  const row = await get(db, 'SELECT id FROM forklifts WHERE id = ?', [id]);
  return !!row;
}

async function upsertWorkshop(db, row){
  let forklift_id = toIntOrNull(row.forklift_id);
  // If referenced forklift does not exist, set to NULL to satisfy FK
  if (forklift_id && !(await forkliftExists(db, forklift_id))) forklift_id = null;
  const tanggal = nullIf(row.tanggal);
  const pekerjaan = nullIf(row.pekerjaan);
  const notes = nullIf(row.notes);
  const item_dipakai = nullIf(row.item_dipakai);
  const created_at = nullIf(row.created_at);
  const updated_at = nullIf(row.updated_at);
  const deleted_at = nullIf(row.deleted_at);
  const report_no = nullIf(row.report_no);

  const existingId = await findExisting(db, row);
  if (existingId){
    await run(db, `UPDATE archive_workshop_jobs SET forklift_id=?, tanggal=?, pekerjaan=?, notes=?, item_dipakai=?, report_no=?, deleted_at=?, updated_at=? WHERE id=?`, [forklift_id, tanggal, pekerjaan, notes, item_dipakai, report_no, deleted_at, updated_at || "datetime('now','+7 hours')", existingId]);
    return { action: 'update', id: existingId };
  } else {
    const cols = ['forklift_id','tanggal','pekerjaan','notes','item_dipakai','report_no','deleted_at','created_at','updated_at'];
    const params = [forklift_id, tanggal, pekerjaan, notes, item_dipakai, report_no, deleted_at, created_at || null, updated_at || null];
    const placeholders = cols.map(()=>'?').join(', ');
    const res = await run(db, `INSERT INTO archive_workshop_jobs (${cols.join(', ')}) VALUES (${placeholders})`, params);
    return { action: 'insert', id: res.id };
  }
}

async function main(){
  try{
    const csvArg = process.argv[2] || path.join(process.cwd(), 'DB Aplikasi lama', 'workshop_jobs.csv');
    const csvPath = path.resolve(csvArg);
    if (!fs.existsSync(csvPath)){
      console.error('CSV tidak ditemukan:', csvPath);
      process.exit(1);
    }
    const content = fs.readFileSync(csvPath, 'utf-8');
    const { headers, rows } = parseCSVFlexible(content);
    if (!headers.length){
      console.error('CSV kosong atau header tidak terbaca');
      process.exit(1);
    }
    log('Header:', headers.join(', '));
    const dbPath = path.resolve(process.cwd(), 'db.sqlite');
    const db = new sqlite3.Database(dbPath);
    try{ db.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 3000;"); }catch(e){ /* ignore */ }

    await ensureTable(db);

    let inserted = 0, updated = 0, skipped = 0, errors = 0;
    for (const r of rows){
      try{
        // minimal validation: need at least tanggal or report_no
        if (!nullIf(r.tanggal) && !nullIf(r.report_no)){ skipped++; continue; }
        const res = await upsertWorkshop(db, r);
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