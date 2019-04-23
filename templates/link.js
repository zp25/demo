/**
 * @typedef {Object} Article
 * @property {string} title - 文章标题
 * @property {string} href - 链接
 */

/**
 * 参考的文章列表
 * @param {Array.<Article>} [param] - 列表
 * @return {string}
 */
const link = (param) => {
  if (!param) {
    return '';
  }

  const content = param.reduce((prev, d) => (
    `${prev}<a href="${d.href}">${d.title}</a>`
  ), '');

  return `<nav class="col col--s12 nav section">${content}</nav>`;
};

link.displayName = 'link';

module.exports = link;
