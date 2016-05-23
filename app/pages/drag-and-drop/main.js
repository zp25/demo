/** @type {Array} 默认数据 */
const Base = [
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

/**
 * 新建可移动元素
 */
function buildItems() {
  const data = JSON.parse(localStorage.getItem('data')) || Base;

  data.forEach((item, index) => {
    const id = index + 1;
    const el = document.createElement('a');

    el.classList.add('items');
    el.setAttribute('draggable', true);

    el.id = `item-${item.id}`;
    el.href = `#${item.name}`;
    el.dataset.id = item.id;
    el.dataset.name = item.name;

    const t = document.createTextNode(item.name);

    el.appendChild(t);
    document.querySelector(`#li-${id}`).appendChild(el);
  });
}

/**
 * 绑定事件
 */
function attachEvents() {
  // 容器
  Array.from(document.querySelectorAll('.list')).forEach(li => {
    li.addEventListener('dragenter', e => {
      e.dataTransfer.dropEffect = 'move';

      e.preventDefault();
      e.stopPropagation();
    }, false);

    li.addEventListener('dragover', e => {
      e.dataTransfer.dropEffect = 'move';

      e.preventDefault();
      e.stopPropagation();
    }, false);

    li.addEventListener('drop', e => {
      const df = document.createDocumentFragment();
      const f = document.querySelector(`#${e.dataTransfer.getData('from')}`);
      const fromBox = f.parentNode;

      // move content
      df.appendChild(f);
      fromBox.appendChild(e.target);
      e.currentTarget.appendChild(df);

      e.preventDefault();
      e.stopPropagation();
    }, false);
  });

  // 元素
  Array.from(document.querySelectorAll('.items')).forEach(item => {
    item.onclick = e => {
      e.preventDefault();
    };

    item.addEventListener('dragstart', e => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('from', e.target.id);
    }, false);
  });
}

/** Window OnLoad Event */
window.onload = () => {
  buildItems();
  attachEvents();
};

/** update localstorage before unload */
window.addEventListener('beforeunload', () => {
  const arr = Array.from(document.querySelectorAll('.items')).map(item => {
    const data = {
      id: item.dataset.id,
      name: item.dataset.name,
    };

    return data;
  });

  localStorage.setItem('data', JSON.stringify(arr));
}, false);
