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
        <div id="fullscreen">
          <button type="button" class="btn launch">进入全屏</button>
          <button type="button" class="btn cancel">退出全屏</button>

          <p class="info"></p>
        </div>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
