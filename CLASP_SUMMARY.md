# 📦 Clasp Setup - Summary

Setup clasp sudah selesai! Berikut ringkasannya.

---

## ✅ Yang Sudah Dibuat

### 1. Konfigurasi Clasp
- ✅ `.clasp.json` - Config dengan Script ID Anda
- ✅ `package.json` - NPM scripts untuk kemudahan
- ✅ `.gitignore` - Ignore files yang tidak perlu

### 2. Folder Structure
```
Aplikasi absen KKG/
├── .clasp.json              # Clasp config
├── package.json             # NPM scripts
├── .gitignore              # Git ignore
│
├── src/                     # Source code (untuk clasp)
│   ├── Code.gs             # Backend utama
│   ├── Utils.gs            # ⭐ BARU! Utility functions
│   ├── appsscript.json     # Apps Script config
│   ├── Login.html
│   ├── Dashboard.html
│   ├── Scanner.html
│   ├── DaftarHadir.html
│   ├── ListGuru.html
│   ├── Laporan.html
│   └── Stylesheet.html
│
└── docs/                    # Dokumentasi
    ├── README.md
    ├── SETUP_GUIDE.md
    ├── CLASP_GUIDE.md       # ⭐ Panduan clasp lengkap
    ├── QUICK_START.md       # ⭐ Quick start clasp
    └── ... (dokumentasi lainnya)
```

### 3. File Utils.gs (BARU!)
File baru dengan 8+ fungsi utility untuk manage spreadsheet:

#### Tambah Data
- `addRowToActiveSheet(data)` - Tambah row ke sheet aktif
- `addRowToSheet(sheetName, data)` - Tambah row ke sheet tertentu
- `addMultipleRows(sheetName, dataArray)` - Tambah banyak row sekaligus

#### Buat Sheet
- `createNewSheet(sheetName, headers)` - Buat sheet baru
- `createSheetWithStructure(sheetName, headers, sampleData)` - Buat sheet dengan struktur lengkap (formatted!)

#### Manage Data
- `getAllDataFromSheet(sheetName)` - Get semua data dari sheet
- `clearSheetData(sheetName, keepHeader)` - Clear data (bisa keep header)
- `deleteSheet(sheetName)` - Hapus sheet

#### Test Functions
- `testAddRow()` - Test tambah row
- `testCreateSheet()` - Test buat sheet
- `testAddMultipleRows()` - Test tambah multiple rows
- `testGetAllData()` - Test get data
- `testClearData()` - Test clear data
- `testDeleteSheet()` - Test delete sheet

---

## 🚀 Cara Pakai (3 Langkah)

### Langkah 1: Install Clasp (Sekali Saja)
```bash
npm install -g @google/clasp
```

### Langkah 2: Login
```bash
clasp login
```

### Langkah 3: Push Kode
```bash
cd "e:\Kerjaan Abi\Aplikasi absen KKG"
clasp push
```

**SELESAI!** ✅ Kode sudah di Apps Script.

---

## 🧪 Test Fungsi Utility

### 1. Buka Apps Script Editor
```bash
clasp open
```

### 2. Pilih Function Test
Di dropdown function, pilih salah satu:
- `testAddRow` - Test tambah row
- `testCreateSheet` - Test buat sheet baru
- `testAddMultipleRows` - Test tambah banyak row

### 3. Run Function
Klik tombol Run ▶️

### 4. Lihat Hasil
- Cek spreadsheet Anda
- Atau lihat Logs (View → Logs)

---

## 💡 Contoh Penggunaan

### Contoh 1: Tambah Data Guru
```javascript
function tambahGuru() {
  const data = [
    'GURU-999',                    // ID
    '199999999999999999',          // NIP
    'TEST GURU',                   // NAMA
    'S.Pd.',                       // GELAR
    'SDN TEST',                    // SEKOLAH
    'KOTA JAMBI',                  // KOTA
    'RAW BARCODE TEST',            // RAW_BARCODE
    new Date()                     // TGL_DAFTAR
  ];
  
  const result = addRowToSheet('GURU', data);
  
  if (result.success) {
    Logger.log('✅ Guru berhasil ditambahkan!');
    Logger.log('   Row number: ' + result.rowNumber);
  } else {
    Logger.log('❌ Gagal: ' + result.message);
  }
}
```

### Contoh 2: Import Banyak Guru Sekaligus
```javascript
function importBulkGuru() {
  const guruData = [
    ['GURU-010', '198501012010011001', 'Ahmad Fauzi', 'S.Pd.', 'SDN 01', 'KOTA JAMBI', 'RAW1', new Date()],
    ['GURU-011', '198601012011012002', 'Siti Aminah', 'M.Pd.', 'SDN 02', 'KOTA JAMBI', 'RAW2', new Date()],
    ['GURU-012', '198701012012013003', 'Budi Santoso', 'S.Pd.', 'SDN 03', 'KOTA JAMBI', 'RAW3', new Date()]
  ];
  
  const result = addMultipleRows('GURU', guruData);
  
  if (result.success) {
    Logger.log('✅ Berhasil import ' + result.rowsAdded + ' guru');
  } else {
    Logger.log('❌ Gagal: ' + result.message);
  }
}
```

### Contoh 3: Setup Database Lengkap
```javascript
function setupDatabase() {
  // 1. Buat sheet GURU
  const guruHeaders = ['ID', 'NIP', 'NAMA', 'GELAR', 'SEKOLAH', 'KOTA', 'RAW_BARCODE', 'TGL_DAFTAR'];
  createSheetWithStructure('GURU', guruHeaders, []);
  
  // 2. Buat sheet EVENT_KKG
  const eventHeaders = ['ID', 'NAMA_EVENT', 'TANGGAL', 'LOKASI', 'KETERANGAN', 'STATUS'];
  createSheetWithStructure('EVENT_KKG', eventHeaders, []);
  
  // 3. Buat sheet ABSENSI
  const absensiHeaders = ['ID', 'EVENT_ID', 'GURU_ID', 'NIP', 'NAMA', 'SEKOLAH', 'TANGGAL', 'JAM_HADIR', 'STATUS'];
  createSheetWithStructure('ABSENSI', absensiHeaders, []);
  
  // 4. Buat sheet USERS dengan data admin
  const usersHeaders = ['NAMA', 'EMAIL', 'PASSWORD', 'STATUS', 'ROLE'];
  const adminData = [['Admin KKG', 'admin@kkg.com', 'admin123', 'AKTIF', 'ADMIN']];
  createSheetWithStructure('USERS', usersHeaders, adminData);
  
  // 5. Buat sheet LOG
  const logHeaders = ['WAKTU', 'AKSI', 'NIP', 'KETERANGAN'];
  createSheetWithStructure('LOG', logHeaders, []);
  
  Logger.log('✅ Database setup complete! 5 sheets created.');
}
```

---

## 📝 NPM Scripts (Opsional)

Jika mau pakai npm scripts, install dulu:

```bash
npm install
```

Lalu bisa pakai:

```bash
npm run push      # Push kode
npm run pull      # Pull kode
npm run open      # Buka di browser
npm run watch     # Auto-push saat ada perubahan
npm run login     # Login
npm run logout    # Logout
```

---

## 📚 Dokumentasi Lengkap

### Quick Start
📄 [QUICK_START.md](QUICK_START.md) - Panduan cepat 5 menit

### Panduan Lengkap
📄 [CLASP_GUIDE.md](CLASP_GUIDE.md) - Dokumentasi lengkap clasp + semua fungsi utility

### Dokumentasi Lainnya
- 📄 [README.md](README.md) - Overview aplikasi
- 📄 [SETUP_GUIDE.md](SETUP_GUIDE.md) - Setup dari nol
- 📄 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Struktur project

---

## 🎯 Next Steps

### 1. Push Kode (Wajib)
```bash
clasp push
```

### 2. Test Fungsi Utility
```bash
clasp open
```
Jalankan `testCreateSheet()` atau `testAddRow()`

### 3. Baca Dokumentasi
Baca [CLASP_GUIDE.md](CLASP_GUIDE.md) untuk detail lengkap semua fungsi.

### 4. Mulai Coding!
Edit file di `src/`, lalu `clasp push` lagi.

---

## ⚡ Quick Commands

```bash
# Push kode
clasp push

# Open di browser
clasp open

# Watch mode (auto-push)
clasp push --watch

# Pull dari Apps Script
clasp pull
```

---

## 🎊 Selesai!

Setup clasp sudah lengkap! Sekarang Anda bisa:

✅ Push kode dengan `clasp push`  
✅ Edit lokal, push ke cloud  
✅ Tambah row ke spreadsheet via code  
✅ Buat sheet baru dengan struktur lengkap  
✅ Import data bulk dengan mudah  

**Script ID Anda**: `1HD9jZe_MdNp_7_19ockLKUPH3me54vIdM4XBp0yVCu2VPswCZlPfJCjHitu`

---

## 📞 Butuh Bantuan?

- 📖 Baca [QUICK_START.md](QUICK_START.md) untuk panduan cepat
- 📖 Baca [CLASP_GUIDE.md](CLASP_GUIDE.md) untuk dokumentasi lengkap
- 🔍 Cek troubleshooting di [CLASP_GUIDE.md](CLASP_GUIDE.md)

---

**Happy Coding!** 🚀
