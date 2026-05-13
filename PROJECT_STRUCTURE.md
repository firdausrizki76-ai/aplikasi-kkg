# 📁 Struktur Project - Aplikasi Absensi KKG

Dokumentasi lengkap struktur file dan folder project.

---

## 📂 File Structure

```
Aplikasi absen KKG/
│
├── 📄 Code.gs                      # Backend utama (Google Apps Script)
│
├── 🌐 HTML Files (Frontend)
│   ├── Login.html                  # Halaman login
│   ├── Dashboard.html              # Halaman dashboard/beranda
│   ├── Scanner.html                # Halaman scan barcode
│   ├── DaftarHadir.html           # Halaman daftar kehadiran
│   ├── ListGuru.html              # Halaman data guru
│   ├── Laporan.html               # Halaman laporan bulanan
│   └── Stylesheet.html            # CSS global & Tailwind config
│
├── 📚 Documentation
│   ├── README.md                   # Dokumentasi utama
│   ├── SETUP_GUIDE.md             # Panduan setup step-by-step
│   ├── DEPLOYMENT_CHECKLIST.md    # Checklist deployment
│   ├── SAMPLE_DATA.md             # Contoh data untuk testing
│   ├── PROJECT_STRUCTURE.md       # File ini
│   └── plan.md                    # Blueprint aplikasi (original)
│
└── 🎨 Design Reference
    ├── DESIGN.md                   # Design system & color palette
    ├── halaman login.zip           # Referensi design login
    ├── halaman utama.zip           # Referensi design utama
    └── screen.png                  # Screenshot design
```

---

## 📄 File Details

### Backend Files

#### **Code.gs** (1 file)
**Ukuran**: ~15 KB  
**Bahasa**: JavaScript (Google Apps Script)  
**Fungsi**: Backend logic utama aplikasi

**Isi**:
- Constants & Configuration
- Routing (doGet handler)
- Authentication functions
- Barcode parsing logic
- CRUD operations untuk Guru, Event, Absensi
- Dashboard statistics
- Reporting functions
- Logging system

**Key Functions**:
```javascript
doGet(e)                    // Routing halaman
login(email, password)      // Login system
parseBarcode(rawText)       // Parse barcode
prosesScan(rawBarcode, eventId)  // Proses scan
getEventAktif()            // Get event hari ini
buatEvent(...)             // Buat event baru
getDaftarHadir(eventId)    // Get daftar hadir
getListGuru(keyword)       // Get list guru
getLaporan(bulan)          // Get laporan bulanan
```

---

### Frontend Files

#### **Login.html** (1 file)
**Ukuran**: ~5 KB  
**Teknologi**: HTML5, Tailwind CSS, JavaScript

**Fitur**:
- Form login (email & password)
- Validation
- Loading state
- Alert messages
- Responsive design
- Auto-focus email field

**Dependencies**:
- Tailwind CSS (CDN)
- Google Fonts (Inter)
- Material Symbols Icons

---

#### **Dashboard.html** (1 file)
**Ukuran**: ~8 KB  
**Teknologi**: HTML5, Tailwind CSS, JavaScript

**Fitur**:
- Event info card (event hari ini)
- Statistics cards (hadir, total guru, persentase)
- Quick actions (link ke Scanner & Daftar Hadir)
- Recent attendance list (5 terbaru)
- Modal form buat event baru
- Sidebar navigation

**Server Functions Called**:
- `getEventAktif()`
- `getDashboardStats()`
- `buatEvent(nama, tanggal, lokasi, keterangan)`

---

#### **Scanner.html** (1 file)
**Ukuran**: ~10 KB  
**Teknologi**: HTML5, Tailwind CSS, JavaScript, html5-qrcode

**Fitur**:
- Event info display
- Camera scanner (html5-qrcode library)
- Manual barcode input
- Scan result card (slide-in animation)
- Scan log (10 terbaru)
- Loading overlay
- Debounce (3 detik cooldown)

**Dependencies**:
- html5-qrcode library (CDN)
- Tailwind CSS
- Material Symbols Icons

**Server Functions Called**:
- `getEventAktif()`
- `prosesScan(rawBarcode, eventId)`
- `getDaftarHadirByTanggal(tanggal)`

---

#### **DaftarHadir.html** (1 file)
**Ukuran**: ~8 KB  
**Teknologi**: HTML5, Tailwind CSS, JavaScript

**Fitur**:
- Filter by event atau tanggal
- Search by nama/NIP/sekolah
- Statistics cards (hadir, terlambat, izin, persentase)
- Data table dengan pagination
- Print function
- Responsive table

**Server Functions Called**:
- `getAllEvents()`
- `getDaftarHadir(eventId)`
- `getDaftarHadirByTanggal(tanggal)`

---

#### **ListGuru.html** (1 file)
**Ukuran**: ~7 KB  
**Teknologi**: HTML5, Tailwind CSS, JavaScript

**Fitur**:
- Total guru counter
- Search by nama/NIP/sekolah
- Data table dengan pagination (20 per page)
- Avatar initials
- Responsive table

**Server Functions Called**:
- `getListGuru(keyword)`

---

#### **Laporan.html** (1 file)
**Ukuran**: ~8 KB  
**Teknologi**: HTML5, Tailwind CSS, JavaScript

**Fitur**:
- Filter by bulan
- Summary statistics (total event, total guru, rata-rata kehadiran)
- Rekap table dengan progress bar
- Print function (print-friendly layout)
- Export to Google Sheets
- Report header & footer (untuk print)

**Server Functions Called**:
- `getLaporan(bulan)`

---

#### **Stylesheet.html** (1 file)
**Ukuran**: ~3 KB  
**Teknologi**: CSS, Tailwind Config

**Isi**:
- Tailwind CSS CDN
- Google Fonts (Inter)
- Material Symbols Icons
- Custom CSS (animations, scrollbar, badges, etc.)
- Tailwind configuration (colors, spacing, etc.)

**Custom Styles**:
- Animations (slideIn, fadeIn, spin)
- Custom scrollbar
- Card hover effects
- Button effects
- Status badges
- Loading overlay
- Print styles

---

## 📚 Documentation Files

### **README.md**
**Ukuran**: ~5 KB  
**Isi**:
- Overview aplikasi
- Fitur utama
- Cara deploy (ringkas)
- Cara menggunakan
- Format barcode
- Troubleshooting
- Estimasi biaya (gratis)

**Target Audience**: Semua user (admin, operator, developer)

---

### **SETUP_GUIDE.md**
**Ukuran**: ~12 KB  
**Isi**:
- Panduan setup step-by-step
- Screenshot/visual guide
- Checklist setiap langkah
- Troubleshooting per langkah
- Expected results

**Target Audience**: Admin yang deploy pertama kali

---

### **DEPLOYMENT_CHECKLIST.md**
**Ukuran**: ~8 KB  
**Isi**:
- Checklist pre-deployment
- Checklist deployment
- Checklist post-deployment testing
- Mobile testing checklist
- Security check
- Data validation
- Performance check
- Production ready checklist

**Target Audience**: Admin/Developer

---

### **SAMPLE_DATA.md**
**Ukuran**: ~6 KB  
**Isi**:
- Contoh barcode untuk testing
- Sample data untuk semua sheet
- Cara menggunakan sample data
- Skenario testing
- Expected results

**Target Audience**: Developer/Tester

---

### **plan.md**
**Ukuran**: ~10 KB  
**Isi**:
- Blueprint aplikasi original
- Arsitektur sistem
- Struktur database
- Logika parsing barcode
- Alur scan barcode
- Rencana tiap file

**Target Audience**: Developer

---

### **DESIGN.md**
**Ukuran**: ~3 KB  
**Isi**:
- Design system
- Color palette
- Typography
- Layout & spacing
- Component styles

**Target Audience**: Designer/Developer

---

## 🗄️ Database Structure (Google Sheets)

### Sheet: **GURU**
**Kolom**: 8  
**Primary Key**: NIP  
**Auto-increment**: ID (GURU-XXX)

| Kolom | Type | Description |
|-------|------|-------------|
| A: ID | String | Auto-generate (GURU-001, GURU-002, ...) |
| B: NIP | String | Unique, 18 digit |
| C: NAMA | String | Nama lengkap tanpa gelar |
| D: GELAR | String | S.Pd., M.Pd., dll (bisa kosong) |
| E: SEKOLAH | String | Nama sekolah |
| F: KOTA | String | KOTA/KABUPATEN |
| G: RAW_BARCODE | String | Full barcode string (untuk debug) |
| H: TGL_DAFTAR | DateTime | Timestamp pertama kali scan |

---

### Sheet: **EVENT_KKG**
**Kolom**: 6  
**Primary Key**: ID  
**Auto-increment**: ID (EVT-XXX)

| Kolom | Type | Description |
|-------|------|-------------|
| A: ID | String | Auto-generate (EVT-001, EVT-002, ...) |
| B: NAMA_EVENT | String | Nama event |
| C: TANGGAL | Date | Tanggal event |
| D: LOKASI | String | Lokasi event |
| E: KETERANGAN | String | Keterangan tambahan |
| F: STATUS | String | AKTIF / SELESAI |

---

### Sheet: **ABSENSI**
**Kolom**: 9  
**Primary Key**: ID  
**Foreign Keys**: EVENT_ID, GURU_ID  
**Auto-increment**: ID (ABS-XXXX)

| Kolom | Type | Description |
|-------|------|-------------|
| A: ID | String | Auto-generate (ABS-0001, ABS-0002, ...) |
| B: EVENT_ID | String | Referensi ke EVENT_KKG.ID |
| C: GURU_ID | String | Referensi ke GURU.ID |
| D: NIP | String | Copy dari GURU.NIP (denormalized) |
| E: NAMA | String | Copy dari GURU.NAMA (denormalized) |
| F: SEKOLAH | String | Copy dari GURU.SEKOLAH (denormalized) |
| G: TANGGAL | Date | Tanggal absensi |
| H: JAM_HADIR | Time | Jam scan (HH:MM:SS) |
| I: STATUS | String | HADIR / TERLAMBAT / IZIN / SAKIT |

---

### Sheet: **USERS**
**Kolom**: 5  
**Primary Key**: EMAIL  

| Kolom | Type | Description |
|-------|------|-------------|
| A: NAMA | String | Nama lengkap user |
| B: EMAIL | String | Email (unique) |
| C: PASSWORD | String | Password (plain text - untuk internal) |
| D: STATUS | String | AKTIF / NONAKTIF |
| E: ROLE | String | ADMIN / OPERATOR |

---

### Sheet: **LOG**
**Kolom**: 4  
**No Primary Key** (append only)

| Kolom | Type | Description |
|-------|------|-------------|
| A: WAKTU | DateTime | Timestamp aktivitas |
| B: AKSI | String | LOGIN / SCAN / TAMBAH_GURU / ERROR / dll |
| C: NIP | String | NIP terkait (bisa kosong) |
| D: KETERANGAN | String | Detail aktivitas |

---

## 🔄 Data Flow

### Flow 1: Scan Barcode
```
User scan barcode
    ↓
Scanner.html → prosesScan(rawBarcode, eventId)
    ↓
Code.gs → parseBarcode(rawBarcode)
    ↓
Code.gs → cariGuru(nip)
    ↓
    ├─ Tidak ada → tambahGuru() → insert ke GURU
    └─ Ada → lanjut
    ↓
Code.gs → cekSudahAbsen(nip, tanggal)
    ↓
    ├─ Sudah → return "Sudah absen"
    └─ Belum → catatAbsensi() → insert ke ABSENSI
    ↓
Code.gs → tuliLog() → insert ke LOG
    ↓
Return response ke Scanner.html
    ↓
Tampilkan kartu hasil scan
```

### Flow 2: Buat Event
```
User klik "Buat Event" di Dashboard
    ↓
Modal form muncul
    ↓
User isi form → submit
    ↓
Dashboard.html → buatEvent(nama, tanggal, lokasi, keterangan)
    ↓
Code.gs → generate ID baru (EVT-XXX)
    ↓
Code.gs → insert ke EVENT_KKG
    ↓
Code.gs → tuliLog()
    ↓
Return response
    ↓
Dashboard refresh → tampilkan event baru
```

### Flow 3: Lihat Laporan
```
User pilih bulan di Laporan.html
    ↓
Laporan.html → getLaporan(bulan)
    ↓
Code.gs → query ABSENSI by bulan
    ↓
Code.gs → query EVENT_KKG by bulan
    ↓
Code.gs → hitung kehadiran per guru
    ↓
Code.gs → hitung persentase
    ↓
Return data rekap
    ↓
Laporan.html → render table & stats
```

---

## 🔐 Security Model

### Authentication
- Login required untuk semua halaman (kecuali Login.html)
- Session based (Google Apps Script Session)
- Password stored plain text di sheet USERS (internal use only)

### Authorization
- Semua user yang login bisa akses semua fitur
- Role (ADMIN/OPERATOR) untuk future enhancement
- STATUS harus "AKTIF" untuk bisa login

### Data Access
- Apps Script execute as "Me" (pemilik script)
- Spreadsheet private (hanya pemilik yang bisa edit manual)
- User lain hanya bisa input via aplikasi
- No direct database access dari client

---

## 📊 Performance Considerations

### Optimization
- Client-side filtering (search, pagination)
- Debounce pada scan (3 detik cooldown)
- Lazy loading (load data on demand)
- Minimal server calls

### Limitations
- Google Apps Script quota: 6 jam/hari
- Response time: ~1-2 detik per request
- Concurrent users: ~30 simultaneous
- Spreadsheet limit: 10 juta sel

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────┐
│         USER BROWSER / MOBILE           │
│                                         │
│  https://script.google.com/.../exec     │
└─────────────────┬───────────────────────┘
                  │ HTTPS
                  ↓
┌─────────────────────────────────────────┐
│      GOOGLE APPS SCRIPT (Web App)       │
│                                         │
│  ├─ Code.gs (Backend)                  │
│  ├─ Login.html                         │
│  ├─ Dashboard.html                     │
│  ├─ Scanner.html                       │
│  ├─ DaftarHadir.html                   │
│  ├─ ListGuru.html                      │
│  ├─ Laporan.html                       │
│  └─ Stylesheet.html                    │
└─────────────────┬───────────────────────┘
                  │ SpreadsheetApp API
                  ↓
┌─────────────────────────────────────────┐
│        GOOGLE SHEETS (Database)         │
│                                         │
│  ├─ Sheet: GURU                        │
│  ├─ Sheet: EVENT_KKG                   │
│  ├─ Sheet: ABSENSI                     │
│  ├─ Sheet: USERS                       │
│  └─ Sheet: LOG                         │
└─────────────────────────────────────────┘
```

---

## 📦 Dependencies

### External Libraries
- **Tailwind CSS** (v3.x) - CDN
- **Google Fonts** (Inter) - CDN
- **Material Symbols** - CDN
- **html5-qrcode** (v2.3.8) - CDN

### Google Services
- **Google Apps Script** - Runtime
- **Google Sheets** - Database
- **Google Drive** - Storage

### Browser Requirements
- Modern browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- Camera access (untuk scanner)
- Cookies enabled (untuk session)

---

## 🔧 Maintenance

### Regular Tasks
- Monitor sheet LOG untuk error
- Backup Spreadsheet (File → Make a copy)
- Update password admin secara berkala
- Clean old LOG entries (opsional)

### Update Procedure
1. Edit file di Apps Script
2. Save changes
3. Deploy → Manage deployments
4. Edit deployment → New version
5. Deploy

### Backup Strategy
- **Spreadsheet**: File → Make a copy (weekly)
- **Apps Script**: Download as .zip (setiap update)
- **Web App URL**: Simpan di tempat aman

---

## 📈 Future Enhancements

### Possible Features
- [ ] Export laporan ke PDF
- [ ] Email notification untuk admin
- [ ] Multi-event per hari
- [ ] Foto profil guru
- [ ] QR code generator untuk kartu guru
- [ ] Dashboard analytics (charts)
- [ ] Role-based access control
- [ ] Approval workflow
- [ ] Mobile app (PWA)

### Technical Improvements
- [ ] Password hashing
- [ ] API rate limiting
- [ ] Caching mechanism
- [ ] Error tracking (Sentry)
- [ ] Unit tests
- [ ] CI/CD pipeline

---

## 📞 Support & Contact

**Documentation**: Lihat file README.md dan SETUP_GUIDE.md  
**Issues**: Hubungi admin KKG  
**Updates**: Check GitHub/repository untuk versi terbaru

---

**Project Structure v1.0**  
**Last Updated**: 2025  
**Total Files**: 18 files  
**Total Size**: ~100 KB  
**Platform**: Google Apps Script  
**License**: Free for educational use
