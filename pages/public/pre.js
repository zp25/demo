/**
 * escape HTML
 * @see {@link https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript/4835406#4835406}
 * @param {string} unsafe - 需转义字符串
 * @return {string} 转义后字符串
 */
const escapeHtml = (unsafe) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return unsafe.replace(/[&<>"']/g, m => map[m]);
};

const pre = (code, className = 'code') => `<pre class="${className}">
${escapeHtml(code)}</pre>`;

module.exports = pre;
