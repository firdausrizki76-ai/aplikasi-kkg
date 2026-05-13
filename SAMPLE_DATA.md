# 📊 Sample Data untuk Testing

File ini berisi contoh data yang bisa digunakan untuk testing aplikasi.

---

## 🧪 Contoh Barcode untuk Testing

Copy paste barcode ini untuk test scan manual:

### Guru 1
```
DODY MUTIA EKA PUTRA, S.Pd.I NIP.198202022024211006 SDN 116/IV KOTA JAMBI
```

### Guru 2
```
SITI AMINAH, M.Pd. NIP.198501232014022003 SD MUHAMMADIYAH 5 KOTA JAMBI
```

### Guru 3
```
BUDI SETIAWAN, S.Pd. NIP.197809302008011012 SDN 03 GONDANGDIA KOTA JAMBI
```

### Guru 4
```
DEWI LESTARI, S.Pd.SD NIP.199011152019032014 SDN 05 KEBON SIRIH KOTA JAMBI
```

### Guru 5
```
AHMAD FAUZI, S.Pd. NIP.198703152010011008 SDN 08 MENTENG KOTA JAMBI
```

---

## 👥 Sample Data USERS (untuk Sheet USERS)

Copy paste ke sheet USERS (mulai dari baris 2):

```
Admin KKG	admin@kkg.com	admin123	AKTIF	ADMIN
Operator 1	operator1@kkg.com	op123	AKTIF	OPERATOR
Operator 2	operator2@kkg.com	op123	AKTIF	OPERATOR
```

**Format**: NAMA [TAB] EMAIL [TAB] PASSWORD [TAB] STATUS [TAB] ROLE

---

## 📅 Sample Data EVENT_KKG (untuk Sheet EVENT_KKG)

Copy paste ke sheet EVENT_KKG (mulai dari baris 2):

```
EVT-001	Pertemuan KKG Januari 2025	2025-01-15	SDN 001 Kota Jambi	Pertemuan rutin bulanan	SELESAI
EVT-002	Pertemuan KKG Februari 2025	2025-02-12	SDN 002 Kota Jambi	Pertemuan rutin bulanan	SELESAI
EVT-003	Pertemuan KKG Maret 2025	2025-03-19	SDN 003 Kota Jambi	Pertemuan rutin bulanan	SELESAI
EVT-004	Pertemuan KKG April 2025	2025-04-16	SDN 004 Kota Jambi	Pertemuan rutin bulanan	SELESAI
EVT-005	Pertemuan KKG Mei 2025	2025-05-13	SDN 005 Kota Jambi	Pertemuan rutin bulanan	AKTIF
```

**Format**: ID [TAB] NAMA_EVENT [TAB] TANGGAL [TAB] LOKASI [TAB] KETERANGAN [TAB] STATUS

**Note**: Ganti tanggal EVT-005 dengan tanggal hari ini agar muncul sebagai event aktif.

---

## 👨‍🏫 Sample Data GURU (untuk Sheet GURU)

Copy paste ke sheet GURU (mulai dari baris 2):

```
GURU-001	198202022024211006	DODY MUTIA EKA PUTRA	S.Pd.I	SDN 116/IV	KOTA JAMBI	DODY MUTIA EKA PUTRA, S.Pd.I NIP.198202022024211006 SDN 116/IV KOTA JAMBI	2025-01-15 08:00:00
GURU-002	198501232014022003	SITI AMINAH	M.Pd.	SD MUHAMMADIYAH 5	KOTA JAMBI	SITI AMINAH, M.Pd. NIP.198501232014022003 SD MUHAMMADIYAH 5 KOTA JAMBI	2025-01-15 08:05:00
GURU-003	197809302008011012	BUDI SETIAWAN	S.Pd.	SDN 03 GONDANGDIA	KOTA JAMBI	BUDI SETIAWAN, S.Pd. NIP.197809302008011012 SDN 03 GONDANGDIA KOTA JAMBI	2025-01-15 08:10:00
GURU-004	199011152019032014	DEWI LESTARI	S.Pd.SD	SDN 05 KEBON SIRIH	KOTA JAMBI	DEWI LESTARI, S.Pd.SD NIP.199011152019032014 SDN 05 KEBON SIRIH KOTA JAMBI	2025-01-15 08:15:00
GURU-005	198703152010011008	AHMAD FAUZI	S.Pd.	SDN 08 MENTENG	KOTA JAMBI	AHMAD FAUZI, S.Pd. NIP.198703152010011008 SDN 08 MENTENG KOTA JAMBI	2025-01-15 08:20:00
```

**Format**: ID [TAB] NIP [TAB] NAMA [TAB] GELAR [TAB] SEKOLAH [TAB] KOTA [TAB] RAW_BARCODE [TAB] TGL_DAFTAR

---

## ✅ Sample Data ABSENSI (untuk Sheet ABSENSI)

Copy paste ke sheet ABSENSI (mulai dari baris 2):

```
ABS-0001	EVT-001	GURU-001	198202022024211006	DODY MUTIA EKA PUTRA	SDN 116/IV	2025-01-15	08:15:22	HADIR
ABS-0002	EVT-001	GURU-002	198501232014022003	SITI AMINAH	SD MUHAMMADIYAH 5	2025-01-15	08:42:10	HADIR
ABS-0003	EVT-001	GURU-003	197809302008011012	BUDI SETIAWAN	SDN 03 GONDANGDIA	2025-01-15	08:05:55	HADIR
ABS-0004	EVT-001	GURU-004	199011152019032014	DEWI LESTARI	SDN 05 KEBON SIRIH	2025-01-15	08:22:45	HADIR
ABS-0005	EVT-002	GURU-001	198202022024211006	DODY MUTIA EKA PUTRA	SDN 116/IV	2025-02-12	08:10:30	HADIR
ABS-0006	EVT-002	GURU-002	198501232014022003	SITI AMINAH	SD MUHAMMADIYAH 5	2025-02-12	08:35:15	HADIR
ABS-0007	EVT-002	GURU-003	197809302008011012	BUDI SETIAWAN	SDN 03 GONDANGDIA	2025-02-12	08:08:20	HADIR
ABS-0008	EVT-003	GURU-001	198202022024211006	DODY MUTIA EKA PUTRA	SDN 116/IV	2025-03-19	08:12:40	HADIR
ABS-0009	EVT-003	GURU-002	198501232014022003	SITI AMINAH	SD MUHAMMADIYAH 5	2025-03-19	08:30:25	HADIR
ABS-0010	EVT-003	GURU-004	199011152019032014	DEWI LESTARI	SDN 05 KEBON SIRIH	2025-03-19	08:18:50	HADIR
```

**Format**: ID [TAB] EVENT_ID [TAB] GURU_ID [TAB] NIP [TAB] NAMA [TAB] SEKOLAH [TAB] TANGGAL [TAB] JAM_HADIR [TAB] STATUS

---

## 📝 Sample Data LOG (untuk Sheet LOG)

Copy paste ke sheet LOG (mulai dari baris 2):

```
2025-01-15 08:00:00	LOGIN	admin@kkg.com	Login berhasil
2025-01-15 08:05:00	BUAT_EVENT		Event baru dibuat: Pertemuan KKG Januari 2025
2025-01-15 08:15:22	SCAN	198202022024211006	Absensi berhasil - DODY MUTIA EKA PUTRA
2025-01-15 08:42:10	SCAN	198501232014022003	Absensi berhasil - SITI AMINAH
2025-01-15 08:05:55	SCAN	197809302008011012	Absensi berhasil - BUDI SETIAWAN
```

**Format**: WAKTU [TAB] AKSI [TAB] NIP [TAB] KETERANGAN

---

## 🎯 Cara Menggunakan Sample Data

### Opsi 1: Manual Copy-Paste (Recommended)

1. Buka Google Sheets (Database Absensi KKG)
2. Pilih sheet yang ingin diisi
3. Klik cell A2 (baris pertama setelah header)
4. Copy data dari file ini
5. Paste ke sheet (Ctrl+V)
6. Data akan otomatis terpisah ke kolom yang benar

### Opsi 2: Import CSV

1. Simpan data ke file .txt atau .csv
2. Di Google Sheets, klik File → Import
3. Upload file
4. Pilih "Append to current sheet"
5. Klik Import

### Opsi 3: Biarkan Kosong

Aplikasi akan otomatis mengisi data saat:
- Guru scan barcode pertama kali (auto-register ke GURU)
- Operator buat event baru (masuk ke EVENT_KKG)
- Guru absen (masuk ke ABSENSI)
- Ada aktivitas (masuk ke LOG)

---

## ⚠️ Catatan Penting

1. **Jangan ubah format header** - Aplikasi bergantung pada nama kolom yang tepat
2. **ID harus unique** - Jangan ada ID yang sama
3. **Tanggal format** - Gunakan format: YYYY-MM-DD atau YYYY-MM-DD HH:MM:SS
4. **Status USERS** - Harus "AKTIF" agar bisa login
5. **Status EVENT** - "AKTIF" untuk event hari ini, "SELESAI" untuk event lalu

---

## 🧪 Skenario Testing

### Test 1: Login
1. Isi sheet USERS dengan sample data
2. Buka aplikasi
3. Login dengan: admin@kkg.com / admin123
4. Harus berhasil masuk ke Dashboard

### Test 2: Event Aktif
1. Isi sheet EVENT_KKG dengan sample data
2. Ganti tanggal EVT-005 dengan hari ini
3. Refresh Dashboard
4. Event hari ini harus muncul

### Test 3: Scan Barcode
1. Pastikan ada event aktif hari ini
2. Buka menu Scanner
3. Paste barcode manual (contoh di atas)
4. Klik Proses
5. Harus muncul kartu hasil scan
6. Cek sheet ABSENSI - data baru harus masuk

### Test 4: Daftar Hadir
1. Isi sheet ABSENSI dengan sample data
2. Buka menu Daftar Hadir
3. Pilih event EVT-001
4. Harus tampil 4 guru yang hadir

### Test 5: Data Guru
1. Isi sheet GURU dengan sample data
2. Buka menu Data Guru
3. Harus tampil 5 guru
4. Test search dengan nama/NIP

### Test 6: Laporan
1. Isi sheet ABSENSI dengan sample data
2. Buka menu Laporan
3. Pilih bulan Januari 2025
4. Harus tampil rekap kehadiran

---

## 📊 Expected Results

Setelah isi semua sample data:

- **Total Guru**: 5 guru
- **Total Event**: 5 event (1 aktif, 4 selesai)
- **Total Absensi**: 10 record
- **Total Users**: 3 users (1 admin, 2 operator)

Dashboard akan menampilkan:
- Event aktif hari ini (jika tanggal EVT-005 = hari ini)
- Statistik kehadiran
- 5 absensi terbaru

---

**Sample Data v1.0**  
**Last Updated**: 2025  
**Purpose**: Testing & Development
