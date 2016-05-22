/**
 * 点击处理函数
 * @param {Object} e 事件对象
 */
function handler(e) {
  const button = e.target.dataset.button;

  if (button) {
    console.log(`Click ${button}`);
  }

  e.preventDefault();
  e.stopPropagation();
}

/** DOMContentLoaded Event */
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('#clip-path');

  wrapper.addEventListener('click', handler, false);
}, false);
