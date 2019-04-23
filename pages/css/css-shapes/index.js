const { templater } = require('zp-lib');
const { header, link } = require('../../../templates');

module.exports = templater`
  <div id="app" class="container">
    ${header}

    <main class="flex">
      ${link}

      <section class="col col--s12 section">
        <div class="css-shapes">
          <div id="rectangle" class="graphics"></div>
<pre class="style">#rectangle {
  width: 200px;
  height: 100px;
}</pre>
        </div>

        <div class="css-shapes">
          <div id="circle" class="graphics"></div>
<pre class="style">#circle {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}</pre>
        </div>

        <div class="css-shapes">
          <div id="oval" class="graphics"></div>
<pre class="style">#oval {
  width: 200px;
  height: 100px;
  border-radius: 100%;
}</pre>
        </div>

        <div class="css-shapes">
          <div id="triangles" class="graphics"></div>
<pre class="style">#triangles {
  width:0;
  height:0;
  border-color: red green blue orange;
  border-style: solid;
  border-width: 50px;
}</pre>
        </div>

        <div class="css-shapes">
          <div id="triangle-up" class="graphics-triangle"></div>
<pre class="style">#triangle-up {
  width: 0;
  height: 0;
  border-right: 50px solid transparent;
  border-bottom: 100px solid green;
  border-left: 50px solid transparent;
}</pre>
       </div>

        <div class="css-shapes">
          <div id="triangle-down" class="graphics-triangle"></div>
<pre class="style">#triangle-down {
  width: 0;
  height: 0;
  border-top: 100px solid green;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
}</pre>
       </div>

        <div class="css-shapes">
          <div id="triangle-topleft" class="graphics-triangle"></div>
<pre class="style">#triangle-topleft {
  width: 0;
  height: 0;
  border-top: 100px solid green;
  border-right: 100px solid transparent;
}</pre>
        </div>

        <div class="css-shapes">
          <div id="trapezoid" class="graphics-triangle"></div>
<pre class="style">#trapezoid {
  width: 200px;
  height: 0;
  border-right: 50px solid transparent;
  border-bottom: 100px solid green;
  border-left: 50px solid transparent;
}</pre>
       </div>

        <div class="css-shapes">
          <div id="parallelogram" class="graphics"></div>
<pre class="style">#parallelogram {
  width: 150px;
  height: 100px;
  margin-left:20px;
  transform: skew(20deg);
}</pre>
        </div>

        <div class="css-shapes">
          <div id="star-six" class="graphics-triangle"></div>
<pre class="style">#star-six {
  position: relative;
  width: 0;
  height: 0;
  border-right: 50px solid transparent;
  border-bottom: 100px solid green;
  border-left: 50px solid transparent;

  &::after {
    content: '';
    position: absolute;
    top: 30px;
    left: -50px;
    width: 0;
    height: 0;
    border-top: 100px solid green;
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
  }
}</pre>
        </div>

        <div class="css-shapes">
          <div id="star-five" class="graphics-triangle"></div>
<pre class="style">#star-five {
  position: relative;
  width: 0;
  height: 0;
  border-right: 100px solid transparent;
  border-bottom: 70px solid green;
  border-left: 100px solid transparent;
  transform: rotate(35deg);
  margin: 50px 0;

  &::before {
    content: '';
    position: absolute;
    top: -45px;
    left: -65px;
    width: 0;
    height: 0;
    border-right: 30px solid transparent;
    border-bottom: 80px solid green;
    border-left: 30px solid transparent;
    transform: rotate(-35deg);
  }
  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: -105px;
    width: 0;
    height: 0;
    border-right: 100px solid transparent;
    border-bottom: 70px solid green;
    border-left: 100px solid transparent;
    transform: rotate(-70deg);
  }
}</pre>
        </div>

        <div class="css-shapes">
          <div id="pentagon" class="graphics-triangle"></div>
<pre class="style">#pentagon {
  position: relative;
  width: 86px;
  border-width: 50px 18px 0;
  border-style: solid;
  border-color: green transparent;

  &::before {
    content: '';
    position: absolute;
    top: -85px;
    left: -18px;
    width: 0;
    height: 0;
    border-width: 0 43px 35px;
    border-style: solid;
    border-color: transparent transparent green;
  }
}</pre>
        </div>

        <div class="css-shapes">
          <div id="hexagon" class="graphics"></div>
<pre class="style">#hexagon {
  position: relative;
  width: 100px;
  height: 55px;
  background: green;

  &::before {
    content: '';
    position: absolute;
    top: -25px;
    left: 0;
    width: 0;
    height: 0;
    border-right: 50px solid transparent;
    border-bottom: 25px solid green;
    border-left: 50px solid transparent;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -25px;
    left: 0;
    width: 0;
    height: 0;
    border-top: 25px solid green;
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
  }
}</pre>
        </div>

        <div class="css-shapes">
          <div id="octagon" class="graphics"></div>
<pre class="style">#octagon {
  position: relative;
  width: 100px;
  height: 100px;
  background: green;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 0;
    border-right: 29px solid white;
    border-bottom: 29px solid green;
    border-left: 29px solid white;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 0;
    border-top: 29px solid green;
    border-right: 29px solid white;
    border-left: 29px solid white;
  }
}</pre>
        </div>

        <div class="css-shapes">
          <div id="heart" class="graphics-triangle"></div>
<pre class="style">#heart {
  width: 100px;
  height: 90px;
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    background: green;
    border-radius: 50px 50px 0 0;
    transform-origin: 0 100%;
    transform: rotate(-45deg);
  }
  &::after {
    left: 0;
    transform-origin: 100% 100%;
    transform: rotate(45deg);
  }
}</pre>
        </div>

        <div class="css-shapes">
          <div id="infinity" class="graphics-triangle"></div>
<pre class="style">#infinity {
  position: relative;
  width: 212px;
  height: 100px;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    border: 20px solid green;
    border-radius: 50px 50px 0 50px;
    transform: rotate(-45deg);
  }
  &::after {
    left: auto;
    right: 0;
    border-radius: 50px 50px 50px 0;
    transform: rotate(45deg);
  }
}</pre>
        </div>

        <div class="css-shapes">
          <div id="diamond" class="graphics-triangle"></div>
<pre class="style">#diamond {
  position: relative;
  width: 100px;
  height: 0;
  border-width: 0 25px 25px;
  border-style: solid;
  border-color: transparent transparent green;

  &::after {
    content: '';
    position: absolute;
    top: 25px;
    left: -25px;
    width: 0;
    height: 0;
    border-width: 70px 50px 0 50px;
    border-style: solid;
    border-color: green transparent transparent;
  }
}</pre>
        </div>

        <div class="css-shapes">
          <div id="egg" class="graphics"></div>
<pre class="style">#egg {
  width: 80px;
  height: 120px;
  background-color: green;
  border-radius: 50% / 60% 60% 40% 40%;
}</pre>
        </div>

        <div class="css-shapes">
          <div id="pacman" class="graphics-triangle"></div>
<pre class="style">#pacman {
  width: 0px;
  height: 0px;
  border: 60px solid green;
  border-right: 60px solid transparent;
  border-radius: 100%;
}</pre>
        </div>

        <div class="css-shapes">
          <div id="talkbubble" class="graphics-triangle"></div>
<pre class="style">#talkbubble {
  width: 120px;
  height: 80px;
  background: green;
  position: relative;
  border-radius: 10px;

  &::before {
    content: '';
    position: absolute;
    top: 26px;
    right: 100%;
    width: 0;
    height: 0;
    border-top: 13px solid transparent;
    border-right: 26px solid green;
    border-bottom: 13px solid transparent;
  }
}</pre>
        </div>

        <div class="css-shapes">
          <div id="burst-12" class="graphics"></div>
<pre class="style">#burst-12 {
  position: relative;
  width: 80px;
  height: 80px;
  background: green;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: green;
  }
  &::before {
    transform: rotate(30deg);
  }
  &::after {
    transform: rotate(60deg);
  }
}</pre>
        </div>

        <div class="css-shapes">
          <div id="burst-8" class="graphics"></div>
<pre class="style">#burst-8 {
  position: relative;
  width: 80px;
  height: 80px;
  background: green;
  transform: rotate(20deg);

  &::before {
    content: '';
    width: 80px;
    height: 80px;
    position: absolute;
    top: 0;
    left: 0;
    background: green;
    transform: rotate(135deg);
  }
}</pre>
        </div>

        <div class="css-shapes">
          <div id="yin-yang" class="graphics"></div>
<pre class="style">#yin-yang {
  position: relative;
  width: 100px;
  height: 100px;
  background: white;
  border-width: 2px 2px 50px;
  border-style: solid;
  border-color: green;
  border-radius: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 48px;
    height: 48px;
    background: white;
    border: 18px solid green;
    border-radius: 100%;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 48px;
    height: 48px;
    background: green;
    border: 18px solid white;
    border-radius:100%;
  }
}</pre>
        </div>

        <div class="css-shapes">
          <div id="cone" class="graphics-triangles"></div>
<pre class="style">#cone {
  width: 0;
  height: 0;
  border-top: 100px solid green;
  border-right: 70px solid transparent;
  border-left: 70px solid transparent;
  border-radius: 50%;
}</pre>
        </div>

        <div class="css-shapes">
          <div id="space-invader" class="graphics-triangles"></div>
<pre class="style">#space-invader{
  box-shadow:
    0 0 0 1em green,
    0 1em 0 1em green,
    -2.5em 1.5em 0 .5em green,
    2.5em 1.5em 0 .5em green,
    -3em -3em 0 0 green,
    3em -3em 0 0 green,
    -2em -2em 0 0 green,
    2em -2em 0 0 green,
    -3em -1em 0 0 green,
    -2em -1em 0 0 green,
    2em -1em 0 0 green,
    3em -1em 0 0 green,
    -4em 0 0 0 green,
    -3em 0 0 0 green,
    3em 0 0 0 green,
    4em 0 0 0 green,
    -5em 1em 0 0 green,
    -4em 1em 0 0 green,
    4em 1em 0 0 green,
    5em 1em 0 0 green,
    -5em 2em 0 0 green,
    5em 2em 0 0 green,
    -5em 3em 0 0 green,
    -3em 3em 0 0 green,
    3em 3em 0 0 green,
    5em 3em 0 0 green,
    -2em 4em 0 0 green,
    -1em 4em 0 0 green,
    1em 4em 0 0 green,
    2em 4em 0 0 green;

  background: green;
  width: 1em;
  height: 1em;
  overflow: hidden;
}</pre>
        </div>
      </section>
    </main>
  </div>
`;
