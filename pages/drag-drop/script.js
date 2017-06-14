const STOREKEY = 'dragAndDrop';

// 默认序列
const LIST = [
  {
    id: 1,
    name: 'one',
  },
  {
    id: 2,
    name: 'two',
  },
  {
    id: 3,
    name: 'three',
  },
  {
    id: 4,
    name: 'four',
  },
  {
    id: 5,
    name: 'five',
  },
  {
    id: 6,
    name: 'six',
  },
  {
    id: 7,
    name: 'seven',
  },
  {
    id: 8,
    name: 'eight',
  },
  {
    id: 9,
    name: 'nine',
  },
];

// drag & drop事件处理
const DragNDrop = {
  /**
   * 开始拖动
   * @param {Object} e - 事件对象
   * @param {Element} e.target - 被拖动的anchor元素
   */
  dragstart: (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('from', e.target.dataset.id);
  },
  // 容器
  dragenter: (e) => {
    e.dataTransfer.dropEffect = 'move';

    e.preventDefault();
    e.stopPropagation();
  },
  dragover: (e) => {
    e.dataTransfer.dropEffect = 'move';

    e.preventDefault();
    e.stopPropagation();
  },
  /**
   * 释放拖动元素
   * @param {Object} e - 事件对象
   * @param {Element} e.target - 目标anchor元素
   * @param {Element} e.currentTarget - 目标box元素
   */
  drop: (e) => {
    const frag = document.createDocumentFragment();
    const fromAnchor = document.querySelector(`.item--${e.dataTransfer.getData('from')}`);
    const fromBox = fromAnchor.parentElement;

    // move content
    frag.appendChild(fromAnchor);
    fromBox.appendChild(e.target);
    e.currentTarget.appendChild(frag);

    e.preventDefault();
    e.stopPropagation();
  },
};

/**
 * 绑定事件
 */
function attachEvents() {
  Array.from(document.querySelectorAll('.box')).forEach((item) => {
    item.addEventListener('dragenter', DragNDrop.dragenter, false);
    item.addEventListener('dragover', DragNDrop.dragover, false);
    item.addEventListener('drop', DragNDrop.drop, false);
  });

  Array.from(document.querySelectorAll('.item')).forEach((item) => {
    item.onclick = (e) => { e.preventDefault(); };
    item.addEventListener('dragstart', DragNDrop.dragstart, false);
  });
}

/**
 * 新建可移动元素
 */
function buildItems() {
  const data = JSON.parse(localStorage.getItem(STOREKEY)) || LIST;
  const frag = document.createDocumentFragment();

  data.forEach((item, index) => {
    const box = index + 1;
    const { id, name } = item;

    const list = document.createElement('li');
    const anchor = document.createElement('a');
    const text = document.createTextNode(name);

    list.classList.add('box', `box--${box}`);

    anchor.classList.add('item', `item--${id}`);
    anchor.setAttribute('draggable', true);
    anchor.setAttribute('href', `#${name}`);

    anchor.dataset.id = id;
    anchor.dataset.name = name;

    anchor.appendChild(text);
    list.appendChild(anchor);
    frag.appendChild(list);
  });

  const target = document.querySelector('#drag-and-drop');
  target.innerHTML = '';
  target.appendChild(frag);
}

document.addEventListener('DOMContentLoaded', () => {
  buildItems();
  attachEvents();
}, false);

window.addEventListener('beforeunload', () => {
  const arr = Array.from(document.querySelectorAll('.item')).map((elem) => {
    const { id, name } = elem.dataset;

    return {
      id,
      name,
    };
  });

  localStorage.setItem(STOREKEY, JSON.stringify(arr));
}, false);
