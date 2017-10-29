const { templater } = require('zp-lib');

const { header, link, style, script } = require('../public');

const list = () => {
  let arr = [...new Array(6).keys()];
  arr = arr.map((d, index) => index + 1);

  return arr.reduce((prev, d) => (
    `${prev}<li class="item item-${d}"><a href="#${d}" class="anchor" data-button="icon-${d}"></a></li>`
  ), '');
};

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <p>因为webkit/blink-based浏览器对SVG clip path的pointer事件支持不够合理，ff则不支持CSS shape function，具体说明查看Browser Support (and Bugs)部分，因此在webkit/blink-based中使用图形函数，ff中使用SVG clip path</p>
      </section>

      <section class="col col--s12 section">
        <ul id="clip-path">${list}</ul>

        <svg height="0" width="0">
          <defs>
            <clipPath clipPathUnits="objectBoundingBox" id="sector">
              <path fill="none" stroke="#111" stroke-width="1" class="sector"
                d="M0.5,0.5 l0.5,0 A0.5,0.5 0 0,0 0.75,.066987298 z"></path>
            </clipPath>
          </defs>
        </svg>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
