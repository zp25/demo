/** visibility监听 */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.querySelector('.page-visibility').classList.remove('show');
  } else {
    document.querySelector('.page-visibility').classList.add('show');
  }
}, false);
