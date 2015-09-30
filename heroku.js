// http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

// 仅在production时运行，防止本地npm install时运行
if (process.env.NODE_ENV === 'production') {

  var child_process = require('child_process');

  return child_process.exec('gulp heroku', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

}