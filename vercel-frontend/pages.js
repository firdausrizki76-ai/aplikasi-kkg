const getSidebar = (active) => `
    <!-- Desktop Sidebar -->
    <aside class="hidden lg:flex h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-100 flex-col py-6 z-50">
        <div class="px-6 mb-8">
            <h1 class="text-xl font-bold text-blue-600">KKG Portal</h1>
            <p class="text-[10px] text-gray-400 font-semibold uppercase">Vercel Edition</p>
        </div>
        <nav class="flex-1 space-y-1 px-3">
            <button onclick="navigate('dashboard')" class="w-full flex items-center gap-3 px-4 py-2.5 \${active === 'dashboard' ? 'text-blue-600 font-semibold bg-blue-50 rounded-lg' : 'text-gray-500 hover:bg-gray-50 rounded-lg'}">
                <span class="material-symbols-outlined text-[20px]">dashboard</span> <span class="text-sm">Dashboard</span>
            </button>
            <button onclick="navigate('scanner')" class="w-full flex items-center gap-3 px-4 py-2.5 \${active === 'scanner' ? 'text-blue-600 font-semibold bg-blue-50 rounded-lg' : 'text-gray-500 hover:bg-gray-50 rounded-lg'}">
                <span class="material-symbols-outlined text-[20px]">qr_code_scanner</span> <span class="text-sm">QR Scanner</span>
            </button>
            <button onclick="navigate('hadir')" class="w-full flex items-center gap-3 px-4 py-2.5 \${active === 'hadir' ? 'text-blue-600 font-semibold bg-blue-50 rounded-lg' : 'text-gray-500 hover:bg-gray-50 rounded-lg'}">
                <span class="material-symbols-outlined text-[20px]">assignment</span> <span class="text-sm">Daftar Hadir</span>
            </button>
            <button onclick="navigate('guru')" class="w-full flex items-center gap-3 px-4 py-2.5 \${active === 'guru' ? 'text-blue-600 font-semibold bg-blue-50 rounded-lg' : 'text-gray-500 hover:bg-gray-50 rounded-lg'}">
                <span class="material-symbols-outlined text-[20px]">groups</span> <span class="text-sm">Data Guru</span>
            </button>
            <button onclick="navigate('laporan')" class="w-full flex items-center gap-3 px-4 py-2.5 \${active === 'laporan' ? 'text-blue-600 font-semibold bg-blue-50 rounded-lg' : 'text-gray-500 hover:bg-gray-50 rounded-lg'}">
                <span class="material-symbols-outlined text-[20px]">description</span> <span class="text-sm">Laporan</span>
            </button>
        </nav>
        <div class="mt-auto border-t pt-4 px-3">
            <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium text-sm">
                <span class="material-symbols-outlined text-[20px]">logout</span> <span>Keluar</span>
            </button>
        </div>
    </aside>

    <!-- Mobile Navigation (Bottom Bar) -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-3 px-2 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button onclick="navigate('dashboard')" class="flex flex-col items-center gap-1 \${active === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}">
            <span class="material-symbols-outlined">dashboard</span>
            <span class="text-[10px] font-bold uppercase">Home</span>
        </button>
        <button onclick="navigate('scanner')" class="flex flex-col items-center gap-1 \${active === 'scanner' ? 'text-blue-600' : 'text-gray-400'}">
            <span class="material-symbols-outlined">qr_code_scanner</span>
            <span class="text-[10px] font-bold uppercase">Scan</span>
        </button>
        <button onclick="navigate('hadir')" class="flex flex-col items-center gap-1 \${active === 'hadir' ? 'text-blue-600' : 'text-gray-400'}">
            <span class="material-symbols-outlined">assignment</span>
            <span class="text-[10px] font-bold uppercase">Hadir</span>
        </button>
        <button onclick="navigate('guru')" class="flex flex-col items-center gap-1 \${active === 'guru' ? 'text-blue-600' : 'text-gray-400'}">
            <span class="material-symbols-outlined">groups</span>
            <span class="text-[10px] font-bold uppercase">Guru</span>
        </button>
        <button onclick="logout()" class="flex flex-col items-center gap-1 text-red-400">
            <span class="material-symbols-outlined">logout</span>
            <span class="text-[10px] font-bold uppercase">Out</span>
        </button>
    </nav>
`;

const PAGES = {
    login: `
        <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-['Inter']">
            <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 border border-gray-100">
                <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span class="material-symbols-outlined text-white text-3xl">school</span>
                    </div>
                    <h1 class="text-2xl font-bold text-gray-900">KKG Portal</h1>
                    <p class="text-gray-500 text-sm">Masuk ke Sistem Absensi</p>
                </div>
                <form id="loginForm" class="space-y-4 text-left">
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
                        <input type="email" id="email" required class="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-500 outline-none text-sm">
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-400 uppercase ml-1">Password</label>
                        <input type="password" id="password" required class="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-500 outline-none text-sm">
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all mt-4">MASUK</button>
                </form>
            </div>
        </div>
    `,
    dashboard: `
        <div class="flex font-['Inter']">
            \${getSidebar('dashboard')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8">
                    <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>
                    <p class="text-gray-500 text-sm">Selamat datang di KKG Portal.</p>
                </header>
                <div id="dashboardContent" class="space-y-6"></div>
            </main>
        </div>
    `,
    scanner: `
        <div class="flex font-['Inter']">
            \${getSidebar('scanner')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8 text-center lg:text-left">
                    <h2 class="text-2xl font-bold text-gray-900">QR Scanner</h2>
                    <p class="text-green-600 font-semibold text-xs flex items-center justify-center lg:justify-start gap-1">
                        <span class="material-symbols-outlined text-xs">verified</span> Kamera Mobile Aktif
                    </p>
                </header>
                <div class="max-w-xl mx-auto">
                    <div id="reader" class="bg-black rounded-2xl overflow-hidden aspect-video shadow-lg mb-6 border-4 border-white"></div>
                    <button id="btnStart" onclick="startScanner()" class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">Mulai Scanner</button>
                    <div class="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                         <h3 class="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider text-center lg:text-left">Input Manual</h3>
                         <div class="flex flex-col lg:flex-row gap-2">
                             <input type="text" id="manualInput" class="flex-1 p-3 bg-gray-50 border rounded-xl outline-none text-sm font-bold" placeholder="ID Guru / Barcode...">
                             <button onclick="processManual()" class="bg-gray-800 text-white px-6 py-3 lg:py-0 rounded-xl font-bold text-sm">Proses</button>
                         </div>
                    </div>
                </div>
            </main>
        </div>
    `,
    hadir: `
        <div class="flex font-['Inter']">
            \${getSidebar('hadir')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900">Daftar Hadir</h2>
                        <p class="text-gray-500 text-sm">Presensi real-time hari ini.</p>
                    </div>
                    <input type="date" id="dateFilter" onchange="initDaftarHadir()" class="w-full lg:w-auto p-3 border rounded-xl text-sm outline-none focus:border-blue-500 font-bold shadow-sm">
                </header>
                <div class="bg-white rounded-2xl shadow-sm border overflow-x-auto">
                    <table class="w-full text-left text-sm min-w-[500px]">
                        <thead class="bg-gray-50 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                            <tr>
                                <th class="p-4">No</th>
                                <th class="p-4">Peserta</th>
                                <th class="p-4">Sekolah</th>
                                <th class="p-4 text-right">Jam</th>
                            </tr>
                        </thead>
                        <tbody id="hadirList" class="divide-y divide-gray-50"></tbody>
                    </table>
                </div>
            </main>
        </div>
    `,
    guru: `
        <div class="flex font-['Inter']">
            \${getSidebar('guru')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8">
                    <h2 class="text-2xl font-bold text-gray-900">Data Guru</h2>
                    <p class="text-gray-500 text-sm">Database anggota KKG.</p>
                </header>
                <div class="bg-white p-3 rounded-2xl shadow-sm border mb-6 flex items-center">
                    <span class="material-symbols-outlined text-gray-400 mx-2">search</span>
                    <input type="text" id="guruSearch" onkeyup="renderGuruList()" class="flex-1 p-2 bg-transparent outline-none text-sm font-semibold" placeholder="Cari nama atau sekolah...">
                </div>
                <div id="guruContainer" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6"></div>
            </main>
        </div>
    `,
    laporan: `
        <div class="flex font-['Inter']">
            \${getSidebar('laporan')}
            <main class="flex-1 lg:ml-64 p-5 lg:p-8 bg-gray-50 min-h-screen pb-24 lg:pb-8">
                <header class="mb-6 lg:mb-8">
                    <h2 class="text-2xl font-bold text-gray-900">Laporan</h2>
                    <p class="text-gray-500 text-sm">Ekspor data presensi lengkap.</p>
                </header>
                <div class="bg-white rounded-2xl p-12 text-center border shadow-sm">
                    <span class="material-symbols-outlined text-4xl text-gray-200 mb-2">analytics</span>
                    <h3 class="text-lg font-bold text-gray-800 tracking-tight">Menu Laporan</h3>
                    <p class="text-sm text-gray-400">Sedang disiapkan.</p>
                </div>
            </main>
        </div>
    `
};
