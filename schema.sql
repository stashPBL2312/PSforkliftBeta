PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA temp_store = MEMORY;
PRAGMA cache_size = -2000; -- ~2MB page cache

-- Users
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT CHECK(role IN ('admin','supervisor','teknisi')) NOT NULL,
  name TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);
-- Indexes for users
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Forklifts
CREATE TABLE IF NOT EXISTS forklifts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT,
  type TEXT,
  eq_no TEXT UNIQUE,
  serial TEXT UNIQUE,
  location TEXT,
  powertrain TEXT,
  owner TEXT,
  tahun INTEGER,
  status TEXT CHECK(status IN ('active','maintenance','retired')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);
-- Indexes for forklifts
CREATE INDEX IF NOT EXISTS idx_forklifts_eq_no ON forklifts(eq_no);
CREATE INDEX IF NOT EXISTS idx_forklifts_serial ON forklifts(serial);
CREATE INDEX IF NOT EXISTS idx_forklifts_location ON forklifts(location);
CREATE INDEX IF NOT EXISTS idx_forklifts_status ON forklifts(status);
CREATE INDEX IF NOT EXISTS idx_forklifts_brand_type ON forklifts(brand, type);
CREATE INDEX IF NOT EXISTS idx_forklifts_owner ON forklifts(owner);
CREATE INDEX IF NOT EXISTS idx_forklifts_tahun ON forklifts(tahun);

-- Items (match app code: nama/description/status)
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  nama TEXT,
  unit TEXT,
  description TEXT,
  status TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);
-- Indexes for items
CREATE INDEX IF NOT EXISTS idx_items_code ON items(code);
CREATE INDEX IF NOT EXISTS idx_items_nama ON items(nama);
CREATE INDEX IF NOT EXISTS idx_items_description ON items(description);
CREATE INDEX IF NOT EXISTS idx_items_status ON items(status);

-- Jobs (match app code)
CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jenis TEXT,                -- PM/Workshop/etc
  forklift_id INTEGER NOT NULL,
  tanggal TEXT NOT NULL,
  teknisi TEXT,
  report_no TEXT,
  description TEXT,
  recommendation TEXT,
  items_used TEXT,
  next_pm TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT,
  FOREIGN KEY(forklift_id) REFERENCES forklifts(id)
);
-- Indexes for jobs used by queries
CREATE INDEX IF NOT EXISTS idx_jobs_forklift ON jobs(forklift_id);
CREATE INDEX IF NOT EXISTS idx_jobs_jenis ON jobs(jenis);
CREATE INDEX IF NOT EXISTS idx_jobs_report_forklift ON jobs(report_no, forklift_id);
CREATE INDEX IF NOT EXISTS idx_jobs_tanggal ON jobs(tanggal);

-- Records (match app code)
CREATE TABLE IF NOT EXISTS records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tanggal TEXT NOT NULL,
  report_no TEXT,
  forklift_id INTEGER NOT NULL,
  pekerjaan TEXT NOT NULL,
  teknisi TEXT,
  description TEXT,
  recommendation TEXT,
  items_used TEXT,
  location TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT,
  FOREIGN KEY(forklift_id) REFERENCES forklifts(id)
);
-- Indexes for records
CREATE INDEX IF NOT EXISTS idx_records_tanggal ON records(tanggal);
CREATE INDEX IF NOT EXISTS idx_records_forklift ON records(forklift_id);
CREATE INDEX IF NOT EXISTS idx_records_report_forklift ON records(report_no, forklift_id);
CREATE INDEX IF NOT EXISTS idx_records_teknisi ON records(teknisi);
CREATE INDEX IF NOT EXISTS idx_records_pekerjaan ON records(pekerjaan);
CREATE INDEX IF NOT EXISTS idx_records_location ON records(location);
CREATE INDEX IF NOT EXISTS idx_records_description ON records(description);
CREATE INDEX IF NOT EXISTS idx_records_recommendation ON records(recommendation);
CREATE INDEX IF NOT EXISTS idx_records_items_used ON records(items_used);