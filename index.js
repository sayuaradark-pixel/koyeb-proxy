const http = require('http');
const httpProxy = require('http-proxy');

// Proxy සර්වර් එක නිර්මාණය කිරීම
const proxy = httpProxy.createProxyServer({});

// ලැබෙන රික්වෙස්ට් එක Target URL එකට හරවා යැවීම
const server = http.createServer((req, res) => {
    // සර්වර් එක වැඩ කරනවද කියලා බලන්න පොඩි check එකක්
    if (req.url === '/') {
        return res.end("Proxy Bridge is Running!");
    }

    // Hugging Face එකෙන් එවන Target URL එක මෙතනින් handle වෙනවා
    proxy.web(req, res, { 
        target: req.url, 
        changeOrigin: true,
        prependPath: false
    });
});

// Koyeb එකේ Port එකට සවන් දීම
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Proxy Bridge on port ${PORT}`));
