let start = null;

const control = document.querySelector('#start-animate');
const favicon = document.querySelector('link[rel="icon"]');

const { href } = favicon;

/**
 * 返回初始设置
 */
function clean() {
  start = null;
  favicon.href = href;

  control.disabled = false;
}

/**
 * 进度条
 */
const drawLoader = (canvas, ctx, progress) => {
  const angle = ((progress - 800) / 3200) * 2 * Math.PI;

  ctx.clearRect(0, 0, 192, 192);
  ctx.beginPath();
  ctx.arc(96, 96, 80, -0.5 * Math.PI, angle, false);
  ctx.stroke();

  favicon.href = canvas.toDataURL('image/png');

  if (progress < 3200) {
    requestAnimationFrame((ts) => {
      drawLoader(canvas, ctx, ts - start);
    });
  } else {
    clean();
  }
};

window.addEventListener('load', () => {
  const canvas = document.querySelector('#animated-favicon');
  const ctx = canvas.getContext('2d');

  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 32;

  // 初始显示圆
  ctx.beginPath();
  ctx.arc(96, 96, 80, 0, 2 * Math.PI, false);
  ctx.stroke();

  control.onclick = (e) => {
    e.target.disabled = true;

    requestAnimationFrame((ts) => {
      if (!start) {
        start = ts;
      }

      drawLoader(canvas, ctx, ts - start);
    });
  };
}, false);
