(function() {

  /* Doodle */
  function fpDoodle(){
    var x, y;
    var canvas = document.getElementById('fpDoodle');
    var ctx = canvas.getContext('2d');

    DrawTetris.drawAll(ctx);

    canvas.onmousemove = function(e) {
      x = e.clientX - e.target.offsetLeft;
      y = e.clientY - e.target.offsetTop;
      DrawTetris.tetrisTransform(x, y, canvas, ctx);
    }
  }

  /* DrawTetris */
  var DrawTetris = {
    drawO: function (ctx){
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(160, 0);
      ctx.lineTo(160, 160);
      ctx.lineTo(0, 160);
      ctx.closePath();

      DrawTetris.drewBorder(ctx);
      ctx.stroke();

      DrawTetris.drewBackground(ctx,'#FE9805');
    },

    drawZ: function (ctx){
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

      DrawTetris.drewBorder(ctx);
      ctx.stroke();

      DrawTetris.drewBackground(ctx,'#5C8AD0');
    },

    drawT: function (ctx){
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(80, 0);
      ctx.lineTo(80, -80);
      ctx.lineTo(160, -80);
      ctx.lineTo(160, 0);
      ctx.lineTo(240, 0);
      ctx.lineTo(240, 80);
      ctx.lineTo(0, 80);
      ctx.closePath();

      DrawTetris.drewBorder(ctx);
      ctx.stroke();

      DrawTetris.drewBackground(ctx,'#D33A2E');
    },

    drawI: function (ctx){
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(80, 0);
      ctx.lineTo(80, 320);
      ctx.lineTo(0, 320);
      ctx.closePath();

      DrawTetris.drewBorder(ctx);
      ctx.stroke();

      DrawTetris.drewBackground(ctx,'#3E9336');
    },

    drawJ: function (ctx){
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(80, 0);
      ctx.lineTo(80, -160);
      ctx.lineTo(160, -160);
      ctx.lineTo(160, 80);
      ctx.lineTo(0, 80);
      ctx.closePath();

      DrawTetris.drewBorder(ctx);
      ctx.stroke();

      DrawTetris.drewBackground(ctx,'#F6DC4B');
    },
    
    drewBorder: function (ctx){
      ctx.lineWidth = 10;
      ctx.strokeStyle='#FFF';
    },
    
    drewBackground: function (ctx,bgcolor){
      ctx.fillStyle=bgcolor;
      ctx.fill();   
    },
   
    drawAll: function (ctx){
      ctx.save();
      ctx.translate(95, 90);
      DrawTetris.drawO(ctx);
      ctx.restore();
    
      ctx.save();
      ctx.translate(335, 10);
      DrawTetris.drawZ(ctx);
      ctx.restore();
    
      ctx.save();
      ctx.translate(15, 410);
      DrawTetris.drawT(ctx);
      ctx.restore();
    
      ctx.save();
      ctx.translate(415, 210);
      DrawTetris.drawI(ctx);
      ctx.restore();
    
      ctx.save();
      ctx.translate(215, 290);
      DrawTetris.drawJ(ctx);
      ctx.restore();  
    },

    setText: function (txt,x,y,ctx){
      ctx.font='25px "Helvetica Neue", Helvetica, Arial, sans-serif';
      ctx.fillStyle='#DFDFDF';
      ctx.fillText(txt,x,y);
    },

    tetrisTransform: function (x,y,canvas,ctx){
      if(x>95&&x<255&&y>90&&y<250){
        ctx.save();
        ctx.translate(90, 85);
        ctx.scale(1.06,1.06);
        DrawTetris.drawO(ctx);
        DrawTetris.setText('null',115,155,ctx);
        ctx.restore();
    
        //DrawTetris.tetrisAct(canvas,'www');
      }
      else if( (x>335&&x<495&&y>10&&y<90) || (x>415&&x<575&&y>90&&y<170) ){
        ctx.save();
        ctx.translate(327, 5);
        ctx.scale(1.06,1.06);
        DrawTetris.drawZ(ctx);
        DrawTetris.setText('lxl',210,155,ctx);
        ctx.restore();
    
        DrawTetris.tetrisAct(canvas,'lxl');
      }
      else if( (x>95&&x<175&&y>330&&y<410) || (x>15&&x<255&&y>410&&y<490) ){
        ctx.save();
        ctx.translate(7, 410);
        ctx.scale(1.06,1.06);
        DrawTetris.drawT(ctx);
        DrawTetris.setText('xia',205,75,ctx);
        ctx.restore();
    
        DrawTetris.tetrisAct(canvas,'xia');
      }
      else if(x>415&&x<495&&y>210&&y<530){
        ctx.save();
        ctx.translate(413, 200);
        ctx.scale(1.06,1.06);
        DrawTetris.drawI(ctx);
        DrawTetris.setText('zp',50,310,ctx);
        ctx.restore();
    
        DrawTetris.tetrisAct(canvas,'zp');
      }
      else if( (x>215&&x<295&&y>290&&y<370) || (x>295&&x<375&&y>130&&y<370) ){
        ctx.save();
        ctx.translate(208, 287);
        ctx.scale(1.06,1.06);
        DrawTetris.drawJ(ctx);
        DrawTetris.setText('dii',130,75,ctx);
        ctx.restore();

        DrawTetris.tetrisAct(canvas,'dii');
      }
      else {
        ctx.clearRect(0, 0, 590, 545);
        DrawTetris.drawAll(ctx);
        canvas.style.cursor='';
        canvas.onclick=function(){
          //null
        }
      }
    },

    tetrisAct: function (canvas,lct){
      canvas.onclick=function(){
        window.open('http://'+lct+'.rensidiaochaotian.com');
      }
      canvas.style.cursor='pointer';
    }
  };

  // run
  fpDoodle();

})();