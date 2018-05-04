const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  style,
  script,
} = require('demo-public');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <p>0-50%和50%-100%处理有区别，利用动画的negative animation-delay和animation-play-state: paused可统一处理</p>
      </section>

      <section class="col col--s12 section">
        <div class="pie pie-less" id="percent-30"></div>
        <p class="title">30%</p>
      </section>

      <section class="col col--s12 section">
        <div class="pie pie-more" id="percent-60"></div>
        <p class="title">60%</p>
      </section>

      <section class="col col--s12 section">
        <div class="pie pie-animate"></div>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>
`;
