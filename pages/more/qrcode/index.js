const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  script,
  useref,
} = require('../../../templates');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <form id="qrcode">
          <input type="text" class="input" value="hello world">
          <button type="submit" class="submit">Submit</button>
        </form>
      </section>

      <section class="col col--s12 section">
        <img class="qrcode-output" alt="qrcode">
      </section>
    </main>
  </div>

  ${useref('script')}
  ${script()}
`;
