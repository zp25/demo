const { templater } = require('zp-lib');
const { header, link } = require('demo-public');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <h2>404</h2>
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
