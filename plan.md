# 📋 Aplikasi Absensi KKG — Google Apps Script
> Sistem absensi barcode untuk Kelompok Kerja Guru  
> Stack: Google Apps Script + Google Sheets + HTML Service  
> Gratis · Tanpa server · Tanpa hosting · Semua di ekosistem Google

---

## 🗂️ Daftar Isi
1. [Overview](#overview)
2. [Arsitektur Sistem](#arsitektur-sistem)
3. [Struktur Google Sheets](#struktur-google-sheets)
4. [Logika Parsing Barcode](#logika-parsing-barcode)
5. [Alur Scan Barcode](#alur-scan-barcode)
6. [Struktur File Project](#struktur-file-project)
7. [Rencana Tiap File](#rencana-tiap-file)
8. [Menu & Halaman](#menu--halaman)
9. [Catatan Kamera](#catatan-kamera)
10. [Cara Deploy](#cara-deploy)
11. [Estimasi Biaya](#estimasi-biaya)
12. [Keterbatasan & Solusi](#keterbatasan--solusi)

---

## Overview

Aplikasi web yang di-serve langsung oleh **Google Apps Script** sebagai Web App. Tidak ada server eksternal, tidak ada database berbayar — semua data tersimpan di **Google Sheets** yang bisa diakses dan diedit langsung kapanpun.

### Format Barcode yang Didukung
```
DODY MUTIA EKA PUTRA, S.Pd.I NIP.198202022024211006 SDN 116/IV KOTA JAMBI
```

| Field    | Hasil Parse                  | Cara Ambil                         |
|----------|------------------------------|------------------------------------|
| Nama     | `DODY MUTIA EKA PUTRA`       | Sebelum tanda koma                 |
| Gelar    | `S.Pd.I`                     | Setelah koma, sebelum `NIP.`       |
| NIP      | `198202022024211006`         | Angka setelah `NIP.`               |
| Sekolah  | `SDN 116/IV`                 | Setelah NIP, sebelum `KOTA/KAB`    |
| Kota     | `KOTA JAMBI`                 | Dua kata terakhir                  |

---

## Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────┐
│                   BROWSER / HP OPERATOR                  │
│                                                          │
│   Akses via URL langsung (bukan iframe/embed):           │
│   https://script.google.com/macros/s/XXXXX/exec         │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │ Scanner  │ │  Daftar  │ │   List   │ │  Laporan  │  │
│  │ ?page=   │ │  Hadir   │ │   Guru   │ │           │  │
│  │ scanner  │ │ ?page=   │ │ ?page=   │ │ ?page=    │  │
│  │          │ │ hadir    │ │ guru     │ │ laporan   │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └─────┬─────┘  │
└───────┼────────────┼────────────┼──────────────┼─────────┘
        │       google.script.run (server functions)
        ▼            ▼            ▼              ▼
┌─────────────────────────────────────────────────────────┐
│              GOOGLE APPS SCRIPT (Web App)                │
│                                                          │
│  doGet(e)  → routing halaman berdasarkan ?page=         │
│                                                          │
│  Server Functions:                                       │
│  ├─ prosesScan(raw, eventId)                            │
│  ├─ parseBarcode(raw)                                   │
│  ├─ cariGuru(nip)                                       │
│  ├─ tambahGuru(data)                                    │
│  ├─ catatAbsensi(guruId, eventId)                       │
│  ├─ cekSudahAbsen(nip, tanggal)                         │
│  ├─ getEventAktif()                                     │
│  ├─ buatEvent(nama, tgl, lokasi)                        │
│  ├─ getDaftarHadir(eventId)                             │
│  ├─ getListGuru(keyword)                                │
│  └─ getLaporan(bulan)                                   │
└──────────────────────┬──────────────────────────────────┘
                       │ SpreadsheetApp
                       ▼
┌─────────────────────────────────────────────────────────┐
│              GOOGLE SHEETS (Database)                    │
│                                                          │
│  Sheet: GURU         Sheet: ABSENSI                     │
│  Sheet: EVENT_KKG    Sheet: LOG                         │
└─────────────────────────────────────────────────────────┘
```

---

## Struktur Google Sheets

### Sheet: `GURU`
| Kolom | Header      | Contoh                         | Keterangan                  |
|-------|-------------|--------------------------------|-----------------------------|
| A     | ID          | GURU-001                       | Auto-generate               |
| B     | NIP         | 198202022024211006             | Unique key utama            |
| C     | NAMA        | DODY MUTIA EKA PUTRA           |                             |
| D     | GELAR       | S.Pd.I                         | Bisa kosong                 |
| E     | SEKOLAH     | SDN 116/IV                     |                             |
| F     | KOTA        | KOTA JAMBI                     |                             |
| G     | RAW_BARCODE | *(full string dari scan)*      | Untuk keperluan debug       |
| H     | TGL_DAFTAR  | 2025-05-13 08:30:00            | Waktu pertama kali scan     |

### Sheet: `EVENT_KKG`
| Kolom | Header      | Contoh                         | Keterangan                  |
|-------|-------------|--------------------------------|-----------------------------|
| A     | ID          | EVT-001                        | Auto-generate               |
| B     | NAMA_EVENT  | Pertemuan KKG Mei 2025         |                             |
| C     | TANGGAL     | 2025-05-13                     |                             |
| D     | LOKASI      | SDN 001 Kota Jambi             |                             |
| E     | KETERANGAN  | Pertemuan rutin bulanan        |                             |
| F     | STATUS      | AKTIF                          | AKTIF / SELESAI             |

### Sheet: `ABSENSI`
| Kolom | Header      | Contoh                         | Keterangan                  |
|-------|-------------|--------------------------------|-----------------------------|
| A     | ID          | ABS-0001                       | Auto-generate               |
| B     | EVENT_ID    | EVT-001                        | Referensi ke EVENT_KKG      |
| C     | GURU_ID     | GURU-001                       | Referensi ke GURU           |
| D     | NIP         | 198202022024211006             | Disimpan langsung           |
| E     | NAMA        | DODY MUTIA EKA PUTRA           | Disimpan langsung           |
| F     | SEKOLAH     | SDN 116/IV                     | Disimpan langsung           |
| G     | TANGGAL     | 2025-05-13                     |                             |
| H     | JAM_HADIR   | 08:30:15                       |                             |
| I     | STATUS      | HADIR                          | HADIR / IZIN / SAKIT        |

### Sheet: `LOG`
| Kolom | Header      | Keterangan                              |
|-------|-------------|-----------------------------------------|
| A     | WAKTU       | Timestamp tiap aktivitas                |
| B     | AKSI        | SCAN / TAMBAH_GURU / ERROR              |
| C     | NIP         | NIP yang terlibat                       |
| D     | KETERANGAN  | Detail pesan atau error                 |

---

## Logika Parsing Barcode

```
Input  : "DODY MUTIA EKA PUTRA, S.Pd.I NIP.198202022024211006 SDN 116/IV KOTA JAMBI"

Step 1   Cari pola NIP.\d+
         └─ NIP = "198202022024211006"

Step 2   Split string di " NIP.xxx "
         ├─ Kiri  : "DODY MUTIA EKA PUTRA, S.Pd.I"
         └─ Kanan : "SDN 116/IV KOTA JAMBI"

Step 3   Kiri → split di ","
         ├─ NAMA  : "DODY MUTIA EKA PUTRA"
         └─ GELAR : "S.Pd.I"

Step 4   Kanan → cari pola "KOTA xxx" atau "KABUPATEN xxx" di akhir
         ├─ KOTA    : "KOTA JAMBI"
         └─ SEKOLAH : "SDN 116/IV"  (sisa string setelah kota dibuang)

Output : { nama, gelar, nip, sekolah, kota, raw }
```

---

## Alur Scan Barcode

```
Operator buka URL web app di browser / HP
                 │
                 ▼
       Halaman Scanner terbuka
       html5-qrcode aktifkan kamera
                 │
                 ▼
          Guru tempel kartu
                 │
                 ▼
        Barcode terdeteksi
                 │
                 ▼
      parseBarcode() di sisi client
      → ekstrak nama / NIP / sekolah / kota
                 │
                 ▼
         getEventAktif()
                 │
           ┌─────┴──────────────┐
           │                    │
      Ada event aktif     Tidak ada event
           │                    │
           │          Tampilkan pesan:
           │          "Belum ada event KKG
           │           hari ini. Hubungi admin."
           ▼
    google.script.run
    .prosesScan(rawBarcode, eventId)
           │
    ┌──────┴───────────┐
    │                  │
  Cari NIP          Tidak ketemu
  di Sheet GURU         │
    │              tambahGuru()
    │              insert baris baru
    │              ke Sheet GURU
    └──────┬───────────┘
           │
    cekSudahAbsen(nip, tanggal)
           │
    ┌──────┴─────────────────────┐
    │                            │
  BELUM ABSEN               SUDAH ABSEN
    │                            │
  catatAbsensi()            Return response:
  insert ke Sheet ABSENSI   "Sudah hadir pukul 08:15"
    │
    ▼
  Tampilkan kartu hasil di layar:

  ┌────────────────────────────────┐
  │ 🟢 GURU BARU — Otomatis Daftar │  ← isNewGuru: true
  │  atau                          │
  │ 🔵 HADIR — Selamat Datang      │  ← isNewGuru: false
  │                                │
  │  Nama    : DODY MUTIA EKA...   │
  │  NIP     : 1982020220242...    │
  │  Sekolah : SDN 116/IV          │
  │  Jam     : 08:30:15            │
  └────────────────────────────────┘
       (hilang otomatis 4 detik, siap scan berikutnya)
```

---

## Struktur File Project

```
📁 Apps Script Project: "Absensi KKG"
│
├── Code.gs                ← Backend utama (semua logika server)
│
├── Dashboard.html         ← Beranda & buat event KKG
├── Scanner.html           ← Scan barcode via kamera
├── DaftarHadir.html       ← Tabel absensi per event / tanggal
├── ListGuru.html          ← Daftar semua guru terdaftar
├── Laporan.html           ← Rekap kehadiran per bulan
│
└── Stylesheet.html        ← CSS global (di-include semua halaman)
```

---

## Rencana Tiap File

### `Code.gs`
```
ROUTING
  doGet(e)
  └─ baca e.parameter.page
     ├─ 'scanner'   → serve Scanner.html
     ├─ 'hadir'     → serve DaftarHadir.html
     ├─ 'guru'      → serve ListGuru.html
     ├─ 'laporan'   → serve Laporan.html
     └─ default     → serve Dashboard.html

CONSTANTS
  SPREADSHEET_ID  = '...'
  SHEET_GURU      = 'GURU'
  SHEET_ABSENSI   = 'ABSENSI'
  SHEET_EVENT     = 'EVENT_KKG'
  SHEET_LOG       = 'LOG'

SERVER FUNCTIONS
  parseBarcode(rawText)
  └─ return { nama, gelar, nip, sekolah, kota, raw }

  prosesScan(rawBarcode, eventId)
  1. parseBarcode(rawBarcode)
  2. cariGuru(nip) → cek kolom NIP di sheet GURU
  3. jika tidak ada → tambahGuru(parsedData) → dapat guruId baru
  4. cekSudahAbsen(nip, today) → cek sheet ABSENSI
  5. jika belum → catatAbsensi(guruId, eventId, parsedData)
  6. return { status, isNewGuru, guru, jam, pesan }

  getEventAktif()
  └─ filter EVENT_KKG: TANGGAL = today AND STATUS = 'AKTIF'
  └─ return event pertama yang ditemukan, atau null

  buatEvent(nama, tanggal, lokasi, keterangan)
  └─ generate ID baru (EVT-xxx)
  └─ append baris ke sheet EVENT_KKG dengan STATUS = 'AKTIF'

  getDaftarHadir(eventId)
  └─ filter ABSENSI by EVENT_ID
  └─ return array [ { no, nama, nip, sekolah, jam, status } ]

  getListGuru(keyword)
  └─ ambil semua baris sheet GURU
  └─ filter by keyword (nama / nip / sekolah) jika ada
  └─ return array guru

  getLaporan(bulan)
  └─ bulan format: "2025-05"
  └─ hitung jumlah hadir per guru di bulan tersebut
  └─ return { totalEvent, totalGuru, perGuru: [...] }

  tuliLog(aksi, nip, keterangan)
  └─ append baris ke sheet LOG dengan timestamp
```

### `Scanner.html`
```
LAYOUT
  ├─ Header: nama event aktif + tanggal hari ini
  ├─ Area kamera: kotak panduan scan (html5-qrcode)
  ├─ Tombol: [Mulai Scan] / [Stop Scan]
  ├─ Kartu hasil scan (slide-in dari bawah):
  │   ├─ Icon + warna status (hijau/biru/kuning)
  │   ├─ Nama, NIP, Sekolah, Jam
  │   └─ Auto-dismiss setelah 4 detik
  └─ Log sesi: tabel 10 scan terakhir hari ini

JS LOGIC
  onLoad:
    google.script.run
      .withSuccessHandler(tampilkanEvent)
      .getEventAktif()
    │
    ├─ Ada event → tampilkan info, aktifkan tombol scan
    └─ Tidak ada → tampilkan alert, sembunyikan kamera

  onScanSuccess(rawText):
    1. Cegah scan ganda dalam 3 detik (debounce)
    2. Tampilkan loading spinner
    3. google.script.run
         .withSuccessHandler(tampilkanHasil)
         .prosesScan(rawText, eventId)
    4. Tambahkan ke log sesi
```

### `Dashboard.html`
```
LAYOUT
  ├─ Kartu info event hari ini (nama, lokasi, jam mulai)
  ├─ Kartu counter: hadir hari ini / total guru
  ├─ Tombol besar → Mulai Scan
  ├─ Form buat event baru:
  │   ├─ Input: nama event
  │   ├─ Input: tanggal (default hari ini)
  │   ├─ Input: lokasi
  │   └─ Tombol Simpan Event
  └─ Tabel 5 absensi terakhir hari ini
```

### `DaftarHadir.html`
```
LAYOUT
  ├─ Dropdown: pilih event (list semua event)
  ├─ Badge: X hadir dari Y guru terdaftar
  ├─ Tabel: No | Nama | NIP | Sekolah | Jam Hadir | Status
  ├─ Input search: filter nama atau sekolah
  └─ Tombol: Buka di Google Sheets (link langsung ke spreadsheet)
```

### `ListGuru.html`
```
LAYOUT
  ├─ Counter total guru terdaftar
  ├─ Input search: nama / NIP / sekolah
  └─ Tabel: No | Nama | Gelar | NIP | Sekolah | Kota | Tgl Daftar
```

### `Laporan.html`
```
LAYOUT
  ├─ Pilih bulan (input month)
  ├─ Ringkasan: total event bulan ini, rata-rata kehadiran
  ├─ Tabel rekap: Nama | Sekolah | Hadir | % Kehadiran
  ├─ Urutan by kehadiran tertinggi
  └─ Tombol: Buka Google Sheets | Cetak Halaman
```

### `Stylesheet.html`
```
  ├─ CSS variables: warna, font, spacing
  ├─ Navbar / bottom navigation (mobile-friendly)
  ├─ Style kartu, tabel, tombol, badge
  └─ Animasi: slide-in kartu hasil scan, fade loading
```

---

## Menu & Halaman

| Menu         | URL Parameter       | Fungsi Utama                              |
|--------------|---------------------|-------------------------------------------|
| Dashboard    | `?page=dashboard`   | Info event, counter, buat event baru      |
| Scanner      | `?page=scanner`     | Scan barcode dengan kamera                |
| Daftar Hadir | `?page=hadir`       | Tabel absensi per event/tanggal           |
| List Guru    | `?page=guru`        | Semua guru terdaftar, hasil auto-register |
| Laporan      | `?page=laporan`     | Rekap bulanan, link ke Sheets             |

---

## Catatan Kamera

Kamera **bekerja normal** di Apps Script HTML Service karena halaman di-serve via HTTPS dari `script.google.com`. Syaratnya:

| Kondisi Akses                              | Kamera        |
|--------------------------------------------|---------------|
| Buka URL web app langsung di browser PC    | ✅ Bekerja    |
| Buka URL web app di HP (Chrome/Safari)     | ✅ Bekerja    |
| Di-embed di Google Sites via iframe        | ❌ Blocked    |
| Di-embed di aplikasi lain via iframe       | ❌ Blocked    |

**Library:** `html5-qrcode` di-load dari CDN jsDelivr (tidak perlu install apapun)  
**Izin kamera:** Browser meminta izin sekali saat pertama buka halaman scanner

---

## Cara Deploy

```
1. Siapkan Google Sheets
   ├─ Buat Spreadsheet baru di Google Drive
   ├─ Rename sheet pertama menjadi: GURU
   ├─ Tambahkan sheet: EVENT_KKG, ABSENSI, LOG
   ├─ Isi baris header sesuai struktur di atas
   └─ Copy Spreadsheet ID dari URL (bagian antara /d/ dan /edit)

2. Buat Apps Script Project
   ├─ Buka script.google.com
   ├─ Klik New Project → beri nama "Absensi KKG"
   └─ Isi SPREADSHEET_ID di Code.gs

3. Tambahkan semua file
   ├─ Code.gs (sudah ada, isi dengan kode backend)
   ├─ Klik (+) → HTML → beri nama sesuai struktur file
   └─ Isi masing-masing file

4. Deploy sebagai Web App
   ├─ Klik Deploy → New Deployment
   ├─ Pilih Type: Web App
   ├─ Execute as: Me
   ├─ Who has access: Anyone
   └─ Klik Deploy → izinkan akses → copy URL

5. Bagikan URL ke operator
   https://script.google.com/macros/s/XXXXX/exec

6. Update kode di kemudian hari
   └─ Deploy → Manage Deployments → Edit → pilih versi baru → Update
```

---

## Estimasi Biaya

| Layanan            | Biaya      | Kapasitas                              |
|--------------------|------------|----------------------------------------|
| Google Apps Script | **GRATIS** | 6 jam eksekusi / hari                  |
| Google Sheets      | **GRATIS** | 10 juta sel per spreadsheet            |
| Google Drive       | **GRATIS** | 15 GB storage                          |
| Domain / Hosting   | **GRATIS** | URL resmi dari script.google.com       |
| **TOTAL**          | **Rp 0**   |                                        |

---

## Keterbatasan & Solusi

| Keterbatasan                              | Solusi                                              |
|-------------------------------------------|-----------------------------------------------------|
| Kamera tidak jalan jika di-embed iframe   | Selalu buka via URL langsung, tidak di-embed        |
| Response server ~1-2 detik               | Tampilkan loading spinner selama proses             |
| Tidak ada update realtime antar browser   | Tidak dibutuhkan — satu operator pakai satu layar   |
| Harus deploy ulang tiap update kode       | Gunakan "Manage Deployments → Edit" untuk update    |
| Tidak bisa pakai custom domain            | URL bawaan Google sudah cukup untuk internal        |

---

*Blueprint v2 — Google Apps Script Edition*  
*Siap untuk tahap implementasi kode.*