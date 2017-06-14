/**
 * 表单聚焦
 */
function focus(e) {
  e.target.closest('.inputArea').classList.add('focus');
}

/**
 * 表单失去焦点
 */
function blur(e) {
  const value = e.target.value;

  if (!value) {
    e.target.closest('.inputArea').classList.remove('focus');
  }
}

/**
 * 表单输入变动
 */
function change(e) {
  const input = e.target;

  input.closest('.inputArea').classList.remove('invalid');

  // customValidity设置后将一直保存，需手动清理，然后执行验证
  if (input.validity.customError) {
    input.setCustomValidity('');
  }

  input.checkValidity();
}

/**
 * 表单invalid处理
 */
function invalid(e) {
  e.preventDefault();

  const input = e.target;
  const inputType = input.getAttribute('type');

  // 自定义相对valueMissing更明确的提示
  if (input.validity.valueMissing) {
    if (inputType === 'email') {
      input.setCustomValidity('Email Required');
    } else if (inputType === 'password') {
      input.setCustomValidity('Password Required');
    }
  }

  const inputArea = input.closest('.inputArea');
  const helper = inputArea.querySelector('.helper');

  helper.innerHTML = input.validationMessage;
  inputArea.classList.add('invalid');
}

/**
 * 表单提交，只有完成Constraint Validation才会触发submit事件
 */
function submit(e) {
  e.preventDefault();

  const form = e.target;

  Array.from(form.querySelectorAll('.inputArea')).forEach((elem) => {
    elem.classList.remove('focus', 'invalid');
  });

  form.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#constraint-validation');
  form.addEventListener('submit', submit, false);

  Array.from(document.querySelectorAll('.input')).forEach((input) => {
    input.addEventListener('focus', focus, false);
    input.addEventListener('blur', blur, false);

    input.addEventListener('change', change, false);
    input.addEventListener('invalid', invalid, false);
  });
}, false);
