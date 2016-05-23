/**
 * 设置动画
 * @return {Object} AnimationPlayer Object
 */
function animation() {
  const keyframes = [
    { motionOffset: 0 },
    { motionOffset: '100%' },
  ];
  const timing = {
    duration: 12000,
    iterations: Infinity,
  };

  return document.querySelector('#mover').animate(keyframes, timing);
}

/**
 * 显示状态信息
 * @param {String} state playState
 * @param {Number|null} startTime player.startTime
 * @param {Number} currentTime player.currentTime
 */
function detail(state, startTime, currentTime) {
  const d = document.querySelector('#detail');

  d.innerHTML = `${state}; startTime: ${startTime}; currentTime: ${currentTime}`;
}

/** DOMContentLoaded Event */
document.addEventListener('DOMContentLoaded', () => {
  // new animate
  const player = animation();

  // events
  document.querySelector('#pause').onclick = () => {
    player.pause();
  };

  document.querySelector('#play').onclick = () => {
    player.play();
  };

  document.querySelector('#reverse').onclick = () => {
    player.reverse();
  };

  document.querySelector('#cancel').onclick = () => {
    player.cancel();
  };

  document.querySelector('#rate').onchange = e => {
    player.playbackRate = e.target.value;
  };

  // get current state
  document.querySelector('#state').onclick = () => {
    detail(player.playState, player.startTime, player.currentTime);
  };
}, false);

/** Window OnLoad Event */
window.onload = () => {
  // init state
  document.querySelector('#state').click();
};
