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
    const has = name => cols.some(c => String(c.name).toLowerCase() === name);

    if (!has('tanggal')) {
      console.log('[migrate] Menambahkan kolom tanggal ke archive_jobs');
      await run('ALTER TABLE archive_jobs ADD COLUMN tanggal TEXT');
      // Backfill dari job_date jika ada
      await run("UPDATE archive_jobs SET tanggal = job_date WHERE tanggal IS NULL AND job_date IS NOT NULL");
    } else {
      console.log('[migrate] Kolom tanggal sudah ada');
    }

    if (!has('pekerjaan')) {
      console.log('[migrate] Menambahkan kolom pekerjaan ke archive_jobs');
      await run('ALTER TABLE archive_jobs ADD COLUMN pekerjaan TEXT');
      // Backfill dari description jika ada
      await run("UPDATE archive_jobs SET pekerjaan = description WHERE pekerjaan IS NULL AND description IS NOT NULL");
    } else {
      console.log('[migrate] Kolom pekerjaan sudah ada');
    }

    if (!has('item_dipakai')) {
      console.log('[migrate] Menambahkan kolom item_dipakai ke archive_jobs');
      await run('ALTER TABLE archive_jobs ADD COLUMN item_dipakai TEXT');
    } else {
      console.log('[migrate] Kolom item_dipakai sudah ada');
    }

    if (!has('report_no')) {
      console.log('[migrate] Menambahkan kolom report_no ke archive_jobs');
      await run('ALTER TABLE archive_jobs ADD COLUMN report_no TEXT');
    } else {
      console.log('[migrate] Kolom report_no sudah ada');
    }
  } catch (e) {
    console.error('[migrate] Gagal migrasi:', e.message);
    process.exitCode = 1;
  } finally {
    db.close();
  }
})();