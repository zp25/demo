/**
 * 检查元素是否进入viewport
 */
function checkIfInView() {
  Array.from(document.querySelectorAll('.elem')).forEach((elem) => {
    const rectObj = elem.getBoundingClientRect();

    if (rectObj.top < window.innerHeight) {
      elem.classList.add('inView');
    } else {
      elem.classList.remove('inView');
    }
  });
}

window.addEventListener('load', checkIfInView, false);

window.addEventListener('scroll', checkIfInView, false);
window.addEventListener('resize', checkIfInView, false);
