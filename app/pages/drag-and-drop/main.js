/** @type {Array} 默认数据 */
var Base = [
  {
    id: 1,
    name: 'one'
  },
  {
    id: 2,
    name: 'two'
  },
  {
    id: 3,
    name: 'three'
  },
  {
    id: 4,
    name: 'four'
  },
  {
    id: 5,
    name: 'five'
  },
  {
    id: 6,
    name: 'six'
  },
  {
    id: 7,
    name: 'seven'
  },
  {
    id: 8,
    name: 'eight'
  },
  {
    id: 9,
    name: 'nine'
  }
];

/** OnLoad Event */
window.addEventListener('load', function() {
  buildItems();
  attachEvents();
}, false);

/** update localstorage before unload */
window.addEventListener('beforeunload', function() {
  var items = document.querySelectorAll('.items');
  var arr = [].slice.call(items).map(function(item) {
    var data = {
      id: item.dataset.id,
      name: item.dataset.name
    };

    return data;
  });

  localStorage.setItem('data', JSON.stringify(arr));
}, false);

/**
 * 新建可移动元素
 */
function buildItems() {
  var data = JSON.parse(localStorage.getItem('data')) || Base;

  data.forEach(function(item, index) {
    var id = '#li-' + (++index);
    var box = document.querySelector(id);
    var el;
    var t;

    el = document.createElement('a');
    el.classList.add('items');
    el.setAttribute('draggable', true);

    el.id = 'item-' + item.id;
    el.href = '#' + item.name;
    el.dataset.id = item.id;
    el.dataset.name = item.name;

    t = document.createTextNode(item.name);

    el.appendChild(t);
    box.appendChild(el);
  });
}

/**
 * 绑定事件
 */
function attachEvents() {
  var lists = document.querySelectorAll('.list');
  var items = document.querySelectorAll('.items');

  // 容器
  [].forEach.call(lists, function(li) {
    li.addEventListener('dragenter', function(e) {
      e.dataTransfer.dropEffect = 'move';

      e.preventDefault();
      e.stopPropagation();
    }, false);

    li.addEventListener('dragover', function(e) {
      e.dataTransfer.dropEffect = 'move';

      e.preventDefault();
      e.stopPropagation();
    }, false);

    li.addEventListener('drop', function(e) {
      var df = document.createDocumentFragment();
      var from = document.querySelector('#' + e.dataTransfer.getData('from'));
      var fromBox = from.parentNode;

      // move content
      df.appendChild(from);
      fromBox.appendChild(e.target);
      e.currentTarget.appendChild(df);

      e.preventDefault();
      e.stopPropagation();
    }, false);
  });

  // 元素
  [].forEach.call(items, function(item) {
    item.onclick = function(e) {
      e.preventDefault();
    };

    item.addEventListener('dragstart', function(e) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('from', e.target.id);
    }, false);
  });
}
