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