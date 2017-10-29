const { templater } = require('zp-lib');

module.exports = templater`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="white">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title>DEMO | zp25</title>
    <!-- app icon -->
    <link rel="apple-touch-icon" sizes="120x120" href="images/icon@iphone.png">
    <link rel="apple-touch-icon" sizes="180x180" href="images/icon@iphone-plus.png">
    <link rel="apple-touch-icon" sizes="152x152" href="images/icon@ipad.png">
    <link rel="apple-touch-icon" sizes="167x167" href="images/icon@ipad-pro.png">
    <!-- favicon -->
    <link rel="icon" type="image/png" sizes="192x192" href="images/favicon.png">
    <!-- manifest -->
    <link rel="manifest" href="manifest.json">
    <!-- canonical -->
    <link rel="canonical" href="https://demo.zp25.ninja/${'file'}">
    <link rel="stylesheet" href="styles/main.css" media="all">
    <link rel="stylesheet" href="styles/pages.css" media="all">
    <script defer src="scripts/main.js" type="text/javascript"></script>
  </head>

  <body>
  ${'app'}
  </body>
  </html>
`;
