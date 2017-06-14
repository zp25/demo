/**
 * 点击事件处理
 */
function handler(e) {
  e.preventDefault();

  const btn = e.target.dataset.button;

  if (btn) {
    console.log(`Click ${btn}`); // eslint-disable-line no-console
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('#clip-path');

  wrapper.addEventListener('click', handler, false);
}, false);
