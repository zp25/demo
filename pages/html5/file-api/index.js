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
        <div class="file-select">
          <input type="file" id="file" class="file-select__input" accept="image/jpeg,image/pjpeg,image/png" multiple>
          <label for="file">选择图片</label>
        </div>
      </section>

      <section class="col col--s12 section">
        <div class="file-control">
          <div class="file-control__drop"></div>
        </div>
      </section>

      <section class="col col--s12 section">
        <div id="file-api">
          <h3>File list</h3>
          <p>
            文件总数：<span class="fileLength"></span>
            文件总大小：<span class="fileSize"></span>
            <button type="button" class="btn clear">清空列表</button>
          </p>

          <div class="detail"></div>
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
