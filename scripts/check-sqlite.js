const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.sqlite');
const db = new sqlite3.Database(dbPath);

function count(table) {
  return new Promise((resolve) => {
    db.get(`SELECT COUNT(*) as c FROM ${table}`, (e, r) => {
      if (e) return resolve({ table, error: e.message });
      resolve({ table, count: r ? r.c : 0 });
    });
  });
}

db.all("SELECT name FROM sqlite_master WHERE type='table'", async (err, rows) => {
  if (err) {
    console.error('Error listing tables:', err.message);
    process.exit(1);
  }
  const tables = (rows || []).map(r => r.name);
  console.log('Tables:', tables);
  const results = await Promise.all([
    count('users'),
    count('forklifts'),
    count('items'),
    count('jobs'),
    count('records'),
  ]);
  results.forEach(r => {
    if (r.error) console.log(`${r.table}: ERR ${r.error}`);
    else console.log(`${r.table}: ${r.count}`);
  });
  db.close();
});