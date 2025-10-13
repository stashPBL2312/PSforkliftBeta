const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const SQLiteStore = require('connect-sqlite3')(session);
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.sqlite');
const SCHEMA_FILE = path.join(__dirname, 'schema.sql');

// Env-aware settings
const isProd = process.env.NODE_ENV === 'production';
// behind Render's proxy to allow secure cookies
app.set('trust proxy', 1);
// Use env-provided session secret (fallback to random for dev)
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.sqlite', dir: __dirname }),
    cookie: { httpOnly: true, sameSite: 'lax', secure: isProd, maxAge: 1000 * 60 * 60 * 8 },
  })
);

// Ensure DB exists and bootstrap schema
function initDb() {
  const db = new sqlite3.Database(DB_FILE);
  // Terapkan PRAGMA runtime untuk koneksi aktif (beberapa PRAGMA perlu di-set per koneksi)
  try{
    db.exec(
      "PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA temp_store = MEMORY; PRAGMA cache_size = -8000; PRAGMA busy_timeout = 3000;",
      (pErr)=>{ if (pErr) console.warn('Runtime PRAGMA error:', pErr); }
    );
  }catch(e){ console.warn('Failed to apply runtime PRAGMA:', e); }
  const schema = fs.readFileSync(SCHEMA_FILE, 'utf-8');
  db.exec(schema, async (err) => {
    if (err) {
      console.error('DB schema init error:', err);
      process.exit(1);
    }
    // seed default admin if not exists (gunakan ENV bila tersedia)
    db.get("SELECT COUNT(*) as c FROM users WHERE role='admin'", async (e, row) => {
      if (e) return console.error(e);
      if (row.c === 0) {
        const adminEmail = (process.env.ADMIN_EMAIL || 'admin@local').trim();
        const adminPassword = (process.env.ADMIN_PASSWORD || 'admin123');
        const hash = await bcrypt.hash(adminPassword, 10);
        db.run(
          'INSERT INTO users (email, password, role) VALUES (?,?,?)',
          [adminEmail, hash, 'admin'],
          (er) => {
            if (er) console.error('Seed admin failed:', er);
            else console.log(`Admin created: ${adminEmail} (please change password immediately)`);
          }
        );
      }
    });
  });
  return db;
}

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, '');
}
const db = initDb();

// Compression for faster responses
app.use(compression());
// Static files with caching in production
app.use(express.static(path.join(__dirname, 'public'), isProd ? {
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=60');
    }
  }
} : {}));

// Lightweight health endpoint (no auth)
app.get('/healthz', (req, res) => {
  res.json({ ok: true });
});

// Add /health for platform health checks (Render, etc.)
app.get('/health', (req, res) => {
  res.json({ ok: true });
});
// Add simple cache headers for GET APIs in production (disabled for real-time)
app.use((req, res, next) => {
  if (isProd && req.method === 'GET' && req.path.startsWith('/api/')) {
    // Disabled caching to ensure fresh responses
    res.set('Cache-Control', 'no-store');
    res.set('CDN-Cache-Control', 'no-store');
    res.set('Surrogate-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
  next();
});
// Disable caching for API responses to ensure real-time updates (esp. behind proxies/CDN)
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.set('Cache-Control', 'no-store');
    res.set('CDN-Cache-Control', 'no-store');
    res.set('Surrogate-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Vary', 'Cookie, Authorization');
  }
  next();
});

function requireLogin(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });
    if (!roles.includes(req.session.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// AdminJS dynamic scaffold (gated by env and protected by role)
// Default: enabled unless explicitly set ADMIN_ENABLED=0
const ADMIN_ENABLED = process.env.ADMIN_ENABLED ? (process.env.ADMIN_ENABLED === '1') : true;
if (ADMIN_ENABLED) {
  (async () => {
    try {
      const { setupAdmin } = await import('./src/admin/index.mjs');
      const { admin, router } = await setupAdmin();
      // Pastikan AdminJS mengenali currentAdmin dari sesi aplikasi
      app.use((req, _res, next) => {
        if (req.session && req.session.user) {
          const u = req.session.user;
          req.session.adminUser = { id: u.id, email: u.email, role: u.role, name: u.name || null };
        }
        next();
      });
      app.use(admin.options.rootPath, requireRole('admin','supervisor'), router);
      console.log('AdminJS enabled and mounted at /admin');
    } catch (e) {
      console.warn('AdminJS not installed or failed to setup:', e && e.message ? e.message : e);
      app.get('/admin', requireRole('admin','supervisor'), (req, res) => {
        res.status(501).send('AdminJS dependencies missing or setup failed');
      });
    }
  })();
} else {
  // Provide a guarded endpoint indicating admin is disabled
  app.get('/admin', requireRole('admin','supervisor'), (req, res) => {
    res.status(404).send('Admin panel is disabled. Set ADMIN_ENABLED=1 to enable.');
  });
}

// Auth routes
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ? AND (deleted_at IS NULL)", [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    req.session.user = { id: user.id, email: user.email, role: user.role, name: user.name || null };
    res.json({ message: 'ok', user: req.session.user });
  });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ message: 'ok' }));
});

app.get('/api/me', async (req, res) => {
  try{
    if (!req.session.user) return res.json({ user: null });
    const u = req.session.user;
    if (u && (u.name === undefined || u.name === null)){
      try {
        const row = await get('SELECT name FROM users WHERE id=?', [u.id]);
        if (row) { u.name = row.name || null; req.session.user = u; }
      } catch {}
    }
    res.json({ user: u });
  }catch(e){ res.json({ user: req.session.user || null }); }
});

// CRUD Utilities
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (err, row) {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, function (err, rows) {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

// Dashboard endpoints
app.get('/api/dashboard/metrics', requireLogin, async (req, res) => {
  try {
    // Gunakan perbandingan string ISO tanggal agar bisa memanfaatkan indeks pada kolom tanggal
    const now = new Date(); const tz = now.getTimezoneOffset();
    const isoNow = new Date(now.getTime() - tz*60000).toISOString().slice(0,10);
    const weekEnd = new Date(now.getTime() + 7*24*60*60*1000);
    const isoWeekEnd = new Date(weekEnd.getTime() - tz*60000).toISOString().slice(0,10);
    const base = new Date(now.getTime()); base.setHours(0,0,0,0);
    const monthStartDate = new Date(base.getTime()); monthStartDate.setDate(1);
    const nextMonthStartDate = new Date(monthStartDate.getTime()); nextMonthStartDate.setMonth(nextMonthStartDate.getMonth()+1);
    const isoMonthStart = new Date(monthStartDate.getTime() - tz*60000).toISOString().slice(0,10);
    const isoNextMonthStart = new Date(nextMonthStartDate.getTime() - tz*60000).toISOString().slice(0,10);

    const [totalForklifts, active, maint, totalJobs, jobsThisMonth, maintJobs, pmLate, pmWeek, pmMonth, pmUpcoming] = await Promise.all([
      get('SELECT COUNT(*) as c FROM forklifts WHERE deleted_at IS NULL'),
      get("SELECT COUNT(*) as c FROM forklifts WHERE status='active' AND deleted_at IS NULL"),
      get("SELECT COUNT(*) as c FROM forklifts WHERE status='maintenance' AND deleted_at IS NULL"),
      get('SELECT COUNT(*) as c FROM jobs WHERE deleted_at IS NULL'),
      get("SELECT COUNT(*) as c FROM jobs WHERE deleted_at IS NULL AND tanggal>=? AND tanggal<?", [isoMonthStart, isoNextMonthStart]),
      // Maintenance Jobs harus dihitung dari service records (pekerjaan='PM'), bukan dari tabel jobs
      get("SELECT COUNT(*) as c FROM records WHERE pekerjaan='PM' AND deleted_at IS NULL"),
      all("SELECT f.brand||' '||f.type||' ('||f.eq_no||')' AS forklift, j.forklift_id AS forklift_id, f.powertrain AS powertrain, j.next_pm AS jadwal_pm, 'Terlambat' AS status, j.teknisi AS teknisi_terakhir, j.tanggal AS service_terakhir FROM jobs j JOIN forklifts f ON f.id=j.forklift_id WHERE j.jenis='PM' AND j.next_pm IS NOT NULL AND j.next_pm<? AND j.deleted_at IS NULL AND f.deleted_at IS NULL ORDER BY j.next_pm ASC", [isoNow]),
      all("SELECT f.brand||' '||f.type||' ('||f.eq_no||')' AS forklift, j.forklift_id AS forklift_id, f.powertrain AS powertrain, j.next_pm AS jadwal_pm, 'Minggu Ini' AS status, j.teknisi AS teknisi_terakhir, j.tanggal AS service_terakhir FROM jobs j JOIN forklifts f ON f.id=j.forklift_id WHERE j.jenis='PM' AND j.next_pm IS NOT NULL AND j.next_pm BETWEEN ? AND ? AND j.deleted_at IS NULL AND f.deleted_at IS NULL ORDER BY j.next_pm ASC", [isoNow, isoWeekEnd]),
      all("SELECT f.brand||' '||f.type||' ('||f.eq_no||')' AS forklift, j.forklift_id AS forklift_id, f.powertrain AS powertrain, j.next_pm AS jadwal_pm, 'Bulan Ini' AS status, j.teknisi AS teknisi_terakhir, j.tanggal AS service_terakhir FROM jobs j JOIN forklifts f ON f.id=j.forklift_id WHERE j.jenis='PM' AND j.next_pm IS NOT NULL AND j.next_pm>=? AND j.next_pm<? AND j.deleted_at IS NULL AND f.deleted_at IS NULL ORDER BY j.next_pm ASC", [isoMonthStart, isoNextMonthStart]),
      all("SELECT f.brand||' '||f.type||' ('||f.eq_no||')' AS forklift, j.forklift_id AS forklift_id, f.powertrain AS powertrain, j.next_pm AS jadwal_pm, 'Akan Datang' AS status, j.teknisi AS teknisi_terakhir, j.tanggal AS service_terakhir FROM jobs j JOIN forklifts f ON f.id=j.forklift_id WHERE j.jenis='PM' AND j.next_pm IS NOT NULL AND j.next_pm>? AND j.deleted_at IS NULL AND f.deleted_at IS NULL ORDER BY j.next_pm ASC", [isoWeekEnd]),
    ]);
    res.json({
      totalForklifts: totalForklifts.c || 0,
      forkliftsActive: active.c || 0,
      forkliftsMaintenance: maint.c || 0,
      totalJobs: totalJobs.c || 0,
      jobsThisMonth: jobsThisMonth.c || 0,
      maintenanceJobs: maintJobs.c || 0,
      pmLate: pmLate,
      pmWeek: pmWeek,
      pmMonth: pmMonth,
      pmUpcoming: pmUpcoming,
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to load metrics' });
  }
});

// Tambah kolom name di users jika belum ada (migration ringan)
// Jalankan setelah schema dieksekusi
(function ensureUsersNameColumn(){
  try {
    db.run("ALTER TABLE users ADD COLUMN name TEXT", (err)=>{ /* abaikan jika kolom sudah ada */ });
  } catch (e) { /* noop */ }
})();
// Migration ringan: tambah kolom location di records (snapshot lokasi forklift saat itu)
(function ensureRecordsLocationColumn(){
  try {
    db.run("ALTER TABLE records ADD COLUMN location TEXT", (err)=>{ /* abaikan jika kolom sudah ada */ });
    // Backfill hanya untuk yang masih NULL/kosong
    db.run("UPDATE records SET location=(SELECT location FROM forklifts f WHERE f.id=records.forklift_id) WHERE location IS NULL OR location=''", ()=>{});
  } catch (e) { /* noop */ }
})();
// Migration ringan: tambahkan kolom audit (created_at, updated_at, deleted_at) jika belum ada
(function ensureAuditColumns(){
  try {
    // Users
    db.run("ALTER TABLE users ADD COLUMN created_at TEXT", ()=>{});
    db.run("ALTER TABLE users ADD COLUMN updated_at TEXT", ()=>{});
    db.run("ALTER TABLE users ADD COLUMN deleted_at TEXT", ()=>{});
    // Forklifts
    db.run("ALTER TABLE forklifts ADD COLUMN created_at TEXT", ()=>{});
    db.run("ALTER TABLE forklifts ADD COLUMN updated_at TEXT", ()=>{});
    db.run("ALTER TABLE forklifts ADD COLUMN deleted_at TEXT", ()=>{});
    // Items
    db.run("ALTER TABLE items ADD COLUMN created_at TEXT", ()=>{});
    db.run("ALTER TABLE items ADD COLUMN updated_at TEXT", ()=>{});
    db.run("ALTER TABLE items ADD COLUMN deleted_at TEXT", ()=>{});
    // Jobs: pastikan semua kolom audit ada
    db.run("ALTER TABLE jobs ADD COLUMN created_at TEXT", ()=>{});
    db.run("ALTER TABLE jobs ADD COLUMN updated_at TEXT", ()=>{});
    db.run("ALTER TABLE jobs ADD COLUMN deleted_at TEXT", ()=>{});
    // Records
    db.run("ALTER TABLE records ADD COLUMN created_at TEXT", ()=>{});
    db.run("ALTER TABLE records ADD COLUMN updated_at TEXT", ()=>{});
    db.run("ALTER TABLE records ADD COLUMN deleted_at TEXT", ()=>{});

    // Backfill nilai untuk baris lama agar tidak NULL
    db.run("UPDATE users SET created_at = COALESCE(created_at, CURRENT_TIMESTAMP)", ()=>{});
    db.run("UPDATE users SET updated_at = COALESCE(updated_at, CURRENT_TIMESTAMP)", ()=>{});
    db.run("UPDATE forklifts SET created_at = COALESCE(created_at, CURRENT_TIMESTAMP)", ()=>{});
    db.run("UPDATE forklifts SET updated_at = COALESCE(updated_at, CURRENT_TIMESTAMP)", ()=>{});
    db.run("UPDATE items SET created_at = COALESCE(created_at, CURRENT_TIMESTAMP)", ()=>{});
    db.run("UPDATE items SET updated_at = COALESCE(updated_at, CURRENT_TIMESTAMP)", ()=>{});
    db.run("UPDATE records SET created_at = COALESCE(created_at, CURRENT_TIMESTAMP)", ()=>{});
    db.run("UPDATE records SET updated_at = COALESCE(updated_at, CURRENT_TIMESTAMP)", ()=>{});
    // Jobs sudah punya created_at/updated_at di schema; tetap backfill jika perlu
    db.run("UPDATE jobs SET created_at = COALESCE(created_at, CURRENT_TIMESTAMP)", ()=>{});
    db.run("UPDATE jobs SET updated_at = COALESCE(updated_at, CURRENT_TIMESTAMP)", ()=>{});
    // Checkpoint WAL supaya perubahan schema terlihat di DB Browser
    db.run("PRAGMA wal_checkpoint(FULL)", ()=>{});
  } catch (e) { /* noop */ }
})();
// Migration ringan: tambah kolom next_pm di archive_jobs (statis, tidak terkait records/jobs aktif)
(function ensureArchiveNextPmColumn(){
  try {
    db.run("ALTER TABLE archive_jobs ADD COLUMN next_pm TEXT", ()=>{});
  } catch (e) { /* noop */ }
})();
app.get('/api/users', requireRole('admin'), async (req, res) => {
  const rows = await all("SELECT id, email, name, role FROM users WHERE deleted_at IS NULL ORDER BY id DESC");
  res.json(rows);
});
app.post('/api/users', requireRole('admin'), async (req, res) => {
  const { email, password, role, name } = req.body;
  const hash = await bcrypt.hash(password || '', 10);
  try {
    const r = await run("INSERT INTO users (email, password, role, name, created_at, updated_at) VALUES (?,?,?,?,datetime('now','+7 hours'),datetime('now','+7 hours'))", [email, hash, role, name || null]);
    res.json({ id: r.id });
  } catch (e) {
    res.status(400).json({ error: 'User create failed' });
  }
});
app.put('/api/users/:id', requireRole('admin'), async (req, res) => {
  const { email, password, role, name } = req.body;
  try {
    // Ambil user lama untuk deteksi perubahan nama
    const oldUser = await get('SELECT name, email FROM users WHERE id=?', [req.params.id]);
    const oldName = oldUser && oldUser.name ? String(oldUser.name) : null;

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      await run("UPDATE users SET email=?, password=?, role=?, name=?, updated_at = datetime('now','+7 hours') WHERE id=?", [email, hash, role, name || null, req.params.id]);
    } else {
      await run("UPDATE users SET email=?, role=?, name=?, updated_at = datetime('now','+7 hours') WHERE id=?", [email, role, name || null, req.params.id]);
    }

    // Rigid rename: update semua records.teknisi mengganti nama lama -> nama baru
    const newName = name && String(name).trim() ? String(name).trim() : null;
    if (oldName && newName && oldName !== newName){
      // Gunakan REPLACE di SQLite, batasi ke baris yang mengandung oldName untuk efisiensi
      await run('UPDATE records SET teknisi = REPLACE(teknisi, ?, ?) WHERE teknisi LIKE ?', [oldName, newName, `%${oldName}%`]);
    }

    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'User update failed' });
  }
});
app.delete('/api/users/:id', requireRole('admin'), async (req, res) => {
  try {
    await run("UPDATE users SET deleted_at = datetime('now','+7 hours') WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'User delete failed' });
  }
});

// Expose technicians list for job assignment suggestions (support query q)
app.get('/api/technicians', requireLogin, async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (q) {
      const like = `%${q}%`;
      const rows = await all("SELECT id, name, email FROM users WHERE role='teknisi' AND deleted_at IS NULL AND (COALESCE(name,'') LIKE ? OR email LIKE ?) ORDER BY name, email LIMIT 20", [like, like]);
      return res.json(rows);
    }
    const rows = await all("SELECT id, name, email FROM users WHERE role='teknisi' AND deleted_at IS NULL ORDER BY name, email LIMIT 100", []);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load technicians' });
  }
});
app.get('/api/forklifts', requireLogin, async (req, res) => {
  try {
    const rows = await all("SELECT * FROM forklifts WHERE deleted_at IS NULL ORDER BY id DESC", []);
    res.json(rows);
  } catch (e) {
    res.status(400).json({ error: 'Forklifts query failed' });
  }
});
app.post('/api/forklifts', requireRole('admin','supervisor'), async (req, res) => {
  const { brand, type, eq_no, serial, location, powertrain, owner, tahun, status } = req.body;
  try {
    const r = await run("INSERT INTO forklifts (brand,type,eq_no,serial,location,powertrain,owner,tahun,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,datetime('now','+7 hours'),datetime('now','+7 hours'))", [brand,type,eq_no,serial,location,powertrain,owner,tahun,status]);
    res.json({ id: r.id });
  } catch (e) {
    let msg = 'Forklift create failed';
    const em = String(e && e.message || '');
    if ((e && e.code === 'SQLITE_CONSTRAINT') || /constraint/i.test(em)){
      if (em.includes('forklifts.eq_no')) msg = 'EQ No sudah terdaftar';
      else if (em.includes('forklifts.serial')) msg = 'Serial sudah terdaftar';
      else msg = 'Gagal menyimpan: pelanggaran constraint';
    }
    res.status(400).json({ error: msg });
  }
});
app.put('/api/forklifts/:id', requireRole('admin','supervisor'), async (req, res) => {
  const { brand, type, eq_no, serial, location, powertrain, owner, tahun, status } = req.body;
  try {
    await run("UPDATE forklifts SET brand=?, type=?, eq_no=?, serial=?, location=?, powertrain=?, owner=?, tahun=?, status=?, updated_at = datetime('now','+7 hours') WHERE id=?", [brand,type,eq_no,serial,location,powertrain,owner,tahun,status, req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    let msg = 'Forklift update failed';
    const em = String(e && e.message || '');
    if ((e && e.code === 'SQLITE_CONSTRAINT') || /constraint/i.test(em)){
      if (em.includes('forklifts.eq_no')) msg = 'EQ No sudah terdaftar';
      else if (em.includes('forklifts.serial')) msg = 'Serial sudah terdaftar';
      else msg = 'Gagal menyimpan: pelanggaran constraint';
    }
    res.status(400).json({ error: msg });
  }
});
app.delete('/api/forklifts/:id', requireRole('admin','supervisor'), async (req, res) => {
  try {
    const id = req.params.id;
    // Soft delete child records dan jobs untuk menjaga data dapat direcover
    await run("UPDATE records SET deleted_at = datetime('now','+7 hours') WHERE forklift_id=?", [id]);
    await run("UPDATE jobs SET deleted_at = datetime('now','+7 hours') WHERE forklift_id=?", [id]);
    await run("UPDATE forklifts SET deleted_at = datetime('now','+7 hours') WHERE id=?", [id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Forklift delete failed' });
  }
});
app.post('/api/forklifts/bulk-delete', requireRole('admin','supervisor'), async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({ error: 'No ids' });
  try {
    const placeholders = ids.map(() => '?').join(',');
    // Soft delete child records dan jobs
    await run(`UPDATE records SET deleted_at = datetime('now','+7 hours') WHERE forklift_id IN (${placeholders})`, ids);
    await run(`UPDATE jobs SET deleted_at = datetime('now','+7 hours') WHERE forklift_id IN (${placeholders})`, ids);
    await run(`UPDATE forklifts SET deleted_at = datetime('now','+7 hours') WHERE id IN (${placeholders})`, ids);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Bulk delete failed' });
  }
});

// Import Forklifts dari Excel (format sama seperti export)
app.post('/api/forklifts/import', requireRole('admin','supervisor'), async (req, res) => {
  const rows = Array.isArray(req.body && req.body.rows) ? req.body.rows : [];
  let inserted = 0, updated = 0; const errors = [];

  const norm = (v) => String(v ?? '').trim();

  try {
    if (!rows.length) return res.json({ inserted, updated, errors });
    await run('BEGIN');
    for (let i = 0; i < rows.length; i++){
      try{
        let { brand, type, eq_no, serial, location, powertrain, owner, tahun, status } = rows[i] || {};
        brand = norm(brand);
        type = norm(type);
        eq_no = norm(eq_no);
        serial = norm(serial);
        location = norm(location);
        powertrain = norm(powertrain);
        owner = norm(owner);
        const tahunVal = (tahun === null || tahun === undefined || String(tahun).trim() === '') ? null : (parseInt(String(tahun).replace(/\D+/g,'') || '0', 10) || null);
        status = norm(status).toLowerCase();
        if (!['active','maintenance','retired'].includes(status)) status = null;

        if (!eq_no && !serial){ errors.push({ index: i+2, error: 'EQ No atau Serial wajib diisi' }); continue; }

        let existing = null;
        if (eq_no){ existing = await get('SELECT id, deleted_at FROM forklifts WHERE eq_no=?', [eq_no]); }
        if (!existing && serial){ existing = await get('SELECT id, deleted_at FROM forklifts WHERE serial=?', [serial]); }

        if (existing){
          await run("UPDATE forklifts SET brand=?, type=?, eq_no=?, serial=?, location=?, powertrain=?, owner=?, tahun=?, status=?, deleted_at = NULL, updated_at = datetime('now','+7 hours') WHERE id=?", [brand||null, type||null, eq_no||null, serial||null, location||null, powertrain||null, owner||null, tahunVal, status||null, existing.id]);
          updated++;
        } else {
          await run("INSERT INTO forklifts (brand,type,eq_no,serial,location,powertrain,owner,tahun,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,datetime('now','+7 hours'),datetime('now','+7 hours'))", [brand||null, type||null, eq_no||null, serial||null, location||null, powertrain||null, owner||null, tahunVal, status||null]);
          inserted++;
        }
      } catch(e){
        errors.push({ index: i+2, error: String(e && e.message || 'SQL error') });
      }
    }
    await run('COMMIT');
    res.json({ inserted, updated, errors });
  } catch (e) {
    await run('ROLLBACK');
    res.status(400).json({ error: 'Forklifts import failed' });
  }
});

// Items CRUD
app.get('/api/items', requireLogin, async (req, res) => {
  const rows = await all("SELECT * FROM items WHERE deleted_at IS NULL ORDER BY id DESC");
  res.json(rows);
});
app.post('/api/items', requireRole('admin','supervisor'), async (req, res) => {
  const { code, nama, unit, description, status } = req.body;
  try {
    const r = await run("INSERT INTO items (code, nama, unit, description, status, created_at, updated_at) VALUES (?,?,?,?,?,datetime('now','+7 hours'),datetime('now','+7 hours'))", [code,nama,unit,description,status]);
    res.json({ id: r.id });
  } catch (e) {
    // Jika terjadi konflik UNIQUE (code sudah ada), lakukan upsert/update, termasuk restore jika soft-deleted
    try {
      const existing = await get('SELECT id FROM items WHERE code=?', [code]);
      if (existing && existing.id){
        await run("UPDATE items SET nama=?, unit=?, description=?, status=?, deleted_at=NULL, updated_at = datetime('now','+7 hours') WHERE id=?", [nama,unit,description,status, existing.id]);
        return res.json({ id: existing.id, restored: true });
      }
    } catch (_) {}
    res.status(400).json({ error: 'Item create failed' });
  }
});
app.put('/api/items/:id', requireRole('admin','supervisor'), async (req, res) => {
  const { code, nama, unit, description, status } = req.body;
  try {
    await run("UPDATE items SET code=?, nama=?, unit=?, description=?, status=?, updated_at = datetime('now','+7 hours') WHERE id=?", [code,nama,unit,description,status, req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Item update failed' });
  }
});
app.delete('/api/items/:id', requireRole('admin','supervisor'), async (req, res) => {
  try {
    await run("UPDATE items SET deleted_at = datetime('now','+7 hours') WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Item delete failed' });
  }
});

// Jobs CRUD
function nextReportNo(prefix, rows) {
  let max = 0;
  const re = new RegExp('^'+prefix+"(\\d{5})$");
  for (const r of rows) {
    const m = re.exec(r.report_no || '');
    if (m) {
      const n = parseInt(m[1], 10);
      if (n > max) max = n;
    }
  }
  const next = (max + 1).toString().padStart(5, '0');
  return `${prefix}${next}`;
}

function reportPrefixForPowertrain(powertrain){
  const p = String(powertrain||'').toLowerCase();
  if (p.includes('electric') || p.includes('manual') || p.includes('instrument') || p.includes('tools')) return 'Z';
  if (p.includes('diesel') || p.includes('lpg')) return 'W';
  return 'W';
}
// Endpoint untuk autofill report number di form Jobs
app.get('/api/jobs/next-report', requireLogin, async (req, res) => {
  try{
    const forklift_id = parseInt(req.query.forklift_id);
    if (!forklift_id) return res.status(400).json({ error: 'forklift_id wajib diisi' });
    const fk = await get('SELECT powertrain FROM forklifts WHERE id=?', [forklift_id]);
    const prefix = reportPrefixForPowertrain(fk && fk.powertrain);
    // Ambil sumber penomoran dari service records saat ini, bukan dari tabel jobs,
    // agar jika record W00005 dihapus maka next kembali ke W00005 (bukan W00006)
    const rows = await all(`SELECT report_no FROM records WHERE report_no LIKE ? AND pekerjaan='Workshop' AND deleted_at IS NULL ORDER BY id DESC LIMIT 100`, [prefix+'%']);
    const report_no = nextReportNo(prefix, rows);
    res.json({ report_no, prefix });
  }catch(e){ res.status(400).json({ error: 'Gagal ambil nomor' }); }
});
app.get('/api/jobs', requireLogin, async (req, res) => {
  const rows = await all("SELECT * FROM jobs WHERE deleted_at IS NULL ORDER BY id DESC");
  res.json(rows);
});
app.post('/api/jobs', requireRole('admin','supervisor','teknisi'), async (req, res) => {
  let { jenis, forklift_id, tanggal, teknisi, report_no, description, recommendation, items_used, next_pm } = req.body;
  try {
    if (!teknisi || !String(teknisi).trim()) return res.status(400).json({ error: 'Teknisi wajib diisi' });

    // Pastikan variabel terdeklarasi
    let fk = null;
    let fkLoc = null;
    let prefix = 'W';

    if (jenis === 'Workshop') {
      fk = await get('SELECT powertrain, location FROM forklifts WHERE id=?', [forklift_id]);
      fkLoc = fk ? fk.location : null;
      prefix = reportPrefixForPowertrain(fk && fk.powertrain);
      if (!report_no || !/^[ZW]\d{5}$/.test(String(report_no))) {
        // Sumber penomoran diambil dari records agar mengikuti data aktif di service records
        const rows = await all("SELECT report_no FROM records WHERE report_no LIKE ? AND pekerjaan='Workshop' ORDER BY id DESC LIMIT 100", [prefix + '%']);
        report_no = nextReportNo(prefix, rows);
      }
      }

      const r = await run("INSERT INTO jobs (jenis,forklift_id,tanggal,teknisi,report_no,description,recommendation,items_used,next_pm,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,datetime('now','+7 hours'),datetime('now','+7 hours'))", [jenis, forklift_id, tanggal, teknisi, report_no, description, recommendation, items_used, next_pm || null]);

    // Snapshot lokasi (selalu isi): jika belum didapat dari blok Workshop, ambil dari forklifts
    if (fkLoc == null) {
      const ff = await get('SELECT location FROM forklifts WHERE id=?', [forklift_id]);
      fkLoc = ff ? ff.location : null;
    }

    await run("INSERT INTO records (tanggal, report_no, forklift_id, pekerjaan, teknisi, description, recommendation, items_used, location, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,datetime('now','+7 hours'),datetime('now','+7 hours'))", [tanggal, report_no, forklift_id, jenis, teknisi, description, recommendation, items_used, fkLoc || null]);

    res.json({ id: r.id, report_no });
  } catch (e) {
    res.status(400).json({ error: 'Job create failed' });
  }
});
app.put('/api/jobs/:id', requireRole('admin','supervisor'), async (req, res) => {
  const { jenis, forklift_id, tanggal, teknisi, report_no, description, recommendation, items_used, next_pm } = req.body;
  try {
    // Ambil data lama untuk sinkronisasi ke records
    const old = await get('SELECT report_no, forklift_id FROM jobs WHERE id=?', [req.params.id]);

    await run("UPDATE jobs SET jenis=?, forklift_id=?, tanggal=?, teknisi=?, report_no=?, description=?, recommendation=?, items_used=?, next_pm=?, updated_at = datetime('now','+7 hours') WHERE id=?", [jenis,forklift_id,tanggal,teknisi,report_no,description,recommendation,items_used,next_pm || null, req.params.id]);

    // Sinkronkan ke service records agar statistik Maintenance Jobs (berbasis records) ikut berubah ketika job diubah
    if (old && old.report_no) {
      let sql = 'UPDATE records SET pekerjaan=?, tanggal=?, teknisi=?, description=?, recommendation=?, items_used=?, report_no=?, forklift_id=?';
      const params = [jenis, tanggal, teknisi, description, recommendation, items_used, report_no, forklift_id];
      // Jika forklift_id berubah, snapshot ulang lokasi dari forklifts
      if (String(old.forklift_id) !== String(forklift_id)) {
        const fk = await get('SELECT location FROM forklifts WHERE id=?', [forklift_id]);
        sql += ', location=?';
        params.push(fk ? fk.location : null);
      }
      sql += ", updated_at = datetime('now','+7 hours')";
      sql += ' WHERE report_no=? AND forklift_id=?';
      params.push(old.report_no, old.forklift_id);
      await run(sql, params);
    }

    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Job update failed' });
  }
});
app.delete('/api/jobs/:id', requireRole('admin','supervisor'), async (req, res) => {
  try {
    // Hapus service record terkait agar statistik Maintenance Jobs (records) ikut berkurang
    const old = await get('SELECT report_no, forklift_id FROM jobs WHERE id=?', [req.params.id]);
    if (old && old.report_no) {
      await run("UPDATE records SET deleted_at = datetime('now','+7 hours') WHERE report_no=? AND forklift_id=?", [old.report_no, old.forklift_id]);
    }
    await run("UPDATE jobs SET deleted_at = datetime('now','+7 hours') WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Job delete failed' });
  }
});

// Records endpoints
app.get('/api/records', requireLogin, async (req, res) => {
  try {
    const { q, forklift_id, start, end } = req.query;
    const params = [];
    let sql = `SELECT r.*, (SELECT brand||' '||type||' ('||eq_no||')' FROM forklifts f WHERE f.id=r.forklift_id) as forklift, r.location as forklift_location, COALESCE((SELECT j.next_pm FROM jobs j WHERE j.report_no=r.report_no AND j.forklift_id=r.forklift_id AND j.jenis='PM' AND j.deleted_at IS NULL ORDER BY j.id DESC LIMIT 1), (SELECT j.next_pm FROM jobs j WHERE j.jenis='PM' AND j.forklift_id=r.forklift_id AND j.deleted_at IS NULL ORDER BY j.id DESC LIMIT 1)) as next_pm FROM records r WHERE r.deleted_at IS NULL`;
    // Filter by forklift
    if (forklift_id) { sql += ' AND r.forklift_id=?'; params.push(forklift_id); }
    // Range filter (gunakan perbandingan string ISO agar bisa gunakan indeks)
    if (start) { sql += ' AND r.tanggal>=?'; params.push(start); }
    if (end) { sql += ' AND r.tanggal<=?'; params.push(end); }
    if (q) {
      sql += ' AND (r.description LIKE ? OR r.recommendation LIKE ? OR r.items_used LIKE ? OR r.report_no LIKE ? OR r.teknisi LIKE ? OR r.location LIKE ? OR EXISTS (SELECT 1 FROM forklifts f WHERE f.id=r.forklift_id AND (COALESCE(f.eq_no,"") LIKE ? OR COALESCE(f.brand,"") LIKE ? OR COALESCE(f.type,"") LIKE ? OR COALESCE(f.location,"") LIKE ?)))';
      params.push(`%${q}%`,`%${q}%`,`%${q}%`,`%${q}%`,`%${q}%`,`%${q}%`,`%${q}%`,`%${q}%`,`%${q}%`,`%${q}%`);
    }
    sql += ' ORDER BY r.id DESC';
    const rows = await all(sql, params);
    res.json(rows);
  } catch (e) {
    res.status(400).json({ error: 'Records fetch failed' });
  }
});

// Import Records dari Excel (format sama seperti export)
app.post('/api/records/import', requireRole('admin','supervisor'), async (req, res) => {
  const rows = Array.isArray(req.body && req.body.rows) ? req.body.rows : [];
  let inserted = 0, updated = 0; const errors = [];

  function parseEqNo(str){
    const s = String(str||'');
    const m = s.match(/\(([^)]+)\)\s*$/);
    return (m && m[1]) ? String(m[1]).trim() : s.trim();
  }

  try {
    if (!rows.length) return res.json({ inserted, updated, errors });
    await run('BEGIN');
    for (let i = 0; i < rows.length; i++){
      try{
        let { tanggal, report_no, forklift, location, pekerjaan, teknisi, description, recommendation, items_used } = rows[i] || {};
        tanggal = String(tanggal||'').trim();
        report_no = String(report_no||'').trim();
        const fkStr = String(forklift||'').trim();
        let loc = (location===null||location===undefined) ? '' : String(location).trim();
        pekerjaan = String(pekerjaan||'').trim();
        teknisi = String(teknisi||'').trim();
        description = String(description||'').trim();
        recommendation = String(recommendation||'').trim();
        items_used = String(items_used||'').trim();

        if (!fkStr){ errors.push({ index: i+2, error: 'Forklift kosong' }); continue; }
        const eq = parseEqNo(fkStr);
        let fk = await get('SELECT id, location, deleted_at FROM forklifts WHERE eq_no=?', [eq]);
        if (!fk){ errors.push({ index: i+2, error: `Forklift tidak ditemukan untuk EQ No: ${eq}` }); continue; }
        // Jika forklift soft-deleted, restore agar relasi records valid
        if (fk.deleted_at){
          await run("UPDATE forklifts SET deleted_at = NULL, updated_at = datetime('now') WHERE id=?", [fk.id]);
          // Refresh snapshot location jika diperlukan
          fk = await get('SELECT id, location FROM forklifts WHERE id=?', [fk.id]);
        }

        // Snapshot location jika kolom Location kosong
        if (!loc){
          loc = fk.location || null;
        }

        // Upsert berdasarkan (report_no, forklift_id)
        let existing = null;
        if (report_no) {
          existing = await get('SELECT id FROM records WHERE report_no=? AND forklift_id=? AND deleted_at IS NULL', [report_no, fk.id]);
        }

        if (existing){
          await run("UPDATE records SET tanggal=?, report_no=?, forklift_id=?, pekerjaan=?, teknisi=?, description=?, recommendation=?, items_used=?, location=?, updated_at = datetime('now') WHERE id=?", [tanggal||null, report_no||null, fk.id, pekerjaan||null, teknisi||null, description||null, recommendation||null, items_used||null, loc||null, existing.id]);
          updated++;
        } else {
          await run('INSERT INTO records (tanggal, report_no, forklift_id, pekerjaan, teknisi, description, recommendation, items_used, location) VALUES (?,?,?,?,?,?,?,?,?)', [tanggal||null, report_no||null, fk.id, pekerjaan||null, teknisi||null, description||null, recommendation||null, items_used||null, loc||null]);
          inserted++;
        }
      } catch(e){
        errors.push({ index: i+2, error: String(e && e.message || 'SQL error') });
      }
    }
    await run('COMMIT');
    res.json({ inserted, updated, errors });
  } catch (e) {
    await run('ROLLBACK');
    res.status(400).json({ error: 'Import failed' });
  }
});

app.post('/api/records', requireRole('admin','supervisor'), async (req, res) => {
  const { tanggal, report_no, forklift_id, pekerjaan, teknisi, description, recommendation, items_used } = req.body;
  try {
    const fk = await get('SELECT location FROM forklifts WHERE id=?', [forklift_id]);
    const loc = fk ? fk.location : null;
    const r = await run('INSERT INTO records (tanggal, report_no, forklift_id, pekerjaan, teknisi, description, recommendation, items_used, location) VALUES (?,?,?,?,?,?,?,?,?)', [tanggal, report_no, forklift_id, pekerjaan, teknisi, description, recommendation, items_used, loc || null]);
    res.json({ id: r.id });
  } catch (e) {
    res.status(400).json({ error: 'Record create failed' });
  }
});

app.put('/api/records/:id', requireLogin, async (req, res) => {
  const user = req.session.user;
  const { tanggal, report_no, forklift_id, pekerjaan, teknisi, description, recommendation, items_used, location } = req.body;
  try {
    if (user.role === 'teknisi') {
      const rec = await get('SELECT teknisi FROM records WHERE id=?', [req.params.id]);
      const low = String(rec && rec.teknisi || '').toLowerCase();
      const meEmail = String(user.email||'').toLowerCase();
      const meName = String(user.name||'').toLowerCase();
      const assigned = low.includes(meEmail) || (!!meName && low.includes(meName));
      if (!assigned) return res.status(403).json({ error: 'Tidak boleh edit' });
    }
    // Update lokasi: izinkan rename manual jika dikirimkan; jika tidak dan forklift_id berubah, snapshot ulang dari forklifts; selain itu pertahankan
    const oldRec = await get('SELECT forklift_id, location FROM records WHERE id=?', [req.params.id]);
    let locVal = oldRec ? oldRec.location : null;
    if (typeof location !== 'undefined') {
      locVal = location;
    } else if (oldRec && String(oldRec.forklift_id) !== String(forklift_id)){
      const fk = await get('SELECT location FROM forklifts WHERE id=?', [forklift_id]);
      locVal = fk ? fk.location : null;
    }
    await run("UPDATE records SET tanggal=?, report_no=?, forklift_id=?, pekerjaan=?, teknisi=?, description=?, recommendation=?, items_used=?, location=?, updated_at = datetime('now','+7 hours') WHERE id=?", [tanggal, report_no, forklift_id, pekerjaan, teknisi, description, recommendation, items_used, locVal || null, req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Record update failed' });
  }
});

app.delete('/api/records/:id', requireLogin, async (req, res) => {
  try {
    const user = req.session.user;
    if (user.role === 'admin' || user.role === 'supervisor') {
      await run("UPDATE records SET deleted_at = datetime('now','+7 hours') WHERE id=?", [req.params.id]);
      return res.json({ message: 'ok' });
    }
    if (user.role === 'teknisi') {
      const rec = await get('SELECT teknisi FROM records WHERE id=?', [req.params.id]);
      const low = String(rec && rec.teknisi || '').toLowerCase();
      const email = String(user.email || '').toLowerCase();
      const name = String(user.name || '').toLowerCase();
      const assigned = low.includes(email) || (!!name && low.includes(name));
      if (!assigned) return res.status(403).json({ error: 'Forbidden' });
      await run("UPDATE records SET deleted_at = datetime('now','+7 hours') WHERE id=?", [req.params.id]);
      return res.json({ message: 'ok' });
    }
    return res.status(403).json({ error: 'Forbidden' });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Server error' });
  }
});

app.post('/api/records/bulk-delete', requireLogin, async (req, res) => {
  try {
    const user = req.session.user;
    let { ids } = req.body || {};
    if (!Array.isArray(ids) || !ids.length) return res.status(400).json({ error: 'ids required' });

    if (user.role === 'admin' || user.role === 'supervisor') {
      const placeholders = ids.map(()=>'?').join(',');
      await run(`UPDATE records SET deleted_at = datetime('now','+7 hours') WHERE id IN (${placeholders})`, ids);
      return res.json({ message: 'ok', deleted: ids.length });
    }

    if (user.role === 'teknisi') {
      // Ambil record milik teknisi
      const placeholders = ids.map(()=>'?').join(',');
      const rows = await all(`SELECT id, teknisi FROM records WHERE id IN (${placeholders})`, ids);
      const email = String(user.email || '').toLowerCase();
      const name = String(user.name || '').toLowerCase();
      const ownIds = rows.filter(r=>{
        const low = String(r.teknisi||'').toLowerCase();
        return low.includes(email) || (!!name && low.includes(name));
      }).map(r=>r.id);
      if (!ownIds.length) return res.status(403).json({ error: 'Tidak ada record milik Anda dalam pilihan' });
      const ph2 = ownIds.map(()=>'?').join(',');
      await run(`UPDATE records SET deleted_at = datetime('now','+7 hours') WHERE id IN (${ph2})`, ownIds);
      return res.json({ message: 'ok', deleted: ownIds.length });
    }

    return res.status(403).json({ error: 'Forbidden' });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Server error' });
  }
});

// Archive Jobs endpoints (read-only)
app.get('/api/archive/jobs', requireLogin, async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const forklift_id = req.query.forklift_id || '';
    const source = req.query.source || req.query.job_source || '';
    const jenis = (req.query.jenis || '').trim();
    const start = req.query.start || '';
    const end = req.query.end || '';
    const forklift_eq_no = req.query.forklift_eq_no || '';
    const rawLimit = String(req.query.limit || '50');
    let limit = 50;
    if (rawLimit.toLowerCase() === 'all') {
      limit = 100000; // khusus 'all' untuk mengambil seluruh data yang difilter
    } else {
      const parsed = parseInt(rawLimit, 10);
      limit = (!isNaN(parsed) && parsed > 0) ? parsed : 50;
      // Naikkan batas maksimum agar 'all' dari frontend tidak terpotong di 200
      limit = Math.min(limit, 100000);
    }
    const offset = parseInt(req.query.offset || '0', 10);
    const order = (String(req.query.order||'desc').toLowerCase()==='asc') ? 'ASC' : 'DESC';

    // Build filters for maintenance and workshop separately
    const whMaint = [];
    const pMaint = [];
    const whWork = [];
    const pWork = [];

    if (forklift_id) { whMaint.push('am.forklift_id=?'); pMaint.push(forklift_id); whWork.push('aw.forklift_id=?'); pWork.push(forklift_id); }
    if (start) { whMaint.push('am.tanggal>=?'); pMaint.push(start); whWork.push('aw.tanggal>=?'); pWork.push(start); }
    if (end) { whMaint.push('am.tanggal<=?'); pMaint.push(end); whWork.push('aw.tanggal<=?'); pWork.push(end); }
    if (forklift_eq_no) {
      const likeFk = `%${forklift_eq_no}%`;
      whMaint.push('EXISTS (SELECT 1 FROM forklifts f WHERE f.id=am.forklift_id AND COALESCE(f.eq_no, "") LIKE ?)');
      pMaint.push(likeFk);
      whWork.push('EXISTS (SELECT 1 FROM forklifts f WHERE f.id=aw.forklift_id AND COALESCE(f.eq_no, "") LIKE ?)');
      pWork.push(likeFk);
    }
    if (q) {
      const like = `%${q}%`;
      // Maintenance table tidak memiliki kolom notes; batasi ke report_no + recommendation
      whMaint.push('(COALESCE(am.report_no, "") LIKE ? OR COALESCE(am.recommendation, "") LIKE ?)');
      pMaint.push(like, like);
      // Workshop tetap: report_no, pekerjaan, notes
      whWork.push('(COALESCE(aw.report_no, "") LIKE ? OR COALESCE(aw.pekerjaan, "") LIKE ? OR COALESCE(aw.notes, "") LIKE ?)');
      pWork.push(like, like, like);
    }

    const selMaint = `SELECT am.id AS id, 'maintenance' AS job_source, 'PM' AS jenis,
      am.tanggal AS job_date,
      COALESCE((SELECT brand||' '||type||' ('||eq_no||')' FROM forklifts f WHERE f.id=am.forklift_id), '') AS forklift,
      am.report_no AS job_no,
      am.recommendation AS recommendation,
      NULL AS pekerjaan,
      NULL AS item_dipakai,
      am.recommendation AS description,
      NULL AS notes,
      am.next_pm AS next_pm,
      NULL AS created_at,
      NULL AS updated_at
    FROM archive_maintenance_jobs am` + (whMaint.length ? (' WHERE ' + whMaint.join(' AND ')) : '');

    const selWork = `SELECT aw.id AS id, 'workshop' AS job_source, 'Workshop' AS jenis,
      aw.tanggal AS job_date,
      COALESCE((SELECT brand||' '||type||' ('||eq_no||')' FROM forklifts f WHERE f.id=aw.forklift_id), '') AS forklift,
      aw.report_no AS job_no,
      NULL AS recommendation,
      aw.pekerjaan AS pekerjaan,
      aw.item_dipakai AS item_dipakai,
      aw.pekerjaan AS description,
      aw.notes AS notes,
      NULL AS next_pm,
      aw.created_at AS created_at,
      aw.updated_at AS updated_at
    FROM archive_workshop_jobs aw` + (whWork.length ? (' WHERE ' + whWork.join(' AND ')) : '');

    let rows = [];
    let total = 0;
    const mapped = jenis ? (jenis.toLowerCase()==='pm'?'maintenance':'workshop') : (source||'');
    if (mapped === 'maintenance'){
      total = (await get(`SELECT COUNT(*) AS c FROM archive_maintenance_jobs am${whMaint.length?(' WHERE '+whMaint.join(' AND ')):''}`, pMaint))?.c || 0;
      rows = await all(`${selMaint} ORDER BY job_date ${order}, id ${order} LIMIT ? OFFSET ?`, [...pMaint, (isNaN(limit)?50:limit), (isNaN(offset)?0:offset)]);
    } else if (mapped === 'workshop'){
      total = (await get(`SELECT COUNT(*) AS c FROM archive_workshop_jobs aw${whWork.length?(' WHERE '+whWork.join(' AND ')):''}`, pWork))?.c || 0;
      rows = await all(`${selWork} ORDER BY job_date ${order}, id ${order} LIMIT ? OFFSET ?`, [...pWork, (isNaN(limit)?50:limit), (isNaN(offset)?0:offset)]);
    } else {
      // Union kedua sumber
      const union = `${selMaint} UNION ALL ${selWork}`;
      const params = [...pMaint, ...pWork];
      const cntMaint = (await get(`SELECT COUNT(*) AS c FROM archive_maintenance_jobs am${whMaint.length?(' WHERE '+whMaint.join(' AND ')):''}`, pMaint))?.c || 0;
      const cntWork = (await get(`SELECT COUNT(*) AS c FROM archive_workshop_jobs aw${whWork.length?(' WHERE '+whWork.join(' AND ')):''}`, pWork))?.c || 0;
      total = cntMaint + cntWork;
      rows = await all(`${union} ORDER BY job_date ${order}, id ${order} LIMIT ? OFFSET ?`, [...params, (isNaN(limit)?50:limit), (isNaN(offset)?0:offset)]);
    }
    res.json({ rows, total });
  } catch (e) {
    res.status(500).json({ error: 'Archive jobs query failed' });
  }
});

app.get('/api/archive/jobs/:id', requireLogin, async (req, res) => {
  try {
    const id = req.params.id;
    const source = req.query.source || req.query.job_source || '';
    const selectMaint = `SELECT am.id AS id, 'maintenance' AS job_source, 'PM' AS jenis,
      am.tanggal AS job_date,
      COALESCE((SELECT brand||' '||type||' ('||eq_no||')' FROM forklifts f WHERE f.id=am.forklift_id), '') AS forklift,
      am.report_no AS job_no,
      am.recommendation AS recommendation,
      NULL AS pekerjaan,
      NULL AS item_dipakai,
      am.recommendation AS description,
      NULL AS notes,
      am.next_pm AS next_pm,
      NULL AS created_at,
      NULL AS updated_at
    FROM archive_maintenance_jobs am WHERE am.id=?`;
    const selectWork = `SELECT aw.id AS id, 'workshop' AS job_source, 'Workshop' AS jenis,
      aw.tanggal AS job_date,
      COALESCE((SELECT brand||' '||type||' ('||eq_no||')' FROM forklifts f WHERE f.id=aw.forklift_id), '') AS forklift,
      aw.report_no AS job_no,
      NULL AS recommendation,
      aw.pekerjaan AS pekerjaan,
      aw.item_dipakai AS item_dipakai,
      aw.pekerjaan AS description,
      aw.notes AS notes,
      NULL AS next_pm,
      aw.created_at AS created_at,
      aw.updated_at AS updated_at
    FROM archive_workshop_jobs aw WHERE aw.id=?`;
    let row = null;
    if (source === 'maintenance') row = await get(selectMaint, [id]);
    else if (source === 'workshop') row = await get(selectWork, [id]);
    else {
      row = await get(selectMaint, [id]);
      if (!row) row = await get(selectWork, [id]);
    }
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (e) {
    res.status(500).json({ error: 'Archive job fetch failed' });
  }
});

// Serve index to login by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Restore a soft-deleted user (admin only)
app.post('/api/users/:id/restore', requireRole('admin'), async (req, res) => {
  try {
    await run("UPDATE users SET deleted_at = NULL, updated_at = datetime('now','+7 hours') WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'User restore failed' });
  }
});
// Restore a soft-deleted forklift and related jobs/records
app.post('/api/forklifts/:id/restore', requireRole('admin','supervisor'), async (req, res) => {
  try {
    const id = req.params.id;
    await run("UPDATE forklifts SET deleted_at = NULL, updated_at = datetime('now','+7 hours') WHERE id=?", [id]);
    await run("UPDATE jobs SET deleted_at = NULL, updated_at = datetime('now','+7 hours') WHERE forklift_id=?", [id]);
    await run("UPDATE records SET deleted_at = NULL, updated_at = datetime('now','+7 hours') WHERE forklift_id=?", [id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Forklift restore failed' });
  }
});
// Restore a soft-deleted item
app.post('/api/items/:id/restore', requireRole('admin','supervisor'), async (req, res) => {
  try {
    await run("UPDATE items SET deleted_at = NULL, updated_at = datetime('now','+7 hours') WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Item restore failed' });
  }
});
// Restore a soft-deleted job and its linked record
app.post('/api/jobs/:id/restore', requireRole('admin','supervisor'), async (req, res) => {
  try {
    const id = req.params.id;
    const job = await get('SELECT report_no, forklift_id FROM jobs WHERE id=?', [id]);
    await run("UPDATE jobs SET deleted_at = NULL, updated_at = datetime('now','+7 hours') WHERE id=?", [id]);
    if (job && job.report_no) {
      await run("UPDATE records SET deleted_at = NULL, updated_at = datetime('now','+7 hours') WHERE report_no=? AND forklift_id=?", [job.report_no, job.forklift_id]);
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Job restore failed' });
  }
});
// Restore a soft-deleted record
app.post('/api/records/:id/restore', requireRole('admin','supervisor'), async (req, res) => {
  try {
    await run("UPDATE records SET deleted_at = NULL, updated_at = datetime('now','+7 hours') WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Record restore failed' });
  }
});

// Hard delete endpoints (physical deletion)
app.delete('/api/users/:id/hard', requireRole('admin'), async (req, res) => {
  try {
    await run('DELETE FROM users WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'User hard delete failed' });
  }
});

app.delete('/api/forklifts/:id/hard', requireRole('admin','supervisor'), async (req, res) => {
  try {
    const id = req.params.id;
    await run('DELETE FROM records WHERE forklift_id=?', [id]);
    await run('DELETE FROM jobs WHERE forklift_id=?', [id]);
    await run('DELETE FROM forklifts WHERE id=?', [id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Forklift hard delete failed' });
  }
});

app.delete('/api/items/:id/hard', requireRole('admin','supervisor'), async (req, res) => {
  try {
    await run('DELETE FROM items WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Item hard delete failed' });
  }
});

app.delete('/api/jobs/:id/hard', requireRole('admin','supervisor'), async (req, res) => {
  try {
    const id = req.params.id;
    const job = await get('SELECT report_no, forklift_id FROM jobs WHERE id=?', [id]);
    if (job && job.report_no) {
      await run('DELETE FROM records WHERE report_no=? AND forklift_id=?', [job.report_no, job.forklift_id]);
    }
    await run('DELETE FROM jobs WHERE id=?', [id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Job hard delete failed' });
  }
});

app.delete('/api/records/:id/hard', requireRole('admin','supervisor'), async (req, res) => {
  try {
    await run('DELETE FROM records WHERE id=?', [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'Record hard delete failed' });
  }
});