/**
 * 全局状态
 * @type {Object}
 */
var Base = {
  loading: false,
  fileQueue: [],
  fileSize: 0,
  count: 0
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
  var len = document.querySelector('#fileLength');
  var size = document.querySelector('#fileSize');
  var detail = document.querySelector('#fileDetail');

  len.innerHTML = 0;
  size.innerHTML = 0;
  detail.innerHTML = '';
}

/** DOMContentLoad Event */
document.addEventListener('DOMContentLoaded', function() {
  var input = document.querySelector('.file-select__input');
  var dropbox = document.querySelector('.file-control__drop');

  var clean = document.querySelector('#clear');
  var upload = document.querySelector('#upload');

  // select file
  input.addEventListener('change', select, false);

  // Drag & Drop
  dropbox.addEventListener('dragenter', dragenter, false);
  dropbox.addEventListener('dragover', dragover, false);
  dropbox.addEventListener('dragleave', dragleave, false);
  dropbox.addEventListener('drop', drop, false);

  // upload or clear files
  clean.addEventListener('click', init, false);
  upload.addEventListener('click', uploadAll, false);
}, false);

/** OnLoad Event */
window.addEventListener('load', function() {
  var clean = document.querySelector('#clear');

  clean.click();
}, false);

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
 * 上传所有图片
 * @param {Object} e 事件对象
 */
function uploadAll(e) {
  var len = Base.fileQueue.length;
  var item;
  var t;

  // 正在上传时阻止操作
  if (Base.loading) {
    return;
  }

  while ((item = Base.fileQueue.pop())) {
    if (item.file.size < 1048576) {
      upload(item.file, item.li, len);
    } else {
      t = item.li.querySelector('.progress');
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
  var c = Base.loading ?
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

/**
 * 处理添加的图片，包括预览和全局对象存储图片信息
 * @param {Object} files FileList Object
 */
function handleFiles(files) {
  var unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var t = document.querySelector('#fileDetail');
  var hintLen = document.querySelector('#fileLength');
  var hintSize = document.querySelector('#fileSize');
  var df = document.createDocumentFragment();
  // 文件总大小
  var size = 0;
  // component
  var li;
  var img;
  var progress;
  var bar;

  for (var i = 0; i < files.length; i++) {
    // component
    li = document.createElement('li');
    li.dataset.name = files[i].name;
    li.dataset.size = files[i].size;

    // preview
    img = document.createElement('span');
    img.classList.add('preview');
    img.appendChild(buildThumbnail(files[i]));

    // progress bar
    progress = document.createElement('progress');
    progress.value = 0;
    progress.max = 100;
    progress.innerHTML = '0%';

    bar = document.createElement('span');
    bar.classList.add('progress');
    bar.appendChild(progress);

    // concat
    li.appendChild(img);
    li.appendChild(bar);
    df.appendChild(li);

    // update Global information
    Base.fileQueue.push({
      file: files[i],
      li: li
    });

    Base.fileSize += files[i].size;
  }

  t.appendChild(df);

  // totoal size
  for (var j = 0, temp = Base.fileSize; temp > 1; temp /= 1024, j++) {
    size = temp.toFixed(3) + unit[j];
  }

  hintLen.innerHTML = Base.fileQueue.length;
  hintSize.innerHTML = size;
}

/**
 * 创建缩略图对象
 * @param  {Object} file File Object
 * @return {Object} Image Object
 */
function buildThumbnail(file) {
  var imgURL;
  var img;

  imgURL = window.URL.createObjectURL(file);

  img = new Image();
  img.src = imgURL;

  img.onload = function() {
    window.URL.revokeObjectURL(imgURL);
  };

  return img;
}

/**
 * 上传一张图片
 * @param {Object} file File Object
 * @param {Element} li 关联预览元素
 * @param {Number} count 需上传图片数量
 */
function upload(file, li, count) {
  var t = li.querySelector('.progress');

  if (file && t) {
    ajax('uploads', file, t).then(function(data) {
      t.classList.add('done');
      t.innerHTML = '<em>上传成功</em>';
      console.log(data);

      // 计数
      Base.count++;
      if (Base.count === count) {
        Base.loading = false;
      }
    }).catch(function(err) {
      t.classList.add('fail');
      t.innerHTML = '<em>上传失败</em>';

      console.log(err);
    });
  }
}

/**
 * ajax
 * @param {String} url  Upload URL
 * @param {Object} data File Object
 * @param {Element} t 进度条容器对象
 * @return {Promist} Promise Object
 */
function ajax(url, data, t) {
  var progress = t.querySelector('progress');

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();

    formData.append('fileField', data);

    // upload progress bar
    xhr.upload.onprogress = function(e) {
      var pct;

      if (e.lengthComputable) {
        pct = Math.round(e.loaded / e.total * 100);

        progress.value = pct;
        progress.innerHTML = pct + '%';
      }
    };

    xhr.onloadstart = function() {
      Base.loading = true;
    };

    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(this.response));
      }
    };

    xhr.onerror = function() {
      reject('XHR error');
    };

    xhr.open('POST', url, true);
    xhr.send(formData);
  });
}
