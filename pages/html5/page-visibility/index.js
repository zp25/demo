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
        <p>下方有色区域将在hidden并切回visible时通过动画效果缓慢显示</p>
      </section>

      <section class="col col--s12 section">
        <div id="page-visibility"></div>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
