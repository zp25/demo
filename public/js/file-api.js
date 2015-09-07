$(function() {
  if (typeof window.FileReader === 'undefined') {
    alert('你的浏览器不支持File API');
    return false;
  }

  var $fileField = $("input[name='fileField']");
  var $fileDrop = $('#file-drop');
  var $fileLength = $('#fileLength');
  var $fileSize = $('#fileSize');
  var $fileDetail = $('#fileDetail');

  var BOX = {
    fileQueue: new Array(),
    fileSize: 0,
    aMultiples: ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  };

  // clear all
  $('#fileClear').on('click', function (e) {
    e.preventDefault();

    $fileLength.html('0');
    $fileSize.html('0');
    $fileDetail.html('');

    BOX.fileQueue = [];
    BOX.fileSize = 0;
  });


  // add File button
  $fileField.on('change', function (e) {
    e.preventDefault();

    handleFile(this.files);
  });


  // drag-and-drop
  $fileDrop.on('dragover', dragOver)
           .on('dragleave', dragLeave)
           .on('drop', drop);

  function dragOver(e) {
    e.preventDefault();

    $(this).addClass('over');
  }

  function dragLeave(e) {
    $fileDrop.removeClass();
  }

  function drop(e) {
    e.preventDefault();

    // jQuery只处理jQuery Event，需要使用原生event
    var dt = e.originalEvent.dataTransfer;

    $fileDrop.removeClass();
    handleFile(dt.files);
  }


  // main handler
  function handleFile(files) {
    var imgURL, li, span_img, span_size, span_pg, img, progressbar, txt, pg_txt;
    var fileSize = '-';
    var fileList = files;

    // raw js
    for (var i=0; i<fileList.length; i++) {
      imgURL = window.URL.createObjectURL(fileList[i]);

      li = document.createElement('li');

      // thumbnail
      span_img = document.createElement('span');
      img = document.createElement('img');
      img.src = imgURL;
      img.alt = fileList[i].name;
      span_img.appendChild(img);

      (function(imgURL) {
        img.onload = function(imgURL) {
          window.URL.revokeObjectURL(imgURL);
        };
      })(imgURL);

      // file detail
      span_size = span_img.cloneNode(false);
      txt = document.createTextNode(fileList[i].size + ' bytes');
      span_size.appendChild(txt);

      // progress bar
      span_pg = span_img.cloneNode(false);
      progressbar = document.createElement('progress');
      progressbar.value = 0;
      progressbar.max = 100;
      pg_txt = document.createTextNode('0%');
      progressbar.appendChild(pg_txt);
      span_pg.appendChild(progressbar);

      // build
      li.appendChild(span_img);
      li.appendChild(span_size);
      li.appendChild(span_pg);
      $fileDetail[0].appendChild(li);

      // update filequeue
      BOX.fileQueue.push({
        file: fileList[i],
        li: li
      });

      BOX.fileSize += fileList[i].size;
    }

    // totoal size
    for (var i=0, nApprox=BOX.fileSize/1024; nApprox>1; nApprox/=1024, i++) {
      fileSize = nApprox.toFixed(3) + " " + BOX.aMultiples[i];
    }

    $fileLength.html(fileList.length);
    $fileSize.html(fileSize);
  }


  // upload files
  $('#fileUpload').on('click', function (e) {
    e.preventDefault();

    var item;

    while (BOX.fileQueue.length > 0) {
      item = BOX.fileQueue.pop();

      if (item.file.size < 1048576) {
        ajaxUpload(item.file, item.li);
      } else {
        $(item.li).children('span:nth-child(3)').css('color','red').html('<em>上传失败，图片' + item.file.name + '大于1M</em>');
      }
    }
  });

  function ajaxUpload(file, li){
    var $pg = $(li).find('progress');
    var pg_val, xhr, formData;

    if (file && li){
      xhr = new XMLHttpRequest();
      formData = new FormData();
      formData.append('fileField', file);

      // upload progress bar
      xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
          pg_val = Math.round(e.loaded/e.total*100);

          $pg.val(pg_val).html(pg_val+'%');
        }
      };

      // state
      xhr.onload = function(e) {
        $(li).children('span:nth-child(3)').css('color','green').html('<em>上传成功</em>');
      };

      xhr.onerror = function(e) {
        $(li).children('span:nth-child(3)').css('color','red').html('<em>上传失败</em>');
      };

      xhr.open('POST', 'uploads');
      xhr.send(formData);
    }
  }
});