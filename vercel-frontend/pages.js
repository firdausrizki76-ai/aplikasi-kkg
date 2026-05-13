const getSidebar = (active) => `
    <aside class="w-64 bg-white border-r flex flex-col p-6 h-screen fixed left-0 top-0 z-50">
        <div class="mb-8">
            <h1 class="text-2xl font-bold text-blue-600">KKG Portal</h1>
            <p class="text-xs text-gray-500 uppercase tracking-widest font-bold">Vercel Edition</p>
        </div>
        <nav class="space-y-1 flex-1">
            <button onclick="navigate('dashboard')" class="w-full flex items-center gap-3 p-3 ${active === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition-all font-semibold">
                <span class="material-symbols-outlined">dashboard</span> Dashboard
            </button>
            <button onclick="navigate('scanner')" class="w-full flex items-center gap-3 p-3 ${active === 'scanner' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition-all font-semibold">
                <span class="material-symbols-outlined">qr_code_scanner</span> QR Scanner
            </button>
            <button onclick="navigate('hadir')" class="w-full flex items-center gap-3 p-3 ${active === 'hadir' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition-all font-semibold">
                <span class="material-symbols-outlined">assignment</span> Daftar Hadir
            </button>
            <button onclick="navigate('guru')" class="w-full flex items-center gap-3 p-3 ${active === 'guru' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition-all font-semibold">
                <span class="material-symbols-outlined">groups</span> Data Guru
            </button>
            <button onclick="navigate('laporan')" class="w-full flex items-center gap-3 p-3 ${active === 'laporan' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'} rounded-xl transition-all font-semibold">
                <span class="material-symbols-outlined">description</span> Laporan
            </button>
        </nav>
        <button onclick="logout()" class="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold mt-auto">
            <span class="material-symbols-outlined">logout</span> Keluar
        </button>
    </aside>
`;

const PAGES = {
    login: `
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-4">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div class="text-center mb-8">
                    <div class="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span class="material-symbols-outlined text-blue-600 text-4xl">school</span>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800">KKG Portal</h1>
                    <p class="text-gray-500 text-xs font-bold uppercase tracking-widest text-blue-600">Vercel Edition</p>
                </div>
                <form id="loginForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input type="email" id="email" required class="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input type="password" id="password" required class="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all">
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">Masuk</button>
                </form>
            </div>
        </div>
    `,
    dashboard: `
        <div class="flex">
            \${getSidebar('dashboard')}
            <main class="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
                <header class="mb-8">
                    <h2 class="text-3xl font-bold text-gray-800">Dashboard</h2>
                    <p class="text-gray-500">Selamat datang di KKG Portal Vercel.</p>
                </header>
                <div id="dashboardContent" class="grid gap-6">
                    <div class="animate-pulse bg-white h-48 rounded-2xl"></div>
                </div>
            </main>
        </div>
    `,
    scanner: `
        <div class="flex">
            \${getSidebar('scanner')}
            <main class="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
                <header class="mb-8">
                    <h2 class="text-3xl font-bold text-gray-800">QR Scanner</h2>
                    <p class="text-green-600 font-bold flex items-center gap-2">
                        <span class="material-symbols-outlined">check_circle</span> Kamera 100% Aktif (Vercel)
                    </p>
                </header>
                <div class="max-w-2xl mx-auto w-full">
                    <div id="reader" class="bg-black rounded-3xl overflow-hidden aspect-video shadow-2xl border-8 border-white"></div>
                    <button id="btnStart" onclick="startScanner()" class="w-full mt-6 bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                        <span class="material-symbols-outlined">videocam</span> Mulai Kamera
                    </button>
                    <div class="mt-8 p-6 bg-white rounded-2xl border-2 border-blue-100 shadow-sm">
                         <div class="flex items-center gap-2 mb-4 text-blue-600">
                             <span class="material-symbols-outlined font-bold">keyboard</span>
                             <h3 class="font-bold uppercase tracking-tight">Input Manual</h3>
                         </div>
                         <div class="flex gap-2">
                             <input type="text" id="manualInput" class="flex-1 p-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none text-lg" placeholder="ID Guru / NIP...">
                             <button onclick="processManual()" class="bg-gray-800 text-white px-8 rounded-xl font-bold">PROSES</button>
                         </div>
                    </div>
                </div>
            </main>
        </div>
    `,
    hadir: `
        <div class="flex">
            \${getSidebar('hadir')}
            <main class="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
                <header class="mb-8 flex justify-between items-end">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-800">Daftar Hadir</h2>
                        <p class="text-gray-500">Log kehadiran guru hari ini.</p>
                    </div>
                    <input type="date" id="dateFilter" onchange="initDaftarHadir()" class="p-2 border rounded-lg outline-none focus:border-blue-500">
                </header>
                <div class="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-gray-50">
                            <tr class="text-left">
                                <th class="p-4 font-bold text-gray-600">No</th>
                                <th class="p-4 font-bold text-gray-600">Nama</th>
                                <th class="p-4 font-bold text-gray-600">Sekolah</th>
                                <th class="p-4 font-bold text-gray-600 text-right">Jam</th>
                            </tr>
                        </thead>
                        <tbody id="hadirList" class="divide-y">
                            <tr><td colspan="4" class="p-8 text-center text-gray-400">Memuat data...</td></tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    `,
    guru: `
        <div class="flex">
            \${getSidebar('guru')}
            <main class="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
                <header class="mb-8">
                    <h2 class="text-3xl font-bold text-gray-800">Data Guru</h2>
                    <p class="text-gray-500">Manajemen semua guru yang terdaftar.</p>
                </header>
                <div class="bg-white rounded-2xl p-6 shadow-sm border mb-6">
                    <div class="flex gap-4">
                        <div class="flex-1 relative">
                            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                            <input type="text" id="guruSearch" onkeyup="renderGuruList()" class="w-full pl-10 pr-4 py-3 border-2 border-gray-50 rounded-xl outline-none focus:border-blue-500" placeholder="Cari nama, NIP, atau sekolah...">
                        </div>
                    </div>
                </div>
                <div id="guruContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Cards injected here -->
                </div>
            </main>
        </div>
    `,
    laporan: `
        <div class="flex">
            \${getSidebar('laporan')}
            <main class="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
                <header class="mb-8">
                    <h2 class="text-3xl font-bold text-gray-800">Laporan</h2>
                    <p class="text-gray-500">Statistik dan data kehadiran lengkap.</p>
                </header>
                <div class="bg-white rounded-2xl p-12 text-center border shadow-sm">
                    <span class="material-symbols-outlined text-6xl text-gray-200 mb-4">analytics</span>
                    <h3 class="text-xl font-bold text-gray-800">Fitur Laporan Sedang Disiapkan</h3>
                    <p class="text-gray-500">Menu ini akan tersedia di update berikutnya.</p>
                </div>
            </main>
        </div>
    `
};
