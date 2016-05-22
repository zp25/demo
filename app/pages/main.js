if ('serviceWorker' in navigator) {
  // 添加sw状态
  navigator.serviceWorker.register('../sw.js', { scope: '/' }).then(
    reg => {
      const t = document.querySelector('header h1');

      if (reg.installing) {
        reg.installing.addEventListener('statechange', e => {
          if (e.target.state === 'installed') {
            t.classList.remove('sw--waiting');
            t.classList.add('sw--done');
          }
        });

        t.classList.add('sw--waiting');
      } else if (navigator.serviceWorker.controller) {
        t.classList.add('sw--done');
      }
    }
  ).catch(error => {
    console.log(error);
    document.querySelector('header h1').classList.add('sw--error');
  });
}
