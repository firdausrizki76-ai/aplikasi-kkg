# 🚀 Panduan Setup Lengkap - Aplikasi Absensi KKG

Panduan step-by-step untuk deploy aplikasi dari nol sampai siap pakai.

---

## 📋 Checklist Persiapan

Sebelum mulai, pastikan Anda punya:
- [ ] Akun Google (Gmail)
- [ ] Browser Chrome/Firefox/Edge
- [ ] Koneksi internet stabil
- [ ] 15-20 menit waktu setup

---

## 🗂️ LANGKAH 1: Buat Google Sheets Database

### 1.1 Buat Spreadsheet Baru

1. Buka https://sheets.google.com
2. Klik tombol **+ Blank** (spreadsheet kosong)
3. Klik "Untitled spreadsheet" di kiri atas
4. Ganti nama menjadi: **Database Absensi KKG**
5. Tekan Enter

### 1.2 Buat Sheet GURU

1. Klik tab "Sheet1" di bawah
2. Klik kanan → **Rename** → ketik: `GURU`
3. Di baris pertama (header), isi kolom-kolom ini:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| ID | NIP | NAMA | GELAR | SEKOLAH | KOTA | RAW_BARCODE | TGL_DAFTAR |

**Tips**: Copy paste baris ini ke cell A1:
```
ID	NIP	NAMA	GELAR	SEKOLAH	KOTA	RAW_BARCODE	TGL_DAFTAR
```

### 1.3 Buat Sheet EVENT_KKG

1. Klik tombol **+** di kiri bawah (Add sheet)
2. Rename menjadi: `EVENT_KKG`
3. Isi header:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| ID | NAMA_EVENT | TANGGAL | LOKASI | KETERANGAN | STATUS |

Copy paste ke A1:
```
ID	NAMA_EVENT	TANGGAL	LOKASI	KETERANGAN	STATUS
```

### 1.4 Buat Sheet ABSENSI

1. Klik **+** → Rename: `ABSENSI`
2. Isi header:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| ID | EVENT_ID | GURU_ID | NIP | NAMA | SEKOLAH | TANGGAL | JAM_HADIR | STATUS |

Copy paste ke A1:
```
ID	EVENT_ID	GURU_ID	NIP	NAMA	SEKOLAH	TANGGAL	JAM_HADIR	STATUS
```

### 1.5 Buat Sheet USERS

1. Klik **+** → Rename: `USERS`
2. Isi header:

| A | B | C | D | E |
|---|---|---|---|---|
| NAMA | EMAIL | PASSWORD | STATUS | ROLE |

Copy paste ke A1:
```
NAMA	EMAIL	PASSWORD	STATUS	ROLE
```

3. **PENTING**: Isi baris ke-2 dengan data admin:

| A | B | C | D | E |
|---|---|---|---|---|
| Admin KKG | admin@kkg.com | admin123 | AKTIF | ADMIN |

Copy paste ke A2:
```
Admin KKG	admin@kkg.com	admin123	AKTIF	ADMIN
```

### 1.6 Buat Sheet LOG

1. Klik **+** → Rename: `LOG`
2. Isi header:

| A | B | C | D |
|---|---|---|---|
| WAKTU | AKSI | NIP | KETERANGAN |

Copy paste ke A1:
```
WAKTU	AKSI	NIP	KETERANGAN
```

### 1.7 Copy Spreadsheet ID

1. Lihat URL di address bar browser
2. URL formatnya: `https://docs.google.com/spreadsheets/d/XXXXX/edit`
3. Copy bagian `XXXXX` (Spreadsheet ID)
4. Simpan di notepad, akan dipakai nanti

**Contoh**:
```
URL: https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit
ID:  1a2b3c4d5e6f7g8h9i0j
```

✅ **Checklist**: 
- [ ] 5 sheet sudah dibuat (GURU, EVENT_KKG, ABSENSI, USERS, LOG)
- [ ] Header sudah diisi semua
- [ ] Data admin sudah diisi di sheet USERS
- [ ] Spreadsheet ID sudah dicopy

---

## 💻 LANGKAH 2: Buat Apps Script Project

### 2.1 Buka Apps Script

1. Buka tab baru di browser
2. Ketik: https://script.google.com
3. Klik **New Project** (tombol biru di kiri atas)

### 2.2 Rename Project

1. Klik "Untitled project" di kiri atas
2. Ganti nama: **Absensi KKG**
3. Klik OK

### 2.3 Upload File Code.gs

1. Hapus semua kode yang ada di editor
2. Buka file `Code.gs` dari folder project ini
3. Copy SEMUA isinya (Ctrl+A, Ctrl+C)
4. Paste ke Apps Script editor (Ctrl+V)
5. **PENTING**: Cari baris ke-7:
   ```javascript
   const SPREADSHEET_ID = 'GANTI_DENGAN_SPREADSHEET_ID_ANDA';
   ```
6. Ganti dengan Spreadsheet ID yang tadi dicopy:
   ```javascript
   const SPREADSHEET_ID = '1a2b3c4d5e6f7g8h9i0j';
   ```
7. Klik **Save** (ikon disket) atau Ctrl+S

### 2.4 Upload File HTML

Sekarang kita akan upload 7 file HTML. Untuk setiap file:

#### File 1: Login.html
1. Klik tombol **+** di sebelah "Files"
2. Pilih **HTML**
3. Ketik nama: `Login`
4. Klik OK
5. Hapus semua isi yang ada
6. Buka file `Login.html` dari folder project
7. Copy semua isinya → Paste ke Apps Script
8. Klik Save

#### File 2: Dashboard.html
1. Klik **+** → **HTML** → nama: `Dashboard`
2. Copy isi file `Dashboard.html` → Paste
3. Save

#### File 3: Scanner.html
1. Klik **+** → **HTML** → nama: `Scanner`
2. Copy isi file `Scanner.html` → Paste
3. Save

#### File 4: DaftarHadir.html
1. Klik **+** → **HTML** → nama: `DaftarHadir`
2. Copy isi file `DaftarHadir.html` → Paste
3. Save

#### File 5: ListGuru.html
1. Klik **+** → **HTML** → nama: `ListGuru`
2. Copy isi file `ListGuru.html` → Paste
3. Save

#### File 6: Laporan.html
1. Klik **+** → **HTML** → nama: `Laporan`
2. Copy isi file `Laporan.html` → Paste
3. Save

#### File 7: Stylesheet.html
1. Klik **+** → **HTML** → nama: `Stylesheet`
2. Copy isi file `Stylesheet.html` → Paste
3. Save

✅ **Checklist**:
- [ ] Project sudah diberi nama "Absensi KKG"
- [ ] File Code.gs sudah diupload dan SPREADSHEET_ID sudah diganti
- [ ] 7 file HTML sudah diupload semua
- [ ] Semua file sudah di-save

---

## 🚀 LANGKAH 3: Deploy Web App

### 3.1 Mulai Deployment

1. Klik tombol **Deploy** di kanan atas
2. Pilih **New deployment**

### 3.2 Konfigurasi Deployment

1. Klik ikon **⚙️ (gear)** di sebelah "Select type"
2. Pilih **Web app**
3. Isi form:
   - **Description**: `v1.0 - Initial Release`
   - **Execute as**: `Me (email@gmail.com)`
   - **Who has access**: `Anyone`
4. Klik **Deploy**

### 3.3 Authorize Access

Akan muncul popup "Authorization required":

1. Klik **Authorize access**
2. Pilih akun Google Anda
3. Akan muncul warning "Google hasn't verified this app"
4. Klik **Advanced**
5. Klik **Go to Absensi KKG (unsafe)**
6. Klik **Allow**

### 3.4 Copy Web App URL

1. Setelah authorized, akan muncul popup "Deployment successfully created"
2. Copy **Web App URL** yang muncul
3. Simpan URL ini - ini adalah link aplikasi Anda!

**Format URL**:
```
https://script.google.com/macros/s/XXXXX/exec
```

✅ **Checklist**:
- [ ] Deployment berhasil
- [ ] Authorization sudah di-allow
- [ ] Web App URL sudah dicopy

---

## 🎉 LANGKAH 4: Test Aplikasi

### 4.1 Buka Aplikasi

1. Paste Web App URL di browser baru
2. Atau klik link yang muncul di popup deployment
3. Tunggu beberapa detik loading

### 4.2 Login Pertama Kali

1. Akan muncul halaman login
2. Masukkan:
   - **Email**: `admin@kkg.com`
   - **Password**: `admin123`
3. Klik **Masuk**
4. Jika berhasil, akan masuk ke Dashboard

### 4.3 Buat Event Test

1. Di Dashboard, klik tombol **Buat Event**
2. Isi form:
   - **Nama Event**: `Test Event KKG`
   - **Tanggal**: Pilih hari ini
   - **Lokasi**: `SDN 001 Test`
   - **Keterangan**: `Event untuk testing`
3. Klik **Simpan**
4. Event akan muncul di Dashboard

### 4.4 Test Scanner (Opsional)

Jika punya barcode untuk test:
1. Klik menu **QR Scanner**
2. Klik **Mulai Scan**
3. Izinkan akses kamera
4. Scan barcode kartu guru
5. Lihat hasilnya

Atau test manual input:
1. Di halaman Scanner, scroll ke bawah
2. Paste barcode manual di input box
3. Klik **Proses**

**Contoh barcode untuk test**:
```
DODY MUTIA EKA PUTRA, S.Pd.I NIP.198202022024211006 SDN 116/IV KOTA JAMBI
```

✅ **Checklist**:
- [ ] Aplikasi bisa dibuka
- [ ] Login berhasil
- [ ] Dashboard tampil dengan benar
- [ ] Bisa buat event baru

---

## 📱 LANGKAH 5: Bagikan ke Operator

### 5.1 Siapkan Informasi

Kirim ke operator:

**URL Aplikasi**:
```
https://script.google.com/macros/s/XXXXX/exec
```

**Login Default**:
- Email: `admin@kkg.com`
- Password: `admin123`

**Instruksi Singkat**:
1. Buka URL di browser (Chrome/Firefox/Edge)
2. Login dengan email dan password
3. Buat event KKG di Dashboard
4. Buka menu Scanner untuk mulai scan barcode
5. Lihat hasil di menu Daftar Hadir

### 5.2 Tambah User Baru (Opsional)

Jika ingin tambah operator lain:

1. Buka Google Sheets (Database Absensi KKG)
2. Buka sheet **USERS**
3. Tambah baris baru:
   ```
   Nama Operator | email@operator.com | password123 | AKTIF | OPERATOR
   ```
4. Operator bisa login dengan email dan password tersebut

---

## 🔄 Update Aplikasi (Jika Ada Perubahan)

Jika nanti ada update kode:

1. Buka Apps Script project
2. Edit file yang perlu diubah
3. Save perubahan
4. Klik **Deploy** → **Manage deployments**
5. Klik ikon **✏️ (Edit)** di deployment yang aktif
6. Pilih **New version**
7. Klik **Deploy**

URL tetap sama, tidak perlu dibagikan ulang!

---

## ❓ Troubleshooting

### Problem: "Script function not found: doGet"
**Solusi**: 
- Pastikan file Code.gs sudah diupload
- Pastikan ada function `doGet(e)` di Code.gs
- Coba deploy ulang

### Problem: "Authorization required" terus muncul
**Solusi**:
- Hapus deployment lama
- Buat deployment baru
- Authorize ulang

### Problem: Login gagal
**Solusi**:
- Cek sheet USERS sudah ada
- Cek email dan password di sheet USERS
- Pastikan kolom STATUS = "AKTIF"
- Cek SPREADSHEET_ID di Code.gs sudah benar

### Problem: Kamera tidak muncul
**Solusi**:
- Pastikan browser punya izin akses kamera
- Buka URL langsung (jangan di-embed)
- Coba browser lain (Chrome recommended)

### Problem: Data tidak tersimpan
**Solusi**:
- Cek SPREADSHEET_ID di Code.gs
- Pastikan nama sheet sudah benar (case-sensitive)
- Cek header kolom sudah sesuai

---

## 📞 Butuh Bantuan?

Jika masih ada masalah:
1. Cek ulang setiap langkah di panduan ini
2. Pastikan semua checklist sudah ✅
3. Screenshot error yang muncul
4. Hubungi admin KKG

---

## 🎊 Selamat!

Aplikasi Absensi KKG Anda sudah siap digunakan! 🎉

**Next Steps**:
- Bagikan URL ke operator
- Buat event KKG pertama
- Mulai scan barcode guru
- Monitor kehadiran real-time

---

**Setup Guide v1.0**  
**Last Updated**: 2025  
**Estimated Setup Time**: 15-20 menit
