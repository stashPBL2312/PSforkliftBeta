// Quick check of pekerjaan field in archive_maintenance_jobs
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '..', 'db.sqlite');

const db = new sqlite3.Database(dbPath);

function get(sql, params=[]) {
  return new Promise((resolve, reject)=> db.get(sql, params, (err, row)=> err ? reject(err) : resolve(row)));
}
function all(sql, params=[]) {
  return new Promise((resolve, reject)=> db.all(sql, params, (err, rows)=> err ? reject(err) : resolve(rows)));
}

(async function(){
  try{
    const stats = await get(`SELECT COUNT(*) AS total,
      SUM(CASE WHEN TRIM(COALESCE(pekerjaan,''))<>'' THEN 1 ELSE 0 END) AS non_empty,
      SUM(CASE WHEN TRIM(COALESCE(pekerjaan,''))='' THEN 1 ELSE 0 END) AS empty
    FROM archive_maintenance_jobs`);
    console.log('Stats pekerjaan (maintenance):', stats);
    const samples = await all(`SELECT id, report_no, tanggal, pekerjaan FROM archive_maintenance_jobs WHERE TRIM(COALESCE(pekerjaan,''))<>'' ORDER BY tanggal DESC LIMIT 5`);
    console.log('Sample non-empty pekerjaan:', samples);
    const emptySamples = await all(`SELECT id, report_no, tanggal, pekerjaan FROM archive_maintenance_jobs WHERE TRIM(COALESCE(pekerjaan,''))='' ORDER BY tanggal DESC LIMIT 5`);
    console.log('Sample empty pekerjaan:', emptySamples);
  }catch(e){
    console.error(e);
    process.exit(1);
  }finally{
    db.close();
  }
})();