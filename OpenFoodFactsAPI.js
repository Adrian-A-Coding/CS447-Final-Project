const http = require('http');
const https = require('https'); // Add this to handle https requests
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Create an HTTP server that listens for requests on /food endpoint
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url.startsWith('/food')) {
        const ingredients = new URL(req.url, `http://${req.headers.host}`).searchParams.get('ingredients');

        if (!ingredients) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Please provide ingredients" }));
            return;
        }

        const apiUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(ingredients)}&search_simple=1&action=process&json=1`;

        const protocol = new URL(apiUrl).protocol;
        const requester = protocol === 'https:' ? https : http;

        requester.get(apiUrl, (apiRes) => {
            let data = '';
            apiRes.on('data', (chunk) => {
                data += chunk;
            });
            apiRes.on('end', () => {
                try {
                    const foodItems = JSON.parse(data).products.map(product => ({
                        name: product.product_name,
                        brand: product.brands,
                        ingredients: product.ingredients_text,
                        image: product.image_url,
                        url: product.url,
                    }));

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(foodItems));
                } catch (error) {
                    console.error('Error parsing API response:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Error parsing API response' }));
                }
            });
        }).on('error', (error) => {
            console.error('Error fetching data:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error fetching data' }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});