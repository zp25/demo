const templater = require('templater'); // eslint-disable-line import/no-extraneous-dependencies

const { header, link, style, script } = require('../public');

module.exports = templater `
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section id="parallax" class="col col--s12 section">
        <div class="banner first">
          <h2>Slide One</h2>
        </div>

        <ul class="banner banner--list">
          <li><h2 class="first">first</h2></li>
          <li><h2 class="second">second</h2></li>
          <li><h2 class="third">third</h2></li>
        </ul>

        <div class="banner second">
          <h2>Slide Two</h2>
        </div>

        <div class="banner third">
          <h2>Slide Three</h2>
        </div>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>
`;
