// ============================================
// UTILITY FUNCTIONS - SPREADSHEET OPERATIONS
// ============================================

/**
 * Menambahkan row baru ke sheet yang aktif
 * @param {Array} data - Array data untuk row baru, contoh: ['Value1', 'Value2', 'Value3']
 * @return {Object} - Response object dengan status dan message
 */
function addRowToActiveSheet(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    
    if (!data || !Array.isArray(data)) {
      return {
        success: false,
        message: 'Data harus berupa array'
      };
    }
    
    // Append row ke sheet
    sheet.appendRow(data);
    
    const lastRow = sheet.getLastRow();
    
    return {
      success: true,
      message: 'Row berhasil ditambahkan',
      sheetName: sheet.getName(),
      rowNumber: lastRow,
      data: data
    };
    
  } catch (e) {
    Logger.log('Error addRowToActiveSheet: ' + e.toString());
    return {
      success: false,
      message: 'Gagal menambahkan row: ' + e.toString()
    };
  }
}

/**
 * Menambahkan row baru ke sheet tertentu
 * @param {string} sheetName - Nama sheet
 * @param {Array} data - Array data untuk row baru
 * @return {Object} - Response object dengan status dan message
 */
function addRowToSheet(sheetName, data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Sheet "' + sheetName + '" tidak ditemukan'
      };
    }
    
    if (!data || !Array.isArray(data)) {
      return {
        success: false,
        message: 'Data harus berupa array'
      };
    }
    
    sheet.appendRow(data);
    
    const lastRow = sheet.getLastRow();
    
    return {
      success: true,
      message: 'Row berhasil ditambahkan ke sheet "' + sheetName + '"',
      sheetName: sheetName,
      rowNumber: lastRow,
      data: data
    };
    
  } catch (e) {
    Logger.log('Error addRowToSheet: ' + e.toString());
    return {
      success: false,
      message: 'Gagal menambahkan row: ' + e.toString()
    };
  }
}

/**
 * Menambahkan multiple rows sekaligus ke sheet
 * @param {string} sheetName - Nama sheet
 * @param {Array<Array>} dataArray - Array of arrays untuk multiple rows
 * @return {Object} - Response object dengan status dan message
 */
function addMultipleRows(sheetName, dataArray) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Sheet "' + sheetName + '" tidak ditemukan'
      };
    }
    
    if (!dataArray || !Array.isArray(dataArray) || dataArray.length === 0) {
      return {
        success: false,
        message: 'Data harus berupa array of arrays'
      };
    }
    
    const startRow = sheet.getLastRow() + 1;
    const numRows = dataArray.length;
    const numCols = dataArray[0].length;
    
    // Set values untuk multiple rows sekaligus (lebih efisien)
    const range = sheet.getRange(startRow, 1, numRows, numCols);
    range.setValues(dataArray);
    
    return {
      success: true,
      message: numRows + ' rows berhasil ditambahkan ke sheet "' + sheetName + '"',
      sheetName: sheetName,
      startRow: startRow,
      endRow: startRow + numRows - 1,
      rowsAdded: numRows
    };
    
  } catch (e) {
    Logger.log('Error addMultipleRows: ' + e.toString());
    return {
      success: false,
      message: 'Gagal menambahkan rows: ' + e.toString()
    };
  }
}

/**
 * Membuat sheet baru di spreadsheet aktif
 * @param {string} sheetName - Nama sheet baru
 * @param {Array} headers - Array header untuk baris pertama (opsional)
 * @return {Object} - Response object dengan status dan message
 */
function createNewSheet(sheetName, headers) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Cek apakah sheet sudah ada
    const existingSheet = ss.getSheetByName(sheetName);
    if (existingSheet) {
      return {
        success: false,
        message: 'Sheet "' + sheetName + '" sudah ada'
      };
    }
    
    // Buat sheet baru
    const newSheet = ss.insertSheet(sheetName);
    
    // Jika ada headers, tambahkan ke baris pertama
    if (headers && Array.isArray(headers) && headers.length > 0) {
      newSheet.appendRow(headers);
      
      // Format header (bold, background color)
      const headerRange = newSheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f3f4f6');
      headerRange.setHorizontalAlignment('center');
    }
    
    return {
      success: true,
      message: 'Sheet "' + sheetName + '" berhasil dibuat',
      sheetName: sheetName,
      sheetId: newSheet.getSheetId(),
      hasHeaders: headers ? true : false
    };
    
  } catch (e) {
    Logger.log('Error createNewSheet: ' + e.toString());
    return {
      success: false,
      message: 'Gagal membuat sheet: ' + e.toString()
    };
  }
}

/**
 * Membuat sheet baru dengan struktur lengkap (headers + sample data)
 * @param {string} sheetName - Nama sheet baru
 * @param {Array} headers - Array header
 * @param {Array<Array>} sampleData - Array of arrays untuk sample data (opsional)
 * @return {Object} - Response object dengan status dan message
 */
function createSheetWithStructure(sheetName, headers, sampleData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Cek apakah sheet sudah ada
    const existingSheet = ss.getSheetByName(sheetName);
    if (existingSheet) {
      return {
        success: false,
        message: 'Sheet "' + sheetName + '" sudah ada'
      };
    }
    
    // Buat sheet baru
    const newSheet = ss.insertSheet(sheetName);
    
    // Tambahkan headers
    if (headers && Array.isArray(headers) && headers.length > 0) {
      newSheet.appendRow(headers);
      
      // Format header
      const headerRange = newSheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1e40af');
      headerRange.setFontColor('#ffffff');
      headerRange.setHorizontalAlignment('center');
      headerRange.setVerticalAlignment('middle');
      
      // Auto-resize columns
      for (let i = 1; i <= headers.length; i++) {
        newSheet.autoResizeColumn(i);
      }
    }
    
    // Tambahkan sample data jika ada
    let rowsAdded = 0;
    if (sampleData && Array.isArray(sampleData) && sampleData.length > 0) {
      const startRow = 2;
      const numRows = sampleData.length;
      const numCols = sampleData[0].length;
      
      const dataRange = newSheet.getRange(startRow, 1, numRows, numCols);
      dataRange.setValues(sampleData);
      rowsAdded = numRows;
      
      // Format data rows (zebra striping)
      for (let i = 0; i < numRows; i++) {
        if (i % 2 === 0) {
          const rowRange = newSheet.getRange(startRow + i, 1, 1, numCols);
          rowRange.setBackground('#f9fafb');
        }
      }
    }
    
    // Freeze header row
    newSheet.setFrozenRows(1);
    
    return {
      success: true,
      message: 'Sheet "' + sheetName + '" berhasil dibuat dengan struktur lengkap',
      sheetName: sheetName,
      sheetId: newSheet.getSheetId(),
      headers: headers,
      sampleRowsAdded: rowsAdded
    };
    
  } catch (e) {
    Logger.log('Error createSheetWithStructure: ' + e.toString());
    return {
      success: false,
      message: 'Gagal membuat sheet: ' + e.toString()
    };
  }
}

/**
 * Menghapus sheet dari spreadsheet
 * @param {string} sheetName - Nama sheet yang akan dihapus
 * @return {Object} - Response object dengan status dan message
 */
function deleteSheet(sheetName) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Sheet "' + sheetName + '" tidak ditemukan'
      };
    }
    
    // Cegah hapus sheet terakhir
    if (ss.getSheets().length === 1) {
      return {
        success: false,
        message: 'Tidak bisa menghapus sheet terakhir'
      };
    }
    
    ss.deleteSheet(sheet);
    
    return {
      success: true,
      message: 'Sheet "' + sheetName + '" berhasil dihapus'
    };
    
  } catch (e) {
    Logger.log('Error deleteSheet: ' + e.toString());
    return {
      success: false,
      message: 'Gagal menghapus sheet: ' + e.toString()
    };
  }
}

/**
 * Mendapatkan semua data dari sheet
 * @param {string} sheetName - Nama sheet
 * @return {Object} - Response object dengan data
 */
function getAllDataFromSheet(sheetName) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Sheet "' + sheetName + '" tidak ditemukan'
      };
    }
    
    const data = sheet.getDataRange().getValues();
    
    return {
      success: true,
      sheetName: sheetName,
      totalRows: data.length,
      totalCols: data[0] ? data[0].length : 0,
      data: data
    };
    
  } catch (e) {
    Logger.log('Error getAllDataFromSheet: ' + e.toString());
    return {
      success: false,
      message: 'Gagal mengambil data: ' + e.toString()
    };
  }
}

/**
 * Clear semua data di sheet (kecuali header)
 * @param {string} sheetName - Nama sheet
 * @param {boolean} keepHeader - True jika ingin keep header row
 * @return {Object} - Response object dengan status
 */
function clearSheetData(sheetName, keepHeader) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return {
        success: false,
        message: 'Sheet "' + sheetName + '" tidak ditemukan'
      };
    }
    
    const lastRow = sheet.getLastRow();
    
    if (keepHeader && lastRow > 1) {
      // Hapus dari row 2 sampai akhir
      sheet.deleteRows(2, lastRow - 1);
    } else if (!keepHeader && lastRow > 0) {
      // Hapus semua
      sheet.clear();
    }
    
    return {
      success: true,
      message: 'Data di sheet "' + sheetName + '" berhasil dihapus',
      headerKept: keepHeader
    };
    
  } catch (e) {
    Logger.log('Error clearSheetData: ' + e.toString());
    return {
      success: false,
      message: 'Gagal menghapus data: ' + e.toString()
    };
  }
}

// ============================================
// FUNGSI TEST - Untuk testing di Apps Script Editor
// ============================================

/**
 * Test function - Tambah row ke sheet aktif
 */
function testAddRow() {
  const result = addRowToActiveSheet(['Test1', 'Test2', 'Test3', new Date()]);
  Logger.log(result);
}

/**
 * Test function - Buat sheet baru dengan struktur
 */
function testCreateSheet() {
  const headers = ['ID', 'Nama', 'Email', 'Tanggal'];
  const sampleData = [
    ['001', 'John Doe', 'john@example.com', new Date()],
    ['002', 'Jane Smith', 'jane@example.com', new Date()]
  ];
  
  const result = createSheetWithStructure('TEST_SHEET', headers, sampleData);
  Logger.log(result);
}

/**
 * Test function - Tambah multiple rows
 */
function testAddMultipleRows() {
  const data = [
    ['Row1-Col1', 'Row1-Col2', 'Row1-Col3'],
    ['Row2-Col1', 'Row2-Col2', 'Row2-Col3'],
    ['Row3-Col1', 'Row3-Col2', 'Row3-Col3']
  ];
  
  const result = addMultipleRows('TEST_SHEET', data);
  Logger.log(result);
}

/**
 * Test function - Get all data
 */
function testGetAllData() {
  const result = getAllDataFromSheet('TEST_SHEET');
  Logger.log(result);
}

/**
 * Test function - Clear data
 */
function testClearData() {
  const result = clearSheetData('TEST_SHEET', true); // Keep header
  Logger.log(result);
}

/**
 * Test function - Delete sheet
 */
function testDeleteSheet() {
  const result = deleteSheet('TEST_SHEET');
  Logger.log(result);
}
