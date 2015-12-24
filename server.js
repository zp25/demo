var express = require('express');
var fs = require('fs');
var exphbs  = require('express-handlebars');
var favicon = require('serve-favicon');
var multer = require('multer');
var compression = require('compression');
var errorHandler = require('errorhandler');

var app = express();

/** const */
app.set('basePath', __dirname + '/dist');
app.set('port', process.env.PORT || 8081);
app.set('oneDay', 86400000);

/** template engine */
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/** compression */
app.use(compression());
/** favicon */
app.use(favicon(app.get('basePath') + '/favicon.ico'));

/** static */
app.use(express.static(app.get('basePath') + "/public", {maxAge: app.get('oneDay')}));

/** index */
app.get('/', function(req, res) {
  res.sendFile(app.get('basePath') + '/index.html');
});

/** router */
app.get('/:page_name', function(req, res) {
  var path = app.get('basePath') + '/' + req.params.page_name + '/index.html';

  fs.readFile(path, {encoding: 'utf8'}, function(err, data) {
    if (err) {
      res.writeHead(404);
      return res.end('Page Not Found');
    }

    res.render('pages', {container: data});
  });
});

/** multer config */
var upload = multer({
  dest: app.get('basePath') + '/uploads/',
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

/** upload file */
app.post('/uploads', upload.single('fileField'), function(req, res, cb) {
  var file = {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    filename: req.file.filename,
    size: req.file.size
  };

  res.send(JSON.stringify(file));
});

/** error handling middleware should be loaded after the loading the routes */
if (app.get('env') === 'development') {
  console.log('Development mode');
  app.use(errorHandler());
}

/** engine start! */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
