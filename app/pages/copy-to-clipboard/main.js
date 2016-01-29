/** DOMContentLoaded Event */
document.addEventListener('DOMContentLoaded', function() {
  // 绑定事件到body，不用遍历button
  document.body.addEventListener('click', handler, true);
});

/**
 * 点击事件处理函数
 * @param {Object} e 事件对象
 */
function handler(e) {
  var t = e.target;
  var c = t.dataset.copytarget;
  var inp = (c ? document.querySelector(c) : null);

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
