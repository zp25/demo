var express = require('express');
var http = require('http');
var fs = require('fs');
// var exphbs  = require('express-handlebars');
var favicon = require('serve-favicon');
var multer = require('multer');
var compression = require('compression');

var app = express();
var port = process.env.PORT || 8080;
var oneDay = 86400000;

// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// compress
app.use(compression());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + "/public", { maxAge: oneDay }));
app.use(express.static(__dirname + "/pages"));

app.use(favicon(__dirname + '/public/favicon.ico'));

// file upload
var upload = multer({
  dest: __dirname + '/uploads/',
  limits: { fileSize: 1048576 },
  fileFilter: function(req, file, cb) {
    var regex = /^image\//;

    if (!regex.test(file.mimetype)) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  }
});

app.post('/uploads', upload.single('fileField'), function (req, res, cb) {
  res.status(204).end();
});

// engine start!
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});