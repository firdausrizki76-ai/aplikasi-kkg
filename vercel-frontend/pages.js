const PAGES = {
    login: `
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-4">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div class="text-center mb-8">
                    <div class="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span class="material-symbols-outlined text-blue-600 text-4xl">school</span>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800">KKG Portal</h1>
                    <p class="text-gray-500">Sistem Absensi Vercel Edition</p>
                </div>
                <form id="loginForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input type="email" id="email" required class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input type="password" id="password" required class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">Masuk</button>
                </form>
            </div>
        </div>
    `,
    dashboard: `
        <div class="min-h-screen flex">
            <!-- Sidebar -->
            <aside class="w-64 bg-white border-r flex flex-col p-6">
                <h1 class="text-2xl font-bold text-blue-600 mb-8">KKG Portal</h1>
                <nav class="space-y-2 flex-1">
                    <button onclick="navigate('dashboard')" class="w-full flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold">
                        <span class="material-symbols-outlined">dashboard</span> Dashboard
                    </button>
                    <button onclick="navigate('scanner')" class="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
                        <span class="material-symbols-outlined">qr_code_scanner</span> QR Scanner
                    </button>
                </nav>
                <button onclick="logout()" class="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all">
                    <span class="material-symbols-outlined">logout</span> Keluar
                </button>
            </aside>
            <!-- Content -->
            <main class="flex-1 p-8 overflow-y-auto">
                <header class="mb-8">
                    <h2 class="text-3xl font-bold text-gray-800">Dashboard</h2>
                    <p class="text-gray-500">Selamat datang kembali!</p>
                </header>
                <div id="dashboardContent">
                    <div class="animate-pulse flex space-x-4">
                        <div class="flex-1 space-y-4 py-1">
                            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div class="space-y-2">
                                <div class="h-4 bg-gray-200 rounded"></div>
                                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `,
    scanner: `
        <div class="min-h-screen flex">
            <!-- Sidebar -->
            <aside class="w-64 bg-white border-r flex flex-col p-6">
                <h1 class="text-2xl font-bold text-blue-600 mb-8">KKG Portal</h1>
                <nav class="space-y-2 flex-1">
                    <button onclick="navigate('dashboard')" class="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
                        <span class="material-symbols-outlined">dashboard</span> Dashboard
                    </button>
                    <button onclick="navigate('scanner')" class="w-full flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold">
                        <span class="material-symbols-outlined">qr_code_scanner</span> QR Scanner
                    </button>
                </nav>
            </aside>
            <!-- Content -->
            <main class="flex-1 p-8 flex flex-col">
                <header class="mb-8">
                    <h2 class="text-3xl font-bold text-gray-800">QR Scanner</h2>
                    <p class="text-gray-500 text-green-600 font-bold">✓ Vercel Edition: Camera permission enabled!</p>
                </header>
                <div class="max-w-2xl mx-auto w-full">
                    <div id="reader" class="bg-black rounded-2xl overflow-hidden aspect-video shadow-2xl"></div>
                    <button id="btnStart" onclick="startScanner()" class="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                        <span class="material-symbols-outlined">videocam</span> Mulai Scanner
                    </button>
                    <div id="manualInputSection" class="mt-8 p-6 bg-gray-100 rounded-2xl">
                         <p class="text-sm font-semibold text-gray-600 mb-2 uppercase">Input Manual</p>
                         <div class="flex gap-2">
                             <input type="text" id="manualInput" class="flex-1 p-3 rounded-xl border-0 shadow-sm outline-none" placeholder="ID Guru / Barcode...">
                             <button onclick="processManual()" class="bg-gray-800 text-white px-6 rounded-xl font-bold">Proses</button>
                         </div>
                    </div>
                </div>
            </main>
        </div>
    `
};
