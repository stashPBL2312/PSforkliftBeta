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
    const cols = await getColumns('archive_jobs');
    const hasDeletedAt = cols.some(c=> String(c.name).toLowerCase() === 'deleted_at');
    if (hasDeletedAt){
      console.log('[migrate] Kolom deleted_at sudah ada di archive_jobs');
    } else {
      console.log('[migrate] Menambahkan kolom deleted_at ke archive_jobs');
      await run('ALTER TABLE archive_jobs ADD COLUMN deleted_at TEXT');
      console.log('[migrate] Selesai menambahkan kolom deleted_at');
    }
  } catch (e) {
    console.error('[migrate] Gagal migrasi:', e.message);
    process.exitCode = 1;
  } finally {
    db.close();
  }
})();