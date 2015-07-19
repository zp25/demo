var express = require('express');
var http = require('http');
var fs = require('fs');
// var exphbs  = require('express-handlebars');
var favicon = require('serve-favicon');

var app = express();
var port = process.env.PORT || 8080;

// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/', express.static(__dirname + "/public/"));

app.use(favicon(__dirname + '/public/favicon.ico'));

var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});