/**
 * 设置动画
 * @return {[type]} [description]
 */
function animation() {
  const m = document.querySelector('#mover');

  const keyframes = [
    { motionOffset: 0 },
    { motionOffset: '100%' },
  ];

  const timing = {
    duration: 12000,
    iterations: Infinity,
  };

  return m.animate(keyframes, timing);
}

/**
 * 显示状态信息
 * @param  {String} state playState
 * @param  {(Number|null)} startTime player.startTime
 * @param  {Number} currentTime player.currentTime
 */
function detail(state, startTime, currentTime) {
  const d = document.querySelector('#detail');

  d.innerHTML = `${state}; startTime: ${startTime}; currentTime: ${currentTime}`;
}

/** DOMContentLoaded Event */
document.addEventListener('DOMContentLoaded', () => {
  const pause = document.querySelector('#pause');
  const play = document.querySelector('#play');
  const reverse = document.querySelector('#reverse');
  const cancel = document.querySelector('#cancel');
  const rate = document.querySelector('#rate');
  const state = document.querySelector('#state');

  // new animate
  const player = animation();

  // events
  pause.onclick = () => {
    player.pause();
  };

  play.onclick = () => {
    player.play();
  };

  reverse.onclick = () => {
    player.reverse();
  };

  cancel.onclick = () => {
    player.cancel();
  };

  rate.onchange = e => {
    player.playbackRate = e.target.value;
  };

  // get current state
  state.onclick = () => {
    detail(player.playState, player.startTime, player.currentTime);
  };
}, false);

/** OnLoad Event */
window.addEventListener('load', () => {
  const state = document.querySelector('#state');

  // init state
  state.click();
}, false);
