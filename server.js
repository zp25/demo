var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var favicon = require('serve-favicon');
var multer = require('multer');
var compression = require('compression');
var errorHandler = require('errorhandler');

var app = express();

var dist = path.resolve(__dirname, 'dist');

/** const */
app.set('dist', dist);
app.set('ico', path.resolve(dist, 'favicon.ico'));
app.set('upfile', path.resolve(dist, 'uploads'));
app.set('public', path.resolve(dist, 'public'));
app.set('port', process.env.PORT || 8081);
app.set('oneDay', 86400000);

/** @type {Object} 需从根路径获取的资源 */
var Root = {
  '/': path.resolve(dist, 'index.html'),
  '/sw.js': path.resolve(dist, 'sw.js')
};

/** template engine */
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/** compression */
app.use(compression());
/** favicon */
app.use(favicon(app.get('ico')));

/** static */
app.use(express.static(app.get('public'), {maxAge: app.get('oneDay')}));

/** router */
Object.keys(Root).forEach(function(key) {
  app.get(key, function(req, res) {
    res.sendFile(Root[key]);
  });
});

app.get('/:page_name', function(req, res) {
  var file = path.resolve(app.get('dist'), req.params.page_name, 'index.html');

  fs.readFile(file, {encoding: 'utf8'}, function(err, data) {
    if (err) {
      res.writeHead(404);
      return res.end('Page Not Found');
    }

    res.render('pages', {container: data});
  });
});

/** multer config */
var upload = multer({
  dest: app.get('upfile'),
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
