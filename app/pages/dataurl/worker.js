/** worker启动 */
postMessage('web worker ACTIVATED');

/** 监听信息 */
self.addEventListener('message', function(e) {
  // debug
  console.log(e.data.name);

  buildDataURL(e.data).then(function(data) {
    postMessage(data);
  });
});

/**
 * 获取Data URL
 * @param {File} file 文件对象
 * @return {Promise} Promise对象
 */
function buildDataURL(file) {
  return new Promise(function(resolve) {
    var reader = new FileReader();

    reader.onload = function(e) {
      resolve(e.target.result);
    };

    reader.readAsDataURL(file);
  });
}
