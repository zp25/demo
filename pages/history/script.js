/**
 * 点击处理
 */
function handleHistory(e) {
  const trigger = e.target.dataset.trigger;

  if (trigger === 'push') {
    history.pushState({ page: 2 }, '', '/history.html?pagetwo');
  } else if (trigger === 'replace') {
    history.replaceState({ page: 3 }, '', '/history.html?pagethree');
  } else if (trigger === 'back') {
    history.back();
  } else if (trigger === 'forward') {
    history.forward();
  } else if (trigger === 'go') {
    history.go(-2);
  }

  e.preventDefault();
  e.stopPropagation();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#history').addEventListener('click', handleHistory, false);

  window.onpopstate = (e) => {
    const li = document.createElement('li');
    const info = `location: ${document.location}; state: ${JSON.stringify(e.state)}`;
    const text = document.createTextNode(info);

    li.appendChild(text);
    document.querySelector('.detail').appendChild(li);
  };
});

window.onload = () => {
  history.replaceState({ page: 1 }, '', '/history.html?pageone');
};
