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
        <!-- 包裹部分 -->
        <div class="emoji-toggles emoji-monkey">
          <input type="checkbox" id="toggle" class="toggle">

          <!-- emoji图像定位 -->
          <div class="emoji"></div>

          <label for="toggle" class="well"></label>
        </div>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>
`;
