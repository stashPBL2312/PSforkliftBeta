#!/usr/bin/env node
/**
 * Seed data sampel untuk archive_workshop_jobs dan archive_maintenance_jobs
 * Pemakaian:
 *   node scripts/seed_archive_samples.js
 */
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

function log(...args){ console.log('[seed]', ...args); }
function run(db, sql, params = []){
  return new Promise((resolve, reject)=>{
    db.run(sql, params, function(err){ if (err) return reject(err); resolve({ id: this.lastID, changes: this.changes }); });
  });
}
function all(db, sql, params = []){
  return new Promise((resolve, reject)=>{
    db.all(sql, params, function(err, rows){ if (err) return reject(err); resolve(rows); });
  });
}

async function main(){
  const dbPath = path.resolve(process.cwd(), 'db.sqlite');
  const db = new sqlite3.Database(dbPath);
  try{
    // Pastikan tabel ada
    await run(db, `CREATE TABLE IF NOT EXISTS archive_workshop_jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      forklift_id INTEGER,
      tanggal TEXT,
      pekerjaan TEXT,
      notes TEXT,
      item_dipakai TEXT,
      created_at TEXT,
      updated_at TEXT,
      deleted_at TEXT,
      report_no TEXT
    )`);
    await run(db, `CREATE TABLE IF NOT EXISTS archive_maintenance_jobs (
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
      deleted_at TEXT
    )`);

    // Ambil forklift agar relasi valid jika ada
    const forklifts = await all(db, `SELECT id, brand, type, eq_no FROM forklifts WHERE deleted_at IS NULL ORDER BY id ASC LIMIT 3`);
    const fkId = (forklifts[0] && forklifts[0].id) || null;

    log('Menambahkan sampel workshop...');
    await run(db, `INSERT INTO archive_workshop_jobs (forklift_id, tanggal, pekerjaan, notes, item_dipakai, report_no, created_at, updated_at)
      VALUES (?,?,?,?,?,?,datetime('now','+7 hours'),datetime('now','+7 hours'))`, [fkId, '2024-08-20', 'Perbaikan hydraulic leak', 'Butuh monitoring', 'Seal kit, oli', 'W00001']);
    await run(db, `INSERT INTO archive_workshop_jobs (forklift_id, tanggal, pekerjaan, notes, item_dipakai, report_no, created_at, updated_at)
      VALUES (?,?,?,?,?,?,datetime('now','+7 hours'),datetime('now','+7 hours'))`, [fkId, '2024-09-05', 'Penggantian rem depan', 'Tes setelah penggantian OK', 'Brake pad', 'W00002']);

    log('Menambahkan sampel maintenance (PM)...');
    await run(db, `INSERT INTO archive_maintenance_jobs (forklift_id, tanggal, pekerjaan, recommendation, next_pm, report_no, scanned_documents, created_at, updated_at)
      VALUES (?,?,?,?,?,?,?,datetime('now','+7 hours'),datetime('now','+7 hours'))`, [fkId, '2024-08-15', 'Preventive maintenance bulan Agustus', 'Cek ulang belt minggu depan', '2024-09-15', 'Z00001', null]);
    await run(db, `INSERT INTO archive_maintenance_jobs (forklift_id, tanggal, pekerjaan, recommendation, next_pm, report_no, scanned_documents, created_at, updated_at)
      VALUES (?,?,?,?,?,?,?,datetime('now','+7 hours'),datetime('now','+7 hours'))`, [fkId, '2024-09-12', 'PM September', 'Ganti filter oli di servis berikutnya', '2024-10-12', 'Z00002', null]);

    log('Seed selesai.');
  }catch(e){
    console.error('Seed gagal:', e && e.message || e);
    process.exit(1);
  }finally{
    db.close();
  }
}

main();