// Map old forklift_id from CSV to current forklifts by serial/eq_no
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = path.join(__dirname, '..', 'db.sqlite');
const FORKLIFTS_CSV = path.join(__dirname, 'forklifts.csv');

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

function normStr(v){ const s = String(v ?? '').trim(); return s || null; }
function normIntOrNull(v){ const s = String(v ?? '').trim(); if (!s) return null; const n = parseInt(s.replace(/\D+/g, ''), 10); return isNaN(n) ? null : n; }

async function run(){
  console.log(`Reading forklifts CSV: ${FORKLIFTS_CSV}`);
  const text = fs.readFileSync(FORKLIFTS_CSV, 'utf8');
  const rawRows = parseCSV(text);
  console.log(`Forklift rows found: ${rawRows.length}`);

  // Build mapping oldId -> { eq_no, serial }
  const map = new Map();
  for (const r of rawRows){
    const oldId = normIntOrNull(r.id);
    if (oldId == null) continue;
    const eq_no = normStr(r.eq_no);
    const serial = normStr(r.serial_number || r.serial);
    map.set(oldId, { eq_no, serial });
  }

  const db = new sqlite3.Database(DB_FILE);
  const getAsync = (sql, params=[]) => new Promise((resolve, reject)=>{ db.get(sql, params, (err, row)=> err ? reject(err) : resolve(row)); });
  const runAsync = (sql, params=[]) => new Promise((resolve, reject)=>{ db.run(sql, params, function(err){ err ? reject(err) : resolve(this); }); });

  let mapped = 0, unmapped = 0;
  const errors = [];

  try{
    await runAsync('BEGIN');

    for (const [oldId, info] of map.entries()){
      try{
        let newFk = null;
        if (info.serial){
          const row = await getAsync('SELECT id FROM forklifts WHERE serial=?', [info.serial]);
          if (row) newFk = row.id;
        }
        if (!newFk && info.eq_no){
          const row = await getAsync('SELECT id FROM forklifts WHERE eq_no=?', [info.eq_no]);
          if (row) newFk = row.id;
        }
        if (!newFk){ unmapped++; continue; }

        // Update archive_workshop_jobs
        const res = await runAsync('UPDATE archive_workshop_jobs SET forklift_id=? WHERE forklift_id=?', [newFk, oldId]);
        // Count rows changed from this mapping (optional, use changes property if available)
        mapped += (res?.changes || 0);
      } catch(e){ errors.push({ oldId, error: String(e && e.message || 'SQL error') }); }
    }

    await runAsync('COMMIT');
  } catch(e){
    await runAsync('ROLLBACK').catch(()=>{});
    console.error('Mapping failed:', e);
  } finally {
    db.close();
  }

  console.log(`Mapping selesai. Rows updated: ${mapped}, Unmapped keys: ${unmapped}, Errors: ${errors.length}`);
  if (errors.length){ console.log('Contoh error:', errors[0]); }
}

run().catch(err => { console.error(err); process.exit(1); });