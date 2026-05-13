const PAGES = {
    login: `
        <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-['Inter']">
            <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 border border-gray-100 text-center">
                <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span class="material-symbols-outlined text-white text-3xl">school</span>
                </div>
                <h1 class="text-2xl font-bold text-gray-900 mb-6">KKG Portal</h1>
                <form id="loginForm" class="space-y-4 text-left">
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
                        <input type="email" id="email" required class="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-500 outline-none text-sm">
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-400 uppercase ml-1">Password</label>
                        <input type="password" id="password" required class="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-500 outline-none text-sm">
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all mt-4">Masuk</button>
                </form>
            </div>
        </div>
    `,
    dashboard: `
        <div class="flex font-['Inter']">
            <aside class="h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-100 flex flex-col py-6">
                <div class="px-6 mb-8">
                    <h1 class="text-xl font-bold text-blue-600">KKG Portal</h1>
                    <p class="text-[10px] text-gray-400 font-semibold uppercase">Vercel Edition</p>
                </div>
                <nav class="flex-1 space-y-1 px-3">
                    <button onclick="navigate('dashboard')" class="w-full flex items-center gap-3 px-4 py-2.5 text-blue-600 font-semibold bg-blue-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">dashboard</span> <span class="text-sm">Dashboard</span>
                    </button>
                    <button onclick="navigate('scanner')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">qr_code_scanner</span> <span class="text-sm">QR Scanner</span>
                    </button>
                    <button onclick="navigate('hadir')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">assignment</span> <span class="text-sm">Daftar Hadir</span>
                    </button>
                    <button onclick="navigate('guru')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">groups</span> <span class="text-sm">Data Guru</span>
                    </button>
                    <button onclick="navigate('laporan')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">description</span> <span class="text-sm">Laporan</span>
                    </button>
                </nav>
                <div class="mt-auto border-t pt-4 px-3">
                    <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium">
                        <span class="material-symbols-outlined text-[20px]">logout</span> <span class="text-sm">Keluar</span>
                    </button>
                </div>
            </aside>
            <main class="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
                <header class="mb-8"><h2 class="text-2xl font-bold text-gray-900">Dashboard</h2><p class="text-gray-500 text-sm">Selamat datang di Sistem Absensi KKG.</p></header>
                <div id="dashboardContent" class="space-y-6"></div>
            </main>
        </div>
    `,
    scanner: `
        <div class="flex font-['Inter']">
            <aside class="h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-100 flex flex-col py-6">
                <div class="px-6 mb-8">
                    <h1 class="text-xl font-bold text-blue-600">KKG Portal</h1>
                    <p class="text-[10px] text-gray-400 font-semibold uppercase">Vercel Edition</p>
                </div>
                <nav class="flex-1 space-y-1 px-3">
                    <button onclick="navigate('dashboard')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">dashboard</span> <span class="text-sm">Dashboard</span>
                    </button>
                    <button onclick="navigate('scanner')" class="w-full flex items-center gap-3 px-4 py-2.5 text-blue-600 font-semibold bg-blue-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">qr_code_scanner</span> <span class="text-sm">QR Scanner</span>
                    </button>
                    <button onclick="navigate('hadir')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">assignment</span> <span class="text-sm">Daftar Hadir</span>
                    </button>
                    <button onclick="navigate('guru')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">groups</span> <span class="text-sm">Data Guru</span>
                    </button>
                    <button onclick="navigate('laporan')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">description</span> <span class="text-sm">Laporan</span>
                    </button>
                </nav>
                <div class="mt-auto border-t pt-4 px-3">
                    <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium">
                        <span class="material-symbols-outlined text-[20px]">logout</span> <span class="text-sm">Keluar</span>
                    </button>
                </div>
            </aside>
            <main class="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
                <header class="mb-8"><h2 class="text-2xl font-bold text-gray-900">QR Scanner</h2><p class="text-green-600 font-semibold text-sm">Kamera Siap Digunakan</p></header>
                <div class="max-w-xl mx-auto text-center">
                    <div id="reader" class="bg-black rounded-2xl overflow-hidden aspect-video shadow-lg mb-6 border-4 border-white"></div>
                    <button id="btnStart" onclick="startScanner()" class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">Mulai Scanner</button>
                    <div class="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
                         <h3 class="text-xs font-bold text-gray-400 uppercase mb-4">Input Manual</h3>
                         <div class="flex gap-2">
                             <input type="text" id="manualInput" class="flex-1 p-3 bg-gray-50 border rounded-xl outline-none text-sm font-bold" placeholder="ID Guru / Barcode...">
                             <button onclick="processManual()" class="bg-gray-800 text-white px-6 rounded-xl font-bold text-sm">Proses</button>
                         </div>
                    </div>
                </div>
            </main>
        </div>
    `,
    hadir: `
        <div class="flex font-['Inter']">
            <aside class="h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-100 flex flex-col py-6">
                <div class="px-6 mb-8">
                    <h1 class="text-xl font-bold text-blue-600">KKG Portal</h1>
                    <p class="text-[10px] text-gray-400 font-semibold uppercase">Vercel Edition</p>
                </div>
                <nav class="flex-1 space-y-1 px-3">
                    <button onclick="navigate('dashboard')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">dashboard</span> <span class="text-sm">Dashboard</span>
                    </button>
                    <button onclick="navigate('scanner')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">qr_code_scanner</span> <span class="text-sm">QR Scanner</span>
                    </button>
                    <button onclick="navigate('hadir')" class="w-full flex items-center gap-3 px-4 py-2.5 text-blue-600 font-semibold bg-blue-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">assignment</span> <span class="text-sm">Daftar Hadir</span>
                    </button>
                    <button onclick="navigate('guru')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">groups</span> <span class="text-sm">Data Guru</span>
                    </button>
                    <button onclick="navigate('laporan')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">description</span> <span class="text-sm">Laporan</span>
                    </button>
                </nav>
                <div class="mt-auto border-t pt-4 px-3">
                    <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium">
                        <span class="material-symbols-outlined text-[20px]">logout</span> <span class="text-sm">Keluar</span>
                    </button>
                </div>
            </aside>
            <main class="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
                <header class="mb-8 flex justify-between items-end">
                    <div><h2 class="text-2xl font-bold text-gray-900">Daftar Hadir</h2><p class="text-gray-500 text-sm">Presensi real-time hari ini.</p></div>
                    <input type="date" id="dateFilter" onchange="initDaftarHadir()" class="p-2 border rounded-xl text-sm outline-none focus:border-blue-500 font-bold">
                </header>
                <div class="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <table class="w-full text-left text-sm">
                        <thead class="bg-gray-50 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                            <tr><th class="p-4">No</th><th class="p-4">Nama Peserta</th><th class="p-4">Sekolah</th><th class="p-4 text-right">Jam</th></tr>
                        </thead>
                        <tbody id="hadirList" class="divide-y divide-gray-50"></tbody>
                    </table>
                </div>
            </main>
        </div>
    `,
    guru: `
        <div class="flex font-['Inter']">
            <aside class="h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-100 flex flex-col py-6">
                <div class="px-6 mb-8">
                    <h1 class="text-xl font-bold text-blue-600">KKG Portal</h1>
                    <p class="text-[10px] text-gray-400 font-semibold uppercase">Vercel Edition</p>
                </div>
                <nav class="flex-1 space-y-1 px-3">
                    <button onclick="navigate('dashboard')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">dashboard</span> <span class="text-sm">Dashboard</span>
                    </button>
                    <button onclick="navigate('scanner')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">qr_code_scanner</span> <span class="text-sm">QR Scanner</span>
                    </button>
                    <button onclick="navigate('hadir')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">assignment</span> <span class="text-sm">Daftar Hadir</span>
                    </button>
                    <button onclick="navigate('guru')" class="w-full flex items-center gap-3 px-4 py-2.5 text-blue-600 font-semibold bg-blue-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">groups</span> <span class="text-sm">Data Guru</span>
                    </button>
                    <button onclick="navigate('laporan')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">description</span> <span class="text-sm">Laporan</span>
                    </button>
                </nav>
                <div class="mt-auto border-t pt-4 px-3">
                    <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium">
                        <span class="material-symbols-outlined text-[20px]">logout</span> <span class="text-sm">Keluar</span>
                    </button>
                </div>
            </aside>
            <main class="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
                <header class="mb-8"><h2 class="text-2xl font-bold text-gray-900">Data Guru</h2><p class="text-gray-500 text-sm">Manajemen database guru.</p></header>
                <div class="bg-white p-3 rounded-2xl shadow-sm border mb-8 flex items-center">
                    <span class="material-symbols-outlined text-gray-400 mx-2">search</span>
                    <input type="text" id="guruSearch" onkeyup="renderGuruList()" class="flex-1 p-2 bg-transparent outline-none text-sm font-semibold" placeholder="Cari nama atau sekolah...">
                </div>
                <div id="guruContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            </main>
        </div>
    `,
    laporan: `
        <div class="flex font-['Inter']">
            <aside class="h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-100 flex flex-col py-6">
                <div class="px-6 mb-8">
                    <h1 class="text-xl font-bold text-blue-600">KKG Portal</h1>
                    <p class="text-[10px] text-gray-400 font-semibold uppercase">Vercel Edition</p>
                </div>
                <nav class="flex-1 space-y-1 px-3">
                    <button onclick="navigate('dashboard')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">dashboard</span> <span class="text-sm">Dashboard</span>
                    </button>
                    <button onclick="navigate('scanner')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">qr_code_scanner</span> <span class="text-sm">QR Scanner</span>
                    </button>
                    <button onclick="navigate('hadir')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">assignment</span> <span class="text-sm">Daftar Hadir</span>
                    </button>
                    <button onclick="navigate('guru')" class="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">groups</span> <span class="text-sm">Data Guru</span>
                    </button>
                    <button onclick="navigate('laporan')" class="w-full flex items-center gap-3 px-4 py-2.5 text-blue-600 font-semibold bg-blue-50 rounded-lg">
                        <span class="material-symbols-outlined text-[20px]">description</span> <span class="text-sm">Laporan</span>
                    </button>
                </nav>
                <div class="mt-auto border-t pt-4 px-3">
                    <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium">
                        <span class="material-symbols-outlined text-[20px]">logout</span> <span class="text-sm">Keluar</span>
                    </button>
                </div>
            </aside>
            <main class="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
                <header class="mb-8"><h2 class="text-2xl font-bold text-gray-900">Laporan</h2><p class="text-gray-500 text-sm">Ekspor data presensi.</p></header>
                <div class="bg-white rounded-2xl p-16 text-center border shadow-sm">
                    <span class="material-symbols-outlined text-4xl text-gray-200 mb-2">analytics</span>
                    <h3 class="text-lg font-bold text-gray-800 tracking-tight">Analisis Data</h3>
                    <p class="text-sm text-gray-400">Fitur sedang disiapkan.</p>
                </div>
            </main>
        </div>
    `
};
