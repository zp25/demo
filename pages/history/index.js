const templater = require('templater'); // eslint-disable-line import/no-extraneous-dependencies

const { header, link, style, script } = require('../public');

module.exports = templater `
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <div id="history">
          <p>页面载入时使用history.replaceState修改history记录</p>
          <p>利用按钮1，2修改history记录；按钮3，4，5进行前进后退测试，在history细节中查看信息</p>

          <p>点击按钮1后，将使用history.pushState加入一条history记录</p>
          <button type="button" class="btn" data-trigger="push">按钮1</button>

          <p>点击按钮2后，将使用history.replaceState修改当前history记录</p>
          <button type="button" class="btn" data-trigger="replace">按钮2</button>

          <p>点击按钮3后，页面将后退到前一个history记录</p>
          <button type="button" class="btn" data-trigger="back">按钮3</button>

          <p>点击按钮4后，页面将前进一个history记录</p>
          <button type="button" class="btn" data-trigger="forward">按钮4</button>

          <p>点击按钮5后，页面将后退两个history记录</p>
          <button type="button" class="btn" data-trigger="go">按钮5</button>

          <p>根据history细节可以发现pushState和replaceState的区别</p>
        </div>
      </section>

      <section class="col col--s12 section">
        <h3>history细节</h3>

        <ul class="detail"></ul>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>

  ${script()}
`;
