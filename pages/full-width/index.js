const templater = require('templater'); // eslint-disable-line import/no-extraneous-dependencies
const loremIpsum = require('lorem-ipsum');

const { header, link, style, script } = require('../public');

const lorem = loremIpsum({
  count: 5,
});

module.exports = templater `
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section id="full-width" class="col col--s12 section">
        <p>${lorem}</p>

        <figure class="figure">
          <img class="mf" src="images/mf.jpg" alt="Lego Millennium Falcon">
        </figure>

        <p>${lorem}</p>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>
`;
