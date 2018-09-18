const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  style,
} = require('demo-public');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section id="terminal-styling" class="col col--s12 section">
        ${style}
      </section>
    </main>
  </div>
`;
