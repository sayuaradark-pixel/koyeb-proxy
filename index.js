const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({ changeOrigin: true, secure: false });

const server = http.createServer((req, res) => {
    // URL එකෙන් "/" අයින් කරලා පෝර්න්හබ් ලින්ක් එක ගන්නවා
    const targetUrl = req.url.substring(1); 

    if (!targetUrl || !targetUrl.startsWith('http')) {
        return res.end("Koyeb Proxy is Active. Send URL after /");
    }

    proxy.web(req, res, { target: targetUrl });
});

server.listen(process.env.PORT || 8080);
