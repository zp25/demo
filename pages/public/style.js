const fs = require('fs');
const path = require('path');
const pre = require('./pre');

const style = (param) => {
  if (!param) {
    return '';
  }

  const fname = path.resolve(__dirname, '../', param);
  return pre(fs.readFileSync(fname, { encoding: 'utf8' }), 'styles');
};

style.displayName = 'style';

module.exports = style;
