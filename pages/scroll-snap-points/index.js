const { templater } = require('zp-lib');

const { header, link, style, script } = require('../public');

const list = () => {
  let arr = [...new Array(3).keys()];
  arr = arr.map((d, index) => index + 1);

  return arr.reduce((prev, d) => `${prev}<div class="item">${d}</div>`, '');
};

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <p>Chrome暂不支持，使用Safari查看</p>
      </section>

      <section class="col col--s12 section">
        <div id="scroll-snap-point">${list}</div>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>
`;
