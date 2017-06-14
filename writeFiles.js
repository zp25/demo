const path = require('path');
const fs = require('fs');
const config = require('./config.json');
const wrap = require('./pages/wrap');

/**
 * 新建单个文件
 * @return {Promise}
 */
const writeFile = (page) => new Promise((resolve, reject) => {
  const {
    name,
    template,
    link,
    style,
    script,
    file,
  } = page;

  const input = path.resolve('pages/', template);
  const output = path.resolve('app/html/', file);

  const data = name === 'index' ? config : { link, style, script };
  const result = wrap({
    file,
    app: require(input)(data),
  });

  fs.writeFile(output, result, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(file);
    }
  });
});

/**
 * 读取配置，新建所有文件
 * @return {Promise}
 */
const writeFiles = () => {
  const pages = [
    config.index,
    config['404'],
  ].concat(config.javascript, config.css, config.more).filter(d => !d.draft);

  return Promise.all(pages.map(page => writeFile(page)));
};

/**
 * 新建文件夹
 */
const ensureExists = (path, mask, cb) => {
  if (typeof mask === 'function') {
    cb = mask;
    mask = 0o777;
  }

  fs.mkdir(path, mask, (err) => {
    if (err && err.code !== 'EEXIST') {
      cb(err);
    } else {
      cb(null);
    }
  });
};

ensureExists('app/html', 0o755, (err) => {
  if (err) {
    throw err;
  } else {
    writeFiles().then((data) => {
      console.log(`total: ${data.length} files\ndone!`);
    }).catch((err) => {
      console.log(`${err.code}: ${err.message}`);
    });
  }
});
