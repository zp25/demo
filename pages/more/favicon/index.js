const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  script,
} = require('../../../templates');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <canvas id="animated-favicon" width="192" height="192"></canvas>

        <button id="start-animate">Loading</button>
      </section>

      <section class="col col--s12 code">
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
