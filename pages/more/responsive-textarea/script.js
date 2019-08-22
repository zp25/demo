import { escapeHTML } from 'zp-lib';

document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.textarea');
  const output = document.querySelector('.output');

  target.addEventListener('input', (e) => {
    const content = e.target.textContent;

    output.innerHTML = escapeHTML(content);
  }, false);
}, false);
