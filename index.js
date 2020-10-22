const form = document.querySelector('[name="verify"]');
const inputs = Array.from(form.querySelectorAll('.inputs input'));

function handleInput(e) {
  // check for data that was inputtted and if there is a next input, focus it
  const input = e.target;
  if (input.nextElementSibling && input.value) {
    input.nextElementSibling.focus();
  }
}

function handlePaste(e) {
  const paste = e.clipboardData.getData('text');
  // loop over each input, and populate with the index of that string
  inputs.forEach((input, i) => {
    input.value = paste[i] || '';
  });

  if (paste.length >= inputs.length) form.submit();
}

inputs[0].addEventListener('paste', handlePaste);
form.addEventListener('input', handleInput);


// 1. select the text when the next input is focued
function handleFocus(e) {
  const input = e.target;
  if (input.value) e.target.select();
}

inputs.map((input) => input.addEventListener('focus', handleFocus));

// 2. Auto submit the form if all fields are filled after a paste
inputs[inputs.length - 1].addEventListener('input', () => {
  !inputs.some((input) => input.value === '') && form.submit() && console.log('Form submitted! 🚀');
});

// 3. support for backspacing from 1 input to another
function handleBackspace(e) {
  const input = e.target;

  // Backspace key code is 8
  if (e.keyCode === 8 && input.previousElementSibling) {
    input.previousElementSibling.focus();
  }
}

inputs.map((input) => input.addEventListener('keydown', handleBackspace));
