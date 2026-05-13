# 🚀 Panduan Clasp - Deploy dengan Command Line

Panduan menggunakan clasp untuk push kode ke Google Apps Script.

---

## 📋 Prerequisites

### 1. Install Node.js
Download dan install dari: https://nodejs.org/

### 2. Install Clasp
```bash
npm install -g @google/clasp
```

### 3. Login ke Google Account
```bash
clasp login
```

Browser akan terbuka, login dengan akun Google Anda dan izinkan akses.

---

## 🔧 Setup Project

### 1. Cek Konfigurasi
File `.clasp.json` sudah dibuat dengan Script ID:
```json
{
  "scriptId": "1HD9jZe_MdNp_7_19ockLKUPH3me54vIdM4XBp0yVCu2VPswCZlPfJCjHitu",
  "rootDir": "./src"
}
```

### 2. Struktur Folder
```
Aplikasi absen KKG/
├── .clasp.json          # Konfigurasi clasp
├── src/                 # Source code
│   ├── Code.gs          # Backend utama
│   ├── Utils.gs         # Utility functions (BARU!)
│   ├── Login.html
│   ├── Dashboard.html
│   ├── Scanner.html
│   ├── DaftarHadir.html
│   ├── ListGuru.html
│   ├── Laporan.html
│   ├── Stylesheet.html
│   └── appsscript.json  # Apps Script config
```

---

## 🚀 Deploy ke Apps Script

### Push Semua File
```bash
cd "e:\Kerjaan Abi\Aplikasi absen KKG"
clasp push
```

### Push dengan Watch Mode (auto-push saat ada perubahan)
```bash
clasp push --watch
```

### Pull dari Apps Script (download perubahan)
```bash
clasp pull
```

### Open di Browser
```bash
clasp open
```

---

## 📦 Fungsi Utility Baru (Utils.gs)

### 1. Tambah Row ke Sheet Aktif
```javascript
function testAddRow() {
  const result = addRowToActiveSheet(['Value1', 'Value2', 'Value3']);
  Logger.log(result);
}
```

**Cara pakai**:
1. Buka spreadsheet
2. Pilih sheet yang ingin ditambahkan row
3. Jalankan function `testAddRow()` di Apps Script Editor

---

### 2. Tambah Row ke Sheet Tertentu
```javascript
function testAddToGuru() {
  const data = [
    'GURU-999',
    '199999999999999999',
    'TEST GURU',
    'S.Pd.',
    'SDN TEST',
    'KOTA TEST',
    'RAW BARCODE TEST',
    new Date()
  ];
  
  const result = addRowToSheet('GURU', data);
  Logger.log(result);
}
```

---

### 3. Tambah Multiple Rows Sekaligus
```javascript
function testBulkInsert() {
  const data = [
    ['GURU-100', '111111111111111111', 'Guru 1', 'S.Pd.', 'SDN 01', 'KOTA JAMBI', 'RAW1', new Date()],
    ['GURU-101', '222222222222222222', 'Guru 2', 'M.Pd.', 'SDN 02', 'KOTA JAMBI', 'RAW2', new Date()],
    ['GURU-102', '333333333333333333', 'Guru 3', 'S.Pd.', 'SDN 03', 'KOTA JAMBI', 'RAW3', new Date()]
  ];
  
  const result = addMultipleRows('GURU', data);
  Logger.log(result);
}
```

---

### 4. Buat Sheet Baru
```javascript
function testCreateNewSheet() {
  const headers = ['ID', 'Nama', 'Email', 'Status'];
  const result = createNewSheet('SHEET_BARU', headers);
  Logger.log(result);
}
```

---

### 5. Buat Sheet dengan Struktur Lengkap
```javascript
function testCreateCompleteSheet() {
  const headers = ['ID', 'Nama', 'NIP', 'Sekolah', 'Tanggal'];
  
  const sampleData = [
    ['001', 'Guru A', '111111111111111111', 'SDN 01', new Date()],
    ['002', 'Guru B', '222222222222222222', 'SDN 02', new Date()],
    ['003', 'Guru C', '333333333333333333', 'SDN 03', new Date()]
  ];
  
  const result = createSheetWithStructure('DATA_GURU_BARU', headers, sampleData);
  Logger.log(result);
}
```

**Fitur**:
- ✅ Header dengan format bold + background biru
- ✅ Auto-resize columns
- ✅ Zebra striping (baris ganjil-genap beda warna)
- ✅ Freeze header row
- ✅ Sample data otomatis terisi

---

### 6. Get All Data dari Sheet
```javascript
function testGetData() {
  const result = getAllDataFromSheet('GURU');
  Logger.log('Total rows: ' + result.totalRows);
  Logger.log('Total cols: ' + result.totalCols);
  Logger.log(result.data);
}
```

---

### 7. Clear Data Sheet
```javascript
function testClearSheet() {
  // Keep header
  const result = clearSheetData('TEST_SHEET', true);
  Logger.log(result);
}
```

---

### 8. Delete Sheet
```javascript
function testDeleteSheet() {
  const result = deleteSheet('TEST_SHEET');
  Logger.log(result);
}
```

---

## 🧪 Cara Test Fungsi

### Di Apps Script Editor:

1. **Push kode dulu**:
   ```bash
   clasp push
   ```

2. **Buka Apps Script Editor**:
   ```bash
   clasp open
   ```

3. **Pilih function yang mau ditest**:
   - Klik dropdown function di toolbar
   - Pilih salah satu function test (contoh: `testAddRow`)
   - Klik tombol Run (▶️)

4. **Lihat hasil di Logs**:
   - Klik View → Logs
   - Atau tekan Ctrl+Enter

---

## 📝 Contoh Use Case

### Use Case 1: Import Data Guru dari Array
```javascript
function importGuruData() {
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

---

### Use Case 2: Setup Database Baru
```javascript
function setupNewDatabase() {
  // 1. Buat sheet GURU
  const guruHeaders = ['ID', 'NIP', 'NAMA', 'GELAR', 'SEKOLAH', 'KOTA', 'RAW_BARCODE', 'TGL_DAFTAR'];
  createSheetWithStructure('GURU', guruHeaders, []);
  
  // 2. Buat sheet EVENT_KKG
  const eventHeaders = ['ID', 'NAMA_EVENT', 'TANGGAL', 'LOKASI', 'KETERANGAN', 'STATUS'];
  createSheetWithStructure('EVENT_KKG', eventHeaders, []);
  
  // 3. Buat sheet ABSENSI
  const absensiHeaders = ['ID', 'EVENT_ID', 'GURU_ID', 'NIP', 'NAMA', 'SEKOLAH', 'TANGGAL', 'JAM_HADIR', 'STATUS'];
  createSheetWithStructure('ABSENSI', absensiHeaders, []);
  
  // 4. Buat sheet USERS
  const usersHeaders = ['NAMA', 'EMAIL', 'PASSWORD', 'STATUS', 'ROLE'];
  const adminData = [['Admin KKG', 'admin@kkg.com', 'admin123', 'AKTIF', 'ADMIN']];
  createSheetWithStructure('USERS', usersHeaders, adminData);
  
  // 5. Buat sheet LOG
  const logHeaders = ['WAKTU', 'AKSI', 'NIP', 'KETERANGAN'];
  createSheetWithStructure('LOG', logHeaders, []);
  
  Logger.log('✅ Database setup complete!');
}
```

---

### Use Case 3: Backup Data
```javascript
function backupGuruData() {
  // 1. Get all data dari GURU
  const result = getAllDataFromSheet('GURU');
  
  if (!result.success) {
    Logger.log('❌ Gagal get data: ' + result.message);
    return;
  }
  
  // 2. Buat sheet backup dengan timestamp
  const timestamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd_HHmmss');
  const backupSheetName = 'BACKUP_GURU_' + timestamp;
  
  const headers = result.data[0]; // Row pertama adalah header
  const dataRows = result.data.slice(1); // Sisanya adalah data
  
  // 3. Create backup sheet
  const backupResult = createSheetWithStructure(backupSheetName, headers, dataRows);
  
  if (backupResult.success) {
    Logger.log('✅ Backup berhasil: ' + backupSheetName);
    Logger.log('   Total rows: ' + dataRows.length);
  } else {
    Logger.log('❌ Backup gagal: ' + backupResult.message);
  }
}
```

---

## 🔄 Workflow Development

### 1. Edit Lokal
Edit file di folder `src/` menggunakan VS Code atau editor favorit.

### 2. Push ke Apps Script
```bash
clasp push
```

### 3. Test di Apps Script Editor
```bash
clasp open
```
Jalankan function test.

### 4. Deploy Web App (jika perlu)
Di Apps Script Editor:
- Deploy → Manage deployments
- Edit → New version
- Deploy

---

## 📊 Response Format

Semua fungsi utility mengembalikan object dengan format:

### Success Response
```javascript
{
  success: true,
  message: "Operasi berhasil",
  // ... data tambahan
}
```

### Error Response
```javascript
{
  success: false,
  message: "Error message"
}
```

---

## ⚠️ Tips & Best Practices

### 1. Selalu Cek Response
```javascript
const result = addRowToSheet('GURU', data);
if (result.success) {
  Logger.log('✅ ' + result.message);
} else {
  Logger.log('❌ ' + result.message);
}
```

### 2. Gunakan Try-Catch
```javascript
try {
  const result = addMultipleRows('GURU', data);
  // Process result
} catch (e) {
  Logger.log('Error: ' + e.toString());
}
```

### 3. Validate Data Sebelum Insert
```javascript
function addGuruSafe(data) {
  // Validate
  if (!data || data.length !== 8) {
    return { success: false, message: 'Data tidak lengkap' };
  }
  
  // Insert
  return addRowToSheet('GURU', data);
}
```

### 4. Backup Sebelum Clear/Delete
```javascript
function clearSheetSafe(sheetName) {
  // Backup dulu
  backupSheet(sheetName);
  
  // Baru clear
  return clearSheetData(sheetName, true);
}
```

---

## 🆘 Troubleshooting

### Error: "Script not found"
**Solusi**: Cek Script ID di `.clasp.json` sudah benar.

### Error: "Permission denied"
**Solusi**: Login ulang dengan `clasp login`.

### Error: "File not found"
**Solusi**: Pastikan ada folder `src/` dan file-file di dalamnya.

### Push tidak berhasil
**Solusi**: 
```bash
clasp logout
clasp login
clasp push --force
```

---

## 📞 Quick Commands

```bash
# Login
clasp login

# Push code
clasp push

# Push dengan force (overwrite)
clasp push --force

# Pull code
clasp pull

# Open di browser
clasp open

# Create new project
clasp create --title "Project Name" --type standalone

# List versions
clasp versions

# Deploy
clasp deploy
```

---

## 🎉 Selesai!

Sekarang Anda bisa:
- ✅ Push kode dengan `clasp push`
- ✅ Tambah row ke sheet dengan fungsi utility
- ✅ Buat sheet baru dengan struktur lengkap
- ✅ Manage data spreadsheet via code

**Happy Coding!** 🚀
