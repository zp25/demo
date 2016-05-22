/**
 * 处理点击
 * @param {Event} e 事件对象
 */
function handleHistory(e) {
  const t = e.target.dataset.trigger;

  if (t === 'push') {
    history.pushState({ page: 2 }, '', '/history-api.html?pagetwo');
  } else if (t === 'replace') {
    history.replaceState({ page: 3 }, '', '/history-api.html?pagethree');
  } else if (t === 'back') {
    history.back();
  } else if (t === 'forward') {
    history.forward();
  } else if (t === 'go') {
    history.go(-2);
  }

  e.preventDefault();
  e.stopPropagation();
}

/** DOMContentLoaded Event */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.historyapi').addEventListener('click', handleHistory);

  window.onpopstate = e => {
    const p = document.createElement('p');
    const details = document.querySelector('#details');
    const text = `location: ${document.location}; state: ${JSON.stringify(e.state)}`;
    const t = document.createTextNode(text);

    p.appendChild(t);
    details.appendChild(p);
  };
});

/* window onload event */
window.onload = () => {
  history.replaceState({ page: 1 }, '', '/history-api.html?pageone');
};
