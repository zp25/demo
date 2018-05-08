/**
 * service worker管理
 * @return {Object}
 */
const swControl = () => {
  const target = document.querySelector('header h1');

  /**
   * 反馈状态的样式修改
   * @param {String} state 当前状态
   */
  const style = (state) => {
    target.classList.remove('sw--waiting', 'sw--error', 'sw--done');

    if (state === 'waiting') {
      target.classList.add('sw--waiting');
    } else if (state === 'error') {
      target.classList.add('sw--error');
    } else if (state === 'done') {
      target.classList.add('sw--done');
    } else if (state === 'no-support') {
      target.classList.add('sw--no-support');
    }
  };

  /**
   * 状态变更处理
   * @param {Event} e 事件对象
   */
  const stateChange = (e) => {
    const { state } = e.target;

    if (state === 'activated') {
      style('done');
    } else {
      style('waiting');
    }
  };

  return {
    style,
    stateChange,
  };
};

(() => {
  const control = swControl();

  if ('serviceWorker' in navigator) {
    const container = navigator.serviceWorker;

    container.register('/sw.js').then((reg) => {
      let serviceWorker;

      if (reg.installing) {
        serviceWorker = reg.installing;
        control.style('waiting');
      } else if (reg.waiting) {
        serviceWorker = reg.waiting;
        control.style('waiting');
      } else if (reg.active) {
        serviceWorker = reg.active;
        // activating, activated状态
        control.style('done');
      }

      if (serviceWorker) {
        serviceWorker.addEventListener('statechange', control.stateChange);
      }
    }).catch((err) => {
      control.style('error');
      console.log(err.message); // eslint-disable-line no-console
    });
  } else {
    control.style('no-support');
  }
})();
