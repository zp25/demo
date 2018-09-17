import { Group } from 'zp-ui';

const blendObserver = () => {
  const t = document.querySelector('#background-blend-mode');

  return {
    update: ({ value }) => {
      t.style.setProperty('--blend-background-blend-mode', value);
    },
  };
};

const handler = blend => ({ target }) => {
  const { value } = target;

  blend.update({ value });
};

document.addEventListener('DOMContentLoaded', () => {
  const blend = new Group('blend');
  blend.attach(blendObserver());

  const t = document.querySelector('#background-blend-mode-select');
  t.addEventListener('change', handler(blend), false);
}, false);
