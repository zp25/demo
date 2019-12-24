/**
 * 选取的文件信息
 */
const FILE = {
  queue: [],
  size: 0,
};

/**
 * 初始化
 */
function init() {
  FILE.queue = [];
  FILE.size = 0;

  document.querySelector('.fileLength').innerHTML = 0;
  document.querySelector('.fileSize').innerHTML = 0;
  document.querySelector('.detail').innerHTML = '';
}

/**
 * 创建缩略图
 * @param {File} file - 图片对象
 * @return {Image} 缩略图
 */
function buildThumbnail(file) {
  const imgURL = window.URL.createObjectURL(file);
  const img = new Image();

  img.src = imgURL;
  img.onload = () => {
    window.URL.revokeObjectURL(imgURL);
  };

  return img;
}

/**
 * 处理添加的图片，包括预览和全局对象存储图片信息
 * @param {FileList} files - 选取的图片
 */
function handleFiles(files) {
  const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const frag = document.createDocumentFragment();
  // 文件总大小
  let size = 0;

  for (let i = 0; i < files.length; i += 1) {
    const img = buildThumbnail(files[i]);
    img.classList.add('item');

    frag.appendChild(img);

    // update Global information
    FILE.queue = FILE.queue.concat(files[i]);
    FILE.size += files[i].size;
  }

  // 添加图片预览信息
  document.querySelector('.detail').appendChild(frag);

  // 更新已选图片信息
  for (let j = 0, temp = FILE.size; temp > 1; temp /= 1024, j += 1) {
    size = temp.toFixed(3) + unit[j];
  }

  document.querySelector('.fileLength').innerHTML = FILE.queue.length;
  document.querySelector('.fileSize').innerHTML = size;
}

/**
 * 图片进入drop zone时触发的事件
 */
function dragenter(e) {
  e.preventDefault();

  e.target.classList.add('file-control__drop--hover');
}

/**
 * 图片在drop zone时连续触发的事件
 */
function dragover(e) {
  e.preventDefault();
}

/**
 * 图片移出drop zone时触发的事件
 */
function dragleave(e) {
  e.preventDefault();

  e.target.classList.remove('file-control__drop--hover');
}

/**
 * 通过drag & drop选取图片
 */
function drop(e) {
  e.preventDefault();

  e.target.classList.remove('file-control__drop--hover');
  handleFiles(e.dataTransfer.files);
}

/**
 * 通过文件输入框选择图片
 */
function select(e) {
  handleFiles(e.target.files);

  this.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const clear = document.querySelector('.clear');
  clear.addEventListener('click', init, false);

  // select file
  const input = document.querySelector('.file-select__input');
  input.addEventListener('change', select, false);

  // Drag & Drop
  const dropbox = document.querySelector('.file-control__drop');

  dropbox.addEventListener('dragenter', dragenter, false);
  dropbox.addEventListener('dragover', dragover, false);
  dropbox.addEventListener('dragleave', dragleave, false);
  dropbox.addEventListener('drop', drop, false);
}, false);

window.onload = () => {
  init();
};
