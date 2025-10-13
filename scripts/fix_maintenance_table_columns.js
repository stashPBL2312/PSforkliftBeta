#!/usr/bin/env node
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(process.cwd(), 'db.sqlite');
const db = new sqlite3.Database(dbPath);

function getColumns(table){
  return new Promise((resolve, reject)=>{
    db.all(`PRAGMA table_info(${table})`, [], (err, rows)=>{
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

function run(sql){
  return new Promise((resolve, reject)=>{
    db.run(sql, [], (err)=>{
      if (err) return reject(err);
      resolve();
    });
  });
}

(async function(){
  try {
    const cols = await getColumns('archive_maintenance_jobs');
    const has = (name) => cols.some(c => String(c.name).toLowerCase() === name);

    if (!has('scanned_documents')){
      console.log('[fix] Menambahkan kolom scanned_documents ke archive_maintenance_jobs');
      await run('ALTER TABLE archive_maintenance_jobs ADD COLUMN scanned_documents TEXT');
    } else {
      console.log('[fix] Kolom scanned_documents sudah ada');
    }

    if (!has('created_at')){
      console.log('[fix] Menambahkan kolom created_at ke archive_maintenance_jobs');
      await run("ALTER TABLE archive_maintenance_jobs ADD COLUMN created_at TEXT DEFAULT (datetime('now','+7 hours'))");
    } else {
      console.log('[fix] Kolom created_at sudah ada');
    }

    if (!has('updated_at')){
      console.log('[fix] Menambahkan kolom updated_at ke archive_maintenance_jobs');
      await run("ALTER TABLE archive_maintenance_jobs ADD COLUMN updated_at TEXT DEFAULT (datetime('now','+7 hours'))");
    } else {
      console.log('[fix] Kolom updated_at sudah ada');
    }

    console.log('[fix] Selesai memastikan kolom maintenance sesuai');
  } catch (e) {
    console.error('[fix] Gagal memperbaiki kolom maintenance:', e.message);
    process.exitCode = 1;
  } finally {
    db.close();
  }
})();