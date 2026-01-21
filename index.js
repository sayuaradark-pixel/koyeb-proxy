const http = require('http');
const httpProxy = require('http-proxy');
const os = require('os');

// 1. සර්වර් එකේ ඇතුළේ තියෙන Real IP එක ලොග් කරන ලොජික් එක
console.log("--- Server Network Info ---");
const networkInterfaces = os.networkInterfaces();
Object.keys(networkInterfaces).forEach((ifname) => {
    networkInterfaces[ifname].forEach((iface) => {
        // IPv4 සහ internal නොවන (Public/Internal) IP එක විතරක් ගන්නවා
        if ('IPv4' !== iface.family || iface.internal !== false) return;
        console.log(`🚀 Koyeb Real IP for Hugging Face: ${iface.address}`);
    });
});
console.log("---------------------------");

// 2. Proxy සර්වර් එක නිර්මාණය කිරීම
const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    secure: false
});

const server = http.createServer((req, res) => {
    // සර්වර් එක වැඩද කියලා බලන්න (Health Check)
    if (req.url === '/' || req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end("Proxy Bridge is Active and Running!");
    }

    // Proxy Error Handling
    proxy.on('error', (err, req, res) => {
        console.error("Proxy Error:", err.message);
        if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
        }
        res.end("Bridge Error: " + err.message);
    });

    // ලැබෙන ඕනෑම Request එකක් Target URL එකට හරවා යැවීම
    // මෙතන req.url එක විදිහට එන්නේ Pornhub link එක
    const targetUrl = req.url.startsWith('/') ? req.url.substring(1) : req.url;

    if (targetUrl.startsWith('http')) {
        proxy.web(req, res, { target: targetUrl });
    } else {
        res.end("Please provide a valid URL after the slash (e.g., /https://google.com)");
    }
});

// Koyeb default port එකට සවන් දීම
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`🚀 Proxy Bridge running on port ${PORT}`);
});
