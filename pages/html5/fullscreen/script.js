/**
 * Find the right method, call on correct element
 * @param {Element} elem - 需进入全屏的元素
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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.launch').onclick = (e) => {
    launchIntoFullscreen(document.documentElement);

    e.preventDefault();
  };

  document.querySelector('.cancel').onclick = (e) => {
    exitFullscreen();

    e.preventDefault();
  };
}, false);

// document.addEventListener('fullscreenchange', () => {
//   const info = document.querySelector('.info');

//   if (document.fullscreenElement) {
//     info.innerHTML = 'full screen';
//   } else {
//     info.innerHTML = 'exit full screen';
//   }
// }, false);

document.addEventListener('fullscreenerror', (e) => {
  document.querySelector('.info').innerHTML = e.message;
}, false);
