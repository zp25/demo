const { templater } = require('zp-lib');

const { header, link, style, script } = require('../public');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <div id="notification">
          <p class="info">...</p>
          <p class="data"></p>
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
