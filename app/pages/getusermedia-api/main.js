(function() {
  if (!navigator.mediaDevices) {
    console.log('Error! Use FF36+');
    return;
  }

  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  // list media devices
  var devices = navigator.mediaDevices.enumerateDevices();

  devices.then(function(devices) {
    devices.forEach(function(device) {
      console.log(device.kind + ': ' + device.label + ' ' +
        'id = ' + device.deviceId);
    });
  }).catch(function(err) {
    console.log(err.name + ': ' + err.message);
  });

  // use
  var p = navigator.mediaDevices.getUserMedia({video: true});

  p.then(function(stream) {
    var imgURL = window.URL.createObjectURL(stream);

    video.src = imgURL;

    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(imgURL);
    };
  }).catch(function(err) {
    console.log(err.name + ': ' + err.message);
  });

  // snap
  document.querySelector('.snap').onclick = function(e) {
    e.preventDefault();

    ctx.drawImage(video, 0, 0, 450, 350);
  };
})();
