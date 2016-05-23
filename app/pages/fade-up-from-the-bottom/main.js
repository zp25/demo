/**
 * 检查元素是否进入viewport
 */
function checkIfInView() {
  Array.from(document.querySelectorAll('.elem')).forEach(elem => {
    const rectObject = elem.getBoundingClientRect();

    if (rectObject.top < window.innerHeight) {
      elem.classList.add('in-view');
    } else {
      elem.classList.remove('in-view');
    }
  });
}

/** Window Onload Events */
window.onload = () => {
  // init
  checkIfInView();
};

window.addEventListener('scroll', checkIfInView, false);
window.addEventListener('resize', checkIfInView, false);
