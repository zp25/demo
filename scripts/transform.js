$(document).ready(function () {
  $('form[name=form-2d]').change(function (e) {
    setValue2D();
  });
  $('form[name=form-3d]').change(function (e) {
    setValue3D();
  });

  $('select[name=select-mode]').change(function (e) {
    if ($(this).val() === 1)
      init2D();
    else
      init3D();
    // $(this).val() == 1 ? init2D() : init3D();
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
};

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
  var evalu, ename, eunit;
  var mode = $('select[name=select-mode]').data('val');
  var $target = $('#box-2d');
  var $form = $('form[name=form-2d]');
  var state = '';

  $form.find('input').each(function (index) {
    evalu = $(this).val();
    ename = $(this).attr('name');
    eunit = Global.units[ename];

    if (ename == 'scale') evalu /= 2;

    // save
    $(this).data('val', evalu);
    $(this).data('unit', eunit);
    // show
    $(this).parents('li').find('.show').text(evalu + eunit);

    state += ename + '(' + evalu + eunit + ') ';
  });

  $target.css({ 'transform': state });
}

function setValue3D() {
  var evalu, ename;
  var $target = $('#box-3d');
  var $form = $('form[name=form-3d]');

  $form.find('input, select').each(function (index) {
    evalu = $(this).val();
    ename = $(this).attr('name');

    // save
    $(this).data('val', evalu);

    switch (ename) {
      case 'perspective':
        evalu += 'px';
        $target.css(ename, evalu);
        break;

      case 'perspective-origin-x':
      case 'perspective-origin-y':
        var pox = $('input[name=perspective-origin-x]').data('val');
        var poy = $('input[name=perspective-origin-y]').data('val');
        var poxv = pox ? pox : 150;
        var poyv = pox ? poy : 150;

        evalu = poxv + '% ' + poyv + '%';
        $target.css('perspective-origin', evalu);
        break;

      case 'transform-style':
        evalu = evalu == 1 ? 'preserve-3d' : 'flat';
        $target.find('.cube').css(ename, evalu);
        break;

      case 'transform-origin-x':
      case 'transform-origin-y':
        var tox = $('input[name=transform-origin-x]').data('val');
        var toy = $('input[name=transform-origin-y]').data('val');
        var toxv = tox ? tox : 50;
        var toyv = toy ? toy : 50;

        evalu = toxv + '% ' + toyv + '%';
        $target.find('.cube div').css('transform-origin', evalu);
        break;

      case 'backface-visibility':
        evalu = evalu == 1 ? 'visible' : 'hidden';
        $target.find('.cube div').css(ename, evalu);
        break;

      default: break;
    }

    // show
    $(this).parents('li').find('.show').text(evalu);
  });
}