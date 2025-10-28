// Verify per-row forklift mapping in archive_workshop_jobs against expectations from CSVs
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = path.join(__dirname, '..', 'db.sqlite');
const FORKLIFTS_CSV = path.join(__dirname, 'forklifts.csv');
const WORKSHOP_CSV = path.join(__dirname, 'workshop_jobs.csv');

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

  const mapOldIdToIdentity = new Map(); // oldId -> {eq_no, serial}
  for (const r of fkRows){
    const oldId = normIntOrNull(r.id);
    if (oldId == null) continue;
    mapOldIdToIdentity.set(oldId, { eq_no: normStr(r.eq_no), serial: normStr(r.serial_number || r.serial) });
  }

  console.log(`Reading workshop jobs CSV: ${WORKSHOP_CSV}`);
  const wsText = fs.readFileSync(WORKSHOP_CSV, 'utf8');
  const wsRows = parseCSV(wsText);
  console.log(`Workshop job rows found: ${wsRows.length}`);

  const jobs = wsRows.map(r => ({ id: normIntOrNull(r.id), old_fk: normIntOrNull(r.forklift_id), report_no: normStr(r.report_no) }))
                     .filter(j => j.id != null && j.old_fk != null);

  const db = new sqlite3.Database(DB_FILE);
  const getAsync = (sql, params=[]) => new Promise((resolve, reject)=>{ db.get(sql, params, (err, row)=> err ? reject(err) : resolve(row)); });

  let matches = 0, mismatches = 0, missingExpected = 0, missingJob = 0;
  const mismatchSamples = [];

  try{
    for (const job of jobs){
      const identity = mapOldIdToIdentity.get(job.old_fk);
      if (!identity){ missingExpected++; continue; }

      let expectedFkRow = null;
      if (identity.serial){ expectedFkRow = await getAsync('SELECT id, brand, type, eq_no, serial FROM forklifts WHERE serial=?', [identity.serial]); }
      if (!expectedFkRow && identity.eq_no){ expectedFkRow = await getAsync('SELECT id, brand, type, eq_no, serial FROM forklifts WHERE eq_no=?', [identity.eq_no]); }
      if (!expectedFkRow){ missingExpected++; continue; }

      const actualRow = await getAsync('SELECT aw.id, aw.report_no, aw.forklift_id, f.brand, f.type, f.eq_no, f.serial FROM archive_workshop_jobs aw LEFT JOIN forklifts f ON f.id=aw.forklift_id WHERE aw.id=?', [job.id]);
      if (!actualRow){ missingJob++; continue; }

      if (actualRow.forklift_id === expectedFkRow.id){
        matches++;
      } else {
        mismatches++;
        if (mismatchSamples.length < 10){
          mismatchSamples.push({ id: job.id, report_no: job.report_no, expected_id: expectedFkRow.id, expected: { brand: expectedFkRow.brand, type: expectedFkRow.type, eq_no: expectedFkRow.eq_no, serial: expectedFkRow.serial }, actual_id: actualRow.forklift_id, actual: { brand: actualRow.brand, type: actualRow.type, eq_no: actualRow.eq_no, serial: actualRow.serial } });
        }
      }
    }
  } finally {
    db.close();
  }

  console.log('Verification summary:', { total_jobs: jobs.length, matches, mismatches, missingExpected, missingJob });
  if (mismatchSamples.length){ console.log('Mismatch samples:', mismatchSamples); }
}

run().catch(err => { console.error(err); process.exit(1); });