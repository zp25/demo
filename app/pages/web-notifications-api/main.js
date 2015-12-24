(function() {
  var info = document.querySelector('p:nth-child(1)');
  var data = document.querySelector('p:nth-child(2)');
  var opts = {
    tag: 'First',
    lang: 'en-US',
    dir: 'ltr',
    body: 'Hello World',
    data: 'This is data',
    icon: 'img/icon.png',
    silent: false
  };

  info.innerHTML = '...';
  data.innerHTML = '';

  if (Notification.permision === 'granted') {
    var n = new Notification('Web Notifications API', opts);
    setTimeout(n.close.bind(n), 5000);

    info.innerHTML = 'Permission Granted';
    data.innerHTML = n.data;
  } else if (Notification.permission === 'denied') {
    info.innerHTML = 'Permission Denied';
  } else {
    Notification.requestPermission(function(result) {
      if (result === 'granted') {
        var n = new Notification('Web Notifications API', opts);
        setTimeout(n.close.bind(n), 5000);

        info.innerHTML = 'Permission Granted';
        data.innerHTML = n.data;
      } else if (result === 'denied') {
        info.innerHTML = 'Permission Denied';
        data.innerHTML = '';
      }
    });
  }
})();
