// Comprehensive verification for archive_maintenance_jobs forklift mapping
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
    // CSV bisa pakai 'serial' atau 'serial_number'
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

  let total = 0, matched = 0, mismatched = 0, missingExpected = 0, missingJob = 0; const samples = [];

  for (const job of jobs){
    total++;
    const expected = mapOldToIdentity.get(job.old_fk);
    if (!expected || (!expected.serial && !expected.eq_no)) { missingExpected++; continue; }

    const row = await getAsync('SELECT am.id, am.forklift_id, (SELECT eq_no FROM forklifts f WHERE f.id=am.forklift_id) as eq_no, (SELECT serial FROM forklifts f WHERE f.id=am.forklift_id) as serial FROM archive_maintenance_jobs am WHERE am.id=?', [job.id]);
    if (!row){ missingJob++; continue; }

    const eqMatch = expected.eq_no && row.eq_no && expected.eq_no === row.eq_no;
    const serialMatch = expected.serial && row.serial && expected.serial === row.serial;
    if (eqMatch || serialMatch){ matched++; }
    else {
      mismatched++;
      if (samples.length < 10){ samples.push({ id: job.id, report_no: job.report_no, expected, actual: { eq_no: row.eq_no || null, serial: row.serial || null, forklift_id: row.forklift_id } }); }
    }
  }

  db.close();

  console.log(JSON.stringify({ total, matched, mismatched, missingExpected, missingJob, sampleMismatches: samples }, null, 2));
}

run().catch(err => { console.error(err); process.exit(1); });