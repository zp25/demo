const { templaterAsync: templater } = require('zp-lib');
const {
  header,
  link,
  style,
  script,
} = require('../../../templates');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <div id="filter">
          <pre class="style">filter: blur(&lt;length&gt;)</pre>
          <img src="images/redwood-ukulele-top.jpg" class="blur" class="img" alt="guitar">

          <pre class="style">filter: brightness([ &lt;number&gt; | &lt;percentage&gt; ])</pre>
          <img src="images/redwood-ukulele-top.jpg" class="brightness" class="img" alt="guitar">

          <pre class="style">filter: contrast([ &lt;number&gt; | &lt;percentage&gt; ])</pre>
          <img src="images/redwood-ukulele-top.jpg" class="contrast" class="img" alt="guitar">

          <pre class="style">filter: drop-shadow(&lt;length&gt;{2,3} &lt;color&gt;?)</pre>
          <img src="images/redwood-ukulele-top.jpg" class="drop-shadow" class="img" alt="guitar">

          <pre class="style">filter: grayscale([ &lt;number&gt; | &lt;percentage&gt; ])</pre>
          <img src="images/redwood-ukulele-top.jpg" class="grayscale" class="img" alt="guitar">

          <pre class="style">filter: hue-rotate(&lt;angle&gt;)</pre>
          <img src="images/redwood-ukulele-top.jpg" class="hue-rotate" class="img" alt="guitar">

          <pre class="style">filter: invert([ &lt;number&gt; | &lt;percentage&gt; ])</pre>
          <img src="images/redwood-ukulele-top.jpg" class="invert" class="img" alt="guitar">

          <pre class="style">filter: opacity([ &lt;number&gt; | &lt;percentage&gt; ])</pre>
          <img src="images/redwood-ukulele-top.jpg" class="opacity" class="img" alt="guitar">

          <pre class="style">filter: saturate([ &lt;number&gt; | &lt;percentage&gt; ])</pre>
          <img src="images/redwood-ukulele-top.jpg" class="saturate" class="img" alt="guitar">

          <pre class="style">filter: sepia([ &lt;number&gt; | &lt;percentage&gt; ])</pre>
          <img src="images/redwood-ukulele-top.jpg" class="sepia" class="img" alt="guitar">
        </div>
      </section>

      <section class="col col--s12 code">
        ${style}
        ${script('code')}
      </section>
    </main>
  </div>
`;
