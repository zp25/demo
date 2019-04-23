import { Group } from 'zp-ui';

window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

const MAP = {
  translateX: {
    unit: 'px',
    prop: '--transform-translate-x',
  },
  translateY: {
    unit: 'px',
    prop: '--transform-translate-y',
  },
  rotate: {
    unit: 'deg',
    prop: '--transform-rotate',
  },
  scale: {
    unit: '',
    prop: '--transform-scale',
  },
  skewX: {
    unit: 'deg',
    prop: '--transform-skew-x',
  },
  skewY: {
    unit: 'deg',
    prop: '--transform-skew-y',
  },
  perspective: {
    unit: 'px',
    prop: '--transform-perspective',
  },
  'perspective-origin': {
    unit: '%',
    prop: '--transform-perspective-origin',
  },
  'transform-style': {
    unit: '',
    prop: '--transform-transform-style',
  },
  'transform-origin': {
    unit: '%',
    prop: '--transform-transform-origin',
  },
  'backface-visibility': {
    unit: '',
    prop: '--transform-backface-visibility',
  },
};

const selectObserver = () => {
  const boxActive = 'box--active';
  const formActive = 'form--active';

  return {
    /**
     * 模式更改的样式设定
     */
    update({ mode }) {
      const box2d = $('.box--2d');
      const form2d = $('.form--2d');
      const box3d = $('.box--3d');
      const form3d = $('.form--3d');

      if (mode === '3d') {
        box2d.classList.remove(boxActive);
        form2d.classList.remove(formActive);

        box3d.classList.add(boxActive);
        form3d.classList.add(formActive);
      } else {
        box2d.classList.add(boxActive);
        form2d.classList.add(formActive);

        box3d.classList.remove(boxActive);
        form3d.classList.remove(formActive);
      }
    },
  };
};

const form2dObserver = () => ({
  update({ label, value }) {
    const result = value + MAP[label].unit;

    // 修改
    $('.box--2d').style.setProperty(MAP[label].prop, result);
    $(`.form--2d .label--${label}`).dataset.value = value;
  },
});

const form3dObserver = () => ({
  update({ label: tmpLabel, group, value }) {
    let suffix = '';
    let label = tmpLabel;

    if (group && group === 'double') {
      suffix = label.slice(-2);
      label = label.slice(0, -2);
    }

    const result = value + MAP[label].unit;

    // 修改
    $('.box--3d').style.setProperty(MAP[label].prop + suffix, result);
    $(`.form--3d .label--${label}`).dataset[`value${suffix.slice(-1).toUpperCase()}`] = value;
  },
});

const createHandler = ({ select, form2d, form3d }) => ({
  /**
   * 模式切换
   */
  switchMode: ({ target }) => {
    const { value } = target;

    select.setState({ mode: value });
  },

  /**
   * 2d表单
   */
  setValue2D: ({ target }) => {
    const { value } = target;

    form2d.setState({
      label: target.getAttribute('id'),
      value,
    });
  },

  /**
   * 3d表单
   */
  setValue3D: ({ target }) => {
    const {
      value,
      dataset: { group },
    } = target;

    form3d.setState({
      label: target.getAttribute('id'),
      group,
      value,
    });
  },
});

document.addEventListener('DOMContentLoaded', () => {
  const select = new Group('select');
  select.attach(selectObserver());

  const form2d = new Group('form2d');
  form2d.attach(form2dObserver());

  const form3d = new Group('form3d');
  form3d.attach(form3dObserver());

  const handler = createHandler({ select, form2d, form3d });
  $('#select').addEventListener('change', handler.switchMode, false);
  $('.form--2d').addEventListener('change', handler.setValue2D, false);
  $('.form--3d').addEventListener('change', handler.setValue3D, false);

  // init
  select.setState({ mode: '2d' });
}, false);
