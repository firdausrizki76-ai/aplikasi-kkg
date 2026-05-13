const getSidebar = (active) => `
    <aside class="h-screen w-64 fixed left-0 top-0 bg-white shadow-xl flex flex-col py-6 z-50 transition-all border-r border-gray-100">
        <div class="px-6 mb-10">
            <h1 class="text-2xl font-black text-blue-600 tracking-tight">KKG Portal</h1>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] -mt-1">Vercel Edition</p>
        </div>
        
        <nav class="flex-1 space-y-2 px-3">
            <button onclick="navigate('dashboard')" class="w-full flex items-center gap-3 px-4 py-3 transition-all \${active === 'dashboard' ? 'text-blue-600 font-bold border-r-4 border-blue-600 bg-blue-50 rounded-l-xl' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-xl'}">
                <span class="material-symbols-outlined text-[22px]">dashboard</span>
                <span class="text-sm">Dashboard</span>
            </button>
            <button onclick="navigate('scanner')" class="w-full flex items-center gap-3 px-4 py-3 transition-all \${active === 'scanner' ? 'text-blue-600 font-bold border-r-4 border-blue-600 bg-blue-50 rounded-l-xl' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-xl'}">
                <span class="material-symbols-outlined text-[22px]">qr_code_scanner</span>
                <span class="text-sm">QR Scanner</span>
            </button>
            <button onclick="navigate('hadir')" class="w-full flex items-center gap-3 px-4 py-3 transition-all \${active === 'hadir' ? 'text-blue-600 font-bold border-r-4 border-blue-600 bg-blue-50 rounded-l-xl' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-xl'}">
                <span class="material-symbols-outlined text-[22px]">assignment</span>
                <span class="text-sm">Daftar Hadir</span>
            </button>
            <button onclick="navigate('guru')" class="w-full flex items-center gap-3 px-4 py-3 transition-all \${active === 'guru' ? 'text-blue-600 font-bold border-r-4 border-blue-600 bg-blue-50 rounded-l-xl' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-xl'}">
                <span class="material-symbols-outlined text-[22px]">groups</span>
                <span class="text-sm">Data Guru</span>
            </button>
            <button onclick="navigate('laporan')" class="w-full flex items-center gap-3 px-4 py-3 transition-all \${active === 'laporan' ? 'text-blue-600 font-bold border-r-4 border-blue-600 bg-blue-50 rounded-l-xl' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-xl'}">
                <span class="material-symbols-outlined text-[22px]">description</span>
                <span class="text-sm">Laporan</span>
            </button>
        </nav>
        
        <div class="mt-auto border-t border-gray-50 pt-4 px-3">
            <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold">
                <span class="material-symbols-outlined text-[22px]">logout</span>
                <span class="text-sm">Keluar Aplikasi</span>
            </button>
        </div>
    </aside>
`;

const PAGES = {
    login: `
        <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-['Inter']">
            <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-10 border border-gray-100">
                <div class="text-center mb-10">
                    <div class="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200">
                        <span class="material-symbols-outlined text-white text-4xl">school</span>
                    </div>
                    <h1 class="text-4xl font-black text-gray-900 tracking-tight">KKG Portal</h1>
                    <p class="text-gray-400 font-medium mt-2">Sistem Absensi Digital KKG</p>
                </div>
                <form id="loginForm" class="space-y-6">
                    <div class="space-y-2">
                        <label class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Administrator</label>
                        <input type="email" id="email" required placeholder="admin@kkg.com" class="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-700 font-semibold">
                    </div>
                    <div class="space-y-2">
                        <label class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Kata Sandi</label>
                        <input type="password" id="password" required placeholder="••••••••" class="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-700 font-semibold">
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 mt-4 active:scale-[0.98]">MASUK SEKARANG</button>
                </form>
            </div>
        </div>
    `,
    dashboard: `
        <div class="flex font-['Inter']">
            \${getSidebar('dashboard')}
            <main class="flex-1 ml-64 p-10 bg-gray-50 min-h-screen">
                <header class="mb-10">
                    <h2 class="text-4xl font-black text-gray-900 tracking-tight">Dashboard</h2>
                    <p class="text-gray-500 font-medium">Selamat datang kembali di pusat kendali KKG.</p>
                </header>
                
                <div id="dashboardContent">
                     <div class="animate-pulse flex flex-col gap-6">
                         <div class="bg-gray-200 h-48 rounded-[2rem]"></div>
                         <div class="grid grid-cols-3 gap-6">
                             <div class="bg-gray-200 h-32 rounded-[2rem]"></div>
                             <div class="bg-gray-200 h-32 rounded-[2rem]"></div>
                             <div class="bg-gray-200 h-32 rounded-[2rem]"></div>
                         </div>
                     </div>
                </div>
            </main>
        </div>
    `,
    scanner: `
        <div class="flex font-['Inter']">
            \${getSidebar('scanner')}
            <main class="flex-1 ml-64 p-10 bg-gray-50 min-h-screen">
                <header class="mb-10 flex justify-between items-center">
                    <div>
                        <h2 class="text-4xl font-black text-gray-900 tracking-tight">QR Scanner</h2>
                        <p class="text-green-600 font-bold flex items-center gap-2 mt-1 text-sm">
                            <span class="material-symbols-outlined text-sm">verified</span> KAMERA AKTIF (VERCEL NATIVE)
                        </p>
                    </div>
                </header>
                
                <div class="max-w-3xl mx-auto">
                    <div class="relative group">
                        <div id="reader" class="bg-black rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl border-[12px] border-white ring-1 ring-gray-100"></div>
                        <div class="absolute inset-0 pointer-events-none border-[2px] border-blue-500/30 rounded-[2.5rem] animate-pulse"></div>
                    </div>
                    
                    <button id="btnStart" onclick="startScanner()" class="w-full mt-10 bg-blue-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-4 active:scale-95">
                        <span class="material-symbols-outlined text-3xl">videocam</span> MULAI SCANNER SEKARANG
                    </button>

                    <div class="mt-12 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                         <div class="flex items-center gap-3 mb-6">
                             <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                 <span class="material-symbols-outlined text-blue-600 font-bold">keyboard</span>
                             </div>
                             <h3 class="font-black text-gray-800 tracking-tight">INPUT MANUAL (DARURAT)</h3>
                         </div>
                         <div class="flex gap-4">
                             <input type="text" id="manualInput" class="flex-1 p-5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all text-xl font-bold placeholder:text-gray-300" placeholder="Ketik ID Guru / Barcode...">
                             <button onclick="processManual()" class="bg-gray-900 text-white px-10 rounded-2xl font-black hover:bg-black transition-all active:scale-95 shadow-lg">PROSES</button>
                         </div>
                    </div>
                </div>
            </main>
        </div>
    `,
    hadir: `
        <div class="flex font-['Inter']">
            \${getSidebar('hadir')}
            <main class="flex-1 ml-64 p-10 bg-gray-50 min-h-screen">
                <header class="mb-10 flex justify-between items-end">
                    <div>
                        <h2 class="text-4xl font-black text-gray-900 tracking-tight">Daftar Hadir</h2>
                        <p class="text-gray-500 font-medium">Log kehadiran peserta KKG secara real-time.</p>
                    </div>
                    <div class="bg-white p-2 rounded-2xl shadow-sm border flex items-center gap-2">
                        <span class="material-symbols-outlined text-gray-400 ml-2">calendar_month</span>
                        <input type="date" id="dateFilter" onchange="initDaftarHadir()" class="p-3 bg-transparent outline-none font-bold text-gray-700">
                    </div>
                </header>
                
                <div class="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="bg-gray-50/50">
                                <th class="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">No</th>
                                <th class="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Informasi Peserta</th>
                                <th class="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Instansi Sekolah</th>
                                <th class="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Waktu Absen</th>
                            </tr>
                        </thead>
                        <tbody id="hadirList" class="divide-y divide-gray-50">
                            <tr><td colspan="4" class="p-20 text-center text-gray-300 italic font-medium">Mengambil data dari server...</td></tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    `,
    guru: `
        <div class="flex font-['Inter']">
            \${getSidebar('guru')}
            <main class="flex-1 ml-64 p-10 bg-gray-50 min-h-screen">
                <header class="mb-10">
                    <h2 class="text-4xl font-black text-gray-900 tracking-tight">Data Guru</h2>
                    <p class="text-gray-500 font-medium">Database lengkap anggota Teacher Working Group.</p>
                </header>
                
                <div class="bg-white p-4 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 mb-10">
                    <div class="relative">
                        <span class="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 text-3xl">search</span>
                        <input type="text" id="guruSearch" onkeyup="renderGuruList()" class="w-full pl-16 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all text-xl font-bold" placeholder="Cari nama guru, NIP, atau asal sekolah...">
                    </div>
                </div>
                
                <div id="guruContainer" class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
                    <!-- Cards injected here -->
                </div>
            </main>
        </div>
    `,
    laporan: `
        <div class="flex font-['Inter']">
            \${getSidebar('laporan')}
            <main class="flex-1 ml-64 p-10 bg-gray-50 min-h-screen">
                <header class="mb-10">
                    <h2 class="text-4xl font-black text-gray-900 tracking-tight">Laporan</h2>
                    <p class="text-gray-500 font-medium">Analisis dan ekspor data kehadiran.</p>
                </header>
                <div class="bg-white rounded-[3rem] p-24 text-center border border-dashed border-gray-200 shadow-sm">
                    <div class="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <span class="material-symbols-outlined text-6xl text-blue-200">analytics</span>
                    </div>
                    <h3 class="text-3xl font-black text-gray-800 mb-4 tracking-tight">Fitur Laporan Premium</h3>
                    <p class="text-gray-400 font-medium max-w-md mx-auto">Menu ini sedang dalam tahap sinkronisasi data final dan akan segera tersedia untuk Anda.</p>
                </div>
            </main>
        </div>
    `
};
