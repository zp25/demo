const templater = require('templater'); // eslint-disable-line import/no-extraneous-dependencies

const list = param => param.filter(d => !d.draft).reduce((prev, d) => (
  `${prev}<li><a href="${d.file}">${d.name}</a></li>`
), '');

const javascript = param => list(param);
javascript.displayName = 'javascript';

const css = param => list(param);
css.displayName = 'css';

const more = param => list(param);
more.displayName = 'more';

module.exports = templater `
  <div id="app" class="container">
    <header class="header">
      <h1>DEMOs</h1>
      <p>多数demo只在Chrome中测试</p>
    </header>

    <main class="main flex">
      <section class="col col--s12 section">
        <h2 class="subject">HTML5 APIs</h2>

        <ul>${javascript}</ul>
      </section>

      <section class="col col--s12 section">
        <h2 class="subject">CSS3</h2>

        <ul>${css}</ul>
      </section>

      <section class="col col--s12 section">
        <h2 class="subject">其它</h2>

        <ul>${more}</ul>
      </section>
    </main>
  </div>
`;
