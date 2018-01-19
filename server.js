const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const errorHandler = require('errorhandler');
const helmet = require('helmet');
const ms = require('ms');

const app = express();

const static = path.resolve(__dirname, 'dist');
const html = path.resolve(static, 'html');

app.set('port', process.env.PORT || 3001);
app.set('favicon', path.resolve(static, 'images/favicon.png'));

// Use Helmet
app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
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
app.use(favicon(app.get('favicon')));

app.use(express.static(html, { maxAge: ms('1d') }));
app.use(express.static(static, { maxAge: ms('1w') }));

if (app.get('env') === 'development') {
  console.log('Development mode');
  app.use(errorHandler());
}

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
