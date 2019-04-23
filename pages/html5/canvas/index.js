const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  style,
  script,
} = require('../../../templates');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <p>RSDCT首页，点击进入各成员博客</p>
      </section>

      <section class="col col--s12 section">
        <canvas id="fpDoodle" width="590" height="550">你的浏览器不支持canvas元素</canvas>
      </section>

      <section class="col col--s12 section">
        <a href="#canvas" class="download" download="canvas">下载图片</a>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
