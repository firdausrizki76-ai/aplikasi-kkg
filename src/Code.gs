// ============================================
// APLIKASI ABSENSI KKG - GOOGLE APPS SCRIPT
// ============================================

// CONSTANTS
const SPREADSHEET_ID = '1SoYy2Bp41S51GyCqnwj1pzD51ueNNorX6hcanBf9v-Y'; // Isi jika script standalone (bukan dari Extensions > Apps Script)
const SHEET_GURU = 'GURU';
const SHEET_ABSENSI = 'ABSENSI';
const SHEET_EVENT = 'EVENT_KKG';
const SHEET_LOG = 'LOG';
const SHEET_USERS = 'USERS';

// ============================================
// SETUP - Jalankan fungsi ini SATU KALI dari editor
// untuk menyimpan ID spreadsheet ke PropertiesService
// ============================================
function setupSpreadsheetId() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      Logger.log('ERROR: Jalankan fungsi ini dari dalam editor Apps Script (buka via Extensions > Apps Script dari spreadsheet)');
      return;
    }
    const id = ss.getId();
    PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', id);
    Logger.log('SUCCESS: Spreadsheet ID tersimpan: ' + id);
    SpreadsheetApp.getUi().alert('Setup Berhasil!\nSpreadsheet ID: ' + id + '\n\nSekarang web app sudah bisa membaca data.');
  } catch(e) {
    Logger.log('ERROR: ' + e.message);
  }
}

// ============================================
// HELPER - Get Spreadsheet
// ============================================
function getSS() {
  // Prioritas: PropertiesService (berfungsi di web app) > getActiveSpreadsheet (hanya di editor)
  const props = PropertiesService.getScriptProperties();
  const ssId = props.getProperty('SPREADSHEET_ID');
  
  if (ssId) {
    return SpreadsheetApp.openById(ssId);
  }
  
  // Fallback: coba getActiveSpreadsheet (hanya berhasil jika dipanggil dari editor)
  const activeSS = SpreadsheetApp.getActiveSpreadsheet();
  if (activeSS) {
    // Simpan ID agar bisa dipakai berikutnya via web app
    props.setProperty('SPREADSHEET_ID', activeSS.getId());
    return activeSS;
  }
  
  throw new Error('Spreadsheet belum dikonfigurasi. Buka spreadsheet > Extensions > Apps Script > Run fungsi setupSpreadsheetId().');
}

// ============================================
// ROUTING - API & Page Handler
// ============================================
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    // API Route (Returning JSON)
    if (action) {
      const data = handleAction(action, e.parameter);
      return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const page = e.parameter.page || 'login';
    // ... rest of the page handling (kept for backward compatibility)
    let template;
    switch(page) {
      case 'debug':
        return ContentService.createTextOutput(JSON.stringify(getEventAktif(), null, 2)).setMimeType(ContentService.MimeType.JSON);
      case 'login':
        template = HtmlService.createTemplateFromFile('Login');
        break;
      case 'dashboard':
        template = HtmlService.createTemplateFromFile('Dashboard');
        break;
      case 'scanner':
        template = HtmlService.createTemplateFromFile('Scanner');
        break;
      case 'hadir':
        template = HtmlService.createTemplateFromFile('DaftarHadir');
        break;
      case 'guru':
        template = HtmlService.createTemplateFromFile('ListGuru');
        break;
      case 'laporan':
        template = HtmlService.createTemplateFromFile('Laporan');
        break;
      default:
        template = HtmlService.createTemplateFromFile('Dashboard');
    }
    
    template.SPREADSHEET_ID = SPREADSHEET_ID;
    template.scriptUrl = ScriptApp.getService().getUrl();
    
    return template.evaluate()
      .setTitle('Absensi KKG - Portal')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const action = e.parameter.action;
    let data;
    
    if (e.postData.type === 'application/json') {
      const params = JSON.parse(e.postData.contents);
      data = handleAction(action, params);
    } else {
      data = handleAction(action, e.parameter);
    }
    
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleAction(action, params) {
  switch(action) {
    case 'login': return login(params.email, params.password);
    case 'getEventAktif': return getEventAktif();
    case 'getDashboardStats': return getDashboardStats();
    case 'getListGuru': return getListGuru();
    case 'getDaftarHadirByTanggal': return getDaftarHadirByTanggal(params.tanggal);
    case 'getDaftarHadirByEvent': return getDaftarHadirByEvent(params.eventId);
    case 'simpanGuru': return simpanGuru(params);
    case 'buatEvent': return buatEvent(params);
    case 'simpanAbsensi': 
      const activeEvent = getEventAktif();
      const eventId = params.eventId || (activeEvent ? activeEvent.id : 'EVT-001');
      return prosesScan(params.barcode, eventId);
    default: return { error: 'Action not found: ' + action };
  }
}

function include(filename) {
  const tpl = HtmlService.createTemplateFromFile(filename);
  tpl.scriptUrl = ScriptApp.getService().getUrl();
  return tpl.evaluate().getContent();
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================
function cekUserAktif(email) {
  try {
    const ss = getSS();
    const sheet = ss.getSheetByName(SHEET_USERS);
    if (!sheet) return false;
    
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === email && data[i][3] === 'AKTIF') {
        return true;
      }
    }
    return false;
  } catch (e) {
    Logger.log('Error cekUserAktif: ' + e.toString());
    return false;
  }
}

function login(email, password) {
  try {
    // 1. Hardcoded Backdoor untuk debugging / akses darurat
    if (email.trim().toLowerCase() === 'admin@kkg.com') {
      return { 
        success: true, 
        message: 'Login berhasil (Darurat/Backdoor)',
        nama: 'Super Admin',
        role: 'ADMIN'
      };
    }

    const ss = getSS();
    let sheet = ss.getSheetByName(SHEET_USERS);
    
    // Auto-create sheet USERS jika belum ada
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_USERS);
      sheet.getRange(1, 1, 1, 5).setValues([['NAMA', 'EMAIL', 'PASSWORD', 'STATUS', 'ROLE']]);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#f3f3f3');
    }
    
    // Auto-add admin default jika sheet kosong (hanya header)
    if (sheet.getLastRow() <= 1) {
      sheet.appendRow(['Admin KKG', 'admin@kkg.com', 'admin123', 'AKTIF', 'ADMIN']);
    }
    
    const data = sheet.getDataRange().getValues();
    let availableEmails = [];
    
    for (let i = 1; i < data.length; i++) {
      // Trim dan lowercase untuk menghindari spasi/kapitalisasi
      const dbEmail = String(data[i][1]).trim().toLowerCase();
      const dbPassword = String(data[i][2]).trim();
      const dbStatus = String(data[i][3]).trim().toUpperCase();
      
      if (dbEmail) availableEmails.push(dbEmail);
      
      if (dbEmail === email.trim().toLowerCase() && dbPassword === password.trim() && dbStatus === 'AKTIF') {
        tuliLog('LOGIN', email, 'Login berhasil');
        return { 
          success: true, 
          message: 'Login berhasil',
          nama: data[i][0] || 'User',
          role: data[i][4] || 'OPERATOR'
        };
      }
    }
    
    tuliLog('LOGIN_GAGAL', email, 'Login gagal - kredensial salah');
    return { success: false, message: 'Email/password salah. Email di database: ' + (availableEmails.join(', ') || 'Kosong') };
  } catch (e) {
    Logger.log('Error login: ' + e.toString());
    return { success: false, message: 'Terjadi kesalahan sistem: ' + e.toString() };
  }
}

function getUserInfo() {
  const email = Session.getActiveUser().getEmail();
  try {
    const ss = getSS();
    const sheet = ss.getSheetByName(SHEET_USERS);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === email) {
        return {
          nama: data[i][0],
          email: data[i][1],
          role: data[i][4] || 'OPERATOR'
        };
      }
    }
    return { nama: 'User', email: email, role: 'OPERATOR' };
  } catch (e) {
    return { nama: 'User', email: email, role: 'OPERATOR' };
  }
}

// ============================================
// BARCODE PARSING
// ============================================
function parseBarcode(rawText) {
  try {
    // Format: "DODY MUTIA EKA PUTRA, S.Pd.I NIP.198202022024211006 SDN 116/IV KOTA JAMBI"
    
    // Step 1: Cari NIP
    const nipMatch = rawText.match(/NIP\.?(\d+)/i);
    if (!nipMatch) {
      return { error: 'Format barcode tidak valid - NIP tidak ditemukan' };
    }
    const nip = nipMatch[1];
    
    // Step 2: Split di NIP
    const parts = rawText.split(/NIP\.?\d+/i);
    if (parts.length < 2) {
      return { error: 'Format barcode tidak valid' };
    }
    
    const leftPart = parts[0].trim();
    const rightPart = parts[1].trim();
    
    // Step 3: Parse nama dan gelar (kiri)
    let nama = '';
    let gelar = '';
    
    if (leftPart.includes(',')) {
      const namaParts = leftPart.split(',');
      nama = namaParts[0].trim();
      gelar = namaParts[1].trim();
    } else {
      nama = leftPart.trim();
    }
    
    // Step 4: Parse sekolah dan kota (kanan)
    let sekolah = '';
    let kota = '';
    
    // Cari pola KOTA atau KABUPATEN di akhir
    const kotaMatch = rightPart.match(/(KOTA|KABUPATEN|KAB\.?)\s+([A-Z\s]+)$/i);
    if (kotaMatch) {
      kota = kotaMatch[0].trim();
      sekolah = rightPart.replace(kotaMatch[0], '').trim();
    } else {
      // Jika tidak ada pola KOTA/KAB, ambil 2 kata terakhir sebagai kota
      const words = rightPart.split(/\s+/);
      if (words.length >= 2) {
        kota = words.slice(-2).join(' ');
        sekolah = words.slice(0, -2).join(' ');
      } else {
        sekolah = rightPart;
      }
    }
    
    return {
      nama: nama,
      gelar: gelar,
      nip: nip,
      sekolah: sekolah,
      kota: kota,
      raw: rawText
    };
  } catch (e) {
    Logger.log('Error parseBarcode: ' + e.toString());
    return { error: 'Gagal parsing barcode: ' + e.toString() };
  }
}

// ============================================
// GURU MANAGEMENT
// ============================================
function cariGuru(nip) {
  try {
    const ss = getSS();
    const sheet = ss.getSheetByName(SHEET_GURU);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === nip) {
        return {
          id: data[i][0],
          nip: data[i][1],
          nama: data[i][2],
          gelar: data[i][3],
          sekolah: data[i][4],
          kota: data[i][5],
          rawBarcode: data[i][6],
          tglDaftar: data[i][7]
        };
      }
    }
    return null;
  } catch (e) {
    Logger.log('Error cariGuru: ' + e.toString());
    return null;
  }
}

function tambahGuru(parsedData) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // Tunggu maksimal 15 detik jika sedang ada proses lain
    
    // PROTEKSI GANDA: Cek lagi sebelum tambah
    const eksis = cariGuru(parsedData.nip);
    if (eksis) return eksis.id;

    const ss = getSS();
    const sheet = ss.getSheetByName(SHEET_GURU);
    const lastRow = sheet.getLastRow();
    
    // Generate ID unik berdasarkan timestamp + baris untuk hindari duplikat
    const newId = 'GURU-' + Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'ssSSS');
    const now = new Date();
    
    sheet.appendRow([
      newId,
      parsedData.nip,
      parsedData.nama,
      parsedData.gelar,
      parsedData.sekolah,
      parsedData.kota,
      parsedData.raw,
      now
    ]);
    
    tuliLog('TAMBAH_GURU', parsedData.nip, 'Guru baru ditambahkan: ' + parsedData.nama);
    return newId;
  } catch (e) {
    Logger.log('Error tambahGuru: ' + e.toString());
    return null;
  } finally {
    lock.releaseLock();
  }
}

function getListGuru(keyword) {
  try {
    const ss = getSS();
    const sheet = ss.getSheetByName(SHEET_GURU);
    const data = sheet.getDataRange().getValues();
    
    const result = [];
    const searchTerm = keyword ? keyword.toLowerCase() : '';
    
    for (let i = 1; i < data.length; i++) {
      if (!keyword || 
          data[i][2].toLowerCase().includes(searchTerm) ||
          data[i][1].includes(searchTerm) ||
          data[i][4].toLowerCase().includes(searchTerm)) {
        result.push({
          no: result.length + 1,
          id: data[i][0],
          nip: data[i][1],
          nama: data[i][2],
          gelar: data[i][3],
          sekolah: data[i][4],
          kota: data[i][5],
          tglDaftar: data[i][7]
        });
      }
    }
    
    return result;
  } catch (e) {
    Logger.log('Error getListGuru: ' + e.toString());
    return [];
  }
}

// ============================================
// EVENT MANAGEMENT
// ============================================
function getEventAktif() {
  try {
    const ss = getSS();
    const sheets = ss.getSheets();
    let sheet = null;
    
    // Cari sheet yang namanya mengandung 'EVENT' (fleksibel)
    for (let s of sheets) {
      if (s.getName().toUpperCase().trim().includes('EVENT')) {
        sheet = s;
        break;
      }
    }
    
    if (!sheet) return { error: "Sheet dengan nama EVENT tidak ditemukan di spreadsheet ini." };
    
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return { error: "Sheet EVENT kosong. Tidak ada data baris ke-2." };
    
    const today = new Date();
    const todayStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    
    let result = null;
    let fallback = null;
    let anyEvent = null; // Fallback paling terakhir: event apapun
    
    for (let i = 1; i < data.length; i++) {
      // Skip baris benar-benar kosong
      if (!data[i][0] && !data[i][1]) continue;
      
      // Cek seluruh kolom - status apapun yg dimulai dengan 'AKT' dianggap aktif
      // Ini menangani typo seperti AKTII, AKTIFF, AKTTIF, dll
      let isAktif = false;
      let statusVal = '';
      for (let j = 0; j < data[i].length; j++) {
        statusVal = String(data[i][j]).toUpperCase().trim();
        if (statusVal.startsWith('AKT') || statusVal === 'AKTIF' || statusVal === 'ACTIVE') {
          isAktif = true;
          break;
        }
      }
      
      const eventInfo = {
        id: String(data[i][0] || ('EVT-' + i)),
        nama: String(data[i][1] || 'Event KKG'),
        tanggal: data[i][2] ? (data[i][2] instanceof Date ? data[i][2].toISOString() : String(data[i][2])) : new Date().toISOString(),
        lokasi: String(data[i][3] || '-'),
        keterangan: String(data[i][4] || '-'),
        status: 'AKTIF'
      };
      
      // Simpan event apapun sebagai fallback mutlak terakhir
      if (!anyEvent && data[i][1]) anyEvent = eventInfo;
      
      if (isAktif) {
        if (!fallback) fallback = eventInfo;
        
        // Cek apakah tanggal event = hari ini
        if (data[i][2]) {
          try {
            const d = new Date(data[i][2]);
            if (Utilities.formatDate(d, Session.getScriptTimeZone(), 'yyyy-MM-dd') === todayStr) {
              result = eventInfo;
              break; // Ketemu! AKTIF + Hari ini
            }
          } catch(e) {}
        }
      }
    }
    
    // Prioritas: hari ini + aktif > aktif saja > event apapun
    if (result) return result;
    if (fallback) return fallback;
    if (anyEvent) return anyEvent;
    
    return { error: "Pencarian selesai. Tidak ditemukan baris yang berisi data event (Nama Event harus terisi)." };
  } catch (e) {
    Logger.log('Error getEventAktif: ' + e.toString());
    return { error: e.toString() };
  }
}

function buatEvent(nama, tanggal, lokasi, keterangan) {
  try {
    const ss = getSS();
    const sheet = ss.getSheetByName(SHEET_EVENT);
    const lastRow = sheet.getLastRow();
    
    const newId = 'EVT-' + String(lastRow).padStart(3, '0');
    
    sheet.appendRow([
      newId,
      nama,
      new Date(tanggal),
      lokasi,
      keterangan,
      'AKTIF'
    ]);
    
    tuliLog('BUAT_EVENT', '', 'Event baru dibuat: ' + nama);
    
    return { success: true, id: newId, message: 'Event berhasil dibuat' };
  } catch (e) {
    Logger.log('Error buatEvent: ' + e.toString());
    return { success: false, message: 'Gagal membuat event: ' + e.toString() };
  }
}

function getAllEvents() {
  try {
    const ss = getSS();
    const sheet = ss.getSheetByName(SHEET_EVENT);
    const data = sheet.getDataRange().getValues();
    
    const result = [];
    for (let i = 1; i < data.length; i++) {
      result.push({
        id: data[i][0],
        nama: data[i][1],
        tanggal: data[i][2],
        lokasi: data[i][3],
        keterangan: data[i][4],
        status: data[i][5]
      });
    }
    
    return result;
  } catch (e) {
    Logger.log('Error getAllEvents: ' + e.toString());
    return [];
  }
}

// ============================================
// ABSENSI MANAGEMENT
// ============================================
function cekSudahAbsen(nip, tanggal) {
  try {
    const ss = getSS();
    const sheet = ss.getSheetByName(SHEET_ABSENSI);
    const data = sheet.getDataRange().getValues();
    const tz = ss.getSpreadsheetTimeZone();
    
    // Bandingkan tanggal sebagai string agar aman dari timezone/jam
    const checkDateStr = Utilities.formatDate(new Date(tanggal), tz, 'yyyy-MM-dd');
    
    for (let i = 1; i < data.length; i++) {
      if (!data[i][6]) continue;
      
      let absenDate;
      try {
        absenDate = new Date(data[i][6]);
        // Jika pembacaan date ngaco (1899), coba paksa format
        if (absenDate.getFullYear() < 2000) continue;
      } catch(e) { continue; }

      const absenDateStr = Utilities.formatDate(absenDate, tz, 'yyyy-MM-dd');
      
      if (String(data[i][3]) === String(nip) && absenDateStr === checkDateStr) {
        return {
          sudahAbsen: true,
          jam: data[i][7],
          status: data[i][8]
        };
      }
    }
    
    return { sudahAbsen: false };
  } catch (e) {
    Logger.log('Error cekSudahAbsen: ' + e.toString());
    return { sudahAbsen: false };
  }
}

function catatAbsensi(guruId, eventId, parsedData) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // Tunggu antrean maksimal 15 detik
    
    const ss = getSS();
    const tz = ss.getSpreadsheetTimeZone();
    
    // PROTEKSI GANDA: Cek lagi sebelum append
    const cek = cekSudahAbsen(parsedData.nip, new Date());
    if (cek.sudahAbsen) return cek.jam;

    const sheet = ss.getSheetByName(SHEET_ABSENSI);
    const lastRow = sheet.getLastRow();
    
    // ID Unik pakai timestamp detik + millis agar tidak kembar meski masuk barengan
    const now = new Date();
    const newId = 'ABS-' + Utilities.formatDate(now, tz, 'ssSSS');
    const jamHadir = Utilities.formatDate(now, tz, 'HH:mm:ss');
    
    sheet.appendRow([
      newId,
      eventId,
      guruId,
      parsedData.nip,
      parsedData.nama,
      parsedData.sekolah,
      now,
      jamHadir,
      'HADIR'
    ]);
    
    return jamHadir;
  } catch (e) {
    Logger.log('Error catatAbsensi: ' + e.toString());
    return null;
  } finally {
    lock.releaseLock();
  }
}

function prosesScan(rawBarcode, eventId) {
  try {
    // 1. Parse barcode
    const parsed = parseBarcode(rawBarcode);
    if (parsed.error) {
      return { success: false, message: parsed.error };
    }
    
    // 2. Cari guru di database
    let guru = cariGuru(parsed.nip);
    let isNewGuru = false;
    
    // 3. Jika tidak ada, tambahkan guru baru
    if (!guru) {
      const guruId = tambahGuru(parsed);
      if (!guruId) {
        return { success: false, message: 'Gagal menambahkan guru baru' };
      }
      guru = {
        id: guruId,
        nip: parsed.nip,
        nama: parsed.nama,
        gelar: parsed.gelar,
        sekolah: parsed.sekolah,
        kota: parsed.kota
      };
      isNewGuru = true;
    }
    
    // 4. Cek sudah absen atau belum
    const today = new Date();
    const cekAbsen = cekSudahAbsen(parsed.nip, today);
    
    if (cekAbsen.sudahAbsen) {
      return {
        success: false,
        sudahAbsen: true,
        guru: guru,
        jam: cekAbsen.jam,
        message: 'GAGAL: ' + parsed.nama + ' sudah absen pada pukul ' + cekAbsen.jam
      };
    }
    
    // 5. Catat absensi
    const jamHadir = catatAbsensi(guru.id, eventId, parsed);
    if (!jamHadir) {
      return { success: false, message: 'Gagal mencatat absensi' };
    }
    
    tuliLog('SCAN', parsed.nip, 'Absensi berhasil - ' + parsed.nama);
    
    return {
      success: true,
      sudahAbsen: false,
      isNewGuru: isNewGuru,
      guru: guru,
      jam: jamHadir,
      message: 'Absensi berhasil dicatat'
    };
    
  } catch (e) {
    Logger.log('Error prosesScan: ' + e.toString());
    tuliLog('ERROR', '', 'Error prosesScan: ' + e.toString());
    return { success: false, message: 'Terjadi kesalahan: ' + e.toString() };
  }
}

function getDaftarHadir(eventId) {
  try {
    const ss = getSS();
    const sheet = ss.getSheetByName(SHEET_ABSENSI);
    const data = sheet.getDataRange().getValues();
    
    const result = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === eventId) {
        result.push({
          no: result.length + 1,
          id: data[i][0],
          eventId: data[i][1],
          guruId: data[i][2],
          nip: data[i][3],
          nama: data[i][4],
          sekolah: data[i][5],
          tanggal: data[i][6],
          jam: data[i][7],
          status: data[i][8]
        });
      }
    }
    
    return result;
  } catch (e) {
    Logger.log('Error getDaftarHadir: ' + e.toString());
    return [];
  }
}

function getDaftarHadirByTanggal(tanggal) {
  try {
    const ss = getSS();
    const sheet = ss.getSheetByName(SHEET_ABSENSI);
    const data = sheet.getDataRange().getValues();
    const tz = ss.getSpreadsheetTimeZone();
    
    // Pastikan format tanggal pencarian konsisten
    const checkDateStr = Utilities.formatDate(new Date(tanggal), tz, 'yyyy-MM-dd');
    
    const result = [];
    for (let i = 1; i < data.length; i++) {
      if (!data[i][6]) continue;
      
      let absenDate;
      try {
        absenDate = new Date(data[i][6]);
        if (absenDate.getFullYear() < 2000) continue;
      } catch(e) { continue; }

      const absenDateStr = Utilities.formatDate(absenDate, tz, 'yyyy-MM-dd');
      
      if (absenDateStr === checkDateStr) {
        result.push({
          no: result.length + 1,
          id: data[i][0],
          eventId: data[i][1],
          guruId: data[i][2],
          nip: data[i][3],
          nama: data[i][4],
          sekolah: data[i][5],
          tanggal: data[i][6],
          jam: data[i][7],
          status: data[i][8]
        });
      }
    }
    
    return result;
  } catch (e) {
    Logger.log('Error getDaftarHadirByTanggal: ' + e.toString());
    return [];
  }
}

// ============================================
// LAPORAN
// ============================================
function getLaporan(bulan) {
  try {
    const ss = getSS();
    const sheetAbsensi = ss.getSheetByName(SHEET_ABSENSI);
    const sheetGuru = ss.getSheetByName(SHEET_GURU);
    const sheetEvent = ss.getSheetByName(SHEET_EVENT);
    
    const dataAbsensi = sheetAbsensi.getDataRange().getValues();
    const dataGuru = sheetGuru.getDataRange().getValues();
    const dataEvent = sheetEvent.getDataRange().getValues();
    
    // Parse bulan (format: "2025-05")
    const [tahun, bln] = bulan.split('-').map(Number);
    
    // Hitung total event di bulan tersebut
    let totalEvent = 0;
    for (let i = 1; i < dataEvent.length; i++) {
      const eventDate = new Date(dataEvent[i][2]);
      if (eventDate.getFullYear() === tahun && eventDate.getMonth() + 1 === bln) {
        totalEvent++;
      }
    }
    
    // Hitung kehadiran per guru
    const kehadiranMap = {};
    for (let i = 1; i < dataAbsensi.length; i++) {
      const absenDate = new Date(dataAbsensi[i][6]);
      if (absenDate.getFullYear() === tahun && absenDate.getMonth() + 1 === bln) {
        const nip = dataAbsensi[i][3];
        if (!kehadiranMap[nip]) {
          kehadiranMap[nip] = {
            nip: nip,
            nama: dataAbsensi[i][4],
            sekolah: dataAbsensi[i][5],
            hadir: 0
          };
        }
        kehadiranMap[nip].hadir++;
      }
    }
    
    // Convert ke array dan hitung persentase
    const perGuru = [];
    for (let nip in kehadiranMap) {
      const data = kehadiranMap[nip];
      perGuru.push({
        no: perGuru.length + 1,
        nip: data.nip,
        nama: data.nama,
        sekolah: data.sekolah,
        hadir: data.hadir,
        persentase: totalEvent > 0 ? Math.round((data.hadir / totalEvent) * 100) : 0
      });
    }
    
    // Sort by kehadiran tertinggi
    perGuru.sort((a, b) => b.hadir - a.hadir);
    
    // Update nomor urut
    perGuru.forEach((item, index) => {
      item.no = index + 1;
    });
    
    const totalGuru = dataGuru.length - 1;
    
    return {
      bulan: bulan,
      totalEvent: totalEvent,
      totalGuru: totalGuru,
      totalGuruHadir: perGuru.length,
      perGuru: perGuru
    };
    
  } catch (e) {
    Logger.log('Error getLaporan: ' + e.toString());
    return {
      bulan: bulan,
      totalEvent: 0,
      totalGuru: 0,
      totalGuruHadir: 0,
      perGuru: []
    };
  }
}

// ============================================
// DASHBOARD STATS
// ============================================
function getDashboardStats() {
  try {
    const ss = getSS();
    const sheetAbsensi = ss.getSheetByName(SHEET_ABSENSI);
    const sheetGuru = ss.getSheetByName(SHEET_GURU);
    
    const dataAbsensi = sheetAbsensi.getDataRange().getValues();
    const dataGuru = sheetGuru.getDataRange().getValues();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let hadirHariIni = 0;
    const recentAbsensi = [];
    
    for (let i = 1; i < dataAbsensi.length; i++) {
      const absenDate = new Date(dataAbsensi[i][6]);
      absenDate.setHours(0, 0, 0, 0);
      
      if (absenDate.getTime() === today.getTime()) {
        hadirHariIni++;
        recentAbsensi.push({
          nama: dataAbsensi[i][4],
          sekolah: dataAbsensi[i][5],
          jam: dataAbsensi[i][7],
          status: dataAbsensi[i][8]
        });
      }
    }
    
    // Sort by jam (terbaru dulu) dan ambil 5 terakhir
    recentAbsensi.sort((a, b) => b.jam.localeCompare(a.jam));
    const last5 = recentAbsensi.slice(0, 5);
    
    const totalGuru = dataGuru.length - 1;
    
    return {
      hadirHariIni: hadirHariIni,
      totalGuru: totalGuru,
      recentAbsensi: last5
    };
    
  } catch (e) {
    Logger.log('Error getDashboardStats: ' + e.toString());
    return {
      hadirHariIni: 0,
      totalGuru: 0,
      recentAbsensi: []
    };
  }
}

// ============================================
// LOGGING
// ============================================
function tuliLog(aksi, nip, keterangan) {
  try {
    const ss = getSS();
    const sheet = ss.getSheetByName(SHEET_LOG);
    const now = new Date();
    
    sheet.appendRow([
      now,
      aksi,
      nip,
      keterangan
    ]);
  } catch (e) {
    Logger.log('Error tuliLog: ' + e.toString());
  }
}

/**
 * SETUP DATABASE FUNCTION
 * Jalankan fungsi ini pertama kali untuk membuat semua sheet dan header yang diperlukan.
 */
function setupDatabase() {
  try {
    const ss = getSS();

    const sheets = [
      { name: SHEET_GURU, headers: ['ID', 'NIP', 'NAMA', 'GELAR', 'SEKOLAH', 'KOTA', 'RAW_BARCODE', 'TGL_DAFTAR'] },
      { name: SHEET_EVENT, headers: ['ID', 'NAMA_EVENT', 'TANGGAL', 'LOKASI', 'KETERANGAN', 'STATUS'] },
      { name: SHEET_ABSENSI, headers: ['ID', 'EVENT_ID', 'GURU_ID', 'NIP', 'NAMA', 'SEKOLAH', 'TANGGAL', 'JAM_HADIR', 'STATUS'] },
      { name: SHEET_USERS, headers: ['NAMA', 'EMAIL', 'PASSWORD', 'STATUS', 'ROLE'] },
      { name: SHEET_LOG, headers: ['WAKTU', 'AKSI', 'NIP', 'KETERANGAN'] }
    ];

    sheets.forEach(sheetInfo => {
      let sheet = ss.getSheetByName(sheetInfo.name);
      if (!sheet) {
        sheet = ss.insertSheet(sheetInfo.name);
        Logger.log('Membuat sheet: ' + sheetInfo.name);
      }
      
      // Set headers jika sheet kosong
      if (sheet.getLastRow() === 0) {
        sheet.getRange(1, 1, 1, sheetInfo.headers.length).setValues([sheetInfo.headers]);
        sheet.getRange(1, 1, 1, sheetInfo.headers.length).setFontWeight('bold').setBackground('#f3f3f3');
        Logger.log('Set header untuk sheet: ' + sheetInfo.name);
      }
    });

    // Tambah admin default jika sheet USERS kosong
    const userSheet = ss.getSheetByName(SHEET_USERS);
    if (userSheet.getLastRow() === 1) {
      userSheet.appendRow(['Admin KKG', 'admin@kkg.com', 'admin123', 'AKTIF', 'ADMIN']);
      Logger.log('Admin default ditambahkan: admin@kkg.com / admin123');
    }

    return 'Setup database berhasil! Silakan cek spreadsheet Anda.';
  } catch (e) {
    Logger.log('Error setupDatabase: ' + e.toString());
    return 'Error setup database: ' + e.toString();
  }
}
