/**
 * 点击事件处理函数
 */
function handler(e) {
  const copytarget = e.target.dataset.copytarget;
  const inp = copytarget ? document.querySelector(`#${copytarget}`) : null;

  if (inp && inp.select) {
    inp.select();

    try {
      document.execCommand('copy');
      inp.blur();
    } catch (err) {
      console.log('please press Ctrl/Cmd+C to copy'); // eslint-disable-line no-console
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', handler, false);
});
