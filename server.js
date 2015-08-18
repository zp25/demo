var express = require('express');
var http = require('http');
var fs = require('fs');
var exphbs  = require('express-handlebars');
var favicon = require('serve-favicon');
var multer = require('multer');
var compression = require('compression');

var app = express();
var port = process.env.PORT || 8080;
var oneDay = 86400000;

// check mode
if (app.get('env') !== 'production') {
  console.log('Development mode');
}

// view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// use middleware
app.use(compression());
app.use(favicon(__dirname + '/public/favicon.ico'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/:page_name', function(req, res) {
  fs.readFile(__dirname + '/pages/' + req.params.page_name, { encoding: 'utf8' }, function (err, data) {
    if (err) {
      res.writeHead(404);
      return res.end('Page Not Found');
    }

    res.render('pages', { container: data });
  });
});

app.use(express.static(__dirname + "/public", { maxAge: oneDay }));

app.use(function(err, req, res, next) {
  res.status(404).send('Page Not Found');
});


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