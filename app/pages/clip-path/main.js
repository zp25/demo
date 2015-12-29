/** DOMContentLoaded Event */
document.addEventListener('DOMContentLoaded', function() {
  var wrapper = document.querySelector('#clip-path');

  wrapper.addEventListener('click', handler, false);
}, false);

/**
 * 点击处理函数
 * @param {Object} e 事件对象
 */
function handler(e) {
  var button = e.target.dataset.button;

  if (button) {
    console.log('Click ' + button);
  }

  e.preventDefault();
  e.stopPropagation();
}
