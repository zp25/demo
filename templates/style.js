const fs = require('fs');
const { preTag } = require('./tags');

/**
 * style源码
 * @param {string} fname - style.scss绝对路径
 * @return {string} pre标签，包含style源码
 */
const style = (fname) => {
  if (!fname) {
    return '';
  }

  return new Promise((resolve, reject) => {
    fs.readFile(fname, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(preTag(data, 'styles'));
    })
  });
};

style.displayName = 'style';

module.exports = style;
