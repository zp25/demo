/**
 * select处理
 * @param {Object} e 事件对象
 */
function handleBlend(e) {
  const t = document.querySelector('#background-blend-mode');

  t.style.backgroundBlendMode = e.target.value;
}

/** DOMContentLoaded Event */
document.addEventListener('DOMContentLoaded', () => {
  const t = document.querySelector('#background-blend-mode-select');

  t.addEventListener('change', handleBlend, false);
}, false);
