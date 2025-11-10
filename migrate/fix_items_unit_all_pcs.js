const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function openDb(){
  const dbPath = path.join(__dirname, '..', 'db.sqlite');
  const db = new sqlite3.Database(dbPath);
  return db;
}

function run(db, sql, params=[]){
  return new Promise((resolve, reject)=>{
    db.run(sql, params, function(err){
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
}

(async function(){
  const db = openDb();
  try{
    await run(db, "BEGIN");
    const { changes } = await run(db, "UPDATE items SET unit='Pcs' ");
    await run(db, "COMMIT");
    console.log(`Items unit update done. Rows affected: ${changes}`);
  }catch(e){
    console.error('Fix items unit error:', e && e.message || e);
    try{ await run(db, "ROLLBACK"); }catch(_){ /* noop */ }
    process.exitCode = 1;
  } finally {
    db.close();
  }
})();