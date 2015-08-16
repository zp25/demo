(function() {

  var arr, txt, items, lists;

  // init set
  arr = JSON.parse(localStorage.getItem('order')) || [1, 2, 3, 4, 5, 6, 7, 8, 9];
  txt = JSON.parse(localStorage.getItem('name')) ||
        ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  arr.forEach(function (item, index) {
    var box, el, t;
    var id = 'li-' + ++index;
    var i = item - 1;

    box = document.getElementById(id);
    el = document.createElement('a');
    t = document.createTextNode(txt[i]);

    el.id = 'item-' + item;
    el.href = '#' + txt[i];
    el.setAttribute('class', 'items');
    el.setAttribute('draggable', true);
    el.dataset.order = item;

    el.appendChild(t);
    box.appendChild(el);
  });


  // update localstorage before unload
  window.addEventListener('beforeunload', function (e) {
    var items = document.querySelectorAll('.items');
    var newArr = [].slice.call(items).map(function(item) {
      return item.dataset.order;
    });

    localStorage.setItem('order', JSON.stringify(newArr));
    localStorage.setItem('name', JSON.stringify(txt));
  }, false);


  // drag and drop events
  items = document.querySelectorAll('.items');
  lists = document.querySelectorAll('li');

  [].slice.call(lists).forEach(function (item) {
    item.addEventListener('dragover', function (e) {
      e.preventDefault();
    }, false);

    item.addEventListener('drop', function (e) {
      var dt = e.dataTransfer;
      var frag = document.createDocumentFragment();
      var from = document.getElementById(dt.getData('from'));
      var fromBox = from.parentNode;

      e.preventDefault();

      frag.appendChild(from);
      fromBox.appendChild(e.target);
      e.currentTarget.appendChild(frag);
    }, false);
  });

  [].slice.call(items).forEach(function (item) {
    item.onclick = function(e) {
      e.preventDefault();
    };

    item.addEventListener('dragstart', function (e) {
      var dt = e.dataTransfer;
      dt.setData('from', e.target.id);
    }, false);
  });

})();