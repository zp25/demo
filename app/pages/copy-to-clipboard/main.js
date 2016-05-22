/**
 * 点击事件处理函数
 * @param {Object} e 事件对象
 */
function handler(e) {
  const t = e.target;
  const c = t.dataset.copytarget;
  const inp = c ? document.querySelector(c) : null;

  if (inp && inp.select) {
    inp.select();

    try {
      document.execCommand('copy');
      inp.blur();
    } catch (err) {
      console.log('please press Ctrl/Cmd+C to copy');
    }
  }
}

/** DOMContentLoaded Event */
document.addEventListener('DOMContentLoaded', () => {
  // 绑定事件到body，不用遍历button
  document.body.addEventListener('click', handler, true);
});
