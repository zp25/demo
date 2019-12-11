import jwtDecode from 'jwt-decode';

const decode = () => {
  const text = document.querySelector('#jwt .input').value;
  const target = document.querySelector('.jwt-output');

  let result = '';

  try {
    result = jwtDecode(text);
  } catch (err) {
    result = err.message;
  }

  target.innerHTML = typeof result === 'object'
    ? JSON.stringify(result, null, 4)
    : result;
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#jwt');

  form.onsubmit = (e) => {
    e.preventDefault();
    decode();
  };
}, false);
