const fs = require('fs');
const path = require('path');
const CSV_FILE = path.join(__dirname, 'forklifts.csv');

function parseCSVLine(line){
  const out = []; let cur = ''; let inQuotes = false;
  for (let i = 0; i < line.length; i++){
    const c = line[i];
    if (c === '"'){
      if (inQuotes && i+1 < line.length && line[i+1] === '"'){ cur += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (c === ',' && !inQuotes){ out.push(cur); cur = ''; }
    else { cur += c; }
  }
  out.push(cur);
  return out.map(s => s.trim());
}

function parseCSV(text){
  const lines = text.split(/\r?\n/).filter(l => l.length > 0);
  if (!lines.length) return [];
  const header = parseCSVLine(lines[0]).map(h => h.replace(/^"|"$/g, ''));
  const rows = [];
  for (let i = 1; i < lines.length; i++){
    const cols = parseCSVLine(lines[i]).map(v => v.replace(/^"|"$/g, ''));
    const obj = {}; for (let j = 0; j < header.length; j++){ obj[header[j]] = (cols[j] ?? '').trim(); }
    rows.push(obj);
  }
  return rows;
}

const text = fs.readFileSync(CSV_FILE, 'utf8');
const rows = parseCSV(text);

function norm(v){ return String(v||'').trim(); }
const eqNos = new Map(); const serials = new Map();
rows.forEach((r, idx)=>{
  const eq = norm(r.eq_no);
  const se = norm(r.serial_number || r.serial);
  if (eq){ eqNos.set(eq, (eqNos.get(eq)||0)+1); }
  if (se){ serials.set(se, (serials.get(se)||0)+1); }
});

function topDup(map){
  const arr = Array.from(map.entries()).filter(([k,c])=>c>1).sort((a,b)=>b[1]-a[1]).slice(0,20);
  return arr.map(([k,c])=>({ key:k, count:c }));
}

console.log({
  csv_total_rows: rows.length,
  csv_nonblank_eq_no: Array.from(eqNos.keys()).length,
  csv_nonblank_serial: Array.from(serials.keys()).length,
  csv_dup_eq_no_top20: topDup(eqNos),
  csv_dup_serial_top20: topDup(serials),
});