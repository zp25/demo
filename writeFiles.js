const path = require('path');
const fs = require('fs');
const config = require('./config.json');
const wrap = require('./pages/wrap');

/**
 * 新建单个文件
 * @return {Promise}
 */
const writeFile = page => new Promise((resolve, reject) => {
  const {
    name,
    template,
    file,
    ...rest
  } = page;

  const input = `./pages/${template}`;
  const output = `./app/html/${file}`;

  // 规范路径
  const { style, script } = rest;
  const data = Object.assign({}, rest, {
    style: style ? path.resolve('pages/', template, 'style.scss') : false,
    script: script ? path.resolve('pages/', template, 'script.js') : false,
  });

  // 注意wrap必须使用templaterAsync，其它可使用templater，例如index, 404
  wrap({
    file,
    app: require(input)(data),
  }).then((result) => {
    fs.writeFile(output, result, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(file);
      }
    });
  });
});

/**
 * 读取配置，新建所有文件
 * @return {Promise}
 */
const writeFiles = ({
  index,
  '404': notFound,
  error,
  ...contents
}) => {
  let spread = [];
  for (let [key, group] of Object.entries(contents)) {
    group = group.map(d => Object.assign({}, d, {
      template: path.join(key, d.template),
    }));

    spread = spread.concat(group);
  }

  const pages = [
    Object.assign({}, index, contents),
    notFound,
    error,
  ].concat(spread).filter(d => !d.draft);

  return Promise.all(pages.map(page => writeFile(page)));
};

/**
 * 新建文件夹
 * @see {@link https://stackoverflow.com/a/21196961/3388271}
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
  }

  writeFiles(config).then((data) => {
    console.log(`total: ${data.length} files\ndone!`);
  }).catch((err) => {
    console.log(err);
  });
});
