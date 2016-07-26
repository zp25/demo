const fs = require('fs');
const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const favicon = require('serve-favicon');
const multer = require('multer');
const compression = require('compression');
const errorHandler = require('errorhandler');

const app = express();

const dist = path.resolve(__dirname, 'dist');

/** const */
app.set('ico', path.resolve(dist, 'favicon.ico'));
app.set('upfile', path.resolve(dist, 'uploads'));
app.set('public', path.resolve(dist, 'public'));

app.set('port', process.env.PORT || 8881);
app.set('oneDay', 86400000);

const origin = app.get('env') === 'development' ?
  (`http://localhost:${app.get('port')}`) : 'https://demo.zp25.ninja';

/** @type {Object} 需从根路径获取的资源 */
const Root = {
  '/': path.resolve(dist, 'index.html'),
  '/sw.js': path.resolve(dist, 'sw.js')
};

/** template engine */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/** compression */
app.use(compression());
/** favicon */
app.use(favicon(app.get('ico')));

/** static */
app.use(express.static(app.get('public'), { maxAge: app.get('oneDay') }));

/** router */
Object.keys(Root).forEach(key => {
  app.get(key, (req, res) => {
    res.sendFile(Root[key]);
  });
});

app.get('/:page_name', (req, res) => {
  const file = path.resolve(dist, req.params.page_name, 'index.html');

  if (req.path[req.path.length - 1] === '/') {
    res.writeHead(404);
    return res.end('Page Not Found');
  }

  fs.readFile(file, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Page Not Found');
    }

    res.render('pages', { container: data, origin: origin });
  });
});

/** multer config */
const upload = multer({
  dest: app.get('upfile'),
  limits: { fileSize: 1048576 },
  fileFilter: (req, file, cb) => {
    const regex = /^image\//;

    if (!regex.test(file.mimetype)) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  }
});

/** upload file */
app.post('/uploads', upload.single('fileField'), (req, res, cb) => {
  const file = {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    filename: req.file.filename,
    size: req.file.size,
  };

  res.send(JSON.stringify(file));
});

/** error handling middleware should be loaded after the loading the routes */
if (app.get('env') === 'development') {
  console.log('Development mode');
  app.use(errorHandler());
}

/** engine start! */
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
