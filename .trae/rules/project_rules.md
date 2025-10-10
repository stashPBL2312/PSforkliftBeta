# Project Rules — PSforkliftBeta

Tujuan: proyek rapi, bertahap, minim risiko, dan mudah dipelihara. Dokumen ini merangkum keputusan teknis dan aturan kerja yang perlu diingat saat melanjutkan pengembangan.

## Ringkasan Struktur Saat Ini
- PRAGMA runtime: `foreign_keys=ON`, `journal_mode=WAL`, `synchronous=NORMAL`, cache/temp dioptimalkan.
- Tabel utama: `users`, `forklifts`, `items`, `jobs`, `records` — semua memiliki kolom audit (`created_at`, `updated_at`, `deleted_at`).
- Constraints: `users.email` unik, `forklifts.eq_no` unik, `forklifts.serial` unik, `items.code` unik. FK: `jobs.forklift_id` dan `records.forklift_id` mereferensi `forklifts(id)`.
- Indeks: dibuat untuk kolom pencarian/penyaringan utama (role, eq_no, serial, lokasi, status, tanggal, teknisi, pekerjaan, dll.).
- Soft delete: API list menyaring `deleted_at IS NULL`; semua endpoint delete mengisi `deleted_at` (bukan hard delete).
- Import Records: transaksi `BEGIN/COMMIT/ROLLBACK`, upsert berbasis `(report_no, forklift_id)`, snapshot `location` dari `forklifts.location` bila kosong, auto-restore forklift jika sempat terhapus.
- Restore endpoints tersedia untuk `users`, `forklifts`, `items`, `jobs`, `records`.

## Kebijakan Soft/Hard Delete (Final)
- Default seluruh aplikasi: soft delete dengan `deleted_at`. Restore mengosongkan `deleted_at` dan memperbarui `updated_at`.
- Hard delete hanya untuk kebutuhan administratif terbatas via AdminJS dan harus memakai transaksi serta cascade aman. Frontend tidak melakukan hard delete.
- Rekomendasi migrasi skema: aktifkan `ON DELETE CASCADE` untuk tabel aktif (contoh: `records/jobs` yang bergantung pada `forklifts`) dan `ON DELETE SET NULL` untuk referensi arsip.

## Finalisasi AdminJS (yang akan diimplementasi)
- Adapter: `@adminjs/mikroorm` + `@adminjs/express` (SQLite melalui MikroORM).
- ESM-only: letakkan setup di `src/admin/index.js` dan gunakan import dinamis dari `server.js` agar tidak memaksa seluruh file ke ESM.
- Mount: `/admin` di belakang middleware sesi yang ada (`requireRole('admin','supervisor')`).
- Resources: `users`, `forklifts`, `items`, `records` (opsional read-only `archive_jobs`).
- Aksi: Delete = soft delete; sediakan aksi “Restore”. Tambahkan aksi “HardDelete” khusus admin dengan transaksi dan cascade.

## Arsip Legacy (MySQL) — Desain dan Aturan
- Tabel `archive_jobs` bersifat terpisah dari `records` baru: tampil di halaman “Arsip” (frontend) dan read-only di AdminJS.
- Kolom inti: `id` (PK), `job_no`, `job_source` (`workshop`|`maintenance`), `job_date`, `description`, `notes`, `status`, `created_at`, `updated_at`.
- Referensi forklift: `forklift_id` (FK ke `forklifts.id`, `ON DELETE SET NULL`) + redundansi `forklift_eq_no`, `forklift_serial` untuk fallback.
- Indeks: `job_no`, `job_date`, `job_source`, `forklift_eq_no`, `forklift_serial`.
- Endpoint API: `GET /api/archive/jobs` (paginasi + keyword), `GET /api/archive/jobs/:id`.

## Checklist Implementasi Berikutnya (Final)
- Tambahkan skema `archive_jobs` dan indeksnya ke `schema.sql` sesuai desain di atas.
- Buat endpoint `GET /api/archive/jobs` dan `GET /api/archive/jobs/:id` dengan filter keyword multi-kolom.
- Integrasi AdminJS minimal: mount `/admin` dengan resources aktif; arsip read-only (opsional).
- Pertahankan pola soft delete di semua operasi; jangan mengubah perilaku delete existing di frontend.
- Pastikan `PRAGMA foreign_keys=ON` tetap aktif; siapkan migrasi skema cascade jika dibutuhkan untuk hard delete aman.
- Verifikasi impor forklift (±300) dan teknisi (±12) memakai upsert + restore saat konflik UNIQUE.
- Dokumentasikan variabel env penting (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `NODE_ENV`).
 - Tambahan gating: gunakan `ADMIN_ENABLED=1` untuk mengaktifkan panel Admin; default tidak di-set (nonaktif).

## Panel Admin (AdminJS)
- Gunakan `AdminJS` untuk panel admin minimalis di backend.
- Mount di path `/admin` dan DI-BELAKANG middleware sesi yang ada (pakai `requireRole('admin','supervisor')`). Tidak perlu login terpisah.
- Adapter: `@adminjs/mikroorm` + `@adminjs/express` (MikroORM dengan SQLite).
- Resources awal: `users`, `forklifts`, `items`, `records`.
- Soft delete: aksi Delete harus set `deleted_at` (bukan hard delete). Tambahkan aksi “Restore”.
- Tampilkan hanya baris `deleted_at IS NULL` secara default (list), namun tetap bisa cari/lihat jika diperlukan.
- Hormati constraints UNIQUE (mis. `forklifts.eq_no`, `forklifts.serial`, `items.code`). Panel harus menampilkan error DB apa adanya, dengan pesan yang jelas.

### Setup Teknis AdminJS
- AdminJS v7 berbasis ESM: letakkan setup di `src/admin/index.js` (ESM) dan gunakan import dinamis dari `server.js` agar tidak memaksa migrasi seluruh file ke ESM.
- Saat development, panggil `admin.watch()` agar bundler frontend AdminJS aktif.
 - Gating via ENV: mount hanya jika `ADMIN_ENABLED=1`; default nonaktif untuk menghindari risiko.

### Catatan Instalasi (AdminJS + MikroORM)
- Prasyarat: Node.js LTS (v18+), koneksi internet, hak tulis folder proyek.
- Paket wajib: `adminjs`, `@adminjs/express`. Paket adapter: `@adminjs/mikroorm`, `@mikro-orm/core`, `@mikro-orm/sqlite`.
- Perintah instalasi standar:
  - `npm install adminjs @adminjs/express`
  - `npm install @adminjs/mikroorm @mikro-orm/core @mikro-orm/sqlite`
- Jika terjadi konflik peer deps atau error install:
  - Coba `npm install ... --legacy-peer-deps`
  - Set registry resmi: `npm config set registry https://registry.npmjs.org/`
  - Bersihkan cache: `npm cache clean --force`
  - Hapus `node_modules` dan `package-lock.json`, lalu `npm install` ulang.
  - Untuk environment korporat: jika ada SSL interception, pertimbangkan `npm config set strict-ssl false` (sementara) atau gunakan proxy yang sah.
- Menjalankan server dengan panel admin:
  - `ADMIN_ENABLED=1 PORT=3001 node server.js`
  - Login sebagai `admin`/`supervisor` terlebih dahulu; `/admin` akan memberi `{"error":"Unauthorized"}` jika belum login.
- Struktur modular (anti god file):
  - `src/admin/index.mjs`: setup AdminJS dan mount router.
  - `src/admin/orm.mjs`: inisialisasi MikroORM (SQLite) ke `db.sqlite` yang sama.
  - `src/admin/entities/*.mjs`: definisi entity minimal per tabel.

### Klarifikasi Khusus Admin Panel
- Hard delete PERMANEN hanya boleh dilakukan oleh `admin` lewat AdminJS, dengan cascade aman untuk dependensi (jobs/records) menggunakan transaksi. Frontend tidak melakukan hard delete.
- Aksi Delete di AdminJS defaultnya adalah soft delete (set `deleted_at`); sertakan aksi “Restore”. Sediakan aksi khusus “HardDelete” untuk admin.
- Admin TIDAK mengubah nilai `id` (primary key). Mengubah `id` berisiko memutus relasi karena FK `ON UPDATE CASCADE` tidak diaktifkan. Jika sangat diperlukan di masa depan, buat action khusus dengan transaksi yang memperbarui semua referensi terlebih dulu.
- Pencarian keyword mirip: di list, siapkan satu textbox keyword yang melakukan filter LIKE ke beberapa kolom relevan (Forklifts: `brand`, `type`, `eq_no`, `serial`, `location`; Items: `code`, `nama`, `description`; Records: gabungkan `report_no`, `pekerjaan`, `teknisi`, `location`).

## Refactor Bertahap (sebelum/bersamaan AdminJS)
- Tahap 1: Ekstrak util umum dari `server.js`:
  - `src/db.js`: inisialisasi SQLite dan ekspor helpers `run/get/all`.
  - `src/middleware/auth.js`: `requireLogin` dan `requireRole`.
- Tahap 2: `src/admin/index.js`: setup AdminJS, konfigurasi resources, dan mount router ke `/admin`.
- Tahap 3 (opsional, bertahap): pecah routes per domain (`src/routes/forklifts.js`, `items.js`, `records.js`, `jobs.js`, `users.js`). Tidak perlu sekaligus.
- Target: `server.js` menjadi entrypoint tipis (bootstrap, session, static, mount routes + admin).

## Database & Soft Delete
- Soft delete standar: kolom `deleted_at` di semua tabel utama.
- Hard delete dihindari. Gunakan soft delete agar data historis aman.
- Restore standar: set `deleted_at = NULL`, update `updated_at`.
- Constraints:
  - Forklifts: `eq_no` UNIQUE, `serial` UNIQUE.
  - Items: `code` UNIQUE NOT NULL.
  - Records/Jobs: relasi `forklift_id` wajib valid.

### Relasi & Cascade
- Aktifkan `PRAGMA foreign_keys = ON` di koneksi SQLite.
- Tabel aktif (mis. `records` yang merujuk `forklifts/items`): gunakan `FOREIGN KEY ... ON DELETE CASCADE` agar hard delete di Admin aman dan konsisten.
- Tabel arsip (yang merujuk `forklifts`): gunakan `FOREIGN KEY ... ON DELETE SET NULL` supaya data arsip tidak ikut terhapus.

## Import/Export (Excel)
- Records: kolom wajib `Tanggal`, `Forklift` (“Brand Type (EQ_NO)”), dan `Pekerjaan`. Upsert pakai `(report_no, forklift_id)` jika `report_no` ada.
- Forklifts: minimal salah satu `EQ No` atau `Serial` harus terisi. Saat import:
  - Cari existing termasuk yang soft-deleted (tanpa filter `deleted_at`).
  - Jika ketemu, lakukan UPDATE + restore (`deleted_at=NULL`) untuk hindari konflik UNIQUE.
- Items: kunci `Code` wajib dan unik. Saat POST import, jika konflik UNIQUE, fallback ke UPDATE + restore.
- Error feedback: popup impor menampilkan jumlah error dan detail error pertama (“Row N: pesan”), agar troubleshooting cepat.

### Catatan Penting
- Import Excel dilakukan oleh pengguna frontend (bukan fitur bawaan AdminJS). Panel Admin tidak wajib memiliki fitur import; jika suatu saat ditambahkan, harus meniru logic dan validasi yang sama.

## Arsip Legacy (MySQL)
- Arsip ditampilkan di page terpisah “Arsip” dan TIDAK bercampur dengan `records` baru.
- Skema arsip disederhanakan dalam satu tabel `archive_jobs` (pilihan awal):
  - Kolom inti: `id` (PK), `job_no`, `job_source` (`workshop`|`maintenance`), `job_date`, `description`, `notes`, `status`, `created_at`, `updated_at`.
  - Referensi forklift: `forklift_id` (FK ke `forklifts.id`, `ON DELETE SET NULL`) dan redundansi `forklift_eq_no`, `forklift_serial` untuk fallback jika tidak match.
  - Indeks untuk pencarian: `job_no`, `job_date`, `job_source`, `forklift_eq_no`, `forklift_serial`.
- Endpoint API arsip:
  - `GET /api/archive/jobs` (paginasi + filter keyword multi-kolom)
  - `GET /api/archive/jobs/:id`
- Panel Admin: `archive_jobs` bersifat read-only (aksi edit/hapus dimatikan). Fokus pengelolaan via AdminJS tetap pada data aktif.

## Migrasi Data (Legacy → Baru)
- Forklifts (±300):
  - Normalisasi `eq_no`/`serial` (trim, uppercase, hilangkan spasi berlebih) untuk mengurangi duplikasi.
  - Impor dengan upsert: cari existing (termasuk yang soft-deleted), lakukan UPDATE + restore (`deleted_at=NULL`) saat konflik UNIQUE.
- Users (±12 teknisi):
  - Buat akun dengan `role='technician'` dan aktif.
  - Jika hash password lama tidak kompatibel, set password sementara random dan wajib ganti di login pertama (flag atau mekanisme reset).
  - Pastikan `username`/`email` unik dan konsisten.
- Arsip Jobs (MySQL → SQLite):
  - Ekspor dari MySQL (CSV/JSON) untuk `workshop_jobs` dan `maintenance_jobs`.
  - ETL ke `archive_jobs`: isi `job_source`, map `job_no/job_date/status/description`, link `forklift_id` via lookup `eq_no/serial` setelah normalisasi; jika tidak ketemu, isi `forklift_eq_no/serial` agar tetap tampil di UI.
- Validasi pasca impor: cek duplikasi forklift, sampling arsip 10–20 baris untuk verifikasi tampilan dan pencarian.

## Keamanan
- Sesi: `express-session` + `connect-sqlite3`, cookie `httpOnly`, `sameSite:lax`, `secure` aktif di production.
- Akses: `requireRole` untuk rute sensitif; panel admin hanya `admin`/`supervisor`.
- Hindari membuka panel admin tanpa proteksi (jangan mount di `/admin` tanpa middleware role).

## Kinerja
- `compression()` aktif.
- SQLite: WAL mode diaktifkan via `PRAGMA journal_mode = WAL` dan indeks dibuat sesuai `schema.sql`.
 - Tambah indeks untuk kolom pencarian kata kunci pada arsip dan tabel aktif agar respons tetap cepat.

## Gaya Kode & Praktik
- Hindari “god file”: pecah bertahap, tidak perlu refactor besar sekaligus.
- Perubahan minimal, fokus pada fungsi yang diminta; jangan memperbaiki hal lain kecuali relevan.
- Konsisten dengan gaya existing; hindari komentar berlebihan dan header lisensi baru.
- Gunakan nama variabel jelas; hindari satu huruf.

## Operasional
- Port: gunakan `PORT` dari environment; default `3000`. Untuk lokal pengujian paralel bisa `3001`.
- Start: `node server.js` (pastikan DB `db.sqlite` tersedia).
- Health: cek `/health` atau `/healthz` saat debugging.
 - Backup/restore: karena SQLite berbasis file, backup cukup salin `db.sqlite` (pastikan tidak ada proses write aktif).

## Backlog Bertahap (disarankan)
- Tambah AdminJS dengan soft delete aware actions dan proteksi role.
- Ekstrak `db.js` dan `auth.js` dari `server.js`.
- Pecah routes per domain saat stabil.
- Tambah filter default “exclude soft-deleted” di AdminJS list.
- Tambah action “Restore” di AdminJS untuk semua resources dengan `deleted_at`.
 - Tambah tabel `archive_jobs` dan indeks pencarian; buat endpoint `/api/archive/jobs` + UI page “Arsip”.
 - Terapkan `ON DELETE CASCADE` untuk tabel aktif dan `ON DELETE SET NULL` untuk referensi arsip.
 - Jalankan migrasi forklift (±300) dan users (±12) ke DB baru dengan upsert yang aman terhadap UNIQUE.

## Status Progress
 - Completed:
   - Audit `schema.sql` dan struktur constraints
   - Audit `server.js` untuk routes/middleware/operasi DB
   - Update `project_rules.md` dengan ringkasan final dan checklist
   - Tambah `archive_jobs` di `schema.sql` beserta indeks pencarian
   - Tambah endpoint `GET /api/archive/jobs` dan `GET /api/archive/jobs/:id`
   - Perbaikan endpoint arsip: dukung filter `status` dan `forklift_eq_no`, kompatibilitas `source/job_source`, respon `{ rows, total }`
   - Tambah halaman `public/archive.html` dengan filter lengkap, paginasi, dan detail view klik baris
  - Next PM arsip: kolom `next_pm` ditambahkan di skema dan dibaca langsung dari `archive_jobs`
  - ETL tooling: skrip `scripts/archive_etl_csv.js` + npm script `etl:archive`
  - AdminJS scaffold: import dinamis dengan gating `ADMIN_ENABLED=1`, mount `/admin` di belakang `requireRole('admin','supervisor')`
  - Arsip UX: dropdown filter `forklift_id` terintegrasi (API: `forklift_id`, `forklift_eq_no`), tombol "Export CSV" di halaman Arsip
 - In Progress:
   - Stabilkan UX Arsip dan validasi hasil ETL (visual check)
 - Next:
  - Jalankan ETL impor dengan file CSV MySQL → `archive_jobs` (normalisasi `eq_no/serial`)
  - Tambah resources AdminJS minimal (read-only) untuk `users`, `forklifts`, `items`, `records`
  - Tambah aksi AdminJS: Delete (soft), Restore, HardDelete (admin-only) dengan transaksi
   - Evaluasi dan terapkan cascade (`ON DELETE CASCADE`) untuk tabel aktif bila perlu hard delete aman
   - Opsional: ekstrak `src/db.js` dan `src/middleware/auth.js`; pecah routes per domain