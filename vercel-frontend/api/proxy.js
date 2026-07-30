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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            }
        };

        if (req.method === 'POST' && req.body) {
            fetchOptions.headers['Content-Type'] = 'application/json';
            fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        }

        const response = await fetch(url.toString(), fetchOptions);

        const text = await response.text();
        console.log('Response from GAS:', text.substring(0, 100));

        try {
            const data = JSON.parse(text);
            return res.status(200).json(data);
        } catch (e) {
            // If not JSON, return as error with the text
            return res.status(200).json({ 
                error: 'GAS returned non-JSON response', 
                detail: text,
                hint: 'Pastikan di Google Apps Script sudah di-deploy dengan Who has access: Anyone' 
            });
        }
    } catch (error) {
        console.error('Proxy Server Error:', error);
        return res.status(200).json({ error: 'Proxy Server Error', message: error.message });
    }
}
