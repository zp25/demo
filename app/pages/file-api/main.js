/**
 * 全局状态
 * @type {Object}
 */
const Base = {
  loading: false,
  fileQueue: [],
  fileSize: 0,
  count: 0,
};

/**
 * 初始化BOX
 */
function initFiles() {
  Base.fileQueue = [];
  Base.fileSize = 0;
}

/**
 * 初始化提示内容
 */
function initHint() {
  const len = document.querySelector('#fileLength');
  const size = document.querySelector('#fileSize');
  const detail = document.querySelector('#fileDetail');

  len.innerHTML = 0;
  size.innerHTML = 0;
  detail.innerHTML = '';
}

/**
 * 初始化
 * @param {Object} e 事件对象
 */
function init(e) {
  // 正在上传时阻止操作
  if (!Base.loading) {
    initHint();
    initFiles();
  }

  e.preventDefault();
}

/**
 * ajax
 * @param {String} url  Upload URL
 * @param {Object} data File Object
 * @param {Element} t 进度条容器对象
 * @return {Promist} Promise Object
 */
function ajax(url, data, t) {
  const progress = t.querySelector('progress');

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('fileField', data);

    // upload progress bar
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);

        progress.value = pct;
        progress.innerHTML = `${pct}%`;
      }
    };

    xhr.onloadstart = () => {
      Base.loading = true;
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      }
    };

    xhr.onerror = () => {
      reject('XHR error');
    };

    xhr.open('POST', url, true);
    xhr.send(formData);
  });
}

/**
 * 创建缩略图对象
 * @param  {Object} file File Object
 * @return {Object} Image Object
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
 * @param {Object} files FileList Object
 */
function handleFiles(files) {
  const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const df = document.createDocumentFragment();
  // 文件总大小
  let size = 0;

  for (let i = 0; i < files.length; i++) {
    // component
    const li = document.createElement('li');
    li.dataset.name = files[i].name;
    li.dataset.size = files[i].size;

    // preview
    const img = document.createElement('span');
    img.classList.add('preview');
    img.appendChild(buildThumbnail(files[i]));

    // progress bar
    const progress = document.createElement('progress');
    progress.value = 0;
    progress.max = 100;
    progress.innerHTML = '0%';

    const bar = document.createElement('span');
    bar.classList.add('progress');
    bar.appendChild(progress);

    // concat
    li.appendChild(img);
    li.appendChild(bar);
    df.appendChild(li);

    // update Global information
    Base.fileQueue.push({
      file: files[i],
      li,
    });

    Base.fileSize += files[i].size;
  }

  // 添加图片预览信息
  document.querySelector('#fileDetail').appendChild(df);

  // 更新已选图片信息
  for (let j = 0, temp = Base.fileSize; temp > 1; temp /= 1024, j++) {
    size = temp.toFixed(3) + unit[j];
  }

  document.querySelector('#fileLength').innerHTML = Base.fileQueue.length;
  document.querySelector('#fileSize').innerHTML = size;
}

/**
 * 上传一张图片
 * @param {Object} file File Object
 * @param {Element} li 关联预览元素
 * @param {Number} count 需上传图片数量
 */
function upload(file, li, count) {
  const t = li.querySelector('.progress');

  if (file && t) {
    ajax('uploads', file, t).then(data => {
      t.classList.add('done');
      t.innerHTML = '<em>上传成功</em>';
      console.log(data);

      // 计数
      Base.count++;
      if (Base.count === count) {
        Base.loading = false;
      }
    }).catch(err => {
      t.classList.add('fail');
      t.innerHTML = '<em>上传失败</em>';

      console.log(err);
    });
  }
}

/**
 * 上传所有图片
 * @param {Object} e 事件对象
 */
function uploadAll(e) {
  const len = Base.fileQueue.length;
  let item = null;

  // 正在上传时阻止操作
  if (Base.loading) {
    return;
  }

  while ((item = Base.fileQueue.pop())) {
    if (item.file.size < 1048576) {
      upload(item.file, item.li, len);
    } else {
      const t = item.li.querySelector('.progress');
      t.classList.add('fail');
      t.innerHTML = '<em>上传失败，图片大于1M</em>';
    }
  }

  e.preventDefault();
}

/**
 * 图片进入drop zone时触发的事件
 * @param {Object} e 事件对象
 */
function dragenter(e) {
  const c = Base.loading ?
    'file-control__drop--block' : 'file-control__drop--hover';

  e.target.classList.add(c);

  e.preventDefault();
  e.stopPropagation();
}

/**
 * 图片在drop zone内时连续触发的事件
 * @param {Object} e 事件对象
 */
function dragover(e) {
  e.preventDefault();
  e.stopPropagation();
}

/**
 * 图片移出drop zone时触发的事件
 * @param  {Object} e 事件对象
 */
function dragleave(e) {
  e.preventDefault();
  e.stopPropagation();

  e.target.classList.remove('file-control__drop--hover',
    'file-control__drop--block');
}

/**
 * drop时触发的事件
 * @param {Object} e 事件对象
 */
function drop(e) {
  e.target.classList.remove('file-control__drop--hover',
    'file-control__drop--block');

  // 正在上传时阻止操作
  if (!Base.loading) {
    handleFiles(e.dataTransfer.files);
  }

  e.preventDefault();
  e.stopPropagation();
}

/**
 * 通过文件输入框选择图片后触发
 * @param {Object} e 事件对象
 */
function select(e) {
  // 正在上传时阻止操作
  if (!Base.loading) {
    handleFiles(e.target.files);
  }

  this.value = '';
}

/** DOMContentLoad Event */
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.file-select__input');
  const dropbox = document.querySelector('.file-control__drop');

  // select file
  input.addEventListener('change', select, false);

  // Drag & Drop
  dropbox.addEventListener('dragenter', dragenter, false);
  dropbox.addEventListener('dragover', dragover, false);
  dropbox.addEventListener('dragleave', dragleave, false);
  dropbox.addEventListener('drop', drop, false);

  // upload or clear files
  document.querySelector('#clear').addEventListener('click', init, false);
  document.querySelector('#upload').addEventListener('click', uploadAll, false);
}, false);

/** OnLoad Event */
window.onload = () => {
  document.querySelector('#clear').click();
};
