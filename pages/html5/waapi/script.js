/**
 * 设置动画
 * @return {Object} AnimationPlayer Object
 */
function animation() {
  const keyframes = [
    {
      offsetDistance: 0,
    },
    {
      offsetDistance: '100%',
    },
  ];
  const timing = {
    duration: 12000,
    iterations: Infinity,
  };

  return document.querySelector('.mover').animate(keyframes, timing);
}

/**
 * 显示状态信息
 */
function detail(state, startTime, currentTime) {
  const d = document.querySelector('.detail');

  d.innerHTML = `${state}; startTime: ${startTime}; currentTime: ${currentTime}`;
}

document.addEventListener('DOMContentLoaded', () => {
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

  document.querySelector('#rate').onchange = (e) => {
    player.playbackRate = e.target.value;
  };

  // get current state
  document.querySelector('#state').onclick = () => {
    detail(player.playState, player.startTime, player.currentTime);
  };
}, false);

window.onload = () => {
  document.querySelector('#state').click();
};
