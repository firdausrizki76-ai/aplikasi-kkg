// ============================================
// VERCEL FRONTEND - PORTAL MTQ (MUSABAQAH TILAWATIL QURAN)
// ============================================

const getSidebarHTML = (active) => {
    const menus = [
        { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
        { id: 'kegiatan', icon: 'event', label: 'Kegiatan MTQ' },
        { id: 'peserta', icon: 'groups', label: 'Data Peserta' },
        { id: 'scanner', icon: 'qr_code_scanner', label: 'QR Scanner' },
        { id: 'hadir', icon: 'assignment', label: 'Daftar Hadir' },
        { id: 'laporan', icon: 'description', label: 'Laporan' }
    ];

    const desktopMenu = menus.map(m => `
        <button onclick="navigate('${m.id}')" class="w-full flex items-center gap-3 px-4 py-3 ${active === m.id ? 'text-emerald-700 font-bold bg-emerald-50 rounded-xl border-r-4 border-emerald-600' : 'text-gray-500 hover:bg-gray-50 rounded-xl'} transition-all">
            <span class="material-symbols-outlined text-[22px]">${m.icon}</span>
            <span class="text-sm">${m.label}</span>
        </button>
    `).join('');

    const mobileMenu = menus.map(m => `
        <button onclick="navigate('${m.id}')" class="flex flex-col items-center gap-1 ${active === m.id ? 'text-emerald-700 font-bold' : 'text-gray-400'} transition-all">
            <span class="material-symbols-outlined text-xl">${m.icon}</span>
            <span class="text-[9px] font-bold uppercase">${m.label === 'QR Scanner' ? 'Scan' : m.label.split(' ')[0]}</span>
        </button>
    `).join('');

    return `
        <!-- Desktop Sidebar -->
        <aside class="hidden lg:flex h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-100 flex flex-col py-6 z-50">
            <div class="px-6 mb-8 flex items-center gap-3">
                <div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md">
                    <span class="material-symbols-outlined text-amber-300">mosque</span>
                </div>
                <div>
                    <h1 class="text-lg font-extrabold text-gray-900 leading-tight">Portal MTQ</h1>
                    <p class="text-[10px] text-amber-600 font-bold uppercase tracking-wider">Vercel Edition</p>
                </div>
            </div>
            <nav class="flex-1 space-y-1 px-4">${desktopMenu}</nav>
            <div class="mt-auto border-t pt-4 px-4">
                <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl font-medium text-sm">
                    <span class="material-symbols-outlined text-[20px]">logout</span> <span>Keluar</span>
                </button>
            </div>
        </aside>

        <!-- Mobile Navigation -->
        <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 px-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            ${mobileMenu}
            <button onclick="logout()" class="flex flex-col items-center gap-1 text-red-400">
                <span class="material-symbols-outlined">logout</span>
                <span class="text-[9px] font-bold uppercase">Keluar</span>
            </button>
        </nav>
    `;
};

// ============================================
// PAGES TEMPLATES
// ============================================
const PAGES = {
    login: () => `
        <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950">
            <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/20">
                <div class="text-center mb-8">
                    <div class="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg border-2 border-amber-400">
                        <span class="material-symbols-outlined text-amber-300 text-5xl">mosque</span>
                    </div>
                    <span class="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-bold text-[10px] uppercase tracking-widest rounded-full mb-2">Musabaqah Tilawatil Quran</span>
                    <h1 class="text-2xl font-extrabold text-gray-900 leading-tight">Portal MTQ</h1>
                    <p class="text-gray-500 text-sm mt-1 font-medium">Sistem Pertemuan & Absensi Peserta</p>
                </div>
                <form id="loginForm" onsubmit="handleLoginVercel(event)" class="space-y-4">
                    <div class="space-y-1">
                        <label class="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Username / Email</label>
                        <input type="text" id="loginEmail" required placeholder="admin" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-600 outline-none transition-all text-sm font-medium">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                        <input type="password" id="loginPass" required placeholder="••••••••" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-600 outline-none transition-all text-sm font-medium">
                    </div>
                    <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg transition-all mt-4 active:scale-95">MASUK PORTAL</button>
                </form>
            </div>
        </div>
    `,
    dashboard: () => `
        <div class="flex font-['Inter'] text-gray-800">
            ${getSidebarHTML('dashboard')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8 flex justify-between items-center">
                    <div>
                        <h2 class="text-2xl font-extrabold text-gray-900">Dashboard MTQ</h2>
                        <p class="text-gray-500 text-sm">Ringkasan aktivitas & kehadiran peserta.</p>
                    </div>
                    <button onclick="navigate('kegiatan')" class="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md hover:bg-emerald-700">
                        <span class="material-symbols-outlined text-sm">add_circle</span> <span>Buat Kegiatan</span>
                    </button>
                </header>
                <div id="dashboardStats" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl">👥</div>
                        <div><p class="text-xs text-gray-400 font-bold uppercase">Total Peserta</p><h3 id="statTotalPeserta" class="text-2xl font-black text-gray-900">...</h3></div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">✅</div>
                        <div><p class="text-xs text-gray-400 font-bold uppercase">Hadir Hari Ini</p><h3 id="statHadirHariIni" class="text-2xl font-black text-gray-900">...</h3></div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-bold text-xl">🟡</div>
                        <div><p class="text-xs text-gray-400 font-bold uppercase">Izin Hari Ini</p><h3 id="statIzinHariIni" class="text-2xl font-black text-gray-900">...</h3></div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-bold text-xl">🕌</div>
                        <div><p class="text-xs text-gray-400 font-bold uppercase">Kegiatan Aktif</p><h3 id="statKegiatanAktif" class="text-sm font-bold text-gray-900 truncate">...</h3></div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 class="font-bold text-gray-800 mb-4">Aktivitas Kehadiran Terkini</h3>
                    <div id="dashboardRecentList" class="text-sm text-gray-500 italic">Memuat riwayat kehadiran...</div>
                </div>
            </main>
        </div>
    `,
    kegiatan: () => `
        <div class="flex font-['Inter'] text-gray-800">
            ${getSidebarHTML('kegiatan')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8 flex justify-between items-center">
                    <div>
                        <h2 class="text-2xl font-extrabold text-gray-900">Jadwal & Kegiatan MTQ</h2>
                        <p class="text-gray-500 text-sm">Kelola daftar agenda pertemuan yang akan absen.</p>
                    </div>
                    <button onclick="openKegiatanModal()" class="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md hover:bg-emerald-700">
                        <span class="material-symbols-outlined text-sm">add</span> <span>Tambah Kegiatan</span>
                    </button>
                </header>
                <div id="kegiatanList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="col-span-full p-12 text-center text-gray-400 italic">Memuat daftar kegiatan...</div>
                </div>

                <!-- Modal Buat Kegiatan -->
                <div id="kegiatanModal" class="hidden fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-lg font-bold">Tambah Agenda Kegiatan</h3>
                            <button onclick="closeKegiatanModal()" class="text-gray-400 hover:text-gray-600"><span class="material-symbols-outlined">close</span></button>
                        </div>
                        <form id="kegiatanForm" onsubmit="simpanKegiatan(event)" class="space-y-4">
                            <div>
                                <label class="text-xs font-bold text-gray-500 uppercase">Nama Kegiatan</label>
                                <input type="text" id="kegNama" required class="w-full p-3 bg-gray-50 border rounded-xl outline-none text-sm font-medium" placeholder="Contoh: Pembukaan MTQ">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase">Tanggal</label>
                                    <input type="date" id="kegTgl" required class="w-full p-3 bg-gray-50 border rounded-xl outline-none text-sm">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase">Lokasi</label>
                                    <input type="text" id="kegLok" required class="w-full p-3 bg-gray-50 border rounded-xl outline-none text-sm" placeholder="Masjid Raya / Aula">
                                </div>
                            </div>
                            <div>
                                <label class="text-xs font-bold text-gray-500 uppercase">Keterangan</label>
                                <input type="text" id="kegKet" class="w-full p-3 bg-gray-50 border rounded-xl outline-none text-sm" placeholder="Opsional">
                            </div>
                            <button type="submit" class="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-emerald-700">SIMPAN AGENDA</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    `,
    peserta: () => `
        <div class="flex font-['Inter'] text-gray-800">
            ${getSidebarHTML('peserta')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 class="text-2xl font-extrabold text-gray-900">Data Peserta MTQ</h2>
                        <p class="text-gray-500 text-sm">Kelola peserta & <strong>Generate Kartu QR Massal (ID Card)</strong>.</p>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <button onclick="openModalQrMassal()" class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md">
                            <span class="material-symbols-outlined text-sm">qr_code</span> <span>Generate QR Massal</span>
                        </button>
                        <button onclick="openPesertaModal()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md">
                            <span class="material-symbols-outlined text-sm">person_add</span> <span>Tambah Peserta</span>
                        </button>
                    </div>
                </header>

                <div class="bg-white p-4 rounded-2xl shadow-sm border mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div class="flex items-center gap-2 w-full sm:w-80 bg-gray-50 px-3 py-2 rounded-xl border">
                        <span class="material-symbols-outlined text-gray-400">search</span>
                        <input type="text" id="pesertaSearch" onkeyup="filterPesertaList()" placeholder="Cari nama / kafilah..." class="bg-transparent text-sm w-full outline-none font-medium">
                    </div>
                    <div class="flex items-center gap-2">
                        <label class="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold text-xs cursor-pointer hover:bg-blue-100 transition-all flex items-center gap-2">
                            <span class="material-symbols-outlined text-sm">upload_file</span> <span>Import Excel (.xlsx)</span>
                            <input type="file" id="excelFile" accept=".xlsx,.xls" onchange="importExcel(event)" class="hidden">
                        </label>
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-sm border overflow-x-auto">
                    <table class="w-full text-left text-sm min-w-[650px]">
                        <thead class="bg-gray-50 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                            <tr>
                                <th class="p-4">No. Peserta</th>
                                <th class="p-4">Nama Peserta</th>
                                <th class="p-4">Cabang Lomba</th>
                                <th class="p-4">Kafilah / Utusan</th>
                                <th class="p-4">No. HP</th>
                                <th class="p-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="pesertaTableBody" class="divide-y divide-gray-50">
                            <tr><td colspan="6" class="p-12 text-center text-gray-400 italic">Memuat data peserta...</td></tr>
                        </tbody>
                    </table>
                </div>

                <!-- Modal Tambah Peserta -->
                <div id="pesertaModal" class="hidden fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-lg font-bold">Tambah Peserta MTQ</h3>
                            <button onclick="closePesertaModal()" class="text-gray-400 hover:text-gray-600"><span class="material-symbols-outlined">close</span></button>
                        </div>
                        <form id="pesertaForm" onsubmit="simpanPeserta(event)" class="space-y-4">
                            <div>
                                <label class="text-xs font-bold text-gray-500 uppercase">No. Peserta / NIK</label>
                                <input type="text" id="pNo" required class="w-full p-3 bg-gray-50 border rounded-xl text-sm font-medium" placeholder="Contoh: MTQ-001">
                            </div>
                            <div>
                                <label class="text-xs font-bold text-gray-500 uppercase">Nama Lengkap</label>
                                <input type="text" id="pNama" required class="w-full p-3 bg-gray-50 border rounded-xl text-sm font-medium" placeholder="Nama Peserta">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase">Cabang Lomba</label>
                                    <input type="text" id="pCabang" required class="w-full p-3 bg-gray-50 border rounded-xl text-sm font-medium" placeholder="Tilawah Dewasa">
                                </div>
                                <div>
                                    <label class="text-xs font-bold text-gray-500 uppercase">Kafilah</label>
                                    <input type="text" id="pKafilah" required class="w-full p-3 bg-gray-50 border rounded-xl text-sm font-medium" placeholder="Kafilah DKI Jakarta">
                                </div>
                            </div>
                            <div>
                                <label class="text-xs font-bold text-gray-500 uppercase">No. WhatsApp/HP</label>
                                <input type="text" id="pHp" class="w-full p-3 bg-gray-50 border rounded-xl text-sm font-medium" placeholder="08123456789">
                            </div>
                            <button type="submit" class="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-emerald-700">SIMPAN PESERTA</button>
                        </form>
                    </div>
                </div>

                <!-- Modal Generate QR Massal (ID Card) -->
                <div id="modalQrMassal" class="hidden fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div class="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-6 max-h-[90vh] flex flex-col">
                        <div class="flex justify-between items-center mb-4 pb-4 border-b">
                            <div>
                                <h3 class="text-lg font-bold text-gray-900">Generate Kartu QR Massal (ID Card MTQ)</h3>
                                <p class="text-xs text-gray-500">Siap dicetak pada kertas A4 untuk seluruh peserta terdaftar.</p>
                            </div>
                            <div class="flex gap-2">
                                <button onclick="printIdCards()" class="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md">
                                    <span class="material-symbols-outlined text-sm">print</span> Cetak Sekarang (Print)
                                </button>
                                <button onclick="closeModalQrMassal()" class="text-gray-400 hover:text-gray-600 p-2"><span class="material-symbols-outlined">close</span></button>
                            </div>
                        </div>
                        <div id="qrMassalContainer" class="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-xl">
                            <p class="text-center text-gray-400 col-span-full py-8">Memuat dan membuat QR Code peserta...</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `,
    scanner: () => `
        <div class="flex font-['Inter'] text-gray-800">
            ${getSidebarHTML('scanner')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8">
                    <h2 class="text-2xl font-extrabold text-gray-900">QR Scanner Absensi MTQ</h2>
                    <p class="text-emerald-600 font-semibold text-xs flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">verified</span> Pemindai Kehadiran Kegiatan
                    </p>
                </header>

                <div class="max-w-xl mx-auto">
                    <!-- Pilih Kegiatan -->
                    <div class="bg-white p-4 rounded-2xl shadow-sm border mb-4">
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-2">1. Pilih Agenda Kegiatan yang Sedang Berlangsung:</label>
                        <select id="kegiatanSelect" class="w-full p-3 bg-gray-50 border rounded-xl font-bold text-sm text-gray-800 outline-none focus:border-emerald-500">
                            <option value="">-- Memuat Kegiatan --</option>
                        </select>
                    </div>

                    <!-- Pilih Sesi & Status Kehadiran -->
                    <div class="bg-white p-4 rounded-2xl shadow-sm border mb-6 space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-400 uppercase mb-2">2. Sesi Pemindaian:</label>
                            <div class="flex gap-2">
                                <button id="modeMasuk" onclick="setScannerMode('MASUK')" class="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all bg-emerald-600 text-white shadow-md">
                                    <span class="material-symbols-outlined text-lg">login</span> Absen Masuk
                                </button>
                                <button id="modeSelesai" onclick="setScannerMode('SELESAI')" class="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all bg-white text-gray-500 hover:text-gray-700 border border-gray-200">
                                    <span class="material-symbols-outlined text-lg">logout</span> Absen Selesai
                                </button>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-400 uppercase mb-2">3. Status Kehadiran Peserta:</label>
                            <div class="flex gap-2 items-center">
                                <button id="statusHadir" onclick="setStatusAbsen('HADIR')" class="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white shadow-sm">
                                    🟢 HADIR (Normal)
                                </button>
                                <button id="statusIzin" onclick="setStatusAbsen('IZIN')" class="px-5 py-2.5 rounded-xl font-bold text-xs bg-white text-gray-500 border border-gray-200">
                                    🟡 IZIN (Sakit/Udhur)
                                </button>
                                <div id="ketIzinWrapper" class="flex-1 hidden">
                                    <input type="text" id="ketIzin" placeholder="Keterangan Izin..." class="w-full p-2 text-xs bg-gray-50 border rounded-lg">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="reader" class="bg-black rounded-3xl overflow-hidden aspect-video shadow-lg mb-6 border-4 border-white"></div>
                    <button id="btnStart" onclick="startScanner()" class="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95">
                        <span class="material-symbols-outlined">qr_code_scanner</span> Mulai Scanner
                    </button>

                    <div class="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                         <h3 class="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Input Manual (Tanpa Kamera)</h3>
                         <div class="flex flex-col sm:flex-row gap-2">
                             <input type="text" id="manualInput" class="flex-1 p-3.5 bg-gray-50 border rounded-xl outline-none text-sm font-bold" placeholder="Ketik No. Peserta / Barcode...">
                             <button onclick="processManual()" class="bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all">Proses Absen</button>
                         </div>
                    </div>
                </div>
            </main>
        </div>
    `,
    hadir: () => `
        <div class="flex font-['Inter'] text-gray-800">
            ${getSidebarHTML('hadir')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 class="text-2xl font-extrabold text-gray-900">Daftar Hadir MTQ</h2>
                        <p class="text-gray-500 text-sm">Riwayat absensi peserta per kegiatan.</p>
                    </div>
                    <div class="flex gap-2 w-full sm:w-auto">
                        <select id="hadirKegiatanFilter" onchange="loadDaftarHadirData()" class="p-2.5 bg-white border rounded-xl text-sm font-bold shadow-sm">
                            <option value="">Semua Kegiatan</option>
                        </select>
                        <input type="date" id="hadirDateFilter" onchange="loadDaftarHadirData()" class="p-2.5 bg-white border rounded-xl text-sm font-bold shadow-sm">
                    </div>
                </header>
                <div class="bg-white rounded-2xl shadow-sm border overflow-x-auto">
                    <table class="w-full text-left text-sm min-w-[700px]">
                        <thead class="bg-gray-50 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                            <tr>
                                <th class="p-4">Tanggal & Kegiatan</th>
                                <th class="p-4">Peserta</th>
                                <th class="p-4">Cabang & Kafilah</th>
                                <th class="p-4 text-center">Masuk</th>
                                <th class="p-4 text-center">Selesai</th>
                                <th class="p-4">Status / Keterangan</th>
                            </tr>
                        </thead>
                        <tbody id="hadirTableBody" class="divide-y divide-gray-50">
                            <tr><td colspan="6" class="p-12 text-center text-gray-400 italic">Memuat data kehadiran...</td></tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    `,
    laporan: () => `
        <div class="flex font-['Inter'] text-gray-800">
            ${getSidebarHTML('laporan')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 class="text-2xl font-extrabold text-gray-900">Laporan & Rekapitulasi MTQ</h2>
                        <p class="text-gray-500 text-sm">Unduh rekap kehadiran per cabang atau kegiatan.</p>
                    </div>
                    <div class="flex gap-2 w-full sm:w-auto">
                        <button onclick="downloadExcel()" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md">
                            <span class="material-symbols-outlined text-sm">description</span> Download Excel (.xlsx)
                        </button>
                    </div>
                </header>
                <div class="bg-white p-6 rounded-2xl shadow-sm border mb-6 flex flex-col sm:flex-row gap-4">
                    <div class="flex-1">
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Filter Kegiatan</label>
                        <select id="lapKegiatan" onchange="loadLaporanData()" class="w-full p-3 bg-gray-50 border rounded-xl font-bold text-sm">
                            <option value="">Semua Kegiatan</option>
                        </select>
                    </div>
                    <div class="flex-1">
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Filter Cabang Lomba</label>
                        <input type="text" id="lapCabang" onkeyup="loadLaporanData()" placeholder="Semua Cabang Lomba..." class="w-full p-3 bg-gray-50 border rounded-xl font-medium text-sm">
                    </div>
                </div>
                <div class="bg-white rounded-2xl shadow-sm border overflow-x-auto">
                    <table id="tableLaporanExport" class="w-full text-left text-sm min-w-[700px]">
                        <thead class="bg-gray-50 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                            <tr>
                                <th class="p-4">No. Peserta</th>
                                <th class="p-4">Nama Peserta</th>
                                <th class="p-4">Cabang Lomba</th>
                                <th class="p-4">Kafilah</th>
                                <th class="p-4">Kegiatan</th>
                                <th class="p-4 text-center">Masuk</th>
                                <th class="p-4 text-center">Selesai</th>
                            </tr>
                        </thead>
                        <tbody id="laporanTableBody" class="divide-y divide-gray-50">
                            <tr><td colspan="7" class="p-12 text-center text-gray-400 italic">Memuat rekap laporan...</td></tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    `
};

// ============================================
// LOGIC FUNCTIONS (DASHBOARD, KEGIATAN, PESERTA, SCANNER, HADIR, LAPORAN)
// ============================================

function handleLoginVercel(e) {
    e.preventDefault();
    navigate('dashboard');
}

function initDashboard() {
    google.script.run
        .withSuccessHandler(res => {
            if (!res) return;
            const elTotal = document.getElementById('statTotalPeserta');
            const elHadir = document.getElementById('statHadirHariIni');
            const elIzin = document.getElementById('statIzinHariIni');
            const elKegiatan = document.getElementById('statKegiatanAktif');
            if (elTotal) elTotal.innerText = res.totalPeserta || 0;
            if (elHadir) elHadir.innerText = res.hadirHariIni || 0;
            if (elIzin) elIzin.innerText = res.izinHariIni || 0;
            if (elKegiatan) elKegiatan.innerText = res.kegiatanAktifNama || 'Belum Ada';

            const listEl = document.getElementById('dashboardRecentList');
            const items = Array.isArray(res.recentAbsensi) ? res.recentAbsensi : [];
            if (listEl && items.length > 0) {
                listEl.innerHTML = items.map(item => {
                    const nama = item.nama || item[4] || '-';
                    const cabang = item.cabangLomba || item.gelar || item[5] || '-';
                    const kafilah = item.kafilah || item.sekolah || item[6] || '-';
                    const jam = item.jam || item[8] || '';
                    const jamPulang = item.jamPulang || item[10] || '';
                    const status = item.status || item[9] || 'HADIR';
                    return `
                        <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div>
                                <p class="font-bold text-gray-900">${nama} <span class="text-xs text-gray-400 font-normal">(${cabang} / ${kafilah})</span></p>
                                <p class="text-xs text-gray-500">${jam ? 'Masuk: ' + jam : ''} ${jamPulang ? '| Selesai: ' + jamPulang : ''}</p>
                            </div>
                            <span class="px-2.5 py-1 rounded-full text-xs font-bold ${status === 'HADIR' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${status}</span>
                        </div>
                    `;
                }).join('');
            } else if (listEl) {
                listEl.innerHTML = '<p class="text-gray-400 italic">Belum ada aktivitas hari ini.</p>';
            }
        })
        .getDashboardStats();
}

function initKegiatan() {
    google.script.run
        .withSuccessHandler(list => {
            const container = document.getElementById('kegiatanList');
            if (!container) return;
            if (!Array.isArray(list) || list.length === 0) {
                if (list && list.error) {
                    container.innerHTML = `<div class="col-span-full p-8 text-center bg-red-50 rounded-2xl border border-red-200 text-red-600 font-semibold">Gagal memuat kegiatan: ${list.error}<br><span class="text-xs text-gray-500 font-normal mt-1 block">Pastikan Apps Script di-deploy sebagai Web App dengan pengaturan "Who has access: Anyone".</span></div>`;
                    return;
                }
                container.innerHTML = '<div class="col-span-full p-12 text-center text-gray-400 italic">Belum ada kegiatan MTQ. Klik Tambah Kegiatan.</div>';
                return;
            }
            container.innerHTML = list.map(item => {
                const id = item.id || item[0] || '';
                const nama = item.nama || item.namaEvent || item[1] || '-';
                const tanggal = item.tanggal || item[2] || '-';
                const lokasi = item.lokasi || item[3] || '-';
                const ket = item.keterangan || item[4] || '';
                const status = item.status || item[5] || 'NONAKTIF';
                return `
                    <div class="bg-white p-6 rounded-2xl border ${status === 'AKTIF' ? 'border-emerald-500 shadow-md' : 'border-gray-100'} flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-2">
                                <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase ${status === 'AKTIF' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}">${status}</span>
                                <button onclick="hapusKegiatan('${id}')" class="text-red-400 hover:text-red-600 text-xs font-bold">Hapus</button>
                            </div>
                            <h3 class="text-lg font-bold text-gray-900 mt-2">${nama}</h3>
                            <p class="text-xs text-gray-500 mt-1">📅 ${tanggal} | 📍 ${lokasi}</p>
                            <p class="text-xs text-gray-400 mt-2 italic">${ket}</p>
                        </div>
                        <div class="mt-6 pt-4 border-t">
                            ${status !== 'AKTIF' ? `
                                <button onclick="aktifkanKegiatan('${id}')" class="w-full bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold text-xs py-2.5 rounded-xl transition-all">
                                    Aktifkan Kegiatan Ini
                                </button>
                            ` : `
                                <p class="text-center text-xs text-emerald-700 font-bold">✔ Sedang Berlangsung</p>
                            `}
                        </div>
                    </div>
                `;
            }).join('');
        })
        .getListKegiatan();
}

function openKegiatanModal() {
    document.getElementById('kegTgl').value = getLocalDate();
    document.getElementById('kegiatanModal').classList.remove('hidden');
}

function closeKegiatanModal() {
    document.getElementById('kegiatanModal').classList.add('hidden');
}

function simpanKegiatan(e) {
    e.preventDefault();
    const data = {
        nama: document.getElementById('kegNama').value.trim(),
        tanggal: document.getElementById('kegTgl').value,
        lokasi: document.getElementById('kegLok').value.trim(),
        keterangan: document.getElementById('kegKet').value.trim()
    };
    google.script.run
        .withSuccessHandler(res => {
            closeKegiatanModal();
            initKegiatan();
        })
        .simpanKegiatan(data);
}

function hapusKegiatan(id) {
    if (!confirm('Yakin ingin menghapus agenda ini?')) return;
    google.script.run
        .withSuccessHandler(() => initKegiatan())
        .hapusKegiatan(id);
}

function aktifkanKegiatan(id) {
    google.script.run
        .withSuccessHandler(() => initKegiatan())
        .aktifkanKegiatan(id);
}

// ============================================
// DATA PESERTA & GENERATE QR MASSAL
// ============================================
let allPesertaData = [];

function initPeserta() {
    google.script.run
        .withSuccessHandler(data => {
            allPesertaData = Array.isArray(data) ? data : [];
            renderPesertaList(data);
        })
        .getListPeserta();
}

function renderPesertaList(data) {
    const tbody = document.getElementById('pesertaTableBody');
    if (!tbody) return;
    if (!Array.isArray(data) || data.length === 0) {
        if (data && data.error) {
            tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center bg-red-50 text-red-600 font-semibold">Gagal memuat data peserta: ${data.error}<br><span class="text-xs text-gray-500 font-normal mt-1 block">Pastikan Google Apps Script di-deploy dengan opsi "Who has access: Anyone".</span></td></tr>`;
            return;
        }
        tbody.innerHTML = '<tr><td colspan="6" class="p-12 text-center text-gray-400 italic">Belum ada peserta terdaftar.</td></tr>';
        return;
    }
    tbody.innerHTML = data.map(row => {
        const id = row.id || row[0] || '';
        const noPeserta = row.noPeserta || row.nip || row[1] || '-';
        const nama = row.nama || row[2] || '-';
        const cabang = row.cabangLomba || row.gelar || row[3] || '-';
        const kafilah = row.kafilah || row.sekolah || row[4] || '-';
        const noHp = row.noHp || row.kota || row[5] || '-';
        return `
            <tr class="hover:bg-gray-50 transition-all">
                <td class="p-4 font-bold text-gray-900">${noPeserta}</td>
                <td class="p-4 font-semibold text-gray-800">${nama}</td>
                <td class="p-4"><span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">${cabang}</span></td>
                <td class="p-4 font-medium text-gray-600">${kafilah}</td>
                <td class="p-4 text-gray-500">${noHp}</td>
                <td class="p-4 text-right">
                    <button onclick="hapusPeserta('${id}')" class="text-red-500 hover:text-red-700 font-bold text-xs px-2 py-1">Hapus</button>
                </td>
            </tr>
        `;
    }).join('');
}

function filterPesertaList() {
    const q = document.getElementById('pesertaSearch').value.toLowerCase();
    if (!Array.isArray(allPesertaData)) {
        renderPesertaList([]);
        return;
    }
    const filtered = allPesertaData.filter(row => 
        ((row.noPeserta || row.nip || row[1] || '').toString().toLowerCase().includes(q)) ||
        ((row.nama || row[2] || '').toString().toLowerCase().includes(q)) ||
        ((row.cabangLomba || row.gelar || row[3] || '').toString().toLowerCase().includes(q)) ||
        ((row.kafilah || row.sekolah || row[4] || '').toString().toLowerCase().includes(q))
    );
    renderPesertaList(filtered);
}

function openPesertaModal() {
    document.getElementById('pesertaModal').classList.remove('hidden');
}

function closePesertaModal() {
    document.getElementById('pesertaModal').classList.add('hidden');
}

function simpanPeserta(e) {
    e.preventDefault();
    const data = {
        noPeserta: document.getElementById('pNo').value.trim(),
        nama: document.getElementById('pNama').value.trim(),
        cabang: document.getElementById('pCabang').value.trim(),
        kafilah: document.getElementById('pKafilah').value.trim(),
        hp: document.getElementById('pHp').value.trim()
    };
    google.script.run
        .withSuccessHandler(() => {
            closePesertaModal();
            initPeserta();
        })
        .simpanPeserta(data);
}

function hapusPeserta(id) {
    if (!confirm('Yakin ingin menghapus peserta ini?')) return;
    google.script.run
        .withSuccessHandler(() => initPeserta())
        .hapusPeserta(id);
}

function importExcel(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(firstSheet);

        const formatted = rows.map(item => ({
            noPeserta: item['No Peserta'] || item['NO_PESERTA'] || item['NIK'] || item['ID'] || '',
            nama: item['Nama'] || item['Nama Peserta'] || item['NAMA_PESERTA'] || '',
            cabang: item['Cabang'] || item['Cabang Lomba'] || item['CABANG_LOMBA'] || '',
            kafilah: item['Kafilah'] || item['Utusan'] || item['KAFILAH'] || '',
            hp: item['No HP'] || item['No. HP'] || item['HP'] || ''
        })).filter(x => x.nama !== '');

        if (formatted.length === 0) {
            alert('File Excel kosong atau format kolom tidak dikenali.');
            return;
        }

        google.script.run
            .withSuccessHandler(res => {
                alert('Berhasil mengimpor ' + (res.count || formatted.length) + ' peserta MTQ!');
                initPeserta();
            })
            .importPesertaExcel(formatted);
    };
    reader.readAsArrayBuffer(file);
}

function openModalQrMassal() {
    const modal = document.getElementById('modalQrMassal');
    modal.classList.remove('hidden');
    generateQrMassal();
}

function closeModalQrMassal() {
    document.getElementById('modalQrMassal').classList.add('hidden');
}

function generateQrMassal() {
    const container = document.getElementById('qrMassalContainer');
    if (!container) return;
    if (!Array.isArray(allPesertaData) || allPesertaData.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400 col-span-full py-8">Belum ada peserta untuk digenerate QR.</p>';
        return;
    }

    container.innerHTML = allPesertaData.map((row, idx) => {
        const cabang = row.cabangLomba || row.gelar || row[3] || 'MTQ';
        const nama = row.nama || row[2] || '-';
        const kafilah = row.kafilah || row.sekolah || row[4] || '-';
        const noPeserta = row.noPeserta || row.nip || row[1] || '-';
        return `
            <div class="bg-white p-5 rounded-2xl border shadow-sm flex items-center justify-between gap-4">
                <div>
                    <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">${cabang}</span>
                    <h4 class="font-extrabold text-gray-900 text-base mt-2">${nama}</h4>
                    <p class="text-xs text-gray-500 font-medium">${kafilah}</p>
                    <p class="text-xs text-gray-400 font-mono mt-1">ID: ${noPeserta}</p>
                </div>
                <div id="qrcode-${idx}" class="p-2 bg-white border rounded-xl shadow-inner"></div>
            </div>
        `;
    }).join('');

    setTimeout(() => {
        if (Array.isArray(allPesertaData)) {
            allPesertaData.forEach((row, idx) => {
                const el = document.getElementById('qrcode-' + idx);
                if (el && typeof QRCode !== 'undefined') {
                    el.innerHTML = '';
                    const rawQrText = row.rawQr || row.noPeserta || row.nip || row[6] || row[1] || row[0] || '';
                    new QRCode(el, {
                        text: String(rawQrText),
                        width: 84,
                        height: 84
                    });
                }
            });
        }
    }, 100);
}

function printIdCards() {
    const printArea = document.getElementById('printArea');
    if (!printArea || !Array.isArray(allPesertaData)) return;
    
    let html = `<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 20px; font-family: 'Inter', sans-serif;">`;
    allPesertaData.forEach((row, idx) => {
        const qrEl = document.getElementById('qrcode-' + idx);
        const qrImg = qrEl ? qrEl.innerHTML : '';
        const cabang = row.cabangLomba || row.gelar || row[3] || '-';
        const nama = row.nama || row[2] || '-';
        const kafilah = row.kafilah || row.sekolah || row[4] || '-';
        const noPeserta = row.noPeserta || row.nip || row[1] || '-';
        html += `
            <div style="border: 2px solid #059669; border-radius: 16px; padding: 16px; display: flex; justify-content: space-between; align-items: center; background: white; page-break-inside: avoid;">
                <div>
                    <div style="font-size: 10px; font-weight: bold; color: #059669; text-transform: uppercase;">KAFILAH MTQ</div>
                    <div style="font-size: 16px; font-weight: 800; color: #111827; margin-top: 4px;">${nama}</div>
                    <div style="font-size: 12px; color: #4B5563; font-weight: 600;">${cabang} | ${kafilah}</div>
                    <div style="font-size: 11px; color: #6B7280; margin-top: 6px;">No. Peserta: <strong>${noPeserta}</strong></div>
                </div>
                <div>${qrImg}</div>
            </div>
        `;
    });
    html += `</div>`;
    printArea.innerHTML = html;
    window.print();
}

// ============================================
// SCANNER PAGE & DAFTAR HADIR
// ============================================
function initScannerPage() {
    google.script.run
        .withSuccessHandler(list => {
            const select = document.getElementById('kegiatanSelect');
            if (!select) return;
            if (!Array.isArray(list) || list.length === 0) {
                select.innerHTML = '<option value="">-- Belum Ada Kegiatan --</option>';
                return;
            }
            select.innerHTML = list.map(item => {
                const id = item.id || item[0] || '';
                const nama = item.nama || item.namaEvent || item[1] || '-';
                const tgl = item.tanggal || item[2] || '-';
                const status = item.status || item[5] || '';
                return `
                    <option value="${id}" ${status === 'AKTIF' ? 'selected' : ''}>
                        ${nama} (${tgl}) ${status === 'AKTIF' ? '🟢 AKTIF' : ''}
                    </option>
                `;
            }).join('');
        })
        .getListKegiatan();
}

function initDaftarHadir() {
    google.script.run
        .withSuccessHandler(list => {
            const sel = document.getElementById('hadirKegiatanFilter');
            if (sel && Array.isArray(list)) {
                sel.innerHTML = '<option value="">Semua Kegiatan</option>' + 
                    list.map(k => `<option value="${k.id || k[0]}">${k.nama || k.namaEvent || k[1]}</option>`).join('');
            }
            loadDaftarHadirData();
        })
        .getListKegiatan();
}

function loadDaftarHadirData() {
    const kegId = document.getElementById('hadirKegiatanFilter') ? document.getElementById('hadirKegiatanFilter').value : '';
    const tgl = document.getElementById('hadirDateFilter') ? document.getElementById('hadirDateFilter').value : '';
    
    google.script.run
        .withSuccessHandler(data => {
            const tbody = document.getElementById('hadirTableBody');
            if (!tbody) return;
            if (!Array.isArray(data) || data.length === 0) {
                if (data && data.error) {
                    tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center bg-red-50 text-red-600 font-semibold">Gagal memuat kehadiran: ${data.error}<br><span class="text-xs text-gray-500 font-normal mt-1 block">Pastikan Apps Script di-deploy dengan opsi "Who has access: Anyone".</span></td></tr>`;
                    return;
                }
                tbody.innerHTML = '<tr><td colspan="6" class="p-12 text-center text-gray-400 italic">Belum ada riwayat kehadiran.</td></tr>';
                return;
            }
            tbody.innerHTML = data.map(row => {
                const tanggal = row.tanggal || row[7] || '-';
                const kegNama = row.kegiatanNama || row.namaEvent || row[1] || '-';
                const nama = row.nama || row[4] || '-';
                const noPeserta = row.noPeserta || row.nip || row[3] || '-';
                const cabang = row.cabangLomba || row.gelar || row[5] || '-';
                const kafilah = row.kafilah || row.sekolah || row[6] || '-';
                const jam = row.jam || row.jamMasuk || row[8] || '-';
                const jamPulang = row.jamSelesai || row.jamPulang || row[10] || '-';
                const status = row.status || row.statusMasuk || row[9] || 'HADIR';
                const ket = row.keterangan || row[12] || '';
                return `
                    <tr class="hover:bg-gray-50 transition-all">
                        <td class="p-4">
                            <p class="font-bold text-gray-800">${tanggal}</p>
                            <p class="text-xs text-emerald-700 font-semibold">${kegNama}</p>
                        </td>
                        <td class="p-4">
                            <p class="font-bold text-gray-900">${nama}</p>
                            <p class="text-xs text-gray-400 font-mono">${noPeserta}</p>
                        </td>
                        <td class="p-4">
                            <p class="font-semibold text-gray-800">${cabang}</p>
                            <p class="text-xs text-gray-500">${kafilah}</p>
                        </td>
                        <td class="p-4 text-center font-mono text-sm">${jam}</td>
                        <td class="p-4 text-center font-mono text-sm">${jamPulang}</td>
                        <td class="p-4">
                            <span class="px-2.5 py-1 rounded-full text-xs font-bold ${status === 'HADIR' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">${status}</span>
                            ${ket ? `<p class="text-xs text-gray-500 mt-1 italic">"${ket}"</p>` : ''}
                        </td>
                    </tr>
                `;
            }).join('');
        })
        .getDaftarHadir(tgl, kegId);
}

// ============================================
// LAPORAN & EKSPOR
// ============================================
function initLaporan() {
    google.script.run
        .withSuccessHandler(list => {
            const sel = document.getElementById('lapKegiatan');
            if (sel && Array.isArray(list)) {
                sel.innerHTML = '<option value="">Semua Kegiatan</option>' + 
                    list.map(k => `<option value="${k.id || k[0]}">${k.nama || k.namaEvent || k[1]}</option>`).join('');
            }
            loadLaporanData();
        })
        .getListKegiatan();
}

function loadLaporanData() {
    const kegId = document.getElementById('lapKegiatan') ? document.getElementById('lapKegiatan').value : '';
    const cabang = document.getElementById('lapCabang') ? document.getElementById('lapCabang').value.trim() : '';
    
    google.script.run
        .withSuccessHandler(data => {
            const tbody = document.getElementById('laporanTableBody');
            if (!tbody) return;
            const rows = Array.isArray(data) ? data : (data && (data.perPeserta || data.perGuru || []));
            if (!Array.isArray(rows) || rows.length === 0) {
                if (data && data.error) {
                    tbody.innerHTML = `<tr><td colspan="7" class="p-8 text-center bg-red-50 text-red-600 font-semibold">Gagal memuat rekapitulasi: ${data.error}<br><span class="text-xs text-gray-500 font-normal mt-1 block">Pastikan Apps Script di-deploy dengan opsi "Who has access: Anyone".</span></td></tr>`;
                    return;
                }
                tbody.innerHTML = '<tr><td colspan="7" class="p-12 text-center text-gray-400 italic">Belum ada data rekapitulasi.</td></tr>';
                return;
            }
            tbody.innerHTML = rows.map(row => {
                const noPeserta = row.noPeserta || row.nip || row[1] || '-';
                const nama = row.nama || row[2] || row[4] || '-';
                const cabangVal = row.cabangLomba || row.gelar || row[3] || row[5] || '-';
                const kafilah = row.kafilah || row.sekolah || row[4] || row[6] || '-';
                const hadir = row.hadir !== undefined ? row.hadir : (row[8] || 0);
                const izin = row.izin !== undefined ? row.izin : (row[10] || 0);
                const persentase = row.persentase !== undefined ? row.persentase + '%' : '';
                return `
                    <tr class="hover:bg-gray-50 transition-all">
                        <td class="p-4 font-mono text-xs text-gray-500">${noPeserta}</td>
                        <td class="p-4 font-bold text-gray-900">${nama}</td>
                        <td class="p-4 font-semibold text-emerald-700">${cabangVal}</td>
                        <td class="p-4 text-gray-600">${kafilah}</td>
                        <td class="p-4 text-xs font-medium">${persentase}</td>
                        <td class="p-4 text-center font-mono text-xs font-bold text-emerald-600">${hadir}</td>
                        <td class="p-4 text-center font-mono text-xs font-bold text-amber-600">${izin}</td>
                    </tr>
                `;
            }).join('');
        })
        .getLaporan(kegId, cabang);
}

function downloadExcel() {
    const table = document.getElementById('tableLaporanExport');
    if (!table) return;
    const wb = XLSX.utils.table_to_book(table, { sheet: "Rekap MTQ" });
    XLSX.writeFile(wb, "Rekapitulasi_Kehadiran_MTQ.xlsx");
}
