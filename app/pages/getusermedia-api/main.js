(() => {
  if (!navigator.mediaDevices) {
    console.log('Error! Use FF36+');
    return;
  }

  const video = document.querySelector('video');
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  // list media devices
  navigator.mediaDevices.enumerateDevices().then(devices => {
    devices.forEach(device => {
      const info = `${device.kind}: ${device.label} id = ${device.deviceId}`;

      console.log(info);
    });
  }).catch(err => {
    console.log(`${err.name}: ${err.message}`);
  });

  // use
  const p = navigator.mediaDevices.getUserMedia({ video: true });

  p.then(stream => {
    const imgURL = window.URL.createObjectURL(stream);

    video.src = imgURL;

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(imgURL);
    };
  }).catch(err => {
    console.log(`${err.name}: ${err.message}`);
  });

  // snap
  document.querySelector('.snap').onclick = e => {
    e.preventDefault();

    ctx.drawImage(video, 0, 0, 450, 350);
  };
})();
