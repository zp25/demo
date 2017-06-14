document.addEventListener('visibilitychange', () => {
  const elem = document.querySelector('#page-visibility');

  if (document.hidden) {
    elem.classList.remove('show');
  } else {
    elem.classList.add('show');
  }
}, false);
