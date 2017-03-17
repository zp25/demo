// http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

// 仅在production时运行，防止本地npm install时运行
if (process.env.NODE_ENV === 'production') {
  const exec = require('child_process').exec;
  const cmd = 'gulp --gulpfile gulpfile-production.babel.js';

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log(`exec error: ${err}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}
