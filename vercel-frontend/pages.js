// Sidebar Function - Clean version
const getSidebarHTML = (active) => {
    const menus = [
        { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
        { id: 'scanner', icon: 'qr_code_scanner', label: 'QR Scanner' },
        { id: 'hadir', icon: 'assignment', label: 'Daftar Hadir' },
        { id: 'guru', icon: 'groups', label: 'Data Guru' },
        { id: 'laporan', icon: 'description', label: 'Laporan' }
    ];

    const desktopMenu = menus.map(m => `
        <button onclick="navigate('${m.id}')" class="w-full flex items-center gap-3 px-4 py-2.5 ${active === m.id ? 'text-blue-600 font-semibold bg-blue-50 rounded-lg' : 'text-gray-500 hover:bg-gray-50 rounded-lg'} transition-all">
            <span class="material-symbols-outlined text-[20px]">${m.icon}</span>
            <span class="text-sm">${m.label}</span>
        </button>
    `).join('');

    const mobileMenu = menus.map(m => `
        <button onclick="navigate('${m.id}')" class="flex flex-col items-center gap-1 ${active === m.id ? 'text-blue-600' : 'text-gray-400'} transition-all">
            <span class="material-symbols-outlined">${m.icon}</span>
            <span class="text-[9px] font-bold uppercase">${m.label === 'QR Scanner' ? 'Scan' : m.label.split(' ')[0]}</span>
        </button>
    `).join('');

    return `
        <!-- Desktop Sidebar -->
        <aside class="hidden lg:flex h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-100 flex flex-col py-6 z-50">
            <div class="px-6 mb-8">
                <h1 class="text-xl font-bold text-blue-600">KKG Portal</h1>
                <p class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Vercel Edition</p>
            </div>
            <nav class="flex-1 space-y-1 px-3">${desktopMenu}</nav>
            <div class="mt-auto border-t pt-4 px-3">
                <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium text-sm">
                    <span class="material-symbols-outlined text-[20px]">logout</span> <span>Keluar</span>
                </button>
            </div>
        </aside>

        <!-- Mobile Navigation -->
        <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 px-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            ${mobileMenu}
            <button onclick="logout()" class="flex flex-col items-center gap-1 text-red-400">
                <span class="material-symbols-outlined">logout</span>
                <span class="text-[9px] font-bold uppercase">Out</span>
            </button>
        </nav>
    `;
};

// Page Functions
const PAGES = {
    login: () => `
        <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-['Inter']">
            <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 border border-gray-100">
                <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
                        <span class="material-symbols-outlined text-white text-3xl">school</span>
                    </div>
                    <h1 class="text-2xl font-bold text-gray-900 leading-tight">KKG Portal</h1>
                    <p class="text-gray-500 text-sm mt-1">Sistem Presensi Digital</p>
                </div>
                <form id="loginForm" class="space-y-4">
                    <div class="space-y-1">
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                        <input type="email" id="email" required class="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all text-sm">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                        <input type="password" id="password" required class="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all text-sm">
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mt-4 active:scale-95">MASUK</button>
                </form>
            </div>
        </div>
    `,
    dashboard: () => `
        <div class="flex font-['Inter'] text-gray-800">
            ${getSidebarHTML('dashboard')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8">
                    <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>
                    <p class="text-gray-500 text-sm">Ringkasan aktivitas hari ini.</p>
                </header>
                <div id="dashboardContent" class="space-y-6"></div>
            </main>
        </div>
    `,
    scanner: () => `
        <div class="flex font-['Inter'] text-gray-800">
            ${getSidebarHTML('scanner')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8">
                    <h2 class="text-2xl font-bold text-gray-900">QR Scanner</h2>
                    <p class="text-green-600 font-semibold text-xs flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">verified</span> Kamera Siap Digunakan
                    </p>
                </header>
                <div class="max-w-xl mx-auto">
                    <div id="reader" class="bg-black rounded-2xl overflow-hidden aspect-video shadow-lg mb-6 border-4 border-white"></div>
                    <button id="btnStart" onclick="startScanner()" class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95">Mulai Scanner</button>
                    <div class="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                         <h3 class="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Input Manual</h3>
                         <div class="flex flex-col lg:flex-row gap-2">
                             <input type="text" id="manualInput" class="flex-1 p-3 bg-gray-50 border rounded-xl outline-none text-sm font-bold" placeholder="ID Guru / Barcode...">
                             <button onclick="processManual()" class="bg-gray-800 text-white px-8 py-3 lg:py-0 rounded-xl font-bold text-sm hover:bg-black transition-all">Proses</button>
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
                <header class="mb-6 lg:mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900">Daftar Hadir</h2>
                        <p class="text-gray-500 text-sm">Peserta yang sudah melakukan presensi.</p>
                    </div>
                    <input type="date" id="dateFilter" onchange="initDaftarHadir()" class="w-full lg:w-auto p-2.5 border rounded-xl text-sm font-bold shadow-sm outline-none focus:border-blue-500">
                </header>
                <div class="bg-white rounded-2xl shadow-sm border overflow-x-auto">
                    <table class="w-full text-left text-sm min-w-[500px]">
                        <thead class="bg-gray-50 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                            <tr><th class="p-4">No</th><th class="p-4">Peserta</th><th class="p-4">Sekolah</th><th class="p-4 text-right">Jam</th></tr>
                        </thead>
                        <tbody id="hadirList" class="divide-y divide-gray-50"></tbody>
                    </table>
                </div>
            </main>
        </div>
    `,
    guru: () => `
        <div class="flex font-['Inter'] text-gray-800">
            ${getSidebarHTML('guru')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8">
                    <h2 class="text-2xl font-bold text-gray-900">Data Guru</h2>
                    <p class="text-gray-500 text-sm">Database lengkap anggota KKG.</p>
                </header>
                <div class="bg-white p-3 rounded-2xl shadow-sm border mb-8 flex items-center">
                    <span class="material-symbols-outlined text-gray-400 mx-2">search</span>
                    <input type="text" id="guruSearch" onkeyup="renderGuruList()" class="flex-1 p-2 bg-transparent outline-none text-sm font-semibold" placeholder="Cari nama atau asal sekolah...">
                </div>
                <div id="guruContainer" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"></div>
            </main>
        </div>
    `,
    laporan: () => `
        <div class="flex font-['Inter'] text-gray-800">
            ${getSidebarHTML('laporan')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8">
                    <h2 class="text-2xl font-bold text-gray-900">Laporan</h2>
                    <p class="text-gray-500 text-sm">Analisis kehadiran peserta.</p>
                </header>
                <div class="bg-white rounded-2xl p-16 text-center border shadow-sm">
                    <span class="material-symbols-outlined text-5xl text-gray-200 mb-2">analytics</span>
                    <h3 class="text-lg font-bold text-gray-800">Menu Laporan</h3>
                    <p class="text-sm text-gray-400">Sedang disinkronisasi.</p>
                </div>
            </main>
        </div>
    `
};
