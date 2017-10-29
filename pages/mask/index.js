const { templater } = require('zp-lib');

const { header, link, style, script } = require('../public');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <svg class="svg-defs">
        <defs>
          <linearGradient id="gradient">
            <stop offset="0" stop-color="black"></stop>
            <stop offset="0.2" stop-color="white"></stop>
            <stop offset="0.8" stop-color="white"></stop>
            <stop offset="1" stop-color="black"></stop>
          </linearGradient>

          <mask id="masking">
            <rect x="0" y="0" width="540px" height="300px" fill="url(#gradient)" />
          </mask>
        </defs>
      </svg>

      <section class="col col--s12 section">
        <p>图片两边过度至模糊效果，mask控制两边到透明的渐变，底部filter: blur制作模糊效果</p>
      </section>

      <section class="col col--s12 section">
        <div id="mask">
          <img class="mf bg" src="images/mf.jpg" alt="Lego Millennium Falcon">
          <img class="mf blur" src="images/mf.jpg" alt="Lego Millennium Falcon">
        </div>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>
`;
