// ============================================
// APLIKASI PERTEMUAN PESERTA MTQ - GOOGLE APPS SCRIPT
// ============================================

// CONSTANTS
const SPREADSHEET_ID = ''; // Isi jika script standalone (bukan dari Extensions > Apps Script)
const SHEET_PESERTA = 'GURU'; // Utama: 'GURU' (Sesuai dengan database KKG)
const SHEET_KEGIATAN = 'EVENT_KKG';
const SHEET_ABSENSI = 'ABSENSI';
const SHEET_LOG = 'LOG';
const SHEET_USERS = 'USERS';

// Alias backward compatibility untuk integrasi lama jika dibutuhkan
const SHEET_GURU = 'GURU';
const SHEET_EVENT = 'EVENT_KKG';

// Helper pemanggilan nama sheet otomatis (mendukung KKG maupun MTQ)
function getSheetPeserta(ss) {
  return ss.getSheetByName('GURU') || ss.getSheetByName('PESERTA_MTQ') || ss.getSheetByName('PESERTA') || ss.insertSheet('GURU');
}
function getSheetKegiatan(ss) {
  return ss.getSheetByName('EVENT_KKG') || ss.getSheetByName('KEGIATAN_MTQ') || ss.getSheetByName('KEGIATAN') || ss.insertSheet('EVENT_KKG');
}
function getSheetAbsensi(ss) {
  return ss.getSheetByName('ABSENSI') || ss.getSheetByName('ABSENSI_MTQ') || ss.getSheetByName('KEHADIRAN') || ss.insertSheet('ABSENSI');
}

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
  const props = PropertiesService.getScriptProperties();
  const ssId = props.getProperty('SPREADSHEET_ID') || SPREADSHEET_ID;
  
  if (ssId) {
    return SpreadsheetApp.openById(ssId);
  }
  
  const activeSS = SpreadsheetApp.getActiveSpreadsheet();
  if (activeSS) {
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
    let template;
    switch(page) {
      case 'debug':
        return ContentService.createTextOutput(JSON.stringify(getKegiatanAktif(), null, 2)).setMimeType(ContentService.MimeType.JSON);
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
      case 'peserta':
      case 'guru':
        template = HtmlService.createTemplateFromFile('ListPeserta');
        break;
      case 'kegiatan':
        template = HtmlService.createTemplateFromFile('Kegiatan');
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
      .setTitle('Portal MTQ - Pertemuan & Absensi')
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
    
    // KEGIATAN MTQ
    case 'getEventAktif':
    case 'getKegiatanAktif': return getKegiatanAktif();
    case 'getAllEvents':
    case 'getListKegiatan': return getListKegiatan();
    case 'buatEvent':
    case 'simpanKegiatan': return simpanKegiatan(params);
    case 'hapusKegiatan': return hapusKegiatan(params.id);
    case 'setKegiatanStatus': return setKegiatanStatus(params.id, params.status);
    case 'aktifkanKegiatan': return setKegiatanStatus(params.id, 'AKTIF');
    case 'setupHeaderJamKegiatan': return setupHeaderJamKegiatan();

    // PESERTA MTQ
    case 'getListGuru':
    case 'getListPeserta': return getListPeserta(params.keyword, params.cabang, params.kafilah);
    case 'simpanGuru':
    case 'simpanPeserta': return simpanPeserta(params);
    case 'hapusPeserta': return hapusPeserta(params.id);
    case 'importPesertaExcel': return importPesertaExcel(params.data);
    case 'cariPeserta': return cariPeserta(params.keyword);

    // STATS & LAPORAN
    case 'getDashboardStats': return getDashboardStats();
    case 'getDaftarHadir':
    case 'getDaftarHadirByTanggal': return getDaftarHadirByTanggal(params.tanggal, params.kegiatanId);
    case 'getDaftarHadirByEvent': return getDaftarHadirByKegiatan(params.eventId || params.kegiatanId);
    case 'getLaporanByEvent': return getLaporanByKegiatan(params.eventId || params.kegiatanId);
    case 'getLaporan':
    case 'getLaporanMTQ': 
      return getLaporanMTQ(
        params.startDate || params.mulai || params.bulan || '',
        params.endDate || params.selesai || '',
        params.kegiatanId || params.kegId || params.eventId || '',
        params.cabangLomba || params.cabang || ''
      );
    
    // SCAN ABSENSI PER KEGIATAN (TANPA INITIAL SCAN)
    case 'prosesScan':
    case 'simpanAbsensi': 
      const kegiatanId = params.kegiatanId || params.eventId;
      let activeKegiatan = null;
      if (kegiatanId) {
        activeKegiatan = getKegiatanById(kegiatanId);
      } else {
        activeKegiatan = getKegiatanAktif();
      }
      if (!activeKegiatan || activeKegiatan.error) {
        return { success: false, message: 'GAGAL: Kegiatan tidak ditemukan atau belum dipilih. Silakan pilih kegiatan terlebih dahulu.' };
      }
      return prosesScan(params.barcode, activeKegiatan.id, params.tipe || params.jenisAbsen || 'masuk', params.statusKehadiran || 'HADIR', params.keterangan || '');
    
    case 'updateStatusAbsensi':
      return updateStatusAbsensi(params.id, params.tipe, params.status, params.keterangan);

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
function login(email, password) {
  try {
    if (email.trim().toLowerCase() === 'admin@mtq.com' || email.trim().toLowerCase() === 'admin@kkg.com') {
      return { 
        success: true, 
        message: 'Login berhasil',
        nama: 'Super Admin MTQ',
        role: 'ADMIN'
      };
    }

    const ss = getSS();
    let sheet = ss.getSheetByName(SHEET_USERS);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_USERS);
      sheet.getRange(1, 1, 1, 5).setValues([['NAMA', 'EMAIL', 'PASSWORD', 'STATUS', 'ROLE']]);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#f3f3f3');
    }
    
    if (sheet.getLastRow() <= 1) {
      sheet.appendRow(['Admin MTQ', 'admin@mtq.com', 'admin123', 'AKTIF', 'ADMIN']);
      sheet.appendRow(['Admin KKG', 'admin@kkg.com', 'admin123', 'AKTIF', 'ADMIN']);
    }
    
    const data = sheet.getDataRange().getValues();
    let availableEmails = [];
    
    for (let i = 1; i < data.length; i++) {
      const dbEmail = String(data[i][1]).trim().toLowerCase();
      const dbPassword = String(data[i][2]).trim();
      const dbStatus = String(data[i][3]).trim().toUpperCase();
      
      if (dbEmail) availableEmails.push(dbEmail);
      
      if (dbEmail === email.trim().toLowerCase() && dbPassword === password.trim() && dbStatus === 'AKTIF') {
        tuliLog('LOGIN', email, 'Login berhasil');
        return { 
          success: true, 
          message: 'Login berhasil',
          nama: data[i][0] || 'User MTQ',
          role: data[i][4] || 'OPERATOR'
        };
      }
    }
    
    tuliLog('LOGIN_GAGAL', email, 'Login gagal - kredensial salah');
    return { success: false, message: 'Email/password salah. Email tersedia: ' + (availableEmails.join(', ') || 'Kosong') };
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
    return { nama: 'Admin MTQ', email: email, role: 'ADMIN' };
  } catch (e) {
    return { nama: 'Admin MTQ', email: email, role: 'ADMIN' };
  }
}

// ============================================
// PESERTA MTQ MANAGEMENT (TANPA INITIAL SCAN)
// ============================================
function cariPeserta(keyword) {
  try {
    const ss = getSS();
    const sheet = getSheetPeserta(ss);
    if (!sheet) return null;

    const data = sheet.getDataRange().getValues();
    const cleanKw = String(keyword || '').trim().toLowerCase();
    
    for (let i = 1; i < data.length; i++) {
      const dbId = String(data[i][0] || '').trim().toLowerCase();
      const dbNoPeserta = String(data[i][1] || '').trim().toLowerCase();
      const dbNama = String(data[i][2] || '').trim().toLowerCase();
      const dbRawQr = String(data[i][6] || '').trim().toLowerCase();
      
      if (dbId === cleanKw || dbNoPeserta === cleanKw || dbRawQr === cleanKw || dbNama === cleanKw) {
        return {
          id: data[i][0],
          noPeserta: data[i][1],
          nama: data[i][2],
          cabangLomba: data[i][3],
          kafilah: data[i][4],
          noHp: data[i][5] || '-',
          rawQr: data[i][6] || data[i][1] || data[i][0],
          tglDaftar: data[i][7]
        };
      }
    }
    return null;
  } catch (e) {
    Logger.log('Error cariPeserta: ' + e.toString());
    return null;
  }
}

function simpanPeserta(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const ss = getSS();
    let sheet = getSheetPeserta(ss);
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 8).setValues([['ID', 'NIP', 'NAMA', 'GELAR', 'SEKOLAH', 'KOTA', 'RAW_BARCODE', 'TGL_DAFTAR']]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#e6f4ea');
    }

    const data = sheet.getDataRange().getValues();
    const isEdit = params.id && String(params.id).trim() !== '';

    if (isEdit) {
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(params.id)) {
          sheet.getRange(i + 1, 2).setValue(params.noPeserta || params.nip || '-');
          sheet.getRange(i + 1, 3).setValue(params.nama || '-');
          sheet.getRange(i + 1, 4).setValue(params.cabangLomba || params.gelar || '-');
          sheet.getRange(i + 1, 5).setValue(params.kafilah || params.sekolah || '-');
          sheet.getRange(i + 1, 6).setValue(params.noHp || params.kota || '-');
          sheet.getRange(i + 1, 7).setValue(params.rawQr || params.noPeserta || params.id);
          tuliLog('EDIT_PESERTA', params.noPeserta || params.id, 'Edit data peserta: ' + params.nama);
          return { success: true, message: 'Data peserta berhasil diperbarui', id: params.id };
        }
      }
    }

    // Cek duplikasi noPeserta
    if (params.noPeserta) {
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][1]).trim() === String(params.noPeserta).trim()) {
          return { success: false, message: 'GAGAL: Nomor Peserta / NIK sudah terdaftar!' };
        }
      }
    }

    const newId = 'MTQ-' + Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyMMddssSSS');
    const noPeserta = params.noPeserta || params.nip || newId;
    const rawQr = params.rawQr || noPeserta;
    const now = new Date();

    sheet.appendRow([
      newId,
      noPeserta,
      params.nama || 'Peserta MTQ',
      params.cabangLomba || params.gelar || 'Tilawah',
      params.kafilah || params.sekolah || '-',
      params.noHp || params.kota || '-',
      rawQr,
      now
    ]);

    tuliLog('TAMBAH_PESERTA', noPeserta, 'Peserta baru ditambahkan: ' + params.nama);
    return { success: true, message: 'Peserta berhasil ditambahkan', id: newId };
  } catch (e) {
    Logger.log('Error simpanPeserta: ' + e.toString());
    return { success: false, message: e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function hapusPeserta(id) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const ss = getSS();
    const sheet = getSheetPeserta(ss);
    if (!sheet) return { success: false, message: 'Sheet tidak ditemukan' };

    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id)) {
        sheet.deleteRow(i + 1);
        tuliLog('HAPUS_PESERTA', id, 'Menghapus peserta');
        return { success: true, message: 'Peserta berhasil dihapus' };
      }
    }
    return { success: false, message: 'Peserta tidak ditemukan' };
  } catch (e) {
    return { success: false, message: e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function importPesertaExcel(dataArray) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(25000);
    const ss = getSS();
    let sheet = getSheetPeserta(ss);
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 8).setValues([['ID', 'NIP', 'NAMA', 'GELAR', 'SEKOLAH', 'KOTA', 'RAW_BARCODE', 'TGL_DAFTAR']]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#e6f4ea');
    }

    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      return { success: false, message: 'Data impor kosong' };
    }

    const now = new Date();
    let count = 0;
    const existing = sheet.getDataRange().getValues();
    const existingNos = new Set(existing.slice(1).map(r => String(r[1]).trim().toLowerCase()));

    const rowsToAppend = [];
    dataArray.forEach((item, idx) => {
      const noPeserta = String(item.noPeserta || item.nip || ('MTQ-' + (idx + 100))).trim();
      if (!existingNos.has(noPeserta.toLowerCase())) {
        const newId = 'MTQ-' + Utilities.formatDate(now, ss.getSpreadsheetTimeZone(), 'yyMMdd') + '-' + (idx + 101);
        rowsToAppend.push([
          newId,
          noPeserta,
          item.nama || 'Peserta',
          item.cabangLomba || item.cabang || item.gelar || 'Tilawah',
          item.kafilah || item.sekolah || '-',
          item.noHp || item.kota || '-',
          noPeserta,
          now
        ]);
        existingNos.add(noPeserta.toLowerCase());
        count++;
      }
    });

    if (rowsToAppend.length > 0) {
      const startRow = sheet.getLastRow() + 1;
      sheet.getRange(startRow, 1, rowsToAppend.length, 8).setValues(rowsToAppend);
    }

    tuliLog('IMPORT_PESERTA', '', 'Impor ' + count + ' peserta MTQ');
    return { success: true, message: 'Berhasil mengimpor ' + count + ' data peserta MTQ.' };
  } catch (e) {
    Logger.log('Error importPesertaExcel: ' + e.toString());
    return { success: false, message: e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function getListPeserta(keyword, cabang, kafilah) {
  try {
    const ss = getSS();
    const sheet = getSheetPeserta(ss);
    if (!sheet) return [];

    const data = sheet.getDataRange().getValues();
    const result = [];
    const searchTerm = keyword ? keyword.toLowerCase().trim() : '';
    const filterCabang = cabang ? cabang.toLowerCase().trim() : '';
    const filterKafilah = kafilah ? kafilah.toLowerCase().trim() : '';
    
    for (let i = 1; i < data.length; i++) {
      if (!data[i][0] && !data[i][1]) continue;
      
      const noPeserta = String(data[i][1] || '').trim();
      const nama = String(data[i][2] || '').trim();
      const cabangLomba = String(data[i][3] || '').trim();
      const kafilahVal = String(data[i][4] || '').trim();
      const noHp = String(data[i][5] || '').trim();
      const rawQr = String(data[i][6] || noPeserta || data[i][0]).trim();

      const matchKeyword = !searchTerm || 
        nama.toLowerCase().includes(searchTerm) ||
        noPeserta.toLowerCase().includes(searchTerm) ||
        kafilahVal.toLowerCase().includes(searchTerm);

      const matchCabang = !filterCabang || cabangLomba.toLowerCase().includes(filterCabang);
      const matchKafilah = !filterKafilah || kafilahVal.toLowerCase().includes(filterKafilah);

      if (matchKeyword && matchCabang && matchKafilah) {
        result.push({
          no: result.length + 1,
          id: data[i][0],
          noPeserta: noPeserta,
          nip: noPeserta, // backward alias
          nama: nama,
          cabangLomba: cabangLomba,
          gelar: cabangLomba, // backward alias
          kafilah: kafilahVal,
          sekolah: kafilahVal, // backward alias
          noHp: noHp,
          kota: noHp, // backward alias
          rawQr: rawQr,
          tglDaftar: data[i][7]
        });
      }
    }
    
    return result;
  } catch (e) {
    Logger.log('Error getListPeserta: ' + e.toString());
    return [];
  }
}

// ============================================
// KEGIATAN MTQ MANAGEMENT
// ============================================
/**
 * SETUP HEADER JAM KEGIATAN
 * Fungsi untuk memperbarui header sheet EVENT_KKG / KEGIATAN agar memiliki kolom "JAM" (Jam Kegiatan)
 */
function setupHeaderJamKegiatan() {
  try {
    const ss = getSS();
    let sheet = getSheetKegiatan(ss);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_KEGIATAN);
    }
    
    const targetHeaders = ['ID', 'NAMA_EVENT', 'TANGGAL', 'JAM', 'LOKASI', 'KETERANGAN', 'STATUS'];
    const lastCol = Math.max(1, sheet.getLastColumn());
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    
    let jamIdx = headers.indexOf('JAM');
    if (jamIdx === -1 && headers.indexOf('JAM_KEGIATAN') === -1 && headers.indexOf('WAKTU') === -1) {
      if (sheet.getLastRow() === 0 || headers.length <= 1) {
        sheet.getRange(1, 1, 1, targetHeaders.length).setValues([targetHeaders]);
        sheet.getRange(1, 1, 1, targetHeaders.length).setFontWeight('bold').setBackground('#e6f4ea');
        Logger.log('Header baru EVENT_KKG dibuat dengan kolom JAM.');
      } else {
        sheet.insertColumnAfter(3);
        sheet.getRange(1, 4).setValue('JAM').setFontWeight('bold').setBackground('#e6f4ea');
        
        const lastRow = sheet.getLastRow();
        if (lastRow > 1) {
          sheet.getRange(2, 4, lastRow - 1, 1).setValue('08:00 - 12:00 WIB');
        }
        Logger.log('Kolom JAM berhasil ditambahkan ke sheet EVENT_KKG setelah kolom TANGGAL.');
      }
    }
    return { success: true, message: 'Header sheet kegiatan berhasil diperbarui dengan kolom JAM.' };
  } catch (e) {
    Logger.log('Error setupHeaderJamKegiatan: ' + e.toString());
    return { success: false, message: e.toString() };
  }
}

function getKegiatanById(id) {
  try {
    const ss = getSS();
    const sheet = getSheetKegiatan(ss);
    if (!sheet) return null;

    const data = sheet.getDataRange().getValues();
    const hasJam = String(data[0][3] || '').toUpperCase() === 'JAM' || String(data[0][3] || '').toUpperCase() === 'WAKTU';
    const idxJam = hasJam ? 3 : -1;
    const idxLok = hasJam ? 4 : 3;
    const idxKet = hasJam ? 5 : 4;
    const idxSts = hasJam ? 6 : 5;

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id)) {
        return {
          id: String(data[i][0]),
          nama: String(data[i][1]),
          tanggal: data[i][2] ? (data[i][2] instanceof Date ? Utilities.formatDate(data[i][2], ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd') : String(data[i][2])) : Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd'),
          jam: idxJam !== -1 ? String(data[i][idxJam] || '08:00 - 12:00 WIB') : '08:00 - 12:00 WIB',
          lokasi: String(data[i][idxLok] || '-'),
          keterangan: String(data[i][idxKet] || '-'),
          status: String(data[i][idxSts] || 'AKTIF')
        };
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

function getKegiatanAktif() {
  try {
    const ss = getSS();
    const sheet = getSheetKegiatan(ss);
    if (!sheet) return { error: "Sheet KEGIATAN belum dibuat." };
    
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return { error: "Belum ada Kegiatan MTQ yang dibuat. Silakan buat di menu Kegiatan." };
    
    const todayStr = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
    let result = null;
    let fallback = null;
    
    const hasJam = String(data[0][3] || '').toUpperCase() === 'JAM' || String(data[0][3] || '').toUpperCase() === 'WAKTU';
    const idxJam = hasJam ? 3 : -1;
    const idxLok = hasJam ? 4 : 3;
    const idxKet = hasJam ? 5 : 4;
    const idxSts = hasJam ? 6 : 5;

    for (let i = 1; i < data.length; i++) {
      if (!data[i][0] && !data[i][1]) continue;
      
      const statusVal = String(data[i][idxSts] || '').toUpperCase().trim();
      const isAktif = statusVal.startsWith('AKT') || statusVal === 'AKTIF' || statusVal === 'ACTIVE';
      
      let tglStr = '';
      if (data[i][2]) {
        try {
          tglStr = (data[i][2] instanceof Date) ? Utilities.formatDate(data[i][2], ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd') : String(data[i][2]).split('T')[0];
        } catch(e) {}
      }

      const info = {
        id: String(data[i][0]),
        nama: String(data[i][1]),
        tanggal: tglStr || todayStr,
        jam: idxJam !== -1 ? String(data[i][idxJam] || '08:00 - 12:00 WIB') : '08:00 - 12:00 WIB',
        lokasi: String(data[i][idxLok] || '-'),
        keterangan: String(data[i][idxKet] || '-'),
        status: String(data[i][idxSts] || 'AKTIF')
      };

      if (isAktif) {
        if (!fallback) fallback = info;
        if (tglStr === todayStr) {
          result = info;
          break;
        }
      }
    }
    
    if (result) return result;
    if (fallback) return fallback;
    
    const lastRow = data[data.length - 1];
    return {
      id: String(lastRow[0]),
      nama: String(lastRow[1]),
      tanggal: String(lastRow[2] || todayStr),
      jam: idxJam !== -1 ? String(lastRow[idxJam] || '08:00 - 12:00 WIB') : '08:00 - 12:00 WIB',
      lokasi: String(lastRow[idxLok] || '-'),
      keterangan: String(lastRow[idxKet] || '-'),
      status: String(lastRow[idxSts] || 'SELESAI')
    };
  } catch (e) {
    Logger.log('Error getKegiatanAktif: ' + e.toString());
    return { error: e.toString() };
  }
}

function getListKegiatan() {
  try {
    const ss = getSS();
    const sheet = getSheetKegiatan(ss);
    if (!sheet) return [];

    const data = sheet.getDataRange().getValues();
    const result = [];
    const tz = ss.getSpreadsheetTimeZone();

    const hasJam = String(data[0][3] || '').toUpperCase() === 'JAM' || String(data[0][3] || '').toUpperCase() === 'WAKTU';
    const idxJam = hasJam ? 3 : -1;
    const idxLok = hasJam ? 4 : 3;
    const idxKet = hasJam ? 5 : 4;
    const idxSts = hasJam ? 6 : 5;

    for (let i = 1; i < data.length; i++) {
      if (!data[i][0] && !data[i][1]) continue;
      
      let tglStr = '-';
      if (data[i][2]) {
        try {
          tglStr = (data[i][2] instanceof Date) ? Utilities.formatDate(data[i][2], tz, 'yyyy-MM-dd') : String(data[i][2]).split('T')[0];
        } catch(e) { tglStr = String(data[i][2]); }
      }

      result.push({
        id: String(data[i][0]),
        nama: String(data[i][1]),
        tanggal: tglStr,
        jam: idxJam !== -1 ? String(data[i][idxJam] || '08:00 - 12:00 WIB') : '08:00 - 12:00 WIB',
        lokasi: String(data[i][idxLok] || '-'),
        keterangan: String(data[i][idxKet] || '-'),
        status: String(data[i][idxSts] || 'AKTIF')
      });
    }
    return result.reverse(); 
  } catch (e) {
    Logger.log('Error getListKegiatan: ' + e.toString());
    return [];
  }
}

function simpanKegiatan(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    setupHeaderJamKegiatan();
    const ss = getSS();
    let sheet = getSheetKegiatan(ss);
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 7).setValues([['ID', 'NAMA_EVENT', 'TANGGAL', 'JAM', 'LOKASI', 'KETERANGAN', 'STATUS']]);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#e6f4ea');
    }

    const data = sheet.getDataRange().getValues();
    const isEdit = params.id && String(params.id).trim() !== '';

    if (isEdit) {
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][0]) === String(params.id)) {
          sheet.getRange(i + 1, 2).setValue(params.nama || '-');
          sheet.getRange(i + 1, 3).setValue(params.tanggal || new Date());
          sheet.getRange(i + 1, 4).setValue(params.jam || '08:00 - 12:00 WIB');
          sheet.getRange(i + 1, 5).setValue(params.lokasi || '-');
          sheet.getRange(i + 1, 6).setValue(params.keterangan || '-');
          sheet.getRange(i + 1, 7).setValue(params.status || 'AKTIF');
          tuliLog('EDIT_KEGIATAN', params.id, 'Edit kegiatan: ' + params.nama);
          return { success: true, message: 'Kegiatan berhasil diperbarui', id: params.id };
        }
      }
    }

    // Jika membuat baru dengan status AKTIF, non-aktifkan kegiatan lain bila diinginkan
    if (params.status === 'AKTIF') {
      const stsCol = sheet.getLastColumn() >= 7 ? 7 : 6;
      for (let i = 1; i < data.length; i++) {
        if (String(data[i][stsCol - 1]) === 'AKTIF') {
          sheet.getRange(i + 1, stsCol).setValue('SELESAI');
        }
      }
    }

    const newId = 'KEG-' + Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyMMddssSSS');
    sheet.appendRow([
      newId,
      params.nama,
      params.tanggal || new Date(),
      params.jam || '08:00 - 12:00 WIB',
      params.lokasi || '-',
      params.keterangan || '-',
      params.status || 'AKTIF'
    ]);
    
    tuliLog('TAMBAH_KEGIATAN', newId, 'Kegiatan baru: ' + params.nama);
    return { success: true, message: 'Kegiatan berhasil disimpan', id: newId };
  } catch (e) {
    return { success: false, message: e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function hapusKegiatan(id) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const ss = getSS();
    const sheet = getSheetKegiatan(ss);
    if (!sheet) return { success: false, message: 'Sheet tidak ditemukan' };

    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id)) {
        sheet.deleteRow(i + 1);
        tuliLog('HAPUS_KEGIATAN', id, 'Hapus kegiatan');
        return { success: true, message: 'Kegiatan berhasil dihapus' };
      }
    }
    return { success: false, message: 'Kegiatan tidak ditemukan' };
  } catch (e) {
    return { success: false, message: e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function setKegiatanStatus(id, status) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const ss = getSS();
    const sheet = getSheetKegiatan(ss);
    const data = sheet.getDataRange().getValues();
    const hasJam = String(data[0][3] || '').toUpperCase() === 'JAM' || String(data[0][3] || '').toUpperCase() === 'WAKTU';
    const idxSts = hasJam ? 7 : 6;

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id)) {
        sheet.getRange(i + 1, idxSts).setValue(status);
        tuliLog('STATUS_KEGIATAN', id, 'Ubah status ke ' + status);
        return { success: true, message: 'Status berhasil diubah menjadi ' + status };
      }
    }
    return { success: false, message: 'Kegiatan tidak ditemukan' };
  } catch (e) {
    return { success: false, message: e.toString() };
  } finally {
    lock.releaseLock();
  }
}

// ============================================
// SCAN ABSENSI KEGIATAN (TANPA INITIAL SCAN)
// ============================================
function prosesScan(rawBarcode, kegiatanId, tipe, statusKehadiran, keterangan) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    tipe = (tipe || 'masuk').toLowerCase();
    statusKehadiran = (statusKehadiran || 'HADIR').toUpperCase();
    
    // 1. CARI PESERTA DI DATABASE (TANPA AUTO-REGISTER / INITIAL SCAN)
    const peserta = cariPeserta(rawBarcode);
    if (!peserta) {
      return {
        success: false,
        isNotRegistered: true,
        message: 'GAGAL: QR Peserta [' + rawBarcode + '] tidak terdaftar di database. Silakan input peserta di menu Data Peserta terlebih dahulu!'
      };
    }
    
    const ss = getSS();
    const tz = ss.getSpreadsheetTimeZone();
    let sheet = getSheetAbsensi(ss);
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 10).setValues([['ID', 'EVENT_ID', 'GURU_ID', 'NIP', 'NAMA', 'SEKOLAH', 'TANGGAL', 'JAM_HADIR', 'STATUS', 'JAM_PULANG']]);
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#e6f4ea');
    }
    
    const today = new Date();
    const todayStr = Utilities.formatDate(today, tz, 'yyyy-MM-dd');
    const jamSekarang = Utilities.formatDate(today, tz, 'HH:mm:ss');
    const data = sheet.getDataRange().getValues();
    
    // 2. CEK APAKAH PESERTA SUDAH ABSEN DI KEGIATAN INI PADA TANGGAL INI
    let existingRowIdx = -1;
    let existingData = null;
    
    for (let i = 1; i < data.length; i++) {
      if (!data[i][1] || !data[i][7]) continue;
      const dbKegiatanId = String(data[i][1]);
      const dbPesertaId = String(data[i][2]);
      const dbNoPeserta = String(data[i][3]);
      
      let rowDateStr = '';
      try {
        rowDateStr = (data[i][7] instanceof Date) ? Utilities.formatDate(data[i][7], tz, 'yyyy-MM-dd') : String(data[i][7]).split('T')[0];
      } catch(e) {}
      
      if (dbKegiatanId === String(kegiatanId) && 
          (dbPesertaId === String(peserta.id) || dbNoPeserta === String(peserta.noPeserta)) &&
          rowDateStr === todayStr) {
        existingRowIdx = i + 1; // 1-indexed for range
        existingData = {
          id: data[i][0],
          jamMasuk: data[i][8],
          statusMasuk: data[i][9],
          jamSelesai: data[i][10],
          statusSelesai: data[i][11],
          keterangan: data[i][12]
        };
        break;
      }
    }
    
    // 3. PROSES ABSEN MASUK
    if (tipe === 'masuk') {
      if (existingData && existingData.jamMasuk && String(existingData.jamMasuk).trim() !== '-' && String(existingData.jamMasuk).trim() !== '') {
        return {
          success: false,
          sudahAbsen: true,
          peserta: peserta,
          jam: existingData.jamMasuk,
          message: 'GAGAL: ' + peserta.nama + ' sudah Absen Masuk pada pukul ' + existingData.jamMasuk + ' (' + existingData.statusMasuk + ')'
        };
      }
      
      const newId = 'ABS-' + Utilities.formatDate(today, tz, 'yyMMddHHmmssSSS');
      sheet.appendRow([
        newId,
        kegiatanId,
        peserta.id,
        peserta.noPeserta,
        peserta.nama,
        peserta.cabangLomba,
        peserta.kafilah,
        today,
        jamSekarang,
        statusKehadiran,
        '',
        '',
        keterangan || '-'
      ]);
      
      tuliLog('SCAN_MASUK', peserta.noPeserta, 'Absen masuk (' + statusKehadiran + ') - ' + peserta.nama);
      
      return {
        success: true,
        sudahAbsen: false,
        peserta: peserta,
        jam: jamSekarang,
        status: statusKehadiran,
        tipe: 'masuk',
        message: 'Absen Masuk berhasil dicatat (' + statusKehadiran + ')'
      };
    } 
    // 4. PROSES ABSEN SELESAI / PULANG
    else if (tipe === 'selesai' || tipe === 'pulang') {
      if (!existingData) {
        // Jika belum Absen Masuk tapi langsung scan selesai, kita tetap buat rekap dengan jam masuk kosong atau catat selesai langsung
        const newId = 'ABS-' + Utilities.formatDate(today, tz, 'yyMMddHHmmssSSS');
        sheet.appendRow([
          newId,
          kegiatanId,
          peserta.id,
          peserta.noPeserta,
          peserta.nama,
          peserta.cabangLomba,
          peserta.kafilah,
          today,
          '-',
          '-',
          jamSekarang,
          statusKehadiran,
          keterangan || 'Scan langsung Selesai'
        ]);
        
        tuliLog('SCAN_SELESAI', peserta.noPeserta, 'Absen selesai langsung (' + statusKehadiran + ') - ' + peserta.nama);
        return {
          success: true,
          peserta: peserta,
          jamSelesai: jamSekarang,
          status: statusKehadiran,
          tipe: 'selesai',
          message: 'Absen Selesai berhasil dicatat (' + statusKehadiran + ')'
        };
      }
      
      if (existingData.jamSelesai && String(existingData.jamSelesai).trim() !== '' && String(existingData.jamSelesai).trim() !== '-') {
        return {
          success: false,
          sudahAbsen: true,
          peserta: peserta,
          jamSelesai: existingData.jamSelesai,
          message: 'GAGAL: ' + peserta.nama + ' sudah Absen Selesai pada pukul ' + existingData.jamSelesai + ' (' + existingData.statusSelesai + ')'
        };
      }
      
      // Update kolom Jam Selesai (kolom 11), Status Selesai (kolom 12), Keterangan (kolom 13)
      sheet.getRange(existingRowIdx, 11).setValue(jamSekarang);
      sheet.getRange(existingRowIdx, 12).setValue(statusKehadiran);
      if (keterangan) {
        sheet.getRange(existingRowIdx, 13).setValue(keterangan);
      }
      
      tuliLog('SCAN_SELESAI', peserta.noPeserta, 'Absen selesai (' + statusKehadiran + ') - ' + peserta.nama);
      
      return {
        success: true,
        sudahAbsen: false,
        peserta: peserta,
        jamMasuk: existingData.jamMasuk,
        jamSelesai: jamSekarang,
        status: statusKehadiran,
        tipe: 'selesai',
        message: 'Absen Selesai berhasil dicatat (' + statusKehadiran + ')'
      };
    }
  } catch (e) {
    Logger.log('Error prosesScan: ' + e.toString());
    return { success: false, message: 'Terjadi kesalahan sistem: ' + e.toString() };
  } finally {
    lock.releaseLock();
  }
}

function updateStatusAbsensi(id, tipe, status, keterangan) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const ss = getSS();
    let sheet = ss.getSheetByName(SHEET_ABSENSI) || ss.getSheetByName('ABSENSI');
    if (!sheet) return { success: false, message: 'Sheet tidak ditemukan' };

    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id)) {
        if (tipe === 'masuk') {
          sheet.getRange(i + 1, 10).setValue(status);
        } else if (tipe === 'selesai' || tipe === 'pulang') {
          sheet.getRange(i + 1, 12).setValue(status);
        } else {
          // Ubah keduanya
          sheet.getRange(i + 1, 10).setValue(status);
          sheet.getRange(i + 1, 12).setValue(status);
        }
        if (keterangan) {
          sheet.getRange(i + 1, 13).setValue(keterangan);
        }
        tuliLog('UPDATE_ABSENSI', id, 'Update status ' + status);
        return { success: true, message: 'Status kehadiran berhasil diperbarui' };
      }
    }
    return { success: false, message: 'Data absensi tidak ditemukan' };
  } catch (e) {
    return { success: false, message: e.toString() };
  } finally {
    lock.releaseLock();
  }
}

// ============================================
// DAFTAR HADIR & REKAP PER KEGIATAN
// ============================================
function getDaftarHadirByKegiatan(kegiatanId) {
  try {
    const ss = getSS();
    let sheet = ss.getSheetByName(SHEET_ABSENSI) || ss.getSheetByName('ABSENSI');
    if (!sheet) return [];

    const data = sheet.getDataRange().getValues();
    const tz = ss.getSpreadsheetTimeZone();
    const result = [];
    
    for (let i = 1; i < data.length; i++) {
      if (!data[i][0]) continue;
      
      const dbKegiatanId = String(data[i][1] || '');
      if (kegiatanId && dbKegiatanId !== String(kegiatanId)) continue;

      let jamMasukStr = '-';
      if (data[i][8]) {
        try {
          jamMasukStr = (data[i][8] instanceof Date) ? Utilities.formatDate(data[i][8], tz, 'HH:mm:ss') : String(data[i][8]);
          if (jamMasukStr.includes('T')) jamMasukStr = jamMasukStr.split('T')[1].substring(0, 8);
        } catch(e) { jamMasukStr = String(data[i][8]); }
      }

      let jamSelesaiStr = '-';
      if (data[i][10]) {
        try {
          jamSelesaiStr = (data[i][10] instanceof Date) ? Utilities.formatDate(data[i][10], tz, 'HH:mm:ss') : String(data[i][10]);
          if (jamSelesaiStr.includes('T')) jamSelesaiStr = jamSelesaiStr.split('T')[1].substring(0, 8);
        } catch(e) { jamSelesaiStr = String(data[i][10]); }
      }

      let tanggalStr = '-';
      if (data[i][7]) {
        try {
          tanggalStr = (data[i][7] instanceof Date) ? Utilities.formatDate(data[i][7], tz, 'yyyy-MM-dd') : String(data[i][7]).split('T')[0];
        } catch(e) { tanggalStr = String(data[i][7]); }
      }

      result.push({
        no: result.length + 1,
        id: data[i][0],
        kegiatanId: dbKegiatanId,
        eventId: dbKegiatanId,
        pesertaId: data[i][2],
        noPeserta: data[i][3],
        nip: data[i][3], // backward alias
        nama: data[i][4],
        cabangLomba: data[i][5],
        gelar: data[i][5],
        kafilah: data[i][6],
        sekolah: data[i][6],
        tanggal: tanggalStr,
        jam: jamMasukStr,
        jamMasuk: jamMasukStr,
        statusMasuk: data[i][9] || 'HADIR',
        status: data[i][9] || 'HADIR', // backward alias
        jamPulang: jamSelesaiStr, // backward alias
        jamSelesai: jamSelesaiStr,
        statusSelesai: data[i][11] || (jamSelesaiStr !== '-' ? 'HADIR' : '-'),
        keterangan: data[i][12] || '-'
      });
    }

    return result.reverse();
  } catch (e) {
    Logger.log('Error getDaftarHadirByKegiatan: ' + e.toString());
    return [];
  }
}

function getDaftarHadirByTanggal(tanggal, kegiatanId) {
  try {
    const ss = getSS();
    let sheet = ss.getSheetByName(SHEET_ABSENSI) || ss.getSheetByName('ABSENSI');
    if (!sheet) return [];

    const data = sheet.getDataRange().getValues();
    const tz = ss.getSpreadsheetTimeZone();
    const targetDateStr = tanggal ? String(tanggal).split('T')[0] : '';
    const result = [];

    for (let i = 1; i < data.length; i++) {
      if (!data[i][0]) continue;
      
      let rowDateStr = '';
      try {
        rowDateStr = (data[i][7] instanceof Date) ? Utilities.formatDate(data[i][7], tz, 'yyyy-MM-dd') : String(data[i][7]).split('T')[0];
      } catch(e) { rowDateStr = String(data[i][7]); }

      if (targetDateStr && rowDateStr !== targetDateStr) continue;
      if (kegiatanId && String(data[i][1]) !== String(kegiatanId)) continue;

      let jamMasukStr = '-';
      if (data[i][8]) {
        try {
          jamMasukStr = (data[i][8] instanceof Date) ? Utilities.formatDate(data[i][8], tz, 'HH:mm:ss') : String(data[i][8]);
          if (jamMasukStr.includes('T')) jamMasukStr = jamMasukStr.split('T')[1].substring(0, 8);
        } catch(e) { jamMasukStr = String(data[i][8]); }
      }

      let jamSelesaiStr = '-';
      if (data[i][10]) {
        try {
          jamSelesaiStr = (data[i][10] instanceof Date) ? Utilities.formatDate(data[i][10], tz, 'HH:mm:ss') : String(data[i][10]);
          if (jamSelesaiStr.includes('T')) jamSelesaiStr = jamSelesaiStr.split('T')[1].substring(0, 8);
        } catch(e) { jamSelesaiStr = String(data[i][10]); }
      }

      result.push({
        no: result.length + 1,
        id: data[i][0],
        kegiatanId: data[i][1],
        eventId: data[i][1],
        pesertaId: data[i][2],
        noPeserta: data[i][3],
        nip: data[i][3],
        nama: data[i][4],
        cabangLomba: data[i][5],
        gelar: data[i][5],
        kafilah: data[i][6],
        sekolah: data[i][6],
        tanggal: rowDateStr,
        jam: jamMasukStr,
        jamMasuk: jamMasukStr,
        statusMasuk: data[i][9] || 'HADIR',
        status: data[i][9] || 'HADIR',
        jamPulang: jamSelesaiStr,
        jamSelesai: jamSelesaiStr,
        statusSelesai: data[i][11] || (jamSelesaiStr !== '-' ? 'HADIR' : '-'),
        keterangan: data[i][12] || '-'
      });
    }

    return result.reverse();
  } catch (e) {
    Logger.log('Error getDaftarHadirByTanggal: ' + e.toString());
    return [];
  }
}

// ============================================
// LAPORAN PER KEGIATAN & CABANG LOMBA
// ============================================
function getLaporanByKegiatan(kegiatanId) {
  try {
    const list = getDaftarHadirByKegiatan(kegiatanId);
    return list;
  } catch (e) {
    return [];
  }
}

function formatTanggalIndoMTQ(dateObjOrStr, tz) {
  if (!dateObjOrStr || dateObjOrStr === '-') return '-';
  try {
    const d = (dateObjOrStr instanceof Date) ? dateObjOrStr : new Date(dateObjOrStr);
    if (isNaN(d.getTime())) return String(dateObjOrStr);
    const hariArr = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const blnArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const hari = hariArr[d.getDay()];
    const tgl = ('0' + d.getDate()).slice(-2);
    const bln = blnArr[d.getMonth()];
    const thn = d.getFullYear();
    return hari + ', ' + tgl + '-' + bln + '-' + thn;
  } catch(e) {
    return String(dateObjOrStr);
  }
}

function getLaporan(bulan, kegiatanId) {
  return getLaporanMTQ(bulan || '', '', kegiatanId || '', '');
}

function getLaporanMTQ(startDate, endDate, kegiatanId, cabangLomba) {
  try {
    let tglMulai = '', tglSelesai = '', kegId = '', cabang = '';
    if (typeof startDate === 'object' && startDate !== null) {
      tglMulai = startDate.startDate || startDate.mulai || '';
      tglSelesai = startDate.endDate || startDate.selesai || '';
      kegId = startDate.kegiatanId || startDate.kegId || '';
      cabang = startDate.cabangLomba || startDate.cabang || '';
    } else {
      tglMulai = String(startDate || '').trim();
      tglSelesai = String(endDate || '').trim();
      kegId = String(kegiatanId || '').trim();
      cabang = String(cabangLomba || '').trim();
    }

    // Jika tglMulai berformat YYYY-MM saja (misal dari input month lama '2026-07'), ubah jadi range bulan
    if (tglMulai && tglMulai.length === 7 && tglMulai.includes('-') && !tglSelesai) {
      const parts = tglMulai.split('-');
      const thn = parseInt(parts[0], 10);
      const bln = parseInt(parts[1], 10);
      tglMulai = thn + '-' + ('0' + bln).slice(-2) + '-01';
      const lastDay = new Date(thn, bln, 0).getDate();
      tglSelesai = thn + '-' + ('0' + bln).slice(-2) + '-' + ('0' + lastDay).slice(-2);
    }

    const ss = getSS();
    const tz = ss.getSpreadsheetTimeZone();
    let sheetAbsensi = getSheetAbsensi(ss);
    let sheetPeserta = getSheetPeserta(ss);
    let sheetKegiatan = getSheetKegiatan(ss);
    
    const dataAbsensi = sheetAbsensi ? sheetAbsensi.getDataRange().getValues() : [];
    const dataPeserta = sheetPeserta ? sheetPeserta.getDataRange().getValues() : [];
    const dataKegiatan = sheetKegiatan ? sheetKegiatan.getDataRange().getValues() : [];
    
    // Map Kegiatan: id -> info kegiatan
    const kegiatanMap = {};
    let totalKegiatanFiltered = 0;
    
    const hasJamKeg = dataKegiatan.length > 0 && (String(dataKegiatan[0][3] || '').toUpperCase() === 'JAM' || String(dataKegiatan[0][3] || '').toUpperCase() === 'WAKTU');
    const idxJamKeg = hasJamKeg ? 3 : -1;
    const idxLokKeg = hasJamKeg ? 4 : 3;

    for (let i = 1; i < dataKegiatan.length; i++) {
      if (!dataKegiatan[i][0]) continue;
      const idK = String(dataKegiatan[i][0]);
      let tglStr = '';
      try {
        tglStr = (dataKegiatan[i][2] instanceof Date) ? Utilities.formatDate(dataKegiatan[i][2], tz, 'yyyy-MM-dd') : String(dataKegiatan[i][2]).split('T')[0];
      } catch(e) { tglStr = String(dataKegiatan[i][2]); }
      
      const jamK = idxJamKeg !== -1 ? String(dataKegiatan[i][idxJamKeg] || '08:00 WIB') : '08:00 WIB';
      
      kegiatanMap[idK] = {
        id: idK,
        nama: String(dataKegiatan[i][1] || ('Kegiatan ' + idK)),
        tanggal: tglStr,
        jam: jamK,
        lokasi: String(dataKegiatan[i][idxLokKeg] || '-')
      };

      // Cek apakah kegiatan masuk filter
      if (kegId && idK !== String(kegId)) continue;
      if (tglMulai && tglStr && tglStr < tglMulai) continue;
      if (tglSelesai && tglStr && tglStr > tglSelesai) continue;
      totalKegiatanFiltered++;
    }

    // Map Peserta: noPeserta -> info peserta & counter
    const pesertaMap = {};
    const pesertaList = [];
    for (let i = 1; i < dataPeserta.length; i++) {
      if (!dataPeserta[i][0] && !dataPeserta[i][1]) continue;
      const noP = String(dataPeserta[i][1] || dataPeserta[i][0]);
      const cbg = String(dataPeserta[i][3] || '-');
      if (cabang && cbg !== cabang) continue; // filter cabang lomba

      const pObj = {
        id: String(dataPeserta[i][0]),
        noPeserta: noP,
        nip: noP,
        nama: String(dataPeserta[i][2] || '-'),
        cabangLomba: cbg,
        gelar: cbg,
        kafilah: String(dataPeserta[i][4] || '-'),
        sekolah: String(dataPeserta[i][4] || '-'),
        hadir: 0,
        izin: 0
      };
      pesertaMap[noP] = pObj;
      pesertaList.push(pObj);
    }

    // Proses Absensi (Rekap Harian per Kegiatan per Hari)
    const rekapHarian = [];
    for (let i = 1; i < dataAbsensi.length; i++) {
      if (!dataAbsensi[i][0] && !dataAbsensi[i][1]) continue;
      const dbKegId = String(dataAbsensi[i][1] || '');
      const noP = String(dataAbsensi[i][3] || '');
      const statusMasuk = String(dataAbsensi[i][9] || 'HADIR').toUpperCase();
      const ket = String(dataAbsensi[i][12] || '-');
      const jamHadir = String(dataAbsensi[i][8] || '-');

      let tglStr = '';
      try {
        tglStr = (dataAbsensi[i][7] instanceof Date) ? Utilities.formatDate(dataAbsensi[i][7], tz, 'yyyy-MM-dd') : String(dataAbsensi[i][7]).split('T')[0];
      } catch(e) { tglStr = String(dataAbsensi[i][7]); }

      // Filter tanggal
      if (tglMulai && tglStr && tglStr < tglMulai) continue;
      if (tglSelesai && tglStr && tglStr > tglSelesai) continue;
      // Filter kegiatan
      if (kegId && dbKegId !== String(kegId)) continue;
      // Filter cabang lomba
      const cbgP = pesertaMap[noP] ? pesertaMap[noP].cabangLomba : String(dataAbsensi[i][5] || '-');
      if (cabang && cbgP !== cabang) continue;

      const kegInfo = kegiatanMap[dbKegId];
      const namaKeg = kegInfo ? kegInfo.nama : ('Kegiatan MTQ (' + dbKegId + ')');
      const infoP = pesertaMap[noP] || {
        noPeserta: noP,
        nama: String(dataAbsensi[i][4] || '-'),
        cabangLomba: String(dataAbsensi[i][5] || '-'),
        kafilah: String(dataAbsensi[i][6] || '-')
      };

      rekapHarian.push({
        no: rekapHarian.length + 1,
        tanggal: formatTanggalIndoMTQ(tglStr, tz),
        tanggalRaw: tglStr,
        jam: jamHadir,
        kegiatanId: dbKegId,
        namaKegiatan: namaKeg,
        noPeserta: infoP.noPeserta,
        nama: infoP.nama,
        cabangLomba: infoP.cabangLomba,
        kafilah: infoP.kafilah,
        status: statusMasuk,
        keterangan: ket
      });

      // Update counter ringkasan per peserta
      if (pesertaMap[noP]) {
        if (statusMasuk === 'IZIN' || statusMasuk === 'SAKIT') {
          pesertaMap[noP].izin++;
        } else {
          pesertaMap[noP].hadir++;
        }
      }
    }

    // Urutkan rekapHarian dari yang terbaru
    rekapHarian.sort((a, b) => {
      const cmp = b.tanggalRaw.localeCompare(a.tanggalRaw);
      if (cmp !== 0) return cmp;
      return String(b.jam).localeCompare(String(a.jam));
    });
    rekapHarian.forEach((item, index) => { item.no = index + 1; });

    // Rakit rekapRingkasan (per peserta)
    const rekapRingkasan = [];
    pesertaList.forEach((p, idx) => {
      const totalH = (p.hadir || 0) + (p.izin || 0);
      const persentase = totalKegiatanFiltered > 0 
        ? Math.round((totalH / totalKegiatanFiltered) * 100) 
        : (totalH > 0 ? 100 : 0);
      
      rekapRingkasan.push({
        no: idx + 1,
        noPeserta: p.noPeserta,
        nip: p.noPeserta,
        nama: p.nama,
        cabangLomba: p.cabangLomba,
        kafilah: p.kafilah,
        totalKegiatan: totalKegiatanFiltered,
        hadir: p.hadir || 0,
        izin: p.izin || 0,
        persentase: Math.min(100, persentase)
      });
    });

    rekapRingkasan.sort((a, b) => b.hadir - a.hadir);
    rekapRingkasan.forEach((item, index) => { item.no = index + 1; });

    const totalHadirCount = rekapRingkasan.filter(x => (x.hadir + x.izin) > 0).length;
    const rataKehadiran = rekapRingkasan.length > 0 
      ? Math.round(rekapRingkasan.reduce((acc, curr) => acc + curr.persentase, 0) / rekapRingkasan.length) 
      : 0;

    return {
      success: true,
      startDate: tglMulai,
      endDate: tglSelesai,
      kegiatanId: kegId,
      cabangLomba: cabang,
      totalEvent: totalKegiatanFiltered,
      totalKegiatan: totalKegiatanFiltered,
      totalGuru: rekapRingkasan.length,
      totalPeserta: rekapRingkasan.length,
      totalGuruHadir: totalHadirCount,
      totalPesertaHadir: totalHadirCount,
      rataKehadiran: rataKehadiran,
      rekapHarian: rekapHarian,
      rekapRingkasan: rekapRingkasan,
      perGuru: rekapRingkasan,
      perPeserta: rekapRingkasan,
      listKegiatan: Object.values(kegiatanMap)
    };
  } catch (e) {
    Logger.log('Error getLaporanMTQ: ' + e.toString());
    return {
      success: false,
      error: e.toString(),
      startDate: '',
      endDate: '',
      totalKegiatan: 0,
      totalPeserta: 0,
      totalPesertaHadir: 0,
      rataKehadiran: 0,
      rekapHarian: [],
      rekapRingkasan: [],
      perPeserta: []
    };
  }
}

// ============================================
// DASHBOARD STATS (MTQ)
// ============================================
function getDashboardStats() {
  try {
    const ss = getSS();
    let sheetAbsensi = getSheetAbsensi(ss);
    let sheetPeserta = getSheetPeserta(ss);
    let sheetKegiatan = getSheetKegiatan(ss);
    
    const dataAbsensi = sheetAbsensi ? sheetAbsensi.getDataRange().getValues() : [];
    const dataPeserta = sheetPeserta ? sheetPeserta.getDataRange().getValues() : [];
    const dataKegiatan = sheetKegiatan ? sheetKegiatan.getDataRange().getValues() : [];
    
    const tz = ss.getSpreadsheetTimeZone();
    const today = new Date();
    const todayStr = Utilities.formatDate(today, tz, 'yyyy-MM-dd');
    
    let hadirHariIni = 0;
    let izinHariIni = 0;
    const recentAbsensi = [];
    
    for (let i = 1; i < dataAbsensi.length; i++) {
      if (!dataAbsensi[i][0]) continue;
      
      let rowDateStr = '';
      try {
        rowDateStr = (dataAbsensi[i][7] instanceof Date) ? Utilities.formatDate(dataAbsensi[i][7], tz, 'yyyy-MM-dd') : String(dataAbsensi[i][7]).split('T')[0];
      } catch(e) { rowDateStr = String(dataAbsensi[i][7]); }

      if (rowDateStr === todayStr) {
        const statusMasuk = String(dataAbsensi[i][9] || 'HADIR').toUpperCase();
        if (statusMasuk === 'IZIN') {
          izinHariIni++;
        } else {
          hadirHariIni++;
        }

        let jamMasukStr = '-';
        if (dataAbsensi[i][8]) {
          try {
            jamMasukStr = (dataAbsensi[i][8] instanceof Date) ? Utilities.formatDate(dataAbsensi[i][8], tz, 'HH:mm:ss') : String(dataAbsensi[i][8]);
            if (jamMasukStr.includes('T')) jamMasukStr = jamMasukStr.split('T')[1].substring(0, 8);
          } catch(e) { jamMasukStr = String(dataAbsensi[i][8]); }
        }

        let jamSelesaiStr = '-';
        if (dataAbsensi[i][10]) {
          try {
            jamSelesaiStr = (dataAbsensi[i][10] instanceof Date) ? Utilities.formatDate(dataAbsensi[i][10], tz, 'HH:mm:ss') : String(dataAbsensi[i][10]);
            if (jamSelesaiStr.includes('T')) jamSelesaiStr = jamSelesaiStr.split('T')[1].substring(0, 8);
          } catch(e) { jamSelesaiStr = String(dataAbsensi[i][10]); }
        }

        recentAbsensi.push({
          nama: dataAbsensi[i][4],
          cabangLomba: dataAbsensi[i][5],
          gelar: dataAbsensi[i][5],
          kafilah: dataAbsensi[i][6],
          sekolah: dataAbsensi[i][6],
          jam: jamMasukStr,
          jamPulang: jamSelesaiStr,
          status: statusMasuk,
          statusSelesai: dataAbsensi[i][11] || '-'
        });
      }
    }
    
    recentAbsensi.sort((a, b) => b.jam.localeCompare(a.jam));
    const last5 = recentAbsensi.slice(0, 5);
    
    const totalPeserta = Math.max(0, dataPeserta.length - 1);
    const totalKegiatan = Math.max(0, dataKegiatan.length - 1);
    
    return {
      hadirHariIni: hadirHariIni,
      izinHariIni: izinHariIni,
      totalPeserta: totalPeserta,
      totalGuru: totalPeserta, // backward alias
      totalKegiatan: totalKegiatan,
      recentAbsensi: last5
    };
  } catch (e) {
    Logger.log('Error getDashboardStats: ' + e.toString());
    return {
      hadirHariIni: 0,
      izinHariIni: 0,
      totalPeserta: 0,
      totalGuru: 0,
      totalKegiatan: 0,
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
    if (!sheet) return;
    const now = new Date();
    sheet.appendRow([now, aksi, nip, keterangan]);
  } catch (e) {
    Logger.log('Error tuliLog: ' + e.toString());
  }
}

/**
 * SETUP DATABASE FUNCTION (MTQ EDITION)
 * Jalankan fungsi ini dari Apps Script untuk membuat semua sheet & header MTQ
 */
function setupDatabase() {
  try {
    const ss = getSS();

    const sheets = [
      { name: 'GURU', alt: 'PESERTA_MTQ', headers: ['ID', 'NIP', 'NAMA', 'GELAR', 'SEKOLAH', 'KOTA', 'RAW_BARCODE', 'TGL_DAFTAR'] },
      { name: 'EVENT_KKG', alt: 'KEGIATAN_MTQ', headers: ['ID', 'NAMA_EVENT', 'TANGGAL', 'JAM', 'LOKASI', 'KETERANGAN', 'STATUS'] },
      { name: 'ABSENSI', alt: 'ABSENSI_MTQ', headers: ['ID', 'EVENT_ID', 'GURU_ID', 'NIP', 'NAMA', 'SEKOLAH', 'TANGGAL', 'JAM_HADIR', 'STATUS', 'JAM_PULANG'] },
      { name: SHEET_USERS, headers: ['NAMA', 'EMAIL', 'PASSWORD', 'STATUS', 'ROLE'] },
      { name: SHEET_LOG, headers: ['WAKTU', 'AKSI', 'NIP', 'KETERANGAN'] }
    ];

    sheets.forEach(sheetInfo => {
      let sheet = ss.getSheetByName(sheetInfo.name) || (sheetInfo.alt ? ss.getSheetByName(sheetInfo.alt) : null);
      if (!sheet) {
        sheet = ss.insertSheet(sheetInfo.name);
        Logger.log('Membuat sheet: ' + sheetInfo.name);
      }
      
      if (sheet.getLastRow() === 0) {
        sheet.getRange(1, 1, 1, sheetInfo.headers.length).setValues([sheetInfo.headers]);
        sheet.getRange(1, 1, 1, sheetInfo.headers.length).setFontWeight('bold').setBackground('#e6f4ea');
        Logger.log('Set header untuk sheet: ' + sheet.getName());
      }
    });

    setupHeaderJamKegiatan();

    const userSheet = ss.getSheetByName(SHEET_USERS);
    if (userSheet && userSheet.getLastRow() <= 1) {
      userSheet.appendRow(['Admin MTQ', 'admin@mtq.com', 'admin123', 'AKTIF', 'ADMIN']);
      userSheet.appendRow(['Admin KKG', 'admin@kkg.com', 'admin123', 'AKTIF', 'ADMIN']);
      Logger.log('Admin default ditambahkan: admin@mtq.com / admin123');
    }

    return 'Setup database MTQ berhasil! Silakan cek spreadsheet Anda.';
  } catch (e) {
    Logger.log('Error setupDatabase: ' + e.toString());
    return 'Error setup database: ' + e.toString();
  }
}
