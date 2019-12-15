const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  style,
  script,
} = require('../../../templates');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <p>使用FF36+
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Browser_compatibility">
            compatibility table
          </a>
        </p>
      </section>

      <section class="col col--s12 section">
        <div class="getusermedia">
          <video class="video" autoplay></video>
        </div>
      </section>

      <section class="col col--s12 section">
        <div class="getusermedia">
          <ul class="detail"></ul>
          <button type="button" class="btn snap">截图</button>
          <button type="button" class="btn pip">Picture-in-Picture</button>

          <canvas class="canvas" width="320" height="240"></canvas>
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
