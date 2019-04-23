const fs = require('fs');
const path = require('path');
const {
  preTag,
  scriptTag,
} = require('./tags');

/**
 * script标签
 * @param {string} type - 标签类型，包括显示源码的code, inline, tag
 * @return {TypedObject}
 */
const script = (type) => {
  /**
   * 显示源码
   * @param {string} fname - script.js绝对路径
   */
  const code = (fname) => {
    if (!fname) {
      return '';
    }

    return new Promise((resolve, reject) => {
      fs.readFile(fname, { encoding: 'utf8' }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(preTag(data, 'scripts'));
      });
    });
  };

  /**
   * 添加inline script
   * @param {string} fname - script.js绝对路径
   */
  const inline = (fname) => {
    if (!fname) {
      return '';
    }

    return new Promise((resolve, reject) => {
      fs.readFile(fname, { encoding: 'utf8' }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(scriptTag(data, true));
      });
    });
  };

  /**
   * 添加script标签
   * @param {string} fname - 脚本路径
   */
  const tag = (fname) => {
    if (!fname) {
      return '';
    }

    const dir = path.dirname(fname).split('/');
    const src = `scripts/${dir[dir.length - 1]}.js`;

    return scriptTag(src);
  };

  // 选取
  let content = tag;
  if (type === 'inline') {
    content = inline;
  } else if (type === 'code') {
    content = code;
  }

  return {
    name: 'script',
    content,
  };
};

module.exports = script;
