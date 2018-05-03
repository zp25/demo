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
        <form id="constraint-validation">
          <div class="inputArea">
            <label class="label" for="email">Email</label>
            <input type="email" id="email" class="input" required>
            <span class="helper"></span>
          </div>

          <div class="inputArea">
            <label class="label" for="password">Password</label>
            <input
              type="password"
              id="password"
              class="input"
              maxlength="18"
              pattern="[a-zA-Z0-9_#@]{6,18}"
              title="输入6到18位数字、字母或_ # @符号"
              required
            >
            <span class="helper"></span>
          </div>

          <div class="button">
            <button type="submit" class="submit">Submit</button>
          </div>
        </form>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
