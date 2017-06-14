/**
 * select处理
 */
function blend(e) {
  const t = document.querySelector('#background-blend-mode');
  const blendMode = e.target.value;

  t.style.setProperty('--blend-background-blend-mode', blendMode);
}

document.addEventListener('DOMContentLoaded', () => {
  const t = document.querySelector('#background-blend-mode-select');

  t.addEventListener('change', blend, false);
}, false);
