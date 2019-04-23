const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  style,
  script,
} = require('../../../templates');

const COLUMN = 27;
const LIST = [
  'Anna',
  'James',
  'Jennifer',
  'Jeremiah',
  'Jocelyn',
  'Benjamin',
  'Zed',
  'Frank',
  'Chris',
  'Sarah',
  'Rob',
  'Danielle',
  'Jessica',
];

const thead = () => {
  // charcode
  const start = 65;

  const head = [...new Array(COLUMN).keys()]
    .reduce((prev, d, index) => (index === 0
      ? '<th class="th"></th>'
      : `${prev}<th class="th">${String.fromCharCode(start + index - 1)}</th>`
    ), '');

  return `<tr class="tr">${head}</tr>`;
};

const tr = (nick, fill) => {
  const row = [...new Array(COLUMN).keys()].reduce((prev, d, index) => (
    `${prev}<td class="td">${index === 0 ? nick : fill}</td>`
  ), '');

  return `<tr class="tr">${row}</tr>`;
};

const tbody = () => (
  LIST.reduce((prev, d, index) => (prev + tr(d, index + 1)), '')
);

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section id="responsive-spreadsheet" class="col col--s12 section">
        <table class="table">
          <thead class="thead">
            ${thead()}
          </thead>
          <tbody class="tbody">
            ${tbody()}
          </tbody>
        </table>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>
`;
