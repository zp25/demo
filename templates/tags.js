const escapeHTML = require('zp-lib').escapeHTML;

/**
 * pre标签
 * @param {string} code - 源码
 * @param {string} className - 需添加的类名
 * @return {string}
 * @ignore
 */
exports.preTag = (code, className = 'code') => (
  `<pre class="${className}">${escapeHTML(code)}</pre>`
);

/**
 * 外联样式表标签
 * @param {string} src - 路径
 * @return {string}
 * @ignore
 */
exports.styleTag = (src) => (
  `<link rel="stylesheet" href="${src}" media="all">`
);

/**
 * script标签，非inline
 * @param {string} src - 路径或源码
 * @return {string}
 * @ignore
 */
exports.scriptTag = (src, inline = false) => (
  inline ?
    `<script type="text/javascript">${src}</script>` :
    `<script type="text/javascript" src="${src}"></script>`
);

/**
 * useref标签
 * @param {Function} tag - 其它tag创建函数
 * @return {Function}
 * @ignore
 */
exports.userefTag = tag => (type, src, dest) => {
  let build = 'remove';
  if (type === 'style') {
    build = 'css';
  } else if (type === 'script') {
    build = 'js';
  }

  return `
    <!-- build:${build}${type === 'remove' ? '' : ` ${dest}`} -->
    ${tag(src)}
    <!-- endbuild -->
  `;
};
