# ✅ Deployment Checklist - Aplikasi Absensi KKG

Gunakan checklist ini untuk memastikan semua langkah deployment sudah benar.

---

## 📋 PRE-DEPLOYMENT

### Google Sheets Setup
- [ ] Spreadsheet baru sudah dibuat
- [ ] Nama spreadsheet: "Database Absensi KKG"
- [ ] Sheet GURU sudah dibuat dengan 8 kolom header
- [ ] Sheet EVENT_KKG sudah dibuat dengan 6 kolom header
- [ ] Sheet ABSENSI sudah dibuat dengan 9 kolom header
- [ ] Sheet USERS sudah dibuat dengan 5 kolom header
- [ ] Sheet LOG sudah dibuat dengan 4 kolom header
- [ ] Data admin sudah diisi di sheet USERS (baris 2)
- [ ] Spreadsheet ID sudah dicopy dan disimpan

### Apps Script Setup
- [ ] Project Apps Script baru sudah dibuat
- [ ] Nama project: "Absensi KKG"
- [ ] File Code.gs sudah diupload
- [ ] SPREADSHEET_ID di Code.gs sudah diganti dengan ID yang benar
- [ ] File Login.html sudah diupload
- [ ] File Dashboard.html sudah diupload
- [ ] File Scanner.html sudah diupload
- [ ] File DaftarHadir.html sudah diupload
- [ ] File ListGuru.html sudah diupload
- [ ] File Laporan.html sudah diupload
- [ ] File Stylesheet.html sudah diupload
- [ ] Semua file sudah di-save (Ctrl+S)

---

## 🚀 DEPLOYMENT

### Deploy Configuration
- [ ] Klik Deploy → New deployment
- [ ] Type dipilih: Web app
- [ ] Description diisi: "v1.0 - Initial Release"
- [ ] Execute as: Me (email Anda)
- [ ] Who has access: Anyone
- [ ] Klik Deploy

### Authorization
- [ ] Klik Authorize access
- [ ] Akun Google dipilih
- [ ] Klik Advanced
- [ ] Klik "Go to Absensi KKG (unsafe)"
- [ ] Klik Allow
- [ ] Authorization berhasil

### Web App URL
- [ ] Web App URL sudah muncul
- [ ] URL sudah dicopy
- [ ] URL disimpan di tempat aman
- [ ] URL format: https://script.google.com/macros/s/XXXXX/exec

---

## 🧪 POST-DEPLOYMENT TESTING

### Test 1: Akses Aplikasi
- [ ] Buka Web App URL di browser
- [ ] Halaman login muncul dengan benar
- [ ] Tidak ada error di console browser (F12)
- [ ] Design tampil dengan baik (tidak broken)

### Test 2: Login System
- [ ] Input email: admin@kkg.com
- [ ] Input password: admin123
- [ ] Klik Masuk
- [ ] Login berhasil
- [ ] Redirect ke Dashboard
- [ ] Tidak ada error

### Test 3: Dashboard
- [ ] Dashboard tampil dengan benar
- [ ] Sidebar menu tampil
- [ ] Card event hari ini tampil (bisa kosong)
- [ ] Stats cards tampil (bisa 0)
- [ ] Quick actions tampil
- [ ] Tidak ada error di console

### Test 4: Buat Event
- [ ] Klik tombol "Buat Event"
- [ ] Modal form muncul
- [ ] Isi nama event: "Test Event KKG"
- [ ] Pilih tanggal: hari ini
- [ ] Isi lokasi: "SDN 001 Test"
- [ ] Klik Simpan
- [ ] Event berhasil dibuat
- [ ] Event muncul di Dashboard
- [ ] Data masuk ke sheet EVENT_KKG

### Test 5: Scanner
- [ ] Klik menu "QR Scanner"
- [ ] Halaman scanner tampil
- [ ] Event hari ini tampil di atas
- [ ] Area kamera tampil
- [ ] Tombol "Mulai Scan" aktif
- [ ] Tidak ada error

### Test 6: Manual Scan
- [ ] Scroll ke "Manual Input"
- [ ] Paste barcode test:
  ```
  DODY MUTIA EKA PUTRA, S.Pd.I NIP.198202022024211006 SDN 116/IV KOTA JAMBI
  ```
- [ ] Klik Proses
- [ ] Loading muncul
- [ ] Kartu hasil scan muncul
- [ ] Status "Guru Baru - Otomatis Terdaftar" atau "Hadir"
- [ ] Data guru masuk ke sheet GURU
- [ ] Data absensi masuk ke sheet ABSENSI
- [ ] Log masuk ke sheet LOG

### Test 7: Daftar Hadir
- [ ] Klik menu "Daftar Hadir"
- [ ] Halaman tampil dengan benar
- [ ] Dropdown event terisi
- [ ] Pilih event yang tadi dibuat
- [ ] Tabel tampil dengan data absensi
- [ ] Stats cards update
- [ ] Search berfungsi

### Test 8: Data Guru
- [ ] Klik menu "Data Guru"
- [ ] Halaman tampil dengan benar
- [ ] Total guru tampil (minimal 1 dari test scan)
- [ ] Tabel tampil dengan data guru
- [ ] Search berfungsi
- [ ] Pagination tampil (jika > 20 guru)

### Test 9: Laporan
- [ ] Klik menu "Laporan"
- [ ] Halaman tampil dengan benar
- [ ] Pilih bulan: bulan ini
- [ ] Stats cards tampil
- [ ] Tabel rekap tampil
- [ ] Data sesuai dengan absensi yang ada

### Test 10: Logout
- [ ] Klik menu "Keluar" di sidebar
- [ ] Redirect ke halaman login
- [ ] Session cleared

---

## 📱 MOBILE TESTING

### Responsive Design
- [ ] Buka aplikasi di HP
- [ ] Layout responsive (tidak broken)
- [ ] Sidebar bisa diakses
- [ ] Semua menu bisa diklik
- [ ] Form bisa diisi
- [ ] Tabel bisa di-scroll horizontal

### Camera Access
- [ ] Buka menu Scanner di HP
- [ ] Klik "Mulai Scan"
- [ ] Browser minta izin kamera
- [ ] Klik Allow
- [ ] Kamera aktif
- [ ] Bisa scan barcode
- [ ] Hasil scan tampil

---

## 🔐 SECURITY CHECK

### Access Control
- [ ] Tanpa login tidak bisa akses halaman lain
- [ ] URL ?page=dashboard redirect ke login jika belum login
- [ ] Setelah login bisa akses semua halaman
- [ ] Logout berfungsi dengan benar

### Data Privacy
- [ ] Hanya pemilik Spreadsheet yang bisa edit data
- [ ] User lain hanya bisa input via aplikasi
- [ ] Spreadsheet tidak public (private)
- [ ] Apps Script execute as "Me"

---

## 📊 DATA VALIDATION

### Sheet GURU
- [ ] Buka sheet GURU
- [ ] Ada data guru dari test scan
- [ ] Kolom ID terisi (GURU-XXX)
- [ ] Kolom NIP terisi
- [ ] Kolom NAMA terisi
- [ ] Kolom TGL_DAFTAR terisi

### Sheet EVENT_KKG
- [ ] Buka sheet EVENT_KKG
- [ ] Ada data event dari test
- [ ] Kolom ID terisi (EVT-XXX)
- [ ] Kolom STATUS = "AKTIF"
- [ ] Tanggal sesuai

### Sheet ABSENSI
- [ ] Buka sheet ABSENSI
- [ ] Ada data absensi dari test scan
- [ ] Kolom ID terisi (ABS-XXXX)
- [ ] Kolom EVENT_ID sesuai
- [ ] Kolom GURU_ID sesuai
- [ ] Kolom JAM_HADIR terisi
- [ ] Kolom STATUS = "HADIR"

### Sheet LOG
- [ ] Buka sheet LOG
- [ ] Ada log aktivitas
- [ ] Log LOGIN ada
- [ ] Log BUAT_EVENT ada
- [ ] Log SCAN ada
- [ ] Timestamp terisi

---

## 🎯 PERFORMANCE CHECK

### Loading Speed
- [ ] Halaman login load < 3 detik
- [ ] Dashboard load < 5 detik
- [ ] Scanner load < 5 detik
- [ ] Proses scan < 3 detik
- [ ] Load daftar hadir < 5 detik

### Functionality
- [ ] Tidak ada error di console
- [ ] Semua button berfungsi
- [ ] Semua link berfungsi
- [ ] Form validation berfungsi
- [ ] Modal bisa dibuka/ditutup

---

## 📝 DOCUMENTATION

### User Documentation
- [ ] README.md sudah dibaca
- [ ] SETUP_GUIDE.md sudah diikuti
- [ ] SAMPLE_DATA.md sudah dipahami
- [ ] Cara pakai aplikasi sudah dipahami

### Admin Documentation
- [ ] Cara tambah user baru sudah dipahami
- [ ] Cara update aplikasi sudah dipahami
- [ ] Cara backup data sudah dipahami
- [ ] Troubleshooting guide sudah dibaca

---

## 🚀 PRODUCTION READY

### Final Checks
- [ ] Semua test di atas sudah ✅
- [ ] Tidak ada error yang belum resolved
- [ ] Data test sudah dihapus (opsional)
- [ ] User admin password sudah diganti (recommended)
- [ ] Web App URL sudah dibagikan ke operator
- [ ] Operator sudah ditraining cara pakai

### Backup
- [ ] Spreadsheet sudah di-backup (File → Make a copy)
- [ ] Apps Script code sudah di-backup (Download as .zip)
- [ ] Web App URL sudah disimpan di tempat aman

### Monitoring
- [ ] Cek sheet LOG secara berkala
- [ ] Monitor jumlah guru terdaftar
- [ ] Monitor jumlah absensi per event
- [ ] Cek error di Apps Script (View → Executions)

---

## ✅ DEPLOYMENT COMPLETE!

Jika semua checklist di atas sudah ✅, maka:

🎉 **APLIKASI SIAP DIGUNAKAN!** 🎉

### Next Steps:
1. Bagikan Web App URL ke semua operator
2. Berikan training singkat cara pakai
3. Buat event KKG pertama
4. Mulai scan barcode guru
5. Monitor kehadiran real-time

### Support:
- Simpan file README.md untuk referensi
- Simpan file SETUP_GUIDE.md untuk training operator baru
- Gunakan SAMPLE_DATA.md untuk demo
- Hubungi admin jika ada masalah

---

## 📞 Emergency Contacts

**Jika ada masalah urgent:**

1. **Aplikasi tidak bisa diakses**
   - Cek Apps Script → View → Executions
   - Lihat error yang muncul
   - Deploy ulang jika perlu

2. **Data tidak tersimpan**
   - Cek SPREADSHEET_ID di Code.gs
   - Cek nama sheet (case-sensitive)
   - Cek permission Spreadsheet

3. **Login tidak bisa**
   - Cek sheet USERS
   - Pastikan STATUS = "AKTIF"
   - Reset password di sheet

4. **Scanner tidak jalan**
   - Cek izin kamera browser
   - Coba browser lain
   - Gunakan manual input

---

**Deployment Checklist v1.0**  
**Last Updated**: 2025  
**Status**: Production Ready ✅
