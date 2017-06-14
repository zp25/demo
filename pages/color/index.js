const templater = require('templater'); // eslint-disable-line import/no-extraneous-dependencies

const { header, link, style, script } = require('../public');

module.exports = templater `
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <div id="color-kudos">
          <div class="box">#70af1a;</div>
          <div class="box">#00adef;</div>
          <div class="box">#a6145d;</div>
          <div class="box">#ff6634;</div>

          <!-- kudos90 boxes -->
          <div class="box">border &amp; bg:<br/>#cd0000;<br/>#ffebcd;</div>
          <div class="box">border &amp; bg:<br/>#97c03d;<br/>#eff7e0;</div>
          <div class="box">border &amp; bg:<br/>#ccc;<br/>#f5f5f5;</div>
          <div class="box">border &amp; bg:<br/>#f8931d;<br/>#fff4ca;</div>

          <!-- kudos90 gray -->
          <div class="box">#f5f5f5;</div>
          <div class="box">kudos90 header:<br/>#e8e8e8;</div>
          <div class="box">kudos90 selected:<br/>#dfdfdf;<br/>(#ccc - 204)</div>
          <div class="box">placeholder:<br/>#a9a9a9;</div>
          <div class="box">subtitle:<br/>#777;<br/>(#999 - 153)<div class="holder"></div></div>

          <!-- kudos90 others -->
          <div class="box">kudos90 score:<br/>#70c163;</div>
          <div class="box">kudos90 loading:<br/>#ffcd00;</div>
          <div class="box">kudos90 logo:<br/>#498af2;<div class="holder"></div></div>
          <div class="box">anchor &amp; nav-color:<br/>#005eac;<div class="holder"></div></div>
          <div class="box">kudos90 buttons:<br/>borders + anchor-color-bg</div>

          <!-- mask & black-bg -->
          <div class="box">kudos90 black-bg:<br/>#2d2d2d;</div>
          <div class="box">mask:<br/>#1e1e1e;</div>
        </div>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>
`;
