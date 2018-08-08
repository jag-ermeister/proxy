var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

var options = {
  target: 'http://www.columbia.edu', 
  changeOrigin: true,
  secure: false
};

app.use('/', proxy(options));

app.listen(5050);
console.log('Listening on port 5050...');