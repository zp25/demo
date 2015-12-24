(function() {
  var details = document.querySelector('#details');

  history.replaceState({page: 1}, '', '/history-api.html?pageone');

  window.onpopstate = function(e) {
    var p = document.createElement('p');
    var t = document.createTextNode('location: ' + document.location +
      ' ; state: ' + JSON.stringify(e.state));
    p.appendChild(t);
    details.appendChild(p);
  };

  document.getElementById('push').onclick = function(e) {
    history.pushState({page: 2}, '', '/history-api.html?pagetwo');

    e.preventDefault();
  };

  document.getElementById('replace').onclick = function(e) {
    history.replaceState({page: 3}, '', '/history-api.html?pagethree');

    e.preventDefault();
  };

  document.getElementById('back').onclick = function(e) {
    history.back();

    e.preventDefault();
  };

  document.getElementById('forward').onclick = function(e) {
    history.forward();

    e.preventDefault();
  };

  document.getElementById('go').onclick = function(e) {
    history.go(-2);

    e.preventDefault();
  };
})();
