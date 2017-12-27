const fs = require('fs');
const path = require('path');
const pre = require('./pre');

/**
 * 添加内联脚本标签
 * @param {string} code - 源码
 * @return {string}
 */
const inlineScript = code => `<script type="text/javascript">${code}</script>`;

const script = (type) => {
  /**
   * 显示源码
   * @param {string} param - 脚本路径
   */
  const code = (param) => {
    if (!param) {
      return '';
    }

    const fname = path.resolve(__dirname, '../', param);
    return pre(fs.readFileSync(fname, { encoding: 'utf8' }), 'scripts');
  };

  /**
   * 添加inline script
   * @param {string} param - 脚本路径
   */
  const inline = (param) => {
    if (!param) {
      return '';
    }

    const fname = path.resolve(__dirname, '../', param);
    return inlineScript(fs.readFileSync(fname, { encoding: 'utf8' }));
  };

  /**
   * 添加script标签
   * @param {string} param - 脚本路径
   */
  const tag = (param) => {
    if (!param) {
      return '';
    }

    const dir = path.dirname(param).split('/');
    const fname = `scripts/${dir[dir.length - 1]}.js`;
    return `<script type="text/javascript" src="${fname}"></script>`;
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
