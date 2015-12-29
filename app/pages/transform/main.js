/** @type {Object} Global Object */
var Global = {
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
    skewY: 'deg'
  }
};

$(function() {
  var select = $('select[name=select-mode]');
  var form2d = $('form[name=form-2d]');
  var form3d = $('form[name=form-3d]');

  select.on('change', switchMode);
  form2d.on('change', setValue2D);
  form3d.on('change', setValue3D);

  // init
  init2D();
});

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
 * 模式更改的样式设定
 * @param {String} mode 当前模式
 */
function changeMode(mode) {
  var box2d = $('#box-2d');
  var box3d = $('#box-3d');
  var ctl2d = $('#control-2d');
  var ctl3d = $('#control-3d');

  if (mode === '3d') {
    box2d.addClass('hidden');
    ctl2d.addClass('hidden');

    box3d.removeClass('hidden');
    ctl3d.removeClass('hidden');
  } else {
    box3d.addClass('hidden');
    ctl3d.addClass('hidden');

    box2d.removeClass('hidden');
    ctl2d.removeClass('hidden');
  }

  // save mode
  $('#select-mode').data('mode', mode);
}

/**
 * 设置2D值
 */
function setValue2D() {
  var input = $('form[name=form-2d]').find('input');
  var state = '';

  input.each(function() {
    var val = $(this).val();
    var name = $(this).attr('name');
    var label = $(this).data('label');
    var unit = Global.units[name];

    if (name === 'scale') {
      val /= 2;
    }

    state += (name + '(' + val + unit + ') ');

    // show
    $('#' + label).html(val + unit);
  });

  $('#box-2d').css('transform', state);
}

/**
 * 设置3D值
 */
function setValue3D() {
  var t = $('#box-3d');
  var cube = t.find('.cube');
  var face = cube.children('div');
  var input = $('form[name=form-3d]').find('input, select');

  input.each(function() {
    var val = $(this).val();
    var name = $(this).attr('name');
    var label = $(this).data('label');
    var vx = 0;
    var vy = 0;

    switch (name) {
      case 'perspective':
        val += 'px';
        t.css(label, val);
        break;

      case 'perspective-origin-x':
      case 'perspective-origin-y':
        vx = $('input[name=perspective-origin-x]').val() || 150;
        vy = $('input[name=perspective-origin-y]').val() || 150;

        val = vx + '% ' + vy + '%';
        t.css(label, val);
        break;

      case 'transform-style':
        val = Number(val) === 1 ? 'preserve-3d' : 'flat';
        cube.css(label, val);
        break;

      case 'transform-origin-x':
      case 'transform-origin-y':
        vx = $('input[name=transform-origin-x]').val() || 50;
        vy = $('input[name=transform-origin-y]').val() || 50;

        val = vx + '% ' + vy + '%';
        face.css(label, val);
        break;

      case 'backface-visibility':
        val = Number(val) === 1 ? 'visible' : 'hidden';
        face.css(label, val);
        break;

      default: break;
    }

    // show
    $('#' + label).html(val);
  });
}
