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
