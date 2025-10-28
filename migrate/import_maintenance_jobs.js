// CLI import maintenance jobs from CSV into SQLite (archive_maintenance_jobs)
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = path.join(__dirname, '..', 'db.sqlite');
const CSV_FILE = process.argv[2] || path.join(__dirname, 'maintenance_jobs.csv');

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

function normStr(v){ const s = String(v ?? '').trim(); if (!s || s.toLowerCase()==='null') return null; return s; }
function normIntOrNull(v){ const s = String(v ?? '').trim(); if (!s) return null; const n = parseInt(s.replace(/\D+/g, ''), 10); return isNaN(n) ? null : n; }

async function run(){
  console.log(`Reading CSV: ${CSV_FILE}`);
  const text = fs.readFileSync(CSV_FILE, 'utf8');
  const rawRows = parseCSV(text);
  console.log(`Rows found: ${rawRows.length}`);

  const db = new sqlite3.Database(DB_FILE);
  const getAsync = (sql, params=[]) => new Promise((resolve, reject)=>{ db.get(sql, params, (err, row)=> err ? reject(err) : resolve(row)); });
  const runAsync = (sql, params=[]) => new Promise((resolve, reject)=>{ db.run(sql, params, function(err){ err ? reject(err) : resolve(this); }); });

  const rows = rawRows.map((r, idx) => ({
    idx: idx+2,
    id: normIntOrNull(r.id),
    forklift_id: normIntOrNull(r.forklift_id),
    tanggal: normStr(r.tanggal),
    pekerjaan: normStr(r.pekerjaan),
    recommendation: normStr(r.recommendation),
    next_pm: normStr(r.next_pm),
    report_no: normStr(r.report_no),
    scanned_documents: normStr(r.scanned_document), // CSV uses singular; map to plural column
    created_at: normStr(r.created_at),
    updated_at: normStr(r.updated_at),
    deleted_at: normStr(r.deleted_at),
  })).filter(row => Object.values(row).some(v => v !== '' && v !== null && v !== undefined));

  let inserted = 0, updated = 0; const errors = []; const warnings = [];

  try{
    await runAsync('BEGIN');
    for (const row of rows){
      try{
        let fk = row.forklift_id;
        if (fk != null){
          const exists = await getAsync('SELECT id FROM forklifts WHERE id=?', [fk]);
          if (!exists){ warnings.push({ index: row.idx, warning: `forklift_id ${fk} tidak ditemukan, tetap menggunakan nilai lama (akan dipetakan kemudian)` }); }
        }

        let existed = null;
        if (row.id != null){ existed = await getAsync('SELECT id FROM archive_maintenance_jobs WHERE id=?', [row.id]); }

        if (existed){
          await runAsync(
            'UPDATE archive_maintenance_jobs SET forklift_id=?, tanggal=?, pekerjaan=?, recommendation=?, next_pm=?, report_no=?, scanned_documents=?, created_at=?, updated_at=?, deleted_at=? WHERE id=?',
            [fk, row.tanggal, row.pekerjaan, row.recommendation, row.next_pm, row.report_no, row.scanned_documents, row.created_at, row.updated_at, row.deleted_at, row.id]
          );
          updated++;
        } else {
          if (row.id != null){
            await runAsync(
              'INSERT INTO archive_maintenance_jobs (id, forklift_id, tanggal, pekerjaan, recommendation, next_pm, report_no, scanned_documents, created_at, updated_at, deleted_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
              [row.id, fk, row.tanggal, row.pekerjaan, row.recommendation, row.next_pm, row.report_no, row.scanned_documents, row.created_at, row.updated_at, row.deleted_at]
            );
          } else {
            await runAsync(
              'INSERT INTO archive_maintenance_jobs (forklift_id, tanggal, pekerjaan, recommendation, next_pm, report_no, scanned_documents, created_at, updated_at, deleted_at) VALUES (?,?,?,?,?,?,?,?,?,?)',
              [fk, row.tanggal, row.pekerjaan, row.recommendation, row.next_pm, row.report_no, row.scanned_documents, row.created_at, row.updated_at, row.deleted_at]
            );
          }
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

  console.log(`Import selesai. Inserted: ${inserted}, Updated: ${updated}, Errors: ${errors.length}, Warnings: ${warnings.length}`);
  if (warnings.length){ console.log('Contoh warning:', warnings[0]); }
  if (errors.length){ console.log('Contoh error:', errors[0]); }
}

run().catch(err => { console.error(err); process.exit(1); });