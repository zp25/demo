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
        <div class="waapi">
          <div class="mover"></div>
          <svg class="path">
            <path fill="none" stroke="#111" stroke-width="1" d="M10,10 H310 V210 H10 L10,10"></path>
          </svg>

          <div class="ctrl">
            <button type="button" class="btn" id="pause">pause</button>
            <button type="button" class="btn" id="play">play</button>
            <button type="button" class="btn" id="reverse">reverse</button>
            <button type="button" class="btn" id="cancel">cancel</button>
          </div>
        </div>
      </section>

      <section class="col col--s12 section">
        <div class="waapi">
          <label for="rate">playbackRate</label>
          <input type="range" id="rate" min="0" max="3" value="1">
        </div>
      </section>

      <section class="col col--s12 section">
        <div class="waapi">
          <button type="button" class="btn" id="state">state</button>
          <span class="detail"></span>
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
