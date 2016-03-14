/** worker对象 */
var worker;

/** DOMContentLoad Event */
document.addEventListener('DOMContentLoaded', function() {
  var input = document.querySelector('.file-select__input');
  var dropbox = document.querySelector('.file-control__drop');
  var url = new URL('scripts/dataurl/worker.js', window.location.origin);

  // select file
  input.addEventListener('change', handleSelect, false);

  // Drag & Drop
  dropbox.addEventListener('dragenter', dragenter, false);
  dropbox.addEventListener('dragover', dragover, false);
  dropbox.addEventListener('dragleave', dragleave, false);
  dropbox.addEventListener('drop', drop, false);

  // worker
  worker = new Worker(url);

  worker.addEventListener('message', handleMsg, false);
  worker.addEventListener('error', handleError, false);
}, false);

/**
 * 图片进入drop zone时触发的事件
 * @param {Error} e 事件对象
 */
function dragenter(e) {
  e.target.classList.add('file-control__drop--hover');

  e.preventDefault();
  e.stopPropagation();
}

/**
 * 图片在drop zone内时连续触发的事件
 * @param {Error} e 事件对象
 */
function dragover(e) {
  e.preventDefault();
  e.stopPropagation();
}

/**
 * 图片移出drop zone时触发的事件
 * @param {Error} e 事件对象
 */
function dragleave(e) {
  e.target.classList.remove('file-control__drop--hover');

  e.preventDefault();
  e.stopPropagation();
}

/**
 * drop时触发的事件
 * @param {Error} e 事件对象
 */
function drop(e) {
  e.target.classList.remove('file-control__drop--hover');

  handler(e.dataTransfer.files[0]);

  e.preventDefault();
  e.stopPropagation();
}

/**
 * 通过文件输入框选择图片后触发
 * @param {Error} e 事件对象
 */
function handleSelect(e) {
  handler(e.target.files[0]);

  e.target.value = '';
}

/**
 * 添加图片处理
 * @param {File} file 文件对象
 */
function handler(file) {
  document.querySelector('#dataurl').innerHTML = 'loading...';

  worker.postMessage(file);
}

/**
 * [handleMsg description]
 * @param {Error} e 事件对象
 */
function handleMsg(e) {
  document.querySelector('#dataurl').innerHTML = e.data;
}

/**
 * worker错误处理
 * @param {Error} e 事件对象
 */
function handleError(e) {
  document.querySelector('#dataurl').innerHTML = e.message;
}
