/**
 * Tetris Base Class
 */
class Tetris {
  /**
   * 俄罗斯方块O
   * @param {Object} ctx   canvas context
   * @param {String} color 背景颜色
   */
  drawO(ctx, color = '#fe9805') {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(16, 0);
    ctx.lineTo(16, 16);
    ctx.lineTo(0, 16);
    ctx.closePath();

    this.drawBorder(ctx);
    this.drawBackground(ctx, color);
  }

  /**
   * 俄罗斯方块Z
   * @param {Object} ctx   canvas context
   * @param {String} color 背景颜色
   */
  drawZ(ctx, color = '#5c8ad0') {
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
  }

  /**
   * 俄罗斯方块T
   * @param {Object} ctx   canvas context
   * @param {String} color 背景颜色
   */
  drawT(ctx, color = '#d33a2e') {
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
  }

  /**
   * 俄罗斯方块I
   * @param {Object} ctx   canvas context
   * @param {String} color 背景颜色
   */
  drawI(ctx, color = '#3e9336') {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(8, 0);
    ctx.lineTo(8, 32);
    ctx.lineTo(0, 32);
    ctx.closePath();

    this.drawBorder(ctx);
    this.drawBackground(ctx, color);
  }

  /**
   * 俄罗斯方块J
   * @param {Object} ctx   canvas context
   * @param {String} color 背景颜色
   */
  drawJ(ctx, color = '#f6dc4b') {
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
  }

  /**
   * 俄罗斯方块L
   * @param {Object} ctx   canvas context
   * @param {String} color 背景颜色
   */
  drawL(ctx, color = '#f6dc4b') {
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
  }

  /**
   * 绘制边框
   * @param {Object} ctx context
   */
  drawBorder(ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#fff';
    ctx.stroke();
  }

  /**
   * 填充背景色
   * @param {Object} ctx     canvas context
   * @param {String} bgcolor 背景颜色
   */
  drawBackground(ctx, bgcolor) {
    ctx.fillStyle = bgcolor;
    ctx.fill();
  }

  /**
   * text样式
   * @param {Object} ctx     canvas context
   * @param {String} txt text内容
   * @param {Number} x   x轴偏移量
   * @param {Number} y   y轴偏移量
   */
  setText(ctx, txt, x, y) {
    ctx.font = '25px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillStyle = '#dfdfdf';
    ctx.fillText(txt, x, y);
  }
}

/**
 * Draw Tetris Class extends Tetris Class
 */
class DrawTetris extends Tetris {
  /**
   * 绘制整幅图像
   * @param {Object} ctx context
   */
  drawAll(ctx) {
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
  }

  /**
   * 缩放方块
   * @param {Object} canvas canvas object
   * @param {Object} ctx    context
   * @param {Number} x      x轴偏移
   * @param {Number} y      y轴偏移
   */
  drawTransform(canvas, ctx, x, y) {
    const s = 10.6;

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
      ctx.translate(292, 126);
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
  }

  /**
   * 点击动作
   * @param {Object} canvas canvas objec
   * @param {String} lct 方块名称
   */
  tetrisAct(canvas, lct) {
    canvas.onclick = () => {
      window.open(`http://${lct}.rensidiaochaotian.com/`);
    };

    canvas.style.cursor = 'pointer';
  }
}

/** Onload Event */
window.addEventListener('load', () => {
  const canvas = document.getElementById('fpDoodle');
  const ctx = canvas.getContext('2d');
  const tetris = new DrawTetris();

  tetris.drawAll(ctx);

  canvas.onmousemove = e => {
    const t = e.currentTarget;
    const x = e.pageX - t.offsetLeft;
    const y = e.pageY - t.offsetTop;

    tetris.drawTransform(t, ctx, x, y);
  };
}, false);
