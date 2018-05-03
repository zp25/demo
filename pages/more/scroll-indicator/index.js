const loremIpsum = require('lorem-ipsum');
const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  style,
  script,
} = require('demo-public');

const lorem = {
  words: {
    count: 2,
    units: 'words',
  },
  sentences: {
    count: 10,
    units: 'sentences',
  },
};

const list = (len = 5) => {
  const arr = [...new Array(len).keys()];

  const li = arr.reduce(prev => `${prev}<li>${loremIpsum(lorem.words)}</li>`, '');

  return `<ul>${li}</ul>`;
};

const section = (len = 8) => {
  const arr = [...new Array(len).keys()];

  return arr.reduce((prev, d, index) => (
    index === 2 ? prev + list() : `${prev}<p>${loremIpsum(lorem.sentences)}</p>`
  ), '');
};

const fakeArticle = () => {
  const arr = [...new Array(3).keys()];

  return arr.reduce(prev => prev + section(), '');
};

module.exports = templater`
  <div id="app" class="container container--scroll-indicator">
    ${header}

    <main class="main flex">
      ${link}

      <section class="col col--s12 section" id="scroll-indicator">
        ${fakeArticle}
      </section>

      <section class="col col--s12 section">
        <p>code会覆盖indicator</p>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>
`;
