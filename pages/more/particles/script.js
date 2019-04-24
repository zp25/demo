/**
 * 粒子样式
 * @param {Element} particle - 粒子元素
 * @param {Object} opts - 配置
 * @param {number} opts.x - left
 * @param {number} opts.y - right
 * @param {number} opts.size - 粒子直径
 */
function particleStyle(particle, opts) {
  const {
    x,
    y,
    size,
  } = opts;

  particle.classList.add('particle');

  const color = `hsl(${Math.random() * 90 + 200}, 50%, 50%)`;

  particle.style.setProperty('--mm-particle-left', x);
  particle.style.setProperty('--mm-particle-top', y);
  particle.style.setProperty('--mm-particle-size', size);
  particle.style.setProperty('--mm-particle-color', color);
}

/**
 * 随机偏移
 * @return {Object}
 */
const randomOffset = () => ({
  x: (Math.random() - 0.5) * 200,
  y: (Math.random() - 0.5) * 200,
});

function createParticle(target, left, top) {
  const size = Math.random() * 50 + 10;

  const x = left - size / 2;
  const y = top - size / 2;

  const particle = document.createElement('div');
  particleStyle(particle, {
    x,
    y,
    size,
  });
  target.appendChild(particle);

  const keyframes = [
    {
      transform: 'translate(0, 0)',
      scale: 1,
      opacity: 1,
    },
    {
      transform: `translate(${
        Object.values(randomOffset()).map(d => `${d}px`).join(',')
      })`,
      scale: 0,
      opacity: 0,
    },
  ];

  const timing = {
    duration: (Math.random() * 2 + 1) * 1000,
    easing: 'ease-out',
  };

  const player = particle.animate(keyframes, timing);
  player.onfinish = () => {
    target.removeChild(particle);
  };
}

const createHandler = target => (e) => {
  e.preventDefault();

  const {
    clientX,
    clientY,
  } = e.changedTouches ? e.changedTouches[0] : e;

  const {
    left,
    top,
  } = target.getBoundingClientRect();

  createParticle(target, clientX - left, clientY - top);
};

document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('#simulating-mouse-movement');
  const handler = createHandler(target);

  target.addEventListener('mousemove', handler, false);
  target.addEventListener('touchmove', handler, false);
}, false);
