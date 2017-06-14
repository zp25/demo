const templater = require('templater'); // eslint-disable-line import/no-extraneous-dependencies

const { header, link, style, script } = require('../public');

module.exports = templater `
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <p>将两图重叠，上方图片使用反色和半透明(<code>-webkit-filter: invert(100%) opacity(50%);</code>)，计算颜色<code>((255-c1) + c2) / 2</code>，相同部分为<code>rgb(127.5, 127.5, 127.5)</code></p>
      </section>

      <section class="col col--s12 section">
        <div class="img-diff">
          <img src="images/Spot_the_difference1.png" class="img" alt="image one">
          <img src="images/Spot_the_difference2.png" class="img" alt="image two">
        </div>
      </section>

      <section class="col col--s12 section">
        <div class="img-diff">
          <img src="images/Spot_the_difference1.png" class="img" alt="image one">
          <img src="images/Spot_the_difference2.png" class="img diff" alt="image two">
        </div>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>
`;
