// http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

// 仅在production时运行，防止本地npm install时运行
if (process.env.NODE_ENV === 'production') {

  var child_process = require('child_process');
  var cmd = 'gulp --gulpfile gulpfile-production.babel.js';

  return child_process.exec(cmd, function (err, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
  });

}
