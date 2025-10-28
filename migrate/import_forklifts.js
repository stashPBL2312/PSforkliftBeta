// CLI import forklifts from CSV into SQLite (upsert by eq_no/serial)
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = path.join(__dirname, '..', 'db.sqlite');
const CSV_FILE = process.argv[2] || path.join(__dirname, 'forklifts.csv');

function parseCSVLine(line){
  const out = []; let cur = ''; let inQuotes = false;
  for (let i = 0; i < line.length; i++){
    const c = line[i];
    if (c === '"'){
      if (inQuotes && i+1 < line.length && line[i+1] === '"'){ cur += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (c === ',' && !inQuotes){ out.push(cur); cur = ''; }
    else { cur += c; }
  }
  out.push(cur);
  return out.map(s => s.trim());
}

function parseCSV(text){
  const lines = text.split(/\r?\n/).filter(l => l.length > 0);
  if (!lines.length) return [];
  const header = parseCSVLine(lines[0]).map(h => h.replace(/^"|"$/g, ''));
  const rows = [];
  for (let i = 1; i < lines.length; i++){
    const cols = parseCSVLine(lines[i]).map(v => v.replace(/^"|"$/g, ''));
    const obj = {}; for (let j = 0; j < header.length; j++){ obj[header[j]] = (cols[j] ?? '').trim(); }
    rows.push(obj);
  }
  return rows;
}

function normStr(v){ return String(v ?? '').trim(); }
function normIntOrNull(v){ const s = String(v ?? '').trim(); if (!s) return null; const n = parseInt(s.replace(/\D+/g, ''), 10); return isNaN(n) ? null : n; }
function normStatus(v){ const s = String(v ?? '').trim().toLowerCase(); return ['active','maintenance','retired'].includes(s) ? s : null; }

async function run(){
  console.log(`Reading CSV: ${CSV_FILE}`);
  const text = fs.readFileSync(CSV_FILE, 'utf8');
  const rawRows = parseCSV(text);
  console.log(`Rows found: ${rawRows.length}`);

  const db = new sqlite3.Database(DB_FILE);
  const wibNow = "datetime('now','+7 hours')";

  const getAsync = (sql, params=[]) => new Promise((resolve, reject)=>{ db.get(sql, params, (err, row)=> err ? reject(err) : resolve(row)); });
  const runAsync = (sql, params=[]) => new Promise((resolve, reject)=>{ db.run(sql, params, function(err){ err ? reject(err) : resolve(this); }); });

  const rows = rawRows.map((r, idx) => {
    return {
      idx: idx+2,
      brand: normStr(r.brand),
      type: normStr(r.type),
      eq_no: normStr(r.eq_no),
      serial: normStr(r.serial_number || r.serial),
      location: normStr(r.location),
      powertrain: normStr(r.powertrain),
      owner: normStr(r.owner),
      tahun: normIntOrNull(r.mfg_year || r.tahun),
      status: normStatus(r.status),
    };
  }).filter(row => Object.values(row).some(v => v !== '' && v !== null && v !== undefined));

  let inserted = 0, updated = 0; const errors = [];

  try{
    await runAsync('BEGIN');
    for (const row of rows){
      try{
        if (!row.eq_no && !row.serial){ errors.push({ index: row.idx, error: 'EQ No atau Serial wajib diisi' }); continue; }
        let existing = null;
        // Strategi: jika SERIAL ada, match hanya dengan SERIAL. Jika SERIAL kosong, fallback ke EQ NO.
        if (row.serial){
          existing = await getAsync('SELECT id FROM forklifts WHERE serial=?', [row.serial]);
        } else if (row.eq_no){
          existing = await getAsync('SELECT id FROM forklifts WHERE eq_no=?', [row.eq_no]);
        }
        if (existing){
          // Tangani konflik UNIQUE pada eq_no: jika dipakai oleh forklift lain, jangan timpa
          let newEq = row.eq_no || null;
          if (newEq){
            const conflict = await getAsync('SELECT id FROM forklifts WHERE eq_no=?', [newEq]);
            if (conflict && conflict.id !== existing.id){ newEq = null; }
          }
          await runAsync("UPDATE forklifts SET brand=?, type=?, eq_no=?, serial=?, location=?, powertrain=?, owner=?, tahun=?, status=?, deleted_at = NULL, updated_at = "+wibNow+" WHERE id=?", [row.brand||null, row.type||null, newEq, row.serial||null, row.location||null, row.powertrain||null, row.owner||null, row.tahun, row.status, existing.id]);
          updated++;
        } else {
          // Insert baru: bila eq_no bentrok, kosongkan agar lolos UNIQUE
          let insEq = row.eq_no || null;
          if (insEq){
            const conflict = await getAsync('SELECT id FROM forklifts WHERE eq_no=?', [insEq]);
            if (conflict){ insEq = null; }
          }
          await runAsync("INSERT INTO forklifts (brand,type,eq_no,serial,location,powertrain,owner,tahun,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,"+wibNow+","+wibNow+")", [row.brand||null, row.type||null, insEq, row.serial||null, row.location||null, row.powertrain||null, row.owner||null, row.tahun, row.status]);
          inserted++;
        }
      } catch(e){ errors.push({ index: row.idx, error: String(e && e.message || 'SQL error') }); }
    }
    await runAsync('COMMIT');
  } catch(e){
    await runAsync('ROLLBACK').catch(()=>{});
    console.error('Import failed:', e);
  } finally {
    db.close();
  }

  console.log(`Import selesai. Inserted: ${inserted}, Updated: ${updated}, Errors: ${errors.length}`);
  if (errors.length){ console.log('Contoh error:', errors[0]); }
}

run().catch(err => { console.error(err); process.exit(1); });