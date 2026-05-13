# ⚡ Quick Start - Clasp Push

Panduan cepat untuk push kode ke Google Apps Script.

---

## 🚀 Langkah Cepat (5 Menit)

### 1️⃣ Install Clasp (Sekali Saja)
```bash
npm install -g @google/clasp
```

### 2️⃣ Login ke Google
```bash
clasp login
```
Browser akan terbuka → Login → Allow access

### 3️⃣ Push Kode
```bash
cd "e:\Kerjaan Abi\Aplikasi absen KKG"
clasp push
```

### 4️⃣ Buka di Browser
```bash
clasp open
```

**SELESAI!** ✅

---

## 📝 Atau Pakai NPM Scripts

Jika sudah install dependencies:

```bash
# Install dependencies (sekali saja)
npm install

# Push kode
npm run push

# Open di browser
npm run open

# Watch mode (auto-push saat ada perubahan)
npm run watch
```

---

## 🧪 Test Fungsi Utility

Setelah push, test fungsi di Apps Script Editor:

### Test 1: Tambah Row
1. Buka Apps Script Editor (`clasp open`)
2. Pilih function: `testAddRow`
3. Klik Run ▶️
4. Cek spreadsheet → ada row baru

### Test 2: Buat Sheet Baru
1. Pilih function: `testCreateSheet`
2. Klik Run ▶️
3. Cek spreadsheet → ada sheet baru "TEST_SHEET"

### Test 3: Tambah Multiple Rows
1. Pilih function: `testAddMultipleRows`
2. Klik Run ▶️
3. Cek sheet "TEST_SHEET" → ada 3 row baru

---

## 📦 Fungsi yang Tersedia

### Tambah Data
- `addRowToActiveSheet(data)` - Tambah row ke sheet aktif
- `addRowToSheet(sheetName, data)` - Tambah row ke sheet tertentu
- `addMultipleRows(sheetName, dataArray)` - Tambah banyak row sekaligus

### Buat Sheet
- `createNewSheet(sheetName, headers)` - Buat sheet baru
- `createSheetWithStructure(sheetName, headers, sampleData)` - Buat sheet dengan struktur lengkap

### Manage Data
- `getAllDataFromSheet(sheetName)` - Get semua data
- `clearSheetData(sheetName, keepHeader)` - Clear data
- `deleteSheet(sheetName)` - Hapus sheet

---

## 💡 Contoh Praktis

### Import Data Guru
```javascript
function importGuru() {
  const data = [
    ['GURU-010', '198501012010011001', 'Ahmad', 'S.Pd.', 'SDN 01', 'KOTA JAMBI', 'RAW', new Date()],
    ['GURU-011', '198601012011012002', 'Siti', 'M.Pd.', 'SDN 02', 'KOTA JAMBI', 'RAW', new Date()]
  ];
  
  const result = addMultipleRows('GURU', data);
  Logger.log(result);
}
```

### Setup Database Baru
```javascript
function setupDB() {
  // Buat semua sheet sekaligus
  const sheets = [
    { name: 'GURU', headers: ['ID', 'NIP', 'NAMA', 'GELAR', 'SEKOLAH', 'KOTA', 'RAW_BARCODE', 'TGL_DAFTAR'] },
    { name: 'EVENT_KKG', headers: ['ID', 'NAMA_EVENT', 'TANGGAL', 'LOKASI', 'KETERANGAN', 'STATUS'] },
    { name: 'ABSENSI', headers: ['ID', 'EVENT_ID', 'GURU_ID', 'NIP', 'NAMA', 'SEKOLAH', 'TANGGAL', 'JAM_HADIR', 'STATUS'] },
    { name: 'USERS', headers: ['NAMA', 'EMAIL', 'PASSWORD', 'STATUS', 'ROLE'] },
    { name: 'LOG', headers: ['WAKTU', 'AKSI', 'NIP', 'KETERANGAN'] }
  ];
  
  sheets.forEach(sheet => {
    createSheetWithStructure(sheet.name, sheet.headers, []);
  });
  
  Logger.log('✅ Database setup complete!');
}
```

---

## 🔄 Workflow Harian

### Edit → Push → Test

1. **Edit file** di VS Code
2. **Push** dengan `clasp push` atau `npm run push`
3. **Test** di Apps Script Editor
4. **Repeat** 🔁

### Auto-Push Mode

Untuk development yang lebih cepat:
```bash
npm run watch
```
Setiap kali save file, otomatis push ke Apps Script!

---

## ⚠️ Troubleshooting Cepat

### ❌ "clasp: command not found"
```bash
npm install -g @google/clasp
```

### ❌ "Script not found"
Cek Script ID di `.clasp.json` sudah benar.

### ❌ "Permission denied"
```bash
clasp logout
clasp login
```

### ❌ Push gagal
```bash
clasp push --force
```

---

## 📞 Commands Penting

```bash
clasp push          # Push kode
clasp pull          # Pull kode
clasp open          # Buka di browser
clasp push --watch  # Auto-push
clasp login         # Login
clasp logout        # Logout
```

---

## 🎯 Next Steps

Setelah push berhasil:

1. ✅ Test fungsi utility di Apps Script Editor
2. ✅ Buat sheet baru dengan `testCreateSheet()`
3. ✅ Import data dengan `testAddMultipleRows()`
4. ✅ Lihat [CLASP_GUIDE.md](CLASP_GUIDE.md) untuk detail lengkap

---

**Happy Coding!** 🚀

**Butuh bantuan?** Lihat [CLASP_GUIDE.md](CLASP_GUIDE.md) untuk dokumentasi lengkap.
