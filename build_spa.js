const fs = require('fs');
const files = ['Dashboard.html', 'Kegiatan.html', 'Scanner.html', 'DaftarHadir.html', 'ListPeserta.html', 'Laporan.html'];

let indexHtml = fs.readFileSync('src/Dashboard.html', 'utf8');

let topPart = indexHtml.split('<main class="ml-64 p-8">')[0];
let bottomPart = '</body>\n</html>';

let combinedHtml = topPart + '<main class="ml-64 p-8">\n';
let allScripts = '';

files.forEach(file => {
  let content = fs.readFileSync('src/' + file, 'utf8');
  let parts = content.split('<main class="ml-64 p-8">');
  if (parts.length < 2) return;
  let mainContent = parts[1].split('</main>')[0];
  
  let pageName = file.replace('.html', '').toLowerCase();
  if (pageName === 'daftarhadir') pageName = 'hadir';
  if (pageName === 'listpeserta') pageName = 'peserta';
  if (pageName === 'listguru') pageName = 'guru';
  
  combinedHtml += '<div id="view-' + pageName + '" class="page-view' + (pageName === 'dashboard' ? '' : ' hidden') + '">\n' + mainContent + '\n</div>\n';
  
  // Extract script tags
  let scriptParts = content.split('<script');
  for(let i=1; i<scriptParts.length; i++) {
     let scriptTag = '<script' + scriptParts[i].split('</script>')[0] + '</script>\n';
     if (!allScripts.includes(scriptTag)) {
         allScripts += scriptTag;
     }
  }
});

// Remove existing tailwind script from allScripts if it's there
allScripts = allScripts.replace(/<script src="https:\/\/cdn\.tailwindcss\.com.*?<\/script>/g, '');

combinedHtml += '</main>\n';
combinedHtml += allScripts;
combinedHtml += bottomPart;

// Make sidebar links SPA links
combinedHtml = combinedHtml.replace(/href="<\?= scriptUrl \?>\?page=([a-z]+)" target="_top"/g, 'href="#" onclick="navigate(\'$1\'); return false;"');

// Add navigation script
combinedHtml = combinedHtml.replace('</body>', `
<script>
function navigate(page) {
  if (page !== 'scanner' && typeof stopScanner === 'function') {
     stopScanner();
  }
  document.querySelectorAll('.page-view').forEach(el => el.classList.add('hidden'));
  const targetView = document.getElementById('view-' + page);
  if (targetView) targetView.classList.remove('hidden');
  
  // Update sidebar active state
  document.querySelectorAll('aside nav a').forEach(el => {
    el.classList.remove('text-emerald-700', 'font-semibold', 'border-r-4', 'border-emerald-600', 'bg-emerald-50', 'rounded-l-lg');
    el.classList.add('text-gray-600', 'hover:bg-gray-50', 'rounded-lg');
  });
  
  let activeLink = document.querySelector('aside nav a[onclick*="navigate(\\'' + page + '\\')"]');
  if (activeLink) {
    activeLink.classList.remove('text-gray-600', 'hover:bg-gray-50', 'rounded-lg');
    activeLink.classList.add('text-emerald-700', 'font-semibold', 'border-r-4', 'border-emerald-600', 'bg-emerald-50', 'rounded-l-lg');
  }
  
  // Call initialization functions if they exist
  if (page === 'dashboard' && typeof loadDashboard === 'function') {
     loadDashboard();
  }
  if (page === 'kegiatan' && typeof loadKegiatan === 'function') {
     loadKegiatan();
  }
  if (page === 'hadir' && typeof loadDaftarHadir === 'function') {
     loadDaftarHadir();
  }
  if (page === 'peserta' && typeof loadPeserta === 'function') {
     loadPeserta();
  }
  if (page === 'laporan' && typeof loadLaporan === 'function') {
     loadLaporan();
  }
}
</script>
</body>`);

fs.writeFileSync('src/App.html', combinedHtml);
console.log('App.html created successfully for MTQ Portal!');
