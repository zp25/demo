const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  style,
  script,
} = require('../../../templates');

const list = () => {
  const arr = Array.from({ length: 30 });

  return arr.reduce(prev => `${prev}<div class="cat__segment"></div>`, '');
};

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section longcat-spinner">
        <div class="cat gilly">${list}</div>
        <div class="cat qian">${list}</div>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>
`;
