const { templater } = require('zp-lib');

const { header, link, style, script } = require('../public');

const cube = () => {
  const arr = [
    'front',
    'back',
    'top',
    'bottom',
    'left',
    'right',
  ];

  const faces = arr.reduce((prev, d) => (
    `${prev}<div class="face ${d}">${d}</div>`
  ), '');

  return `<div class="cube">${faces}</div>`;
};

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <div id="showpart">
          <div class="box box--2d">front</div>
          <div class="box box--3d">${cube}</div>
        </div>
      </section>

      <section class="col col--s12 section">
        <select id="select">
          <option value="2d" selected>2D</option>
          <option value="3d">3D Box</option>
        </select>
      </section>

      <section class="col col--s12 section">
        <div class="transform">
          <form class="form form--2d">
            <div class="inputArea">
              <label class="label label--translateX" for="translateX" data-value="0"></label>
              <input type="range" id="translateX" min="-120" max="120" value="0">
            </div>
            <div class="inputArea">
              <label class="label label--translateY" for="translateY" data-value="0"></label>
              <input type="range" id="translateY" min="-120" max="120" value="0">
            </div>
            <div class="inputArea">
              <label class="label label--rotate" for="rotate" data-value="0"></label>
              <input type="range" id="rotate" min="-180" max="180" value="0">
            </div>
            <div class="inputArea">
              <label class="label label--scale" for="scale" data-value="1"></label>
              <input type="range" id="scale" min="0.5" max="2" step="0.5" value="1">
            </div>
            <div class="inputArea">
              <label class="label label--skewX" for="skewX" data-value="0"></label>
              <input type="range" id="skewX" min="-180" max="180" value="0">
            </div>
            <div class="inputArea">
              <label class="label label--skewY" for="skewY" data-value="0"></label>
              <input type="range" id="skewY" min="-180" max="180" value="0">
            </div>
          </form>

          <form class="form form--3d">
            <div class="inputArea">
              <label class="label label--perspective" for="perspective" data-value="1000"></label>
              <input type="range" id="perspective" min="0" max="5000" value="1000">
            </div>

            <div class="inputArea">
              <label class="label label--perspective-origin" data-value-x="150" data-value-y="150"></label>
            </div>
            <div class="inputArea">
              <label class="label label--empty"></label>
              <input type="range" id="perspective-origin-x" min="-300" max="300" value="150" data-group="double">
            </div>
            <div class="inputArea">
              <label class="label label--empty"></label>
              <input type="range" id="perspective-origin-y" min="-300" max="300" value="150" data-group="double">
            </div>

            <div class="inputArea">
              <label class="label label--transform-style" for="transform-style" data-value="preserve-3d"></label>
            </div>
            <div class="inputArea">
              <label class="label label--empty"></label>
              <select id="transform-style" data-group="cube">
                <option value="preserve-3d" selected>preserve-3d</option>
                <option value="flat">flat</option>
              </select>
            </div>

            <div class="inputArea">
              <label class="label label--transform-origin" data-value-x="50" data-value-y="50"></label>
            </div>
            <div class="inputArea">
              <label class="label label--empty"></label>
              <input type="range" id="transform-origin-x" min="0" max="100" value="50" data-group="double">
            </div>
            <div class="inputArea">
              <label class="label label--empty"></label>
              <input type="range" id="transform-origin-y" min="0" max="100" value="50" data-group="double">
            </div>

            <div class="inputArea">
              <label class="label label--backface-visibility" for="backface-visibility" data-value="visible"></label>
            </div>
            <div class="inputArea">
              <label class="label label--empty"></label>
              <select id="backface-visibility" data-label="backface-visibility">
                <option value="visible" selected>visible</option>
                <option value="hidden">hidden</option>
              </select>
            </div>
          </form>
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
