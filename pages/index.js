const { templater } = require('zp-lib');

const list = param => param.filter(d => !d.draft).reduce((prev, d) => (
  `${prev}<li><a href="${d.file}">${d.name}</a></li>`
), '');

const html5 = param => param && list(param);
html5.displayName = 'html5';

const css = param => param && list(param);
css.displayName = 'css';

const more = param => param && list(param);
more.displayName = 'more';

module.exports = templater`
  <div id="app" class="container">
    <header class="header">
      <h1 class="title">DEMOs</h1>
      <p class="describe">多数demo只在Chrome中测试</p>
    </header>

    <main class="main flex">
      <section class="col col--s12 section">
        <h2 class="subject">HTML5 APIs</h2>

        <ul>${html5}</ul>
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
