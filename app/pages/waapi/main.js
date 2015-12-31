/** DOMContentLoaded Event */
document.addEventListener('DOMContentLoaded', function() {
  var pause = document.querySelector('#pause');
  var play = document.querySelector('#play');
  var reverse = document.querySelector('#reverse');
  var cancel = document.querySelector('#cancel');
  var rate = document.querySelector('#rate');
  var state = document.querySelector('#state');
  var player;

  // new animate
  player = animation();

  // events
  pause.onclick = function() {
    player.pause();
  };

  play.onclick = function() {
    player.play();
  };

  reverse.onclick = function() {
    player.reverse();
  };

  cancel.onclick = function() {
    player.cancel();
  };

  rate.onchange = function(e) {
    player.playbackRate = e.target.value;
  };

  // get current state
  state.onclick = function() {
    detail(player.playState, player.startTime, player.currentTime);
  };
}, false);

/** OnLoad Event */
window.addEventListener('load', function() {
  var state = document.querySelector('#state');

  // init state
  state.click();
}, false);

/**
 * 设置动画
 * @return {[type]} [description]
 */
function animation() {
  var m = document.querySelector('#mover');
  var keyframes;
  var timing;

  keyframes = [
    {motionOffset: 0},
    {motionOffset: '100%'}
  ];

  timing = {
    duration: 12000,
    iterations: Infinity
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
  var detail = document.querySelector('#detail');
  var base;
  var start;
  var current;

  base = state + '; ';
  start = 'startTime: ' + startTime + '; ';
  current = 'currentTime: ' + currentTime;

  detail.innerHTML = base + start + current;
}
