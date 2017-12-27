const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const errorHandler = require('errorhandler');
const helmet = require('helmet');

const app = express();

const static = path.resolve(__dirname, 'dist');
const html = path.resolve(static, 'html');

app.set('port', process.env.PORT || 3001);
app.set('favicon', path.resolve(static, 'images/favicon.png'));

app.set('oneDay', 24 * 3600);
app.set('oneWeek', 7 * 24 * 3600);
app.set('halfYear', 180 * 24 * 3600);

// Use Helmet
app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ['data:'],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
    browserSniff: false,
  },
  frameguard: {
    action: 'deny',
  },
  hsts: {
    maxAge: app.get('halfYear'),
    includeSubDomains: true,
  },
  referrerPolicy: {
    policy: 'origin-when-cross-origin',
  },
}));

// middleware
app.use(compression());
app.use(favicon(app.get('favicon')));

app.use(express.static(html, { maxAge: app.get('oneDay') }));
app.use(express.static(static, { maxAge: app.get('oneWeek') }));

if (app.get('env') === 'development') {
  console.log('Development mode');
  app.use(errorHandler());
}

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
