export default async function handler(req, res) {
    const { action, ...params } = req.query;
    const API_URL = 'https://script.google.com/macros/s/AKfycbytBf7EJUkxO7I-fC4Odx0PQ4HnEd6qiaXNr_0TV6wczseqJM-d7Ctc1mzXBBVKzN4/exec';
    
    try {
        const url = new URL(API_URL);
        url.searchParams.append('action', action);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url.toString(), {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
            redirect: 'follow'
        });

        const data = await response.json();
        
        // Add CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        return res.status(200).json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
