/**
 * 图片进入drop zone时触发的事件
 */
function dragenter(e) {
  e.target.classList.add('file-control__drop--hover');

  e.preventDefault();
  e.stopPropagation();
}

/**
 * 图片在drop zone时连续触发的事件
 */
function dragover(e) {
  e.preventDefault();
  e.stopPropagation();
}

/**
 * 图片移出drop zone时触发的事件
 */
function dragleave(e) {
  e.target.classList.remove('file-control__drop--hover');

  e.preventDefault();
  e.stopPropagation();
}

/**
 * 添加图片处理
 * @param {File} file - 文件对象
 * @param {Worker} worker - worker对象
 */
function handler(file, worker) {
  document.querySelector('#dataurl').innerHTML = 'loading...';

  worker.postMessage(file);
}

/**
 * 通过drag & drop选取图片
 */
const drop = worker => (e) => {
  e.target.classList.remove('file-control__drop--hover');

  handler(e.dataTransfer.files[0], worker);

  e.preventDefault();
  e.stopPropagation();
};

/**
 * 通过文件输入框选择图片
 */
const select = worker => (e) => {
  handler(e.target.files[0], worker);

  e.target.value = '';
};

/**
 * 接收worker消息
 */
function msg(e) {
  document.querySelector('#dataurl').innerHTML = e.data;
}

/**
 * worker错误处理
 */
function error(e) {
  document.querySelector('#dataurl').innerHTML = e.message;
}

document.addEventListener('DOMContentLoaded', () => {
  const url = new URL('scripts/worker.js', window.location.origin);
  const worker = new Worker(url);

  worker.addEventListener('message', msg, false);
  worker.addEventListener('error', error, false);

  // select file
  const input = document.querySelector('.file-select__input');
  input.addEventListener('change', select(worker), false);

  // Drag & Drop
  const dropbox = document.querySelector('.file-control__drop');

  dropbox.addEventListener('dragenter', dragenter, false);
  dropbox.addEventListener('dragover', dragover, false);
  dropbox.addEventListener('dragleave', dragleave, false);
  dropbox.addEventListener('drop', drop(worker), false);
}, false);
