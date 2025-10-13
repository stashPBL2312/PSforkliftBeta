#!/usr/bin/env node
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(process.cwd(), 'db.sqlite');
const db = new sqlite3.Database(dbPath);

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
    // Workshop Jobs table
    await run(`CREATE TABLE IF NOT EXISTS archive_workshop_jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      forklift_id INTEGER,
      tanggal TEXT,
      pekerjaan TEXT,
      notes TEXT,
      item_dipakai TEXT,
      created_at TEXT DEFAULT (datetime('now','+7 hours')),
      updated_at TEXT DEFAULT (datetime('now','+7 hours')),
      deleted_at TEXT,
      report_no TEXT,
      FOREIGN KEY(forklift_id) REFERENCES forklifts(id) ON DELETE SET NULL
    )`);
    await run(`CREATE INDEX IF NOT EXISTS idx_awj_forklift ON archive_workshop_jobs(forklift_id)`);
    await run(`CREATE INDEX IF NOT EXISTS idx_awj_tanggal ON archive_workshop_jobs(tanggal)`);

    // Maintenance Jobs table
    await run(`CREATE TABLE IF NOT EXISTS archive_maintenance_jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      forklift_id INTEGER,
      tanggal TEXT,
      pekerjaan TEXT,
      recommendation TEXT,
      next_pm TEXT,
      report_no TEXT,
      scanned_documents_created_at_updated_at TEXT,
      deleted_at TEXT,
      FOREIGN KEY(forklift_id) REFERENCES forklifts(id) ON DELETE SET NULL
    )`);
    await run(`CREATE INDEX IF NOT EXISTS idx_amj_forklift ON archive_maintenance_jobs(forklift_id)`);
    await run(`CREATE INDEX IF NOT EXISTS idx_amj_tanggal ON archive_maintenance_jobs(tanggal)`);

    console.log('[migrate] Split archive tables ensured.');
  } catch (e) {
    console.error('[migrate] Error:', e.message);
    process.exitCode = 1;
  } finally {
    db.close();
  }
})();