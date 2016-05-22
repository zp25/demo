/** worker启动 */
postMessage('web worker ACTIVATED');

/**
 * 获取Data URL
 * @param {File} file 文件对象
 * @return {Promise} Promise对象
 */
function buildDataURL(file) {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = e => {
      resolve(e.target.result);
    };

    reader.readAsDataURL(file);
  });
}

/** 监听信息 */
self.addEventListener('message', e => {
  // debug
  console.log(e.data.name);

  buildDataURL(e.data).then(data => {
    postMessage(data);
  });
});
