import { storage } from 'zp-lib';

const store = storage.proxy('dragAndDrop');

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
  /**
   * 拖动追踪
   * @param {Object} e - 事件对象
   */
  dragover: (e) => {
    e.preventDefault();

    e.dataTransfer.dropEffect = 'move';
  },
  /**
   * 释放拖动元素
   * @param {Object} e - 事件对象
   * @param {Element} e.target - 目标anchor元素
   * @param {Element} e.currentTarget - 目标box元素
   */
  drop: (e) => {
    e.preventDefault();

    const frag = document.createDocumentFragment();
    const fromAnchor = document.querySelector(`.item--${e.dataTransfer.getData('from')}`);
    const fromBox = fromAnchor.parentElement;

    // move content
    frag.appendChild(fromAnchor);
    fromBox.appendChild(e.target);
    e.currentTarget.appendChild(frag);
  },
};

/**
 * 绑定事件
 */
function attachEvents() {
  const {
    dragstart,
    dragover,
    drop,
  } = DragNDrop;

  Array.from(document.querySelectorAll('.box')).forEach((item) => {
    item.addEventListener('dragover', dragover, false);
    item.addEventListener('drop', drop, false);
  });

  Array.from(document.querySelectorAll('.item')).forEach((item) => {
    item.onclick = (e) => { e.preventDefault(); };
    item.addEventListener('dragstart', dragstart, false);
  });
}

/**
 * 新建可移动元素
 */
function buildItems() {
  const { data = LIST } = store;
  const frag = document.createDocumentFragment();

  data.forEach(({ id, name }, index) => {
    const box = index + 1;

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

  store.data = arr;
}, false);
