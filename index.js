const http = require('http');
const proxy = require('http-proxy').createProxyServer({ changeOrigin: true });

http.createServer((req, res) => {
    // සර්වර් එක ජීවතුන් අතරද බලන්න
    if (req.url === '/') return res.end("Koyeb Proxy is Online ✅");

    // මේක තමයි මැජික් එක: එන ඕනෑම connection එකක් target එකට හරවනවා
    // උදා: Proxy එකක් විදිහට වැඩ කරනවා
    proxy.web(req, res, { target: req.url }); 
}).listen(process.env.PORT || 8080);

console.log("Koyeb Proxy started on port 8080. No heavy tools installed.");
