#!/usr/bin/env node
/**
 * ETL Arsip dari CSV ke SQLite (archive_jobs)
 * Pemakaian:
 *   node scripts/archive_etl_csv.js <path_csv>
 * Format CSV (header diperlukan):
 *   job_no,job_source,job_date,description,notes,status,forklift_eq_no,forklift_serial,next_pm
 * Catatan:
 * - job_source: "Workshop" atau "PM" (akan dipetakan ke 'workshop' / 'maintenance').
 * - Jika tersedia EQ No/Serial dan cocok di tabel forklifts, kolom forklift_id diisi.
 * - Jika job_no sudah ada, dilakukan UPDATE; jika tidak, INSERT.
 */
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

function log(...args){ console.log('[etl]', ...args); }
function err(...args){ console.error('[etl]', ...args); }

function parseCSV(text){
  // Parser CSV sederhana dengan dukungan kutip ganda
  const lines = String(text||'').replace(/\r\n/g,'\n').replace(/\r/g,'\n').split('\n').filter(l=>l.trim().length>0);
  if (lines.length === 0) return { headers: [], rows: [] };
  const parseLine = (line)=>{
    const out = []; let cur = ''; let inQ = false;
    for (let i=0;i<line.length;i++){
      const ch = line[i]; const next = line[i+1];
      if (inQ){
        if (ch === '"' && next === '"'){ cur += '"'; i++; continue; }
        if (ch === '"'){ inQ = false; continue; }
        cur += ch; continue;
      }
      if (ch === '"'){ inQ = true; continue; }
      if (ch === ','){ out.push(cur); cur=''; continue; }
      cur += ch;
    }
    out.push(cur);
    return out.map(s=> s.trim());
  };
  const headers = parseLine(lines[0]).map(h=> h.toLowerCase());
  const rows = [];
  for (let i=1;i<lines.length;i++){
    const cols = parseLine(lines[i]);
    const obj = {}; headers.forEach((h,idx)=>{ obj[h] = (cols[idx]||'').trim(); });
    rows.push(obj);
  }
  return { headers, rows };
}

function normalizeSource(s){
  const v = String(s||'').toLowerCase();
  if (v === 'pm' || v === 'maintenance') return 'maintenance';
  return 'workshop';
}

async function main(){
  const file = process.argv[2];
  if (!file){
    console.log('Pemakaian: node scripts/archive_etl_csv.js <path_csv>');
    process.exit(1);
  }
  const p = path.resolve(process.cwd(), file);
  if (!fs.existsSync(p)){ err('File tidak ditemukan:', p); process.exit(1); }
  const text = fs.readFileSync(p, 'utf8');
  const { headers, rows } = parseCSV(text);
  if (!headers.length){ err('CSV kosong atau tidak memiliki header'); process.exit(1); }
  log('Memproses', rows.length, 'baris');

  const db = new sqlite3.Database(path.resolve(process.cwd(), 'db.sqlite'));
  db.serialize(()=>{
    db.run('PRAGMA foreign_keys = ON');
    const findForklift = db.prepare('SELECT id FROM forklifts WHERE eq_no = ? OR serial = ? LIMIT 1');
    const findExisting = db.prepare('SELECT id FROM archive_jobs WHERE job_no = ? LIMIT 1');
    const insertStmt = db.prepare(`INSERT INTO archive_jobs (job_no, job_source, job_date, description, notes, status, forklift_id, forklift_eq_no, forklift_serial, next_pm, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`);
    const updateStmt = db.prepare(`UPDATE archive_jobs SET job_source=?, job_date=?, description=?, notes=?, status=?, forklift_id=?, forklift_eq_no=?, forklift_serial=?, next_pm=?, updated_at=datetime('now') WHERE id=?`);

    let ok=0, upd=0, fail=0;
    db.run('BEGIN');
    rows.forEach((r, idx)=>{
      try {
        const job_no = r.job_no || r['job no'] || r['job_no'] || '';
        const job_source = normalizeSource(r.job_source || r['job source']);
        const job_date = r.job_date || r['job date'] || '';
        const description = r.description || '';
        const notes = r.notes || '';
        const status = r.status || '';
        const forklift_eq_no = r.forklift_eq_no || r['forklift eq no'] || r.eq_no || '';
        const forklift_serial = r.forklift_serial || r['forklift serial'] || r.serial || '';
        const next_pm = r.next_pm || r['next pm'] || '';

        let forklift_id = null;
        if (forklift_eq_no || forklift_serial){
          findForklift.get([forklift_eq_no||null, forklift_serial||null], (e, fk)=>{
            if (!e && fk && fk.id){ forklift_id = fk.id; }
          });
        }

        // Cek existing by job_no
        findExisting.get([job_no], (e, ex)=>{
          if (e){ fail++; err('Gagal cek existing:', e.message); return; }
          if (ex && ex.id){
            updateStmt.run([job_source, job_date, description, notes, status, forklift_id, forklift_eq_no, forklift_serial, next_pm, ex.id], (ue)=>{
              if (ue){ fail++; err('Gagal update baris', idx+1, ue.message); }
              else { upd++; }
            });
          } else {
            insertStmt.run([job_no, job_source, job_date, description, notes, status, forklift_id, forklift_eq_no, forklift_serial, next_pm], (ie)=>{
              if (ie){ fail++; err('Gagal insert baris', idx+1, ie.message); }
              else { ok++; }
            });
          }
        });
      } catch (e) {
        fail++; err('Error baris', idx+1, e.message);
      }
    });

    db.run('COMMIT', (ce)=>{
      if (ce){ err('Commit gagal:', ce.message); }
      log('Selesai. Insert:', ok, 'Update:', upd, 'Gagal:', fail);
      findForklift.finalize(); findExisting.finalize(); insertStmt.finalize(); updateStmt.finalize(); db.close();
    });
  });
}

main().catch(e=>{ err('Fatal:', e.message); process.exit(1); });