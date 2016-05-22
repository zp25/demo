window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

/** @type {Object} Global Object */
const Global = {
  units: {
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
  },
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
  let state = '';

  Array.from(inputs).forEach(input => {
    let val = input.value;
    const name = input.getAttribute('name');
    const label = input.dataset.label;
    const unit = Global.units[name];

    if (name === 'scale') {
      val /= 2;
    }

    state += `${name}(${val + unit}) `;

    // show
    $(`#${label}`).innerHTML = val + unit;
  });

  $('#box-2d').style = `transform: ${state}`;
}

/**
 * 修改3D box样式
 */
function boxStyle() {
  const vp = $('input[name=perspective]').value;
  const px = $('input[name=perspective-origin-x]').value || 150;
  const py = $('input[name=perspective-origin-y]').value || 150;

  const perspective = `perspective: ${vp}px`;
  const origin = `perspective-origin: ${px}% ${py}%`;

  $('#box-3d').style = `${perspective}; ${origin}`;

  // $(`#${label}`).innerHTML = val;
}

/**
 * 设置3D值
 */
function setValue3D() {
  const t = $('#box-3d');
  const cube = t.querySelector('.cube');
  const faces = cube.querySelectorAll('div');
  const inputs = $('form[name=form-3d]').querySelectorAll('input, select');

  Array.from(inputs).forEach(input => {
    const name = input.getAttribute('name');
    const label = input.dataset.label;
    let val = input.value;

    switch (name) {
      case 'perspective':
      case 'perspective-origin-x':
      case 'perspective-origin-y':
        boxStyle();
        break;

      case 'transform-style': {
        val = Number(val) === 1 ? 'preserve-3d' : 'flat';
        cube.style = `${label}: ${val}`;
        break;
      }
      case 'transform-origin-x':
      case 'transform-origin-y': {
        const tx = $('input[name=transform-origin-x]').value || 50;
        const ty = $('input[name=transform-origin-y]').value || 50;

        val = `${tx}% ${ty}%`;
        Array.from(faces).forEach(face => {
          face.style = `${label}: ${val}`;
        });
        break;
      }
      case 'backface-visibility': {
        val = Number(val) === 1 ? 'visible' : 'hidden';
        Array.from(faces).forEach(face => {
          face.style = `${label}: ${val}`;
        });
        break;
      }
      default: break;
    }

    // show
    $(`#${label}`).innerHTML = val;
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
