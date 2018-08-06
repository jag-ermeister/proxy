var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

var options = {
  target: 'https://wrong.host.badssl.com/', 
  changeOrigin: true,
  secure: false
};

app.use('/', proxy(options));

app.listen(5050);