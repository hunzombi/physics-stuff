const https = require('https');
const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const HTTPS_PORT = 443;
const HTTP_PORT = 80;

const sslOptions = {
    key: fs.readFileSync('./certs/privkey.pem'),
    cert: fs.readFileSync('./certs/fullchain.pem')
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("🚧 Under construction 🚧");
});

app.get('/calorimetry', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'project.html'));
});

app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running on port ${HTTPS_PORT}`);
});

http.createServer((req, res) => {
    const host = req.headers['host'] || '';
    res.writeHead(301, { Location: `https://${host}${req.url}` });
    res.end();
}).listen(HTTP_PORT, () => {
    console.log(`HTTP Server running on port ${HTTP_PORT} and redirecting to HTTPS`);
});