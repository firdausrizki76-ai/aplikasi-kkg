# 📱 Aplikasi Absensi KKG - Google Apps Script

Sistem absensi barcode untuk Kelompok Kerja Guru berbasis Google Apps Script. Gratis, tanpa server, tanpa hosting - semua berjalan di ekosistem Google.

## ✨ Fitur Utama

- ✅ **Scan Barcode** via kamera HP/laptop
- ✅ **Auto-register** guru baru saat scan pertama
- ✅ **Dashboard** dengan statistik real-time
- ✅ **Daftar Hadir** per event atau tanggal
- ✅ **Data Guru** lengkap dengan pencarian
- ✅ **Laporan Bulanan** dengan persentase kehadiran
- ✅ **Login System** untuk keamanan
- ✅ **Responsive Design** - mobile friendly

## 🚀 Cara Deploy

### 1. Siapkan Google Sheets

1. Buka [Google Sheets](https://sheets.google.com)
2. Buat Spreadsheet baru dengan nama "Database Absensi KKG"
3. Buat 5 sheet dengan nama dan header berikut:

#### Sheet: **GURU**
```
A: ID | B: NIP | C: NAMA | D: GELAR | E: SEKOLAH | F: KOTA | G: RAW_BARCODE | H: TGL_DAFTAR
```

#### Sheet: **EVENT_KKG**
```
A: ID | B: NAMA_EVENT | C: TANGGAL | D: LOKASI | E: KETERANGAN | F: STATUS
```

#### Sheet: **ABSENSI**
```
A: ID | B: EVENT_ID | C: GURU_ID | D: NIP | E: NAMA | F: SEKOLAH | G: TANGGAL | H: JAM_HADIR | I: STATUS
```

#### Sheet: **USERS**
```
A: NAMA | B: EMAIL | C: PASSWORD | D: STATUS | E: ROLE
```

Isi baris pertama (data dummy untuk login):
```
Admin KKG | admin@kkg.com | admin123 | AKTIF | ADMIN
```

#### Sheet: **LOG**
```
A: WAKTU | B: AKSI | C: NIP | D: KETERANGAN
```

4. Copy **Spreadsheet ID** dari URL (bagian antara `/d/` dan `/edit`)
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_INI/edit
   ```

### 2. Buat Apps Script Project

1. Buka [Google Apps Script](https://script.google.com)
2. Klik **New Project**
3. Beri nama: "Absensi KKG"

### 3. Upload File-file

Upload semua file ke Apps Script:

1. **Code.gs** - Buka file `Code.gs`, copy semua isinya
   - Ganti `SPREADSHEET_ID` dengan ID Spreadsheet Anda (baris 7)
   - Paste ke Apps Script

2. **Login.html** - Klik `+` → HTML → nama: `Login`
   - Copy isi file `Login.html` dan paste

3. **Dashboard.html** - Klik `+` → HTML → nama: `Dashboard`
   - Copy isi file `Dashboard.html` dan paste

4. **Scanner.html** - Klik `+` → HTML → nama: `Scanner`
   - Copy isi file `Scanner.html` dan paste

5. **DaftarHadir.html** - Klik `+` → HTML → nama: `DaftarHadir`
   - Copy isi file `DaftarHadir.html` dan paste

6. **ListGuru.html** - Klik `+` → HTML → nama: `ListGuru`
   - Copy isi file `ListGuru.html` dan paste

7. **Laporan.html** - Klik `+` → HTML → nama: `Laporan`
   - Copy isi file `Laporan.html` dan paste

8. **Stylesheet.html** - Klik `+` → HTML → nama: `Stylesheet`
   - Copy isi file `Stylesheet.html` dan paste

### 4. Deploy sebagai Web App

1. Klik **Deploy** → **New Deployment**
2. Klik ikon ⚙️ → Pilih **Web App**
3. Isi konfigurasi:
   - **Description**: v1.0 - Initial Release
   - **Execute as**: Me (email Anda)
   - **Who has access**: Anyone
4. Klik **Deploy**
5. Klik **Authorize Access** → Pilih akun Google Anda
6. Klik **Advanced** → **Go to Absensi KKG (unsafe)** → **Allow**
7. Copy **Web App URL** yang muncul

### 5. Selesai! 🎉

Buka URL Web App di browser atau HP. Login dengan:
- **Email**: admin@kkg.com
- **Password**: admin123

## 📖 Cara Menggunakan

### Login
1. Buka URL Web App
2. Masukkan email dan password
3. Klik **Masuk**

### Buat Event KKG
1. Buka **Dashboard**
2. Klik tombol **Buat Event**
3. Isi nama event, tanggal, lokasi
4. Klik **Simpan**

### Scan Barcode
1. Buka menu **QR Scanner**
2. Klik **Mulai Scan**
3. Izinkan akses kamera
4. Arahkan kamera ke barcode kartu guru
5. Sistem otomatis mencatat absensi

### Lihat Daftar Hadir
1. Buka menu **Daftar Hadir**
2. Pilih event atau tanggal
3. Lihat daftar guru yang hadir
4. Klik **Cetak** untuk print

### Lihat Data Guru
1. Buka menu **Data Guru**
2. Gunakan search untuk mencari guru
3. Lihat semua guru yang terdaftar

### Lihat Laporan
1. Buka menu **Laporan**
2. Pilih bulan
3. Lihat rekap kehadiran per guru
4. Klik **Cetak** atau **Buka di Sheets**

## 🔧 Update Aplikasi

Jika ada perubahan kode:

1. Edit file di Apps Script
2. Klik **Deploy** → **Manage Deployments**
3. Klik ikon ✏️ (Edit)
4. Pilih **New Version**
5. Klik **Deploy**

URL tetap sama, tidak perlu dibagikan ulang.

## 📱 Format Barcode

Aplikasi mendukung format barcode:
```
NAMA LENGKAP, GELAR NIP.NOMOR_NIP NAMA_SEKOLAH KOTA/KABUPATEN
```

Contoh:
```
DODY MUTIA EKA PUTRA, S.Pd.I NIP.198202022024211006 SDN 116/IV KOTA JAMBI
```

## 🔐 Keamanan

- Login diperlukan untuk akses semua halaman
- Data tersimpan di Google Sheets pribadi Anda
- Hanya Anda yang bisa edit data di Sheets
- Log aktivitas tercatat otomatis

## 💰 Biaya

**100% GRATIS!**
- Google Apps Script: Gratis
- Google Sheets: Gratis (15 GB storage)
- Hosting: Gratis (URL dari Google)
- Tidak ada biaya bulanan

## ⚠️ Keterbatasan

- Kamera hanya bekerja jika dibuka langsung (tidak di-embed iframe)
- Response server ~1-2 detik (normal untuk Apps Script)
- Maksimal 6 jam eksekusi per hari (cukup untuk ribuan scan)

## 🆘 Troubleshooting

### Kamera tidak muncul
- Pastikan browser memiliki izin akses kamera
- Buka URL langsung, jangan di-embed
- Gunakan HTTPS (URL dari Google sudah HTTPS)

### Error "Script tidak ditemukan"
- Pastikan deployment sudah benar
- Cek "Who has access" = Anyone
- Coba deploy ulang

### Data tidak tersimpan
- Cek SPREADSHEET_ID sudah benar
- Pastikan sheet sudah dibuat dengan nama yang tepat
- Cek header kolom sudah sesuai

### Login gagal
- Pastikan sheet USERS sudah ada
- Cek email dan password di sheet USERS
- Kolom STATUS harus "AKTIF"

## 📞 Support

Jika ada pertanyaan atau masalah, silakan hubungi admin KKG.

---

**Version**: 1.0.0  
**Last Updated**: 2025  
**Platform**: Google Apps Script  
**License**: Free to use for educational purposes
