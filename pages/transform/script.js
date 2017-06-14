window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

const MAP = {
  translateX: {
    unit: 'px',
    prop: '--transform-translate-x',
  },
  translateY: {
    unit: 'px',
    prop: '--transform-translate-y',
  },
  rotate: {
    unit: 'deg',
    prop: '--transform-rotate',
  },
  scale: {
    unit: '',
    prop: '--transform-scale',
  },
  skewX: {
    unit: 'deg',
    prop: '--transform-skew-x',
  },
  skewY: {
    unit: 'deg',
    prop: '--transform-skew-y',
  },
  perspective: {
    unit: 'px',
    prop: '--transform-perspective',
  },
  'perspective-origin': {
    unit: '%',
    prop: '--transform-perspective-origin',
  },
  'transform-style': {
    unit: '',
    prop: '--transform-transform-style',
  },
  'transform-origin': {
    unit: '%',
    prop: '--transform-transform-origin',
  },
  'backface-visibility': {
    unit: '',
    prop: '--transform-backface-visibility',
  },
};

/**
 * 模式更改的样式设定
 * @param {string} mode - 当前模式
 */
function changeMode(mode) {
  const box2d = $('.box--2d');
  const form2d = $('.form--2d');
  const box3d = $('.box--3d');
  const form3d = $('.form--3d');

  if (mode === '3d') {
    box2d.classList.remove('box--active');
    form2d.classList.remove('form--active');

    box3d.classList.add('box--active');
    form3d.classList.add('form--active');
  } else {
    box2d.classList.add('box--active');
    form2d.classList.add('form--active');

    box3d.classList.remove('box--active');
    form3d.classList.remove('form--active');
  }
}

/**
 * 设置2D值
 */
function setValue2D(e) {
  const target = e.target;

  const label = target.getAttribute('id');

  const val = target.value;
  const result = val + MAP[label].unit;

  // 修改
  $('.box--2d').style.setProperty(MAP[label].prop, result);
  $(`.form--2d .label--${label}`).dataset.value = val;
}

/**
 * 设置3D值
 */
function setValue3D(e) {
  const target = e.target;
  const group = target.dataset.group;

  let suffix = '';
  let label = target.getAttribute('id');

  if (group && group === 'double') {
    suffix = label.slice(-2);
    label = label.slice(0, -2);
  }

  const val = target.value;
  const result = val + MAP[label].unit;

  // 修改
  $('.box--3d').style.setProperty(MAP[label].prop + suffix, result);
  $(`.form--3d .label--${label}`).dataset[`value${suffix.slice(-1).toUpperCase()}`] = val;
}

/**
 * 模式切换
 */
function switchMode(e) {
  const value = e.target.value;

  changeMode(value);
}

document.addEventListener('DOMContentLoaded', () => {
  $('#select').addEventListener('change', switchMode, false);

  $('.form--2d').addEventListener('change', setValue2D, false);
  $('.form--3d').addEventListener('change', setValue3D, false);

  // init
  changeMode('2d');
}, false);
