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
        <p>4个属性，4个事件</p>
        <ul>
          <li>Battery charging? <span class="charging"></span></li>
          <li>Battery level: <span class="level"></span></li>
          <li>Battery charging time: <span class="time"></span></li>
          <li>Battery discharging time: <span class="distime"></span></li>
        </ul>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
