(function() {

  // Tetris Base Class
  var Tetris = {

    drawO: function(ctx, color) {
      color = color || '#FE9805';

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(160, 0);
      ctx.lineTo(160, 160);
      ctx.lineTo(0, 160);
      ctx.closePath();

      this.drawBorder(ctx);
      this.drawBackground(ctx, color);
    },

    drawZ: function(ctx, color) {
      color = color || '#5C8AD0'

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(160, 0);
      ctx.lineTo(160, 80);
      ctx.lineTo(240, 80);
      ctx.lineTo(240, 160);
      ctx.lineTo(80, 160);
      ctx.lineTo(80, 80);
      ctx.lineTo(0, 80);
      ctx.closePath();

      this.drawBorder(ctx);
      this.drawBackground(ctx, color);
    },

    drawT: function(ctx, color) {
      color = color || '#D33A2E';

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(240, 0);
      ctx.lineTo(240, 80);
      ctx.lineTo(160, 80);
      ctx.lineTo(160, 160);
      ctx.lineTo(80, 160);
      ctx.lineTo(80, 80);
      ctx.lineTo(0, 80);
      ctx.closePath();

      this.drawBorder(ctx);
      this.drawBackground(ctx, color);
    },

    drawI: function(ctx, color) {
      color = color || '#3E9336';

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(80, 0);
      ctx.lineTo(80, 320);
      ctx.lineTo(0, 320);
      ctx.closePath();

      this.drawBorder(ctx);
      this.drawBackground(ctx, color);
    },

    drawJ: function(ctx, color) {
      color = color || '#F6DC4B';

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(80, 0);
      ctx.lineTo(80, 240);
      ctx.lineTo(-80, 240);
      ctx.lineTo(-80, 160);
      ctx.lineTo(0, 160);
      ctx.closePath();

      this.drawBorder(ctx);
      this.drawBackground(ctx, color);
    },

    drawL: function(ctx, color) {
      color = color || '#F6DC4B';

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(160, 0);
      ctx.lineTo(160, 80);
      ctx.lineTo(80, 80);
      ctx.lineTo(80, 240);
      ctx.lineTo(0, 240);
      ctx.closePath();

      this.drawBorder(ctx);
      this.drawBackground(ctx, color);
    },

    drawBorder: function(ctx) {
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#FFF';
      ctx.stroke();
    },

    drawBackground: function(ctx, bgcolor) {
      ctx.fillStyle = bgcolor;
      ctx.fill();   
    },

    setText: function(ctx, txt, x, y) {
      ctx.font = '25px "Helvetica Neue", Helvetica, Arial, sans-serif';
      ctx.fillStyle = '#DFDFDF';
      ctx.fillText(txt, x, y);
    }

  };


  // Draw Tetris Class
  function DrawTetris() { return; }

  DrawTetris.prototype = Object.create(Tetris);
  DrawTetris.prototype.constructor = DrawTetris;

  DrawTetris.prototype.drawAll = function(ctx) {
    // 主要图像距容器边线10px，加上5px的border
    ctx.save();
    ctx.translate(95, 95);
    this.drawO(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(335, 15);
    this.drawZ(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(255, 495);
    ctx.rotate(180*Math.PI/180);
    this.drawT(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(415, 215);
    this.drawI(ctx);
    ctx.restore();

    ctx.save();
    ctx.translate(295, 135);
    this.drawJ(ctx);
    ctx.restore();  
  };

  DrawTetris.prototype.drawTransform = function(canvas, ctx, x, y) {

    var s = 1.06;

    if (x>95 && x<255 && y>95 && y<255) {
      ctx.save();
      ctx.translate(90, 90);
      ctx.scale(s, s);
      this.drawO(ctx);
      this.setText(ctx, 'null', 115, 155);
      ctx.restore();

      //this.tetrisAct(canvas, 'www');
    }
    else if ((x>335 && x<495 && y>15 && y<95) || (x>415 && x<575 && y>95 && y<175)) {
      ctx.save();
      ctx.translate(328, 10);
      ctx.scale(s, s);
      this.drawZ(ctx);
      this.setText(ctx, 'lxl', 212, 155);
      ctx.restore();

      this.tetrisAct(canvas, 'lxl');
    }
    else if ((x>95 && x<175 && y>335 && y<415) || (x>15 && x<255 && y>415 && y<495)) {
      ctx.save();
      ctx.translate(263, 500);
      ctx.save();
      ctx.rotate(180*Math.PI/180);
      ctx.scale(s, s);
      this.drawT(ctx);
      ctx.restore();
      this.setText(ctx, 'xia', -37, -7);
      ctx.restore();

      this.tetrisAct(canvas, 'xia');
    }
    else if (x>415 && x<495 && y>215 && y<535) {
      ctx.save();
      ctx.translate(413, 205);
      ctx.scale(s, s);
      this.drawI(ctx);
      this.setText(ctx, 'zp', 50, 310);
      ctx.restore();

      this.tetrisAct(canvas, 'zp');
    }
    else if ((x>215 && x<295 && y>295 && y<375) || (x>295 && x<375 && y>135 && y<375)) {
      ctx.save();
      ctx.translate(292, 128);
      ctx.scale(s, s);
      this.drawJ(ctx);
      this.setText(ctx, 'dii', 50, 235);
      ctx.restore();

      this.tetrisAct(canvas, 'dii');
    }
    else {
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
    }

    canvas.style.cursor = 'pointer';
  };


  // run
  var x, y;
  var canvas = document.getElementById('fpDoodle');
  var ctx = canvas.getContext('2d');

  var tetris = new DrawTetris();
  tetris.drawAll(ctx);

  canvas.onmousemove = function(e) {
    x = e.clientX - e.target.offsetLeft;
    y = e.clientY - e.target.offsetTop;

    tetris.drawTransform(this, ctx, x, y);
  }

})();