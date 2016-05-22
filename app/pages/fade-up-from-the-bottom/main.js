/**
 * 检查元素是否进入viewport
 */
function checkIfInView() {
  const windowHeight = window.innerHeight;

  Array.from(document.querySelectorAll('.elem')).forEach(elem => {
    const rectObject = elem.getBoundingClientRect();

    if (rectObject.top < windowHeight) {
      elem.classList.add('in-view');
    } else {
      elem.classList.remove('in-view');
    }
  });
}

/** Events */
window.addEventListener('load', () => {
  // init
  checkIfInView();
}, false);

window.addEventListener('scroll', checkIfInView, false);
window.addEventListener('resize', checkIfInView, false);
