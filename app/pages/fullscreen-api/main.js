/** window onload Event */
window.addEventListener('load', () => {
  // var elemInfo = document.querySelector('p:nth-child(1)');
  // var enabledInfo = document.querySelector('p:nth-child(2)');
}, false);

/**
 * Find the right method, call on correct element
 * @param {Element} elem Element
 */
function launchIntoFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
}

/**
 * Whack fullscreen
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/** toggle fullscreen */
document.querySelector('.launch').addEventListener('click', e => {
  launchIntoFullscreen(document.documentElement);

  e.preventDefault();
}, false);

document.querySelector('.cancel').addEventListener('click', e => {
  exitFullscreen();

  e.preventDefault();
}, false);

// fullscreen events
// document.addEventListener('fullscreenchange', function(e) {
//   elemInfo.innerHTML.(document.fullscreenElement);
//   enabledInfo.innerHTML(document.fullscreenEnabled);
// }, false);

document.addEventListener('fullscreenerror', e => {
  console.log(e.message);
}, false);
