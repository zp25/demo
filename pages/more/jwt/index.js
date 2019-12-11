const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  script,
} = require('../../../templates');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <form id="jwt">
          <textarea class="input"></textarea>
          <button type="submit" class="submit">Submit</button>
        </form>
      </section>

      <section class="col col--s12 section">
        <pre class="jwt-output">output here</pre>
      </section>
    </main>
  </div>

  ${script()}
`;
