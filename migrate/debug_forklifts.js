const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', 'db.sqlite'));
const get = (sql, params=[])=>new Promise((resolve,reject)=>db.get(sql, params, (e,r)=>e?reject(e):resolve(r)));
const all = (sql, params=[])=>new Promise((resolve,reject)=>db.all(sql, params, (e,r)=>e?reject(e):resolve(r)));

(async function(){
  try{
    const total = await get("SELECT COUNT(*) AS c FROM forklifts");
    const active = await get("SELECT COUNT(*) AS c FROM forklifts WHERE deleted_at IS NULL");
    const deleted = await get("SELECT COUNT(*) AS c FROM forklifts WHERE deleted_at IS NOT NULL");
    const nullEq = await get("SELECT COUNT(*) AS c FROM forklifts WHERE eq_no IS NULL OR TRIM(eq_no)='' ");
    const nullSerial = await get("SELECT COUNT(*) AS c FROM forklifts WHERE serial IS NULL OR TRIM(serial)='' ");
    const dupEq = await all("SELECT eq_no, COUNT(*) AS c FROM forklifts WHERE eq_no IS NOT NULL AND TRIM(eq_no)!='' GROUP BY eq_no HAVING COUNT(*)>1 ORDER BY c DESC, eq_no LIMIT 20");
    const dupSerial = await all("SELECT serial, COUNT(*) AS c FROM forklifts WHERE serial IS NOT NULL AND TRIM(serial)!='' GROUP BY serial HAVING COUNT(*)>1 ORDER BY c DESC, serial LIMIT 20");
    const examplesDeleted = await all("SELECT id, brand, type, eq_no, serial, location, status, deleted_at FROM forklifts WHERE deleted_at IS NOT NULL ORDER BY id DESC LIMIT 10");

    console.log({
      total: total.c,
      visible: active.c,
      soft_deleted: deleted.c,
      eq_no_missing: nullEq.c,
      serial_missing: nullSerial.c,
      dup_eq_no_top20: dupEq,
      dup_serial_top20: dupSerial,
      sample_soft_deleted: examplesDeleted,
    });
  }catch(e){ console.error(e); }
  finally{ db.close(); }
})();