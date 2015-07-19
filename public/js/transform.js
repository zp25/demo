$(document).ready(function () {
  $('form[name=form-2d]').change(function (e) {
    setValue2D();
  });
  $('form[name=form-3d]').change(function (e) {
    setValue3D();
  });

  $('select[name=select-mode]').change(function (e) {
    $(this).val() == 1 ? init2D() : init3D();
  });

  init2D();
});

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
}

// 初始化设置
function init2D() {
  changeMode('2d');
  setValue2D();
}

function init3D(){
  changeMode('3d');
  setValue3D();
}


// 2D 3D模式更改
function changeMode(mode) {
  if (mode === '3d') {
    $('.showpart').find('#box-2d').hide().next('#box-3d').show();

    $('.controlpanel').find('#control-2d').hide().end().find('#control-3d').show();
  } else {
    $('.showpart').find('#box-2d').show().next('#box-3d').hide();

    $('.controlpanel').find('#control-2d').show().end().find('#control-3d').hide();
  }

  // save mode
  $('select[name=select-mode]').data('val', mode);
}


// 图像状态更改
function setValue2D() {
  var eval, ename, eunit;
  var mode = $('select[name=select-mode]').data('val');
  var $target = $('#box-2d');
  var $form = $('form[name=form-2d]');
  var state = '';

  $form.find('input').each(function (index) {
    eval = $(this).val();
    ename = $(this).attr('name');
    eunit = Global.units[ename];

    if (ename == 'scale') eval /= 2;

    // save
    $(this).data('val', eval);
    $(this).data('unit', eunit);
    // show
    $(this).parents('li').find('.show').text(eval + eunit);

    state += ename + '(' + eval + eunit + ') ';
  });

  $target.css({ 'transform': state });
}

function setValue3D() {
  var eval, ename;
  var $target = $('#box-3d');
  var $form = $('form[name=form-3d]');

  $form.find('input, select').each(function (index) {
    eval = $(this).val();
    ename = $(this).attr('name');

    // save
    $(this).data('val', eval);

    switch (ename) {
      case 'perspective':
        eval += 'px';
        $target.css(ename, eval);
        break;

      case 'perspective-origin-x':
      case 'perspective-origin-y':
        var pox = $('input[name=perspective-origin-x]').data('val');
        var poy = $('input[name=perspective-origin-y]').data('val');
        var poxv = pox ? pox : 150;
        var poyv = pox ? poy : 150;

        eval = poxv + '% ' + poyv + '%';
        $target.css('perspective-origin', eval);
        break;

      case 'transform-style':
        eval = eval == 1 ? 'preserve-3d' : 'flat';
        $target.find('.cube').css(ename, eval);
        break;

      case 'transform-origin-x':
      case 'transform-origin-y':
        var tox = $('input[name=transform-origin-x]').data('val');
        var toy = $('input[name=transform-origin-y]').data('val');
        var toxv = tox ? tox : 50;
        var toyv = toy ? toy : 50;

        eval = toxv + '% ' + toyv + '%';
        $target.find('.cube div').css('transform-origin', eval);
        break;

      case 'backface-visibility':
        eval = eval == 1 ? 'visible' : 'hidden';
        $target.find('.cube div').css(ename, eval);
        break;

      default: break;
    }

    // show
    $(this).parents('li').find('.show').text(eval);
  });
}