var http = require('http');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({ ignorePath: true });

var server = http.createServer(function(req, res) {
  proxy.web(req, res, {
    changeOrigin: true,
    target: 'https://www.techradar.com/news/google-pixel-3'
  });
});

console.log("listening on port 5050")
server.listen(5050);