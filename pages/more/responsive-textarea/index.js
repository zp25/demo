const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  style,
  script,
} = require('demo-public');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section id="responsive-textarea" class="col col--s12 section">
        <div class="textarea" contenteditable></div>

        <div class="output"></div>
      </section>

      <section class="col col--s12 section">
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
