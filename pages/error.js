const { templater } = require('zp-lib');
const { header, link } = require('../templates');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <h2>Network Error</h2>
      </section>

      <section class="col col--s12 section">
        <figure>
          <figcaption>zp</figcaption>
          <img src="/images/zp.jpg">
        </figure>
      </section>
    </main>
  </div>
`;
