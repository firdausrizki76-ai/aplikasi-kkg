# 📚 Dokumentasi Aplikasi Absensi KKG

Selamat datang! Ini adalah index lengkap semua dokumentasi aplikasi.

---

## 🚀 Quick Start

**Baru pertama kali?** Ikuti urutan ini:

1. 📖 Baca [README.md](README.md) - Overview aplikasi
2. 🛠️ Ikuti [SETUP_GUIDE.md](SETUP_GUIDE.md) - Deploy aplikasi
3. ✅ Gunakan [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Pastikan semua benar
4. 🧪 Coba [SAMPLE_DATA.md](SAMPLE_DATA.md) - Test dengan data sample

**Sudah deploy?** Langsung ke [Cara Menggunakan](#-cara-menggunakan)

---

## 📋 Daftar Dokumentasi

### 🎯 Untuk Admin/Operator

| File | Deskripsi | Kapan Digunakan |
|------|-----------|-----------------|
| [README.md](README.md) | Dokumentasi utama, overview lengkap | Pertama kali baca |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Panduan setup step-by-step | Saat deploy pertama kali |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Checklist deployment & testing | Saat deploy & testing |
| [SAMPLE_DATA.md](SAMPLE_DATA.md) | Contoh data untuk testing | Saat testing aplikasi |

### 🔧 Untuk Developer

| File | Deskripsi | Kapan Digunakan |
|------|-----------|-----------------|
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Struktur project lengkap | Memahami arsitektur |
| [plan.md](plan.md) | Blueprint aplikasi original | Referensi design |
| [DESIGN.md](DESIGN.md) | Design system & style guide | Referensi UI/UX |

### 📁 File Aplikasi

| File | Deskripsi | Type |
|------|-----------|------|
| [Code.gs](Code.gs) | Backend logic utama | JavaScript |
| [Login.html](Login.html) | Halaman login | HTML |
| [Dashboard.html](Dashboard.html) | Halaman dashboard | HTML |
| [Scanner.html](Scanner.html) | Halaman scan barcode | HTML |
| [DaftarHadir.html](DaftarHadir.html) | Halaman daftar hadir | HTML |
| [ListGuru.html](ListGuru.html) | Halaman data guru | HTML |
| [Laporan.html](Laporan.html) | Halaman laporan | HTML |
| [Stylesheet.html](Stylesheet.html) | CSS global | HTML/CSS |

---

## 📖 Panduan Berdasarkan Peran

### 👨‍💼 Saya Admin - Mau Deploy Aplikasi

**Langkah-langkah**:
1. ✅ Baca [README.md](README.md) bagian "Cara Deploy"
2. ✅ Ikuti [SETUP_GUIDE.md](SETUP_GUIDE.md) step-by-step
3. ✅ Cek [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - pastikan semua ✅
4. ✅ Test dengan [SAMPLE_DATA.md](SAMPLE_DATA.md)
5. ✅ Bagikan URL ke operator

**Estimasi waktu**: 15-20 menit

---

### 👨‍🏫 Saya Operator - Mau Pakai Aplikasi

**Langkah-langkah**:
1. ✅ Baca [README.md](README.md) bagian "Cara Menggunakan"
2. ✅ Login dengan kredensial dari admin
3. ✅ Buat event KKG di Dashboard
4. ✅ Mulai scan barcode di menu Scanner
5. ✅ Lihat hasil di menu Daftar Hadir

**Estimasi waktu**: 5 menit untuk belajar

---

### 👨‍💻 Saya Developer - Mau Modifikasi Aplikasi

**Langkah-langkah**:
1. ✅ Baca [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - pahami arsitektur
2. ✅ Baca [plan.md](plan.md) - pahami blueprint
3. ✅ Baca [DESIGN.md](DESIGN.md) - pahami design system
4. ✅ Edit file yang diperlukan
5. ✅ Deploy ulang (lihat [README.md](README.md) bagian "Update Aplikasi")

**Estimasi waktu**: Tergantung kompleksitas modifikasi

---

## 🎯 Panduan Berdasarkan Kebutuhan

### 🆕 Pertama Kali Deploy

**Dokumen yang perlu dibaca**:
1. [README.md](README.md) - Overview
2. [SETUP_GUIDE.md](SETUP_GUIDE.md) - Step-by-step
3. [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Checklist

**Estimasi waktu**: 20 menit

---

### 🧪 Mau Testing Aplikasi

**Dokumen yang perlu dibaca**:
1. [SAMPLE_DATA.md](SAMPLE_DATA.md) - Data untuk testing
2. [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Test scenarios

**Estimasi waktu**: 15 menit

---

### 🔧 Mau Update/Modifikasi

**Dokumen yang perlu dibaca**:
1. [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Struktur project
2. [plan.md](plan.md) - Blueprint
3. [README.md](README.md) bagian "Update Aplikasi"

**Estimasi waktu**: Tergantung modifikasi

---

### ❓ Ada Masalah/Error

**Dokumen yang perlu dibaca**:
1. [README.md](README.md) bagian "Troubleshooting"
2. [SETUP_GUIDE.md](SETUP_GUIDE.md) bagian "Troubleshooting"
3. [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Cek semua checklist

**Estimasi waktu**: 5-10 menit

---

## 📊 Ringkasan Fitur Aplikasi

### ✨ Fitur Utama

| Fitur | Halaman | Deskripsi |
|-------|---------|-----------|
| 🔐 Login | Login.html | Autentikasi user |
| 📊 Dashboard | Dashboard.html | Overview & statistik |
| 📷 Scan Barcode | Scanner.html | Scan kartu guru |
| 📋 Daftar Hadir | DaftarHadir.html | List kehadiran |
| 👥 Data Guru | ListGuru.html | Database guru |
| 📈 Laporan | Laporan.html | Rekap bulanan |

### 🎨 Teknologi

- **Backend**: Google Apps Script (JavaScript)
- **Frontend**: HTML5, Tailwind CSS, JavaScript
- **Database**: Google Sheets
- **Hosting**: Google Apps Script Web App (Gratis)
- **Scanner**: html5-qrcode library

---

## 🗂️ Struktur Database

### 📊 5 Sheet di Google Sheets

| Sheet | Kolom | Fungsi |
|-------|-------|--------|
| GURU | 8 kolom | Data guru terdaftar |
| EVENT_KKG | 6 kolom | Data event KKG |
| ABSENSI | 9 kolom | Data kehadiran |
| USERS | 5 kolom | Data user login |
| LOG | 4 kolom | Log aktivitas |

Detail lengkap: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) bagian "Database Structure"

---

## 🔄 Alur Kerja Aplikasi

### 1️⃣ Setup (Sekali)
```
Admin → Buat Spreadsheet → Buat Apps Script → Deploy → Bagikan URL
```

### 2️⃣ Persiapan Event (Setiap Event)
```
Operator → Login → Buat Event → Siap Scan
```

### 3️⃣ Absensi (Saat Event)
```
Guru → Tempel Kartu → Operator Scan → Otomatis Tercatat
```

### 4️⃣ Monitoring (Kapan Saja)
```
Admin → Lihat Dashboard/Daftar Hadir/Laporan → Export/Print
```

---

## 📱 Format Barcode

Aplikasi mendukung format:
```
NAMA LENGKAP, GELAR NIP.NOMOR_NIP NAMA_SEKOLAH KOTA/KABUPATEN
```

**Contoh**:
```
DODY MUTIA EKA PUTRA, S.Pd.I NIP.198202022024211006 SDN 116/IV KOTA JAMBI
```

Detail parsing: [plan.md](plan.md) bagian "Logika Parsing Barcode"

---

## 💰 Biaya

**100% GRATIS!**
- ✅ Google Apps Script: Gratis
- ✅ Google Sheets: Gratis (15 GB)
- ✅ Hosting: Gratis (URL dari Google)
- ✅ Domain: Gratis (script.google.com)
- ✅ SSL: Gratis (HTTPS otomatis)

**Total**: Rp 0 / bulan

---

## ⚠️ Keterbatasan

| Keterbatasan | Solusi |
|--------------|--------|
| Kamera tidak jalan di iframe | Buka URL langsung |
| Response ~1-2 detik | Normal untuk Apps Script |
| Quota 6 jam/hari | Cukup untuk ribuan scan |
| Max 30 concurrent users | Cukup untuk KKG |

Detail: [README.md](README.md) bagian "Keterbatasan & Solusi"

---

## 🆘 Troubleshooting Cepat

### ❌ Login Gagal
**Solusi**: Cek sheet USERS, pastikan STATUS = "AKTIF"  
**Detail**: [README.md](README.md) bagian "Troubleshooting"

### ❌ Kamera Tidak Muncul
**Solusi**: Izinkan akses kamera di browser  
**Detail**: [SETUP_GUIDE.md](SETUP_GUIDE.md) bagian "Troubleshooting"

### ❌ Data Tidak Tersimpan
**Solusi**: Cek SPREADSHEET_ID di Code.gs  
**Detail**: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) bagian "Data Validation"

### ❌ Error "Script not found"
**Solusi**: Deploy ulang dengan "Who has access: Anyone"  
**Detail**: [SETUP_GUIDE.md](SETUP_GUIDE.md) bagian "Troubleshooting"

---

## 📞 Support

### 📧 Kontak
- **Admin KKG**: Hubungi admin untuk bantuan
- **Developer**: Lihat dokumentasi lengkap

### 📚 Resources
- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [html5-qrcode Docs](https://github.com/mebjas/html5-qrcode)

---

## 🎓 Learning Path

### Pemula (Admin/Operator)
1. Baca [README.md](README.md) - 10 menit
2. Ikuti [SETUP_GUIDE.md](SETUP_GUIDE.md) - 20 menit
3. Test dengan [SAMPLE_DATA.md](SAMPLE_DATA.md) - 10 menit
4. **Total**: ~40 menit

### Intermediate (Developer)
1. Baca [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - 15 menit
2. Baca [plan.md](plan.md) - 15 menit
3. Baca [DESIGN.md](DESIGN.md) - 10 menit
4. Explore code files - 30 menit
5. **Total**: ~70 menit

### Advanced (Customization)
1. Pahami semua dokumentasi - 2 jam
2. Modifikasi sesuai kebutuhan - Tergantung
3. Deploy & test - 30 menit
4. **Total**: ~3+ jam

---

## 🎉 Quick Links

### 📖 Dokumentasi
- [README.md](README.md) - Dokumentasi utama
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Panduan setup
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Struktur project
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Checklist
- [SAMPLE_DATA.md](SAMPLE_DATA.md) - Data testing
- [plan.md](plan.md) - Blueprint
- [DESIGN.md](DESIGN.md) - Design system

### 💻 Code Files
- [Code.gs](Code.gs) - Backend
- [Login.html](Login.html) - Login page
- [Dashboard.html](Dashboard.html) - Dashboard
- [Scanner.html](Scanner.html) - Scanner
- [DaftarHadir.html](DaftarHadir.html) - Attendance list
- [ListGuru.html](ListGuru.html) - Teacher list
- [Laporan.html](Laporan.html) - Reports
- [Stylesheet.html](Stylesheet.html) - Styles

---

## 📊 Statistik Project

- **Total Files**: 18 files
- **Total Documentation**: 7 files (~50 KB)
- **Total Code**: 8 files (~50 KB)
- **Total Size**: ~100 KB
- **Lines of Code**: ~2,500 lines
- **Development Time**: ~8 jam
- **Setup Time**: ~20 menit
- **Learning Time**: ~40 menit (pemula)

---

## 🚀 Next Steps

### Setelah Baca Index Ini

**Jika Anda Admin**:
→ Lanjut ke [SETUP_GUIDE.md](SETUP_GUIDE.md)

**Jika Anda Operator**:
→ Lanjut ke [README.md](README.md) bagian "Cara Menggunakan"

**Jika Anda Developer**:
→ Lanjut ke [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

**Jika Ada Masalah**:
→ Lanjut ke [README.md](README.md) bagian "Troubleshooting"

---

## ✅ Checklist Baca Dokumentasi

Tandai yang sudah dibaca:

### Wajib (Semua User)
- [ ] INDEX.md (file ini)
- [ ] README.md

### Admin (Deploy)
- [ ] SETUP_GUIDE.md
- [ ] DEPLOYMENT_CHECKLIST.md
- [ ] SAMPLE_DATA.md

### Developer (Modifikasi)
- [ ] PROJECT_STRUCTURE.md
- [ ] plan.md
- [ ] DESIGN.md
- [ ] Semua file code

---

## 🎊 Selamat!

Anda sudah membaca index dokumentasi. Silakan lanjut ke dokumentasi yang sesuai dengan kebutuhan Anda.

**Happy Coding! 🚀**

---

**Index v1.0**  
**Last Updated**: 2025  
**Total Docs**: 7 files  
**Total Pages**: ~50 halaman  
**Estimated Read Time**: 2-3 jam (semua)
