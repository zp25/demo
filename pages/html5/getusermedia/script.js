/**
 * 摄像头操作
 */
function getUserMedia(video) {
  if (!navigator.mediaDevices) {
    alert('Error! Use FF36+'); // eslint-disable-line no-alert
    return;
  }

  const detail = document.querySelector('.detail');

  // media devices信息
  const frag = document.createDocumentFragment();

  navigator.mediaDevices.enumerateDevices().then((devices) => {
    devices.forEach((device) => {
      const li = document.createElement('li');
      const info = `${device.kind}: ${device.label} id = ${device.deviceId}`;
      const text = document.createTextNode(info);

      li.appendChild(text);
      frag.appendChild(li);
    });

    detail.innerHTML = '';
    detail.appendChild(frag);
  }).catch((err) => {
    detail.innerHTML = `<li>${err.name}: ${err.message}</li>`;
  });

  // use
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    // Older browsers may not have srcObject
    if ('srcObject' in video) {
      // MediaStream不需要创建Object URL，可直接传入video.srcObject属性
      video.srcObject = stream;
    } else {
      // Avoid using this in new browsers, as it is going away.
      const imgURL = window.URL.createObjectURL(stream);

      video.src = imgURL;
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(imgURL);
      };
    }
  }).catch((err) => {
    detail.innerHTML = `<li>${err.name}: ${err.message}</li>`;
  });

  // snap
  document.querySelector('.snap').onclick = (e) => {
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, 320, 240);

    e.preventDefault();
  };
}

/**
 * Picture-in-Picture
 */
function readyPip(video) {
  const control = document.querySelector('.pip');

  if (!('pictureInPictureEnabled' in document)) {
    control.classList.add('pip--disabled');
    return;
  }

  control.onclick = async () => {
    console.log(document.pictureInPictureElement);

    try {
      if (video !== document.pictureInPictureElement) {
        await video.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  control.textContent = '进入Picture-in-Picture';

  // info
  let pipWindow = null;

  const log = (e) => {
    console.log(`> Window size ${e.target.width}x${e.target.height}`);
  };

  video.addEventListener('enterpictureinpicture', (e) => {
    pipWindow = e.pictureInPictureWindow;
    log({ target: pipWindow });

    pipWindow.addEventListener('resize', log);

    control.textContent = '退出Picture-in-Picture';
  });

  video.addEventListener('leavepictureinpicture', () => {
    control.textContent = '进入Picture-in-Picture';
    pipWindow.removeEventListener('resize', log);
  });
}

window.onload = () => {
  const video = document.querySelector('.video');

  getUserMedia(video);

  readyPip(video);
};
