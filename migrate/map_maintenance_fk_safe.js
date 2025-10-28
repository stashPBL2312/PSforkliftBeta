// Safe per-row mapping: update archive_maintenance_jobs using job id and old forklift_id identity
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = path.join(__dirname, '..', 'db.sqlite');
const FORKLIFTS_CSV = path.join(__dirname, 'forklifts.csv');
const MAINTENANCE_CSV = path.join(__dirname, 'maintenance_jobs.csv');

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
  const fkText = fs.readFileSync(FORKLIFTS_CSV, 'utf8');
  const fkRows = parseCSV(fkText);
  console.log(`Forklift rows found: ${fkRows.length}`);

  const mapOldToIdentity = new Map(); // oldId -> { eq_no, serial }
  for (const r of fkRows){
    const oldId = normIntOrNull(r.id);
    if (oldId == null) continue;
    mapOldToIdentity.set(oldId, { eq_no: normStr(r.eq_no), serial: normStr(r.serial_number || r.serial) });
  }

  console.log(`Reading maintenance CSV: ${MAINTENANCE_CSV}`);
  const mText = fs.readFileSync(MAINTENANCE_CSV, 'utf8');
  const mRows = parseCSV(mText);
  console.log(`Maintenance job rows found: ${mRows.length}`);

  const jobs = mRows.map(r => ({ id: normIntOrNull(r.id), old_fk: normIntOrNull(r.forklift_id), report_no: normStr(r.report_no) }))
                   .filter(j => j.id != null && j.old_fk != null);

  const db = new sqlite3.Database(DB_FILE);
  const getAsync = (sql, params=[]) => new Promise((resolve, reject)=>{ db.get(sql, params, (err, row)=> err ? reject(err) : resolve(row)); });
  const runAsync = (sql, params=[]) => new Promise((resolve, reject)=>{ db.run(sql, params, function(err){ err ? reject(err) : resolve(this); }); });

  let updated = 0, unmappedJobs = 0; const errors = [];

  try{
    await runAsync('BEGIN');

    for (const job of jobs){
      try{
        const identity = mapOldToIdentity.get(job.old_fk);
        if (!identity){ unmappedJobs++; continue; }
        let newFk = null;
        if (identity.serial){
          const row = await getAsync('SELECT id FROM forklifts WHERE serial=?', [identity.serial]);
          if (row) newFk = row.id;
        }
        if (!newFk && identity.eq_no){
          const row = await getAsync('SELECT id FROM forklifts WHERE eq_no=?', [identity.eq_no]);
          if (row) newFk = row.id;
        }
        if (!newFk){ unmappedJobs++; continue; }

        const res = await runAsync('UPDATE archive_maintenance_jobs SET forklift_id=? WHERE id=?', [newFk, job.id]);
        updated += (res?.changes || 0);
      } catch(e){ errors.push({ job_id: job.id, error: String(e && e.message || 'SQL error') }); }
    }

    await runAsync('COMMIT');
  } catch(e){
    await runAsync('ROLLBACK').catch(()=>{});
    console.error('Safe mapping failed:', e);
  } finally {
    db.close();
  }

  console.log(`Safe mapping selesai. Rows updated: ${updated}, Unmapped jobs: ${unmappedJobs}, Errors: ${errors.length}`);
  if (errors.length){ console.log('Contoh error:', errors[0]); }
}

run().catch(err => { console.error(err); process.exit(1); });