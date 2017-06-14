const templater = require('templater'); // eslint-disable-line import/no-extraneous-dependencies

const { header, link, style, script } = require('../public');

module.exports = templater `
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <p>注意浏览器支持</p>
      </section>

      <section class="col col--s12 section">
        <div class="copy-to-clipboard">
          <input type="text" id="copyme" class="input" value="https://demo.zp25.ninja">
          <button type="button" class="btn" data-copytarget="copyme">copy</button>
        </div>

        <div class="copy-to-clipboard">
          <input type="text" id="copyheroku" class="input" value="https://github.com/zp25">
          <button type="button" class="btn" data-copytarget="copyheroku">copy</button>
        </div>

        <div class="copy-to-clipboard">
          <input type="text" class="input" placeholder="try paste here">
        </div>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
