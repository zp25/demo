var express = require('express');
// var http = require('http');
var fs = require('fs');
var exphbs  = require('express-handlebars');
var favicon = require('serve-favicon');
var multer = require('multer');
var compression = require('compression');
var errorHandler = require('errorhandler');

var app = express();

app.set('port', process.env.PORT || 8080);
app.set('oneDay', 86400000);


// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// router
app.use(compression());
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(express.static(__dirname + "/public", { maxAge: app.get('oneDay') }));

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


// error handling middleware should be loaded after the loading the routes
if (app.get('env') == 'development') {
  console.log('Development mode');
  app.use(errorHandler());
}


// engine start!
// var server = http.createServer(app).listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + app.get('port'));
// });
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});