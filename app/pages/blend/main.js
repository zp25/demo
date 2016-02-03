/** DOMContentLoaded Event */
document.addEventListener('DOMContentLoaded', function() {
  var t = document.querySelector('#background-blend-mode-select');

  t.addEventListener('change', handler, false);
}, false);

/**
 * select处理
 * @param {Object} e 事件对象
 */
function handler(e) {
  var t = document.querySelector('#background-blend-mode');
  var v = e.target.value;

  t.style.backgroundBlendMode = v;
}
