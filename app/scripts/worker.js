/**
 * 获取Data URL
 * @param {File} file - 文件对象
 * @return {Promise}
 */
function buildDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target.result);
    };

    reader.readAsDataURL(file);
  });
}

postMessage('web worker ACTIVATED');

window.self.addEventListener('message', (e) => {
  buildDataURL(e.data).then((data) => {
    postMessage(data);
  });
});
