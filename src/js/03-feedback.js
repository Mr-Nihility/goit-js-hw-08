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
input.addEventListener('input', throttle(handlerInput, 500));
textArea.addEventListener('input', throttle(handlerTextArea, 500));

const dataUser = {};
// let dataToSend= [];
pushToinputs();
function onSubmit(event) {
  event.preventDefault();
  const { email, message } = event.target.elements;
  // dataToSend.push({ email: email.value, message: message.value }) ;
  // console.log(dataToSend);
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(dataUser);
}

function handlerInput(evt) {
  dataUser[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataUser));

  if (input.value !== '' && textArea.value !== '') {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', 'true');
  }
}
function handlerTextArea(evt) {
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
  // console.log(savedMsg);
  // console.log(currentDatsUser);
  if (currentDatsUser) {
    input.value = currentDatsUser.email;
    textArea.value = currentDatsUser.message;
  }
}
