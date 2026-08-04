export default async function handler(req, res) {
    // Add CORS headers to all responses including errors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { action, ...params } = req.query;
    const API_URL = 'https://script.google.com/macros/s/AKfycbx8-79fGZQ7vypupVYaQj9DFJGnIrQxbmy_3s0pSiI13AFdHvyHWaRkw3Vv08GQ-hiL/exec';
    
    try {
        const url = new URL(API_URL);
        if (action) url.searchParams.append('action', action);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        console.log('Proxying to:', url.toString());

        const fetchOptions = {
            method: req.method,
            redirect: 'follow',
            headers: {
                'User-Agent': 'Google-Apps-Script-Proxy-Client/1.0',
                'Accept': 'application/json, text/plain, */*'
            }
        };

        if (req.method === 'POST' && req.body) {
            fetchOptions.headers['Content-Type'] = 'application/json';
            fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        }

        // Retry logic hingga 3 kali jika terjadi cold-start HTML atau gangguan sementara dari Google Apps Script
        const maxRetries = 3;
        let lastText = '';

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const response = await fetch(url.toString(), fetchOptions);
                const text = await response.text();
                lastText = text;

                // Cek apakah response berupa JSON yang valid
                const data = JSON.parse(text);
                return res.status(200).json(data);
            } catch (e) {
                console.warn(`Attempt ${attempt}: GAS returned non-JSON/HTML snippet:`, lastText.substring(0, 100));
                if (attempt === maxRetries) {
                    return res.status(200).json({ 
                        error: 'GAS returned non-JSON response', 
                        detail: lastText.substring(0, 500),
                        hint: 'Pastikan di Google Apps Script sudah di-deploy dengan Who has access: Anyone' 
                    });
                }
                // Tunggu sebentar sebelum mencoba lagi (exponential backoff: 600ms, 1200ms)
                await new Promise(resolve => setTimeout(resolve, attempt * 600));
            }
        }
    } catch (error) {
        console.error('Proxy Server Error:', error);
        return res.status(200).json({ error: 'Proxy Server Error', message: error.message });
    }
}

