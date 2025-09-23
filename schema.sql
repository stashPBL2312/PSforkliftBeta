PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT CHECK(role IN ('admin','supervisor','teknisi')) NOT NULL
);

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
  status TEXT CHECK(status IN ('active','maintenance','retired'))
);

CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jenis TEXT CHECK(jenis IN ('PM','Lapangan','Workshop')),
  forklift_id INTEGER,
  tanggal DATE,
  teknisi TEXT,
  report_no TEXT,
  description TEXT,
  recommendation TEXT,
  items_used TEXT,
  next_pm DATE,
  FOREIGN KEY(forklift_id) REFERENCES forklifts(id)
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE,
  nama TEXT,
  unit TEXT,
  description TEXT,
  status TEXT CHECK(status IN ('available','unavailable'))
);

CREATE TABLE IF NOT EXISTS records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tanggal DATE,
  report_no TEXT,
  forklift_id INTEGER,
  pekerjaan TEXT,
  teknisi TEXT,
  description TEXT,
  recommendation TEXT,
  items_used TEXT,
  FOREIGN KEY(forklift_id) REFERENCES forklifts(id)
);