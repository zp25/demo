/** Events */
window.addEventListener('load', function() {
  // init
  checkIfInView();
}, false);

window.addEventListener('scroll', checkIfInView, false);
window.addEventListener('resize', checkIfInView, false);

/**
 * 检查元素是否进入viewport
 */
function checkIfInView() {
  var elems = document.querySelectorAll('.elem');
  var windowHeight = window.innerHeight;

  [].forEach.call(elems, function(elem) {
    var rectObject = elem.getBoundingClientRect();

    if (rectObject.top < windowHeight) {
      elem.classList.add('in-view');
    } else {
      elem.classList.remove('in-view');
    }
  });
}
