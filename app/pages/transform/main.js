window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

/** @type {Object} Global Object */
const UNITS = {
  translateX: 'px',
  translateY: 'px',
  translateZ: 'px',
  rotate: 'deg',
  rotateX: 'deg',
  rotateY: 'deg',
  rotateZ: 'deg',
  scale: '',
  scale3d: '',
  skewX: 'deg',
  skewY: 'deg',
};

/**
 * 模式更改的样式设定
 * @param {String} mode 当前模式
 */
function changeMode(mode) {
  const box2d = $('#box-2d');
  const box3d = $('#box-3d');
  const ctl2d = $('#control-2d');
  const ctl3d = $('#control-3d');

  if (mode === '3d') {
    box2d.classList.add('hidden');
    ctl2d.classList.add('hidden');

    box3d.classList.remove('hidden');
    ctl3d.classList.remove('hidden');
  } else {
    box3d.classList.add('hidden');
    ctl3d.classList.add('hidden');

    box2d.classList.remove('hidden');
    ctl2d.classList.remove('hidden');
  }

  // save mode
  $('#select-mode').dataset.mode = mode;
}

/**
 * 设置2D值
 */
function setValue2D() {
  const inputs = $('form[name=form-2d]').querySelectorAll('input');
  const state = [];

  Array.from(inputs).forEach(input => {
    const name = input.getAttribute('name');
    const label = input.dataset.label;
    const result = (name === 'scale' ? input.value / 2 : input.value) + UNITS[name];

    state.push(`${name}(${result})`);

    // show
    $(`#${label}`).innerHTML = result;
  });

  $('#box-2d').style = `transform: ${state.join(' ')}`;
}

/**
 * 修改3D box样式
 */
function boxStyle() {
  const inp = $('input[name=perspective]');
  const inx = $('input[name=perspective-origin-x]');
  const iny = $('input[name=perspective-origin-y]');
  const vp = `${inp.value}px`;
  const vo = `${inx.value || 150}% ${iny.value || 150}%`;

  $(`#${inp.dataset.label}`).innerHTML = vp;
  $(`#${inx.dataset.label}`).innerHTML = vo;

  $('#box-3d').style = `perspective: ${vp}; perspective-origin: ${vo};`;
}

/**
 * 修改3D box内部cube样式
 */
function cubeStyle() {
  const input = $('select[name=transform-style]');
  const result = Number(input.value) === 1 ? 'preserve-3d' : 'flat';

  $(`#${input.dataset.label}`).innerHTML = result;

  $('#box-3d .cube').style = `transform-style: ${result}`;
}

/**
 * 修改3D box内部各面样式
 */
function faceStyle() {
  const inx = $('input[name=transform-origin-x]');
  const iny = $('input[name=transform-origin-y]');
  const inb = $('select[name=backface-visibility]');
  const vo = `${inx.value || 50}% ${iny.value || 50}%`;
  const vb = Number(inb.value) === 1 ? 'visible' : 'hidden';

  $(`#${inx.dataset.label}`).innerHTML = vo;
  $(`#${inb.dataset.label}`).innerHTML = vb;

  Array.from($$('#box-3d .cube div')).forEach(face => {
    face.style = `transform-origin: ${vo}; backface-visibility: ${vb};`;
  });
}

/**
 * 设置3D值
 */
function setValue3D() {
  const inputs = $('form[name=form-3d]').querySelectorAll('input, select');

  Array.from(inputs).forEach(input => {
    const name = input.getAttribute('name');

    switch (name) {
      case 'perspective':
      case 'perspective-origin-x':
      case 'perspective-origin-y':
        boxStyle();
        break;

      case 'transform-style':
        cubeStyle();
        break;

      case 'transform-origin-x':
      case 'transform-origin-y':
      case 'backface-visibility':
        faceStyle();
        break;

      default: break;
    }
  });
}

/**
 * 初始化2D设置
 */
function init2D() {
  changeMode('2d');
  setValue2D();
}

/**
 * 初始化3D设置
 */
function init3D() {
  changeMode('3d');
  setValue3D();
}

/**
 * 模式切换
 * @param {Object} e 事件对象
 */
function switchMode(e) {
  if (e.target.value === 1) {
    init2D();
  } else {
    init3D();
  }
}

/** DOMContentLoaded Event */
document.addEventListener('DOMContentLoaded', () => {
  $('select[name=select-mode]').addEventListener('change', switchMode, false);
  $('form[name=form-2d]').addEventListener('change', setValue2D, false);
  $('form[name=form-3d]').addEventListener('change', setValue3D, false);

  // init
  init2D();
}, false);
