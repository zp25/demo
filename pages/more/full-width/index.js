const loremIpsum = require('lorem-ipsum').loremIpsum;
const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  style,
  script,
} = require('../../../templates');

const lorem = loremIpsum({
  count: 5,
});

module.exports = templater`
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
