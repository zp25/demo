/**
 * 创建提醒
 */
function sendNotification() {
  const opts = {
    tag: 'First',
    lang: 'en-US',
    dir: 'ltr',
    body: 'Hello World',
    data: 'This is data',
    icon: 'favicon.ico',
    silent: false,
  };
  const notify = new Notification('Web Notifications API', opts);
  setTimeout(notify.close.bind(notify), 5000);

  return notify;
}

/** Window Onload Event */
window.onload = () => {
  const info = document.querySelector('.info');
  const data = document.querySelector('.data');

  if (Notification.permision === 'granted') {
    const notify = sendNotification();

    info.innerHTML = 'Permission Granted';
    data.innerHTML = notify.data;
  } else if (Notification.permission === 'denied') {
    info.innerHTML = 'Permission Denied';
  } else {
    Notification.requestPermission().then(result => {
      data.innerHTML = '';

      if (result === 'denied') {
        info.innerHTML = 'Permission Denied';
        return;
      }

      if (result === 'default') {
        info.innerHTML = 'Permission Dismissed';
        return;
      }

      const notify = sendNotification();

      info.innerHTML = 'Permission Granted';
      data.innerHTML = notify.data;
    });
  }
};
