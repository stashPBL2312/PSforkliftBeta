// CLI import item parts from semicolon-separated CSV into SQLite (upsert by code)
// Format: Column A = ID (code), Column B = Nama, Column C = Description
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = path.join(__dirname, '..', 'db.sqlite');
const CSV_FILE = process.argv[2] || path.join(__dirname, 'item_parts.csv');

function parseCSVLine(line){
  // Simple parser for semicolon-separated values with quote support
  const out = []; let cur = ''; let inQuotes = false;
  for (let i = 0; i < line.length; i++){
    const c = line[i];
    if (c === '"'){
      if (inQuotes && i+1 < line.length && line[i+1] === '"'){ cur += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (c === ';' && !inQuotes){ out.push(cur); cur = ''; }
    else { cur += c; }
  }
  out.push(cur);
  return out.map(s => s.trim());
}

function parseCSV(text){
  const lines = text.split(/\r?\n/).filter(l => l.length > 0);
  const rows = [];
  for (let i = 0; i < lines.length; i++){
    const cols = parseCSVLine(lines[i]).map(v => v.replace(/^"|"$/g, ''));
    // Expect 3 columns: [code, nama, description]; skip header if detected
    if (i === 0){
      const c0 = String(cols[0]||'').toLowerCase();
      const c1 = String(cols[1]||'').toLowerCase();
      const c2 = String(cols[2]||'').toLowerCase();
      const looksHeader = ['id','code','kode'].includes(c0) && ['nama','name','item'].includes(c1) && ['description','deskripsi'].includes(c2);
      if (looksHeader) continue; // skip header
    }
    rows.push({ code: cols[0]||'', nama: cols[1]||'', description: cols[2]||'' });
  }
  return rows;
}

function normCode(v){ return String(v ?? '').trim(); }
function normNama(v){ return String(v ?? '').trim(); }
function normDesc(v){ return String(v ?? '').trim(); }
function normUnit(v){ return String(v ?? '').trim(); }
function normStatus(v){
  const s = String(v ?? '').trim().toLowerCase();
  if (['available','unavailable'].includes(s)) return s;
  if (['active','ready','ok'].includes(s)) return 'available';
  if (['inactive','retired','na','n/a','none'].includes(s)) return 'unavailable';
  return 'available';
}

async function run(){
  console.log(`Reading CSV: ${CSV_FILE}`);
  const text = fs.readFileSync(CSV_FILE, 'utf8');
  const rawRows = parseCSV(text);
  console.log(`Rows found: ${rawRows.length}`);

  const db = new sqlite3.Database(DB_FILE);
  const wibNow = "datetime('now','+7 hours')";

  const getAsync = (sql, params=[]) => new Promise((resolve, reject)=>{ db.get(sql, params, (err, row)=> err ? reject(err) : resolve(row)); });
  const runAsync = (sql, params=[]) => new Promise((resolve, reject)=>{ db.run(sql, params, function(err){ err ? reject(err) : resolve(this); }); });

  const rows = rawRows.map((r, idx) => {
    return {
      idx: idx+1, // 1-based line number in data portion
      code: normCode(r.code),
      nama: normNama(r.nama),
      unit: normUnit(r.unit), // not provided, stays empty
      description: normDesc(r.description),
      status: normStatus(r.status), // default 'active'
    };
  }).filter(row => row.code || row.nama || row.description);

  let inserted = 0, updated = 0; const errors = []; const warnings = [];

  try{
    await runAsync('BEGIN');
    for (const row of rows){
      try{
        if (!row.code){ warnings.push({ index: row.idx, warning: 'Baris tanpa Code/ID di-skip' }); continue; }
        const existing = await getAsync('SELECT id FROM items WHERE LOWER(code)=LOWER(?)', [row.code]);
        if (existing && existing.id){
          await runAsync("UPDATE items SET nama=?, unit=?, description=?, status=?, deleted_at=NULL, updated_at = "+wibNow+" WHERE id=?", [row.nama||null, row.unit||null, row.description||null, row.status||null, existing.id]);
          updated++;
        } else {
          await runAsync("INSERT INTO items (code, nama, unit, description, status, created_at, updated_at) VALUES (?,?,?,?,? , "+wibNow+", "+wibNow+")", [row.code, row.nama||null, row.unit||null, row.description||null, row.status||null]);
          inserted++;
        }
      } catch(e){ errors.push({ index: row.idx, error: String(e && e.message || 'SQL error') }); }
    }
    await runAsync('COMMIT');
  } catch(e){ await runAsync('ROLLBACK').catch(()=>{}); console.error('Import failed:', e); }
  finally { db.close(); }

  console.log(`Import selesai. Inserted: ${inserted}, Updated: ${updated}, Errors: ${errors.length}, Warnings: ${warnings.length}`);
  if (warnings.length){ console.log('Contoh warning:', warnings[0]); }
  if (errors.length){ console.log('Contoh error:', errors[0]); }
}

run().catch(err => { console.error(err); process.exit(1); });