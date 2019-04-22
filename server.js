const path = require('path');
const express = require('express');
const compression = require('compression');
const errorHandler = require('errorhandler');
const helmet = require('helmet');
const ms = require('ms');

const app = express();

const static = path.resolve(__dirname, 'dist');
const images = path.resolve(static, 'images');
const scripts = path.resolve(static, 'scripts');
const styles = path.resolve(static, 'styles');

app.set('port', process.env.PORT || 3001);

const FAVICON = [
  'favicon.png',
  'icon@iphone.png',
  'icon@iphone-plus.png',
];

// Use Helmet
app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      workerSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
    browserSniff: false,
  },
  frameguard: {
    action: 'deny',
  },
  hsts: {
    maxAge: ms('0.5y') / 1000,
    includeSubDomains: true,
  },
  referrerPolicy: {
    policy: 'origin-when-cross-origin',
  },
}));

// middleware
app.use(compression());

// static assets
FAVICON.forEach((icon) => {
  app.use(`/${icon}`, express.static(path.resolve(static, icon), {
    maxAge: ms('0.5y'),
  }));
});

app.use('/images', express.static(images, { maxAge: ms('0.5y') }));
app.use('/scripts', express.static(scripts, { maxAge: ms('0.5y') }));
app.use('/styles', express.static(styles, { maxAge: ms('0.5y') }));
app.use(express.static(static, {
  setHeaders: (res) => {
    // 其他静态资源no-cache
    res.set('Cache-Control', 'no-cache');
  },
}));

// 404
app.use((req, res) => {
  res.status(404).send('Page not Found');
});

if (app.get('env') === 'development') {
  console.log('Development mode');
  app.use(errorHandler());
}

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
