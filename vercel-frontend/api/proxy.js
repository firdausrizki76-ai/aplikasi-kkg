export default async function handler(req, res) {
    // Add CORS headers to all responses including errors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { action, ...params } = req.query;
    const API_URL = 'https://script.google.com/macros/s/AKfycby838yDg60Ji37kpP9DkGDYFN0uBCMh6dfPebKQkQncvmTR0Fn8pn5Dmmo6FXitWZc/exec';
    
    try {
        const url = new URL(API_URL);
        url.searchParams.append('action', action);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        console.log('Proxying to:', url.toString());

        const response = await fetch(url.toString(), {
            method: req.method,
            redirect: 'follow'
        });

        const text = await response.text();
        console.log('Response from GAS:', text.substring(0, 100));

        try {
            const data = JSON.parse(text);
            return res.status(200).json(data);
        } catch (e) {
            // If not JSON, return as error with the text
            return res.status(200).json({ error: 'GAS returned non-JSON response', detail: text });
        }
    } catch (error) {
        console.error('Proxy Server Error:', error);
        return res.status(200).json({ error: 'Proxy Server Error', message: error.message });
    }
}
