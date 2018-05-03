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

      <section class="col col--s12 section">
        <pre>uuencode [-m] [-o outfile] [infile] remotefile</pre>
      </section>

      <section class="col col--s12 section">
        <div class="file-select">
          <input type="file" id="file" class="file-select__input" accept="image/jpeg,image/pjpeg,image/png">
          <label for="file">选择图片</label>
        </div>
      </section>

      <section class="col col--s12 section">
        <div class="file-control">
          <div class="file-control__drop"></div>
        </div>
      </section>

      <section class="col col--s12 section">
        <p id="dataurl" class="break-all" contentEditable></p>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
