# Rencana Migrasi SQLite → MySQL

Tujuan: memindahkan data dan koneksi aplikasi dari SQLite ke MySQL tanpa downtime yang berarti dan tetap mempertahankan perilaku soft-delete/cascade yang ada.

## Ringkasan Langkah

1. Siapkan MySQL dan akses
   - Buat database: `psforklift`.
   - Buat user dengan hak akses penuh ke database tersebut.
   - Update `.env`: `MYSQL_DATABASE_URL="mysql://user:pass@localhost:3306/psforklift"`.

2. Sinkronisasi skema di MySQL
   - Gunakan Prisma schema MySQL: `prisma/mysql.schema.prisma`.
   - Jalankan: `npx prisma db push --schema prisma/mysql.schema.prisma` untuk membuat tabel.

3. Migrasi data dari SQLite
   - Hentikan server agar data tidak berubah selama ekspor.
   - Ekspor data SQLite ke CSV/SQL (contoh CSV):
     - `users.csv`, `forklifts.csv`, `items.csv`, `jobs.csv`, `records.csv`.
   - Import ke MySQL dengan `LOAD DATA INFILE` atau tool GUI (MySQL Workbench):
     - Perhatikan kolom tanggal bertipe `String` (mis. `tanggal`, `next_pm`) agar format tetap sama.
     - Pastikan `deleted_at` bernilai NULL untuk baris aktif.

4. Verifikasi integritas dan relasi
   - Hitung jumlah baris per tabel dan cocokkan dengan sumber SQLite.
   - Sampling beberapa data untuk memastikan foreign key `forklift_id` konsisten.
   - Uji skenario soft-delete: forklift → cascade ke jobs dan records; job → cascade ke records.

5. Switch koneksi aplikasi (cutover)
   - Tambahkan flag runtime (opsional): `USE_MYSQL="1"` untuk memilih client MySQL.
   - Update kode server untuk memilih Prisma Client sesuai flag environment.
   - Jalankan smoke test endpoint publik dan AdminJS `/admin`.

6. Rollback plan
   - Jika terjadi isu, set `USE_MYSQL` ke kosong dan kembali ke SQLite.
   - Dokumentasikan perbedaan data jika ada.

## Catatan Teknis

- Audit kolom (`created_at`, `updated_at`, `deleted_at`) bertipe `DateTime` di MySQL, tetap kompatibel dengan soft-delete.
- Kolom tanggal non-ISO (`tanggal`, `next_pm`) disimpan sebagai `String` agar tidak memaksa format baru.
- Index telah dibuat setara untuk mendukung pencarian AdminJS.

## Checklist Validasi

- [ ] Semua tabel MySQL memiliki jumlah baris yang sama dengan SQLite.
- [ ] Tidak ada foreign key orphan (`jobs.forklift_id`, `records.forklift_id`).
- [ ] Aksi soft-delete/restore berfungsi sama di MySQL.
- [ ] Filter default "aktif saja" (non-deleted) bekerja di AdminJS.
- [ ] Kinerja query setara atau lebih baik.