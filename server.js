const http = require('http');
const { createClient } = require('redis');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const client = createClient({ url: REDIS_URL });

client.on('error', (err) => console.log('Redis Connection Error:', err));

async function startServer() {
    await client.connect();
    console.log('Successfully connected to Redis Database!');

    const server = http.createServer(async (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        // Har request par count 1 badhega
        const visits = await client.incr('api_page_views');

        res.end(JSON.stringify({
            status: "Success",
            message: "Multi-Container Architecture Live on AWS EC2!",
            database: "Redis In-Memory Store",
            total_visits: visits,
            connected_host: req.headers.host,
            timestamp: new Date()
        }, null, 2));
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, '0.0.0.0', () => {
        console.log(`Backend server listening on port ${PORT}`);
    });
}

startServer();
