/**
 * 摄像头操作
 * @return {[type]} [description]
 */
function getUserMedia() {
  if (!navigator.mediaDevices) {
    console.log('Error! Use FF36+');
    return;
  }

  const video = document.querySelector('video');

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
  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
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
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, 450, 350);

    e.preventDefault();
  };
}

/** Window Onload Event */
window.onload = () => {
  getUserMedia();
};
