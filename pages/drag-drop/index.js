const { templater } = require('zp-lib');

const { header, link, style, script } = require('../public');

const list = () => {
  let arr = [...new Array(9).keys()];
  arr = arr.map((d, index) => index + 1);

  return arr.reduce((prev, d) => `${prev}<li class="box box--${d}"></li>`, '');
};

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <p>拖动交换各元素位置，并以localstorage存储</p>
      </section>

      <section class="col col--s12 section">
        <ul id="drag-and-drop">${list}</ul>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
