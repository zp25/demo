// http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

const exec = require('child_process').exec;

let cmd = '';
if (process.env.NODE_ENV === 'production') {
  cmd = 'npm run build';
} else {
  cmd = 'npm run writeFiles';
}

exec(cmd, (err, stdout, stderr) => {
  if (err) {
    console.log(`exec error: ${err}`);
    return;
  }

  console.log(stdout);
  console.log(`stderr: ${stderr || 'none'}`);
});
