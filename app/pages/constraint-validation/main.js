class ConstraintValidation {
  constructor(input) {
    this.input = input;

    this.customValid = new Event('valid');
  }

  bind(cbinvalid, cbvalid) {
    this.input.addEventListener('change', e => { this.change(e); }, false);
    this.input.addEventListener('invalid', e => { cbinvalid(e); }, false);
    this.input.addEventListener('valid', e => { cbvalid(e); }, false);
  }

  change(e) {
    if (e.target.validity.valid) {
      e.target.dispatchEvent(this.customValid);
    } else {
      // customValidity设置后将一直保存，需手动清理，然后重新执行验证
      if (e.target.validity.customError) {
        e.target.setCustomValidity('');
      }

      e.target.checkValidity();
    }
  }
}

/**
 * 表单聚焦
 * @param {Event} e 事件对象
 */
function focus(e) {
  e.target.classList.add('focus');
}

/**
 * 表单失去焦点
 * @param {Event} e 事件对象
 */
function blur(e) {
  const value = e.target.value;

  if (!value) {
    e.target.classList.remove('focus');
  }
}

/**
 * 表单invalid处理
 * @param {Event} e 事件对象
 */
function invalid(e) {
  e.preventDefault();

  const email = document.querySelector('#email');
  const passwd = document.querySelector('#password');

  // 自定义相对valueMissing更明确的提示
  if (e.target.validity.valueMissing) {
    if (e.target === email) {
      email.setCustomValidity('Email Required');
    } else if (e.target === passwd) {
      passwd.setCustomValidity('Password Required');
    }
  }

  const helper = e.target.nextElementSibling.nextElementSibling;
  helper.innerHTML = e.target.validationMessage;

  e.target.classList.add('invalid');
}

/**
 * 表单valid处理
 * @param {Event} e 事件对象
 */
function valid(e) {
  e.target.classList.remove('invalid');
}

/**
 * 表单提交处理，只有完成Constraint Validation后才会触发submit事件
 * @param {Event} e 事件对象
 */
function submit(e) {
  e.preventDefault();

  const email = document.querySelector('#email');
  const passwd = document.querySelector('#password');

  if (email.validity.valid && passwd.validity.valid) {
    e.target.reset();
    email.classList.remove('focus');
    passwd.classList.remove('focus');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', submit, false);

  Array.from(document.querySelectorAll('.input-text')).forEach(input => {
    input.addEventListener('focus', focus, false);
    input.addEventListener('blur', blur, false);

    const cv = new ConstraintValidation(input);
    cv.bind(invalid, valid);
  });
}, false);
