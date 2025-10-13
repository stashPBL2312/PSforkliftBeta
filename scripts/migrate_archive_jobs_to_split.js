#!/usr/bin/env node
/**
 * Migrasi data dari tabel legacy `archive_jobs` ke tabel split:
 * - `archive_workshop_jobs`
 * - `archive_maintenance_jobs`
 *
 * Jalur rekomendasi:
 * 1) Jalankan ETL CSV: `node scripts/archive_etl_csv.js <path_csv>`
 * 2) Pastikan kolom tambahan ada: `node scripts/migrate_archive_workshop_columns.js`
 * 3) Pastikan tabel split ada: `node scripts/migrate_split_archive_tables.js`
 * 4) Jalankan skrip ini untuk memindahkan data ke tabel split
 */
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(process.cwd(), 'db.sqlite');
const db = new sqlite3.Database(dbPath);

function run(sql, params = []){
  return new Promise((resolve, reject)=>{
    db.run(sql, params, function(err){
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
}
function all(sql, params = []){
  return new Promise((resolve, reject)=>{
    db.all(sql, params, (err, rows)=>{
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

(async function(){
  try {
    await run('PRAGMA foreign_keys = ON');
    // Pastikan tabel target ada
    await run(`CREATE TABLE IF NOT EXISTS archive_workshop_jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      forklift_id INTEGER,
      tanggal TEXT,
      pekerjaan TEXT,
      notes TEXT,
      item_dipakai TEXT,
      created_at TEXT,
      updated_at TEXT,
      deleted_at TEXT,
      report_no TEXT,
      FOREIGN KEY(forklift_id) REFERENCES forklifts(id) ON DELETE SET NULL
    )`);
    await run(`CREATE TABLE IF NOT EXISTS archive_maintenance_jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      forklift_id INTEGER,
      tanggal TEXT,
      pekerjaan TEXT,
      recommendation TEXT,
      next_pm TEXT,
      report_no TEXT,
      scanned_documents TEXT,
      created_at TEXT,
      updated_at TEXT,
      deleted_at TEXT,
      FOREIGN KEY(forklift_id) REFERENCES forklifts(id) ON DELETE SET NULL
    )`);

    // Ambil data dari archive_jobs
    const legacy = await all(`SELECT id, job_no, job_source, job_date, tanggal, description, notes, status, next_pm,
                                     forklift_id, forklift_eq_no, forklift_serial,
                                     report_no, item_dipakai,
                                     created_at, updated_at
                              FROM archive_jobs`);

    let insWorkshop = 0, insMaint = 0;
    await run('BEGIN');
    for (const r of legacy){
      const src = String(r.job_source||'').toLowerCase();
      const tanggal = r.tanggal || r.job_date || null;
      if (src === 'workshop'){
        const params = [
          r.forklift_id || null,
          tanggal,
          r.pekerjaan || r.description || null,
          r.notes || null,
          r.item_dipakai || null,
          r.report_no || r.job_no || null,
          r.created_at || null,
          r.updated_at || null,
          null,
        ];
        await run(`INSERT INTO archive_workshop_jobs (forklift_id, tanggal, pekerjaan, notes, item_dipakai, report_no, created_at, updated_at, deleted_at)
                   VALUES (?,?,?,?,?,?,?,?,?)`, params);
        insWorkshop++;
      } else if (src === 'maintenance'){
        const recommendation = r.notes || r.description || null; // fallback jika tidak ada kolom khusus
        const params = [
          r.forklift_id || null,
          tanggal,
          r.pekerjaan || r.description || null,
          recommendation,
          r.next_pm || null,
          r.report_no || r.job_no || null,
          null,
          r.created_at || null,
          r.updated_at || null,
          null,
        ];
        await run(`INSERT INTO archive_maintenance_jobs (forklift_id, tanggal, pekerjaan, recommendation, next_pm, report_no, scanned_documents, created_at, updated_at, deleted_at)
                   VALUES (?,?,?,?,?,?,?,?,?,?)`, params);
        insMaint++;
      }
    }
    await run('COMMIT');
    console.log('[migrate] Selesai. Workshop inserted:', insWorkshop, 'PM inserted:', insMaint);
  } catch (e) {
    try { await run('ROLLBACK'); } catch(_){}
    console.error('[migrate] Gagal migrasi:', e.message);
    process.exitCode = 1;
  } finally {
    db.close();
  }
})();