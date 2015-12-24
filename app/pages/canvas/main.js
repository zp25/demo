/**
 * Tetris Base Class
 */
function Tetris() {}

/**
 * 俄罗斯方块O
 * @param {Object} ctx   canvas context
 * @param {String} color 背景颜色
 */
Tetris.prototype.drawO = function(ctx, color) {
  color = color || '#fe9805';

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(16, 0);
  ctx.lineTo(16, 16);
  ctx.lineTo(0, 16);
  ctx.closePath();

  this.drawBorder(ctx);
  this.drawBackground(ctx, color);
};

/**
 * 俄罗斯方块Z
 * @param {Object} ctx   canvas context
 * @param {String} color 背景颜色
 */
Tetris.prototype.drawZ = function(ctx, color) {
  color = color || '#5c8ad0';

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(16, 0);
  ctx.lineTo(16, 8);
  ctx.lineTo(24, 8);
  ctx.lineTo(24, 16);
  ctx.lineTo(8, 16);
  ctx.lineTo(8, 8);
  ctx.lineTo(0, 8);
  ctx.closePath();

  this.drawBorder(ctx);
  this.drawBackground(ctx, color);
};

/**
 * 俄罗斯方块T
 * @param {Object} ctx   canvas context
 * @param {String} color 背景颜色
 */
Tetris.prototype.drawT = function(ctx, color) {
  color = color || '#d33a2e';

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(24, 0);
  ctx.lineTo(24, 8);
  ctx.lineTo(16, 8);
  ctx.lineTo(16, 16);
  ctx.lineTo(8, 16);
  ctx.lineTo(8, 8);
  ctx.lineTo(0, 8);
  ctx.closePath();

  this.drawBorder(ctx);
  this.drawBackground(ctx, color);
};

/**
 * 俄罗斯方块I
 * @param {Object} ctx   canvas context
 * @param {String} color 背景颜色
 */
Tetris.prototype.drawI = function(ctx, color) {
  color = color || '#3e9336';

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(8, 0);
  ctx.lineTo(8, 32);
  ctx.lineTo(0, 32);
  ctx.closePath();

  this.drawBorder(ctx);
  this.drawBackground(ctx, color);
};

/**
 * 俄罗斯方块J
 * @param {Object} ctx   canvas context
 * @param {String} color 背景颜色
 */
Tetris.prototype.drawJ = function(ctx, color) {
  color = color || '#f6dc4b';

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(8, 0);
  ctx.lineTo(8, 24);
  ctx.lineTo(-8, 24);
  ctx.lineTo(-8, 16);
  ctx.lineTo(0, 16);
  ctx.closePath();

  this.drawBorder(ctx);
  this.drawBackground(ctx, color);
};

/**
 * 俄罗斯方块L
 * @param {Object} ctx   canvas context
 * @param {String} color 背景颜色
 */
Tetris.prototype.drawL = function(ctx, color) {
  color = color || '#f6dc4b';

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(16, 0);
  ctx.lineTo(16, 8);
  ctx.lineTo(8, 8);
  ctx.lineTo(8, 24);
  ctx.lineTo(0, 24);
  ctx.closePath();

  this.drawBorder(ctx);
  this.drawBackground(ctx, color);
};

/**
 * 绘制边框
 * @param {Object} ctx context
 */
Tetris.prototype.drawBorder = function(ctx) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#fff';
  ctx.stroke();
};

/**
 * 填充背景色
 * @param {Object} ctx     canvas context
 * @param {String} bgcolor 背景颜色
 */
Tetris.prototype.drawBackground = function(ctx, bgcolor) {
  ctx.fillStyle = bgcolor;
  ctx.fill();
};

/**
 * text样式
 * @param {Object} ctx     canvas context
 * @param {String} txt text内容
 * @param {Number} x   x轴偏移量
 * @param {Number} y   y轴偏移量
 */
Tetris.prototype.setText = function(ctx, txt, x, y) {
  ctx.font = '25px "Helvetica Neue", Helvetica, Arial, sans-serif';
  ctx.fillStyle = '#dfdfdf';
  ctx.fillText(txt, x, y);
};

/**
 * Draw Tetris Class
 */
function DrawTetris() {}

/**
 * 继承自Tetris Class
 */
DrawTetris.prototype = Object.create(Tetris.prototype);
DrawTetris.prototype.constructor = DrawTetris;

/**
 * 绘制整幅图像
 * @param {Object} ctx context
 */
DrawTetris.prototype.drawAll = function(ctx) {
  // 主要图像距容器边线10px，加上5px的border
  ctx.save();
  ctx.translate(95, 95);
  ctx.scale(10, 10);
  this.drawO(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(335, 15);
  ctx.scale(10, 10);
  this.drawZ(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(255, 495);
  ctx.rotate(180 * Math.PI / 180);
  ctx.scale(10, 10);
  this.drawT(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(415, 215);
  ctx.scale(10, 10);
  this.drawI(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(295, 135);
  ctx.scale(10, 10);
  this.drawJ(ctx);
  ctx.restore();
};

/**
 * 缩放方块
 * @param  {Object} canvas canvas object
 * @param  {Object} ctx    context
 * @param  {Number} x      x轴偏移
 * @param  {Number} y      y轴偏移
 */
DrawTetris.prototype.drawTransform = function(canvas, ctx, x, y) {
  var s = 10.6;

  if (x > 95 && x < 255 && y > 95 && y < 255) {
    ctx.save();
    ctx.translate(90, 90);
    ctx.scale(s, s);
    this.drawO(ctx);
    ctx.restore();

    this.tetrisAct(canvas, 'www');
  } else if ((x > 335 && x < 495 && y > 15 && y < 95) ||
             (x > 415 && x < 575 && y > 95 && y < 175)) {
    ctx.save();
    ctx.translate(328, 10);
    ctx.scale(s, s);
    this.drawZ(ctx);
    ctx.restore();

    this.tetrisAct(canvas, 'lxl');
  } else if ((x > 95 && x < 175 && y > 335 && y < 415) ||
             (x > 15 && x < 255 && y > 415 && y < 495)) {
    ctx.save();
    ctx.translate(263, 500);
    ctx.save();
    ctx.rotate(180 * Math.PI / 180);
    ctx.scale(s, s);
    this.drawT(ctx);
    ctx.restore();
    ctx.restore();

    this.tetrisAct(canvas, 'xia');
  } else if (x > 415 && x < 495 && y > 215 && y < 535) {
    ctx.save();
    ctx.translate(413, 205);
    ctx.scale(s, s);
    this.drawI(ctx);
    ctx.restore();

    this.tetrisAct(canvas, 'zp');
  } else if ((x > 215 && x < 295 && y > 295 && y < 375) ||
             (x > 295 && x < 375 && y > 135 && y < 375)) {
    ctx.save();
    ctx.translate(292, 128);
    ctx.scale(s, s);
    this.drawJ(ctx);
    ctx.restore();

    this.tetrisAct(canvas, 'dii');
  } else {
    ctx.clearRect(0, 0, 590, 550);
    this.drawAll(ctx);

    canvas.onclick = null;
    canvas.style.cursor = '';
  }
};

DrawTetris.prototype.tetrisAct = function(canvas, lct) {
  canvas.onclick = function() {
    // window.open('http://'+lct+'.rensidiaochaotian.com/');
    console.log('Open: http://' + lct + '.rensidiaochaotian.com/');
  };

  canvas.style.cursor = 'pointer';
};

/** Onload Event */
window.addEventListener('load', function() {
  var canvas = document.getElementById('fpDoodle');
  var ctx = canvas.getContext('2d');
  var tetris = new DrawTetris();
  var x;
  var y;

  tetris.drawAll(ctx);

  canvas.onmousemove = function(e) {
    var t = e.currentTarget;

    x = e.pageX - t.offsetLeft;
    y = e.pageY - t.offsetTop;

    tetris.drawTransform(t, ctx, x, y);
  };
}, false);
