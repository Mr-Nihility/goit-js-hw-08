import throttle from 'lodash.throttle';

//======================================\\
const STORAGE_KEY = 'feedback-form-state';

//refs
const form = document.querySelector('.feedback-form');
const input = document.querySelector('[name="email"]');
const textArea = document.querySelector('[name="message"]');
const btn = document.querySelector('[type="submit"]');

//disable

//liseners
form.addEventListener('submit', onSubmit);
form.addEventListener('input', throttle(onInputForm, 500));

if (input.value !== '' && textArea.value !== '') {
  btn.removeAttribute('disabled');
} else {
  btn.setAttribute('disabled', 'true');
}
pushToinputs();
const dataUser = { [input.name]: input.value, [textArea.name]: textArea.value };
localStorage.setItem(STORAGE_KEY, JSON.stringify(dataUser));

function onSubmit(event) {
  event.preventDefault();
  console.log(dataUser);
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInputForm(evt) {
  dataUser[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataUser));

  if (input.value !== '' && textArea.value !== '') {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', 'true');
  }
}

function pushToinputs() {
  const savedMsg = localStorage.getItem(STORAGE_KEY);
  const currentDatsUser = JSON.parse(savedMsg);
  if (!currentDatsUser) {
    return;
  }
  if (currentDatsUser.email) {
    input.value = currentDatsUser.email;
  }
  if (currentDatsUser.message) {
    textArea.value = currentDatsUser.message;
  }
}
