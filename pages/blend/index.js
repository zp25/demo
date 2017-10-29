const { templater } = require('zp-lib');

const { header, link, style, script } = require('../public');

const list = () => {
  const arr = [
    'normal',
    'multiply',
    {
      name: 'screen',
      selected: true,
    },
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
  ];

  return arr.reduce((prev, d) => {
    if (typeof d === 'string') {
      return `${prev}<option>${d}</option>`;
    }

    return `${prev}<option selected>${d.name}</option>`;
  }, '');
};

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <h2>mix-blend-mode</h2>
        <p>元素和其下方元素的合成效果，mix即所有元素成份都将受到影响</p>

        <div id="mix-blend-mode">
          <div class="bg"></div>
          <div class="text"></div>
        </div>
      </section>

      <section class="col col--s12 section">
        <h2>background-blend-mode</h2>
        <p>元素各背景图片和颜色的合成效果</p>

        <div id="background-blend-mode"></div>
        <select id="background-blend-mode-select">${list}</select>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
