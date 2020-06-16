const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// функция-обработчик инпута. проверяет валидность и в зависимости от ситуации вызывает соответствующие функции (показать или скрыть ошибку)
const handleInput = (e, errorClass, inputErrorClass) => {
  const input = e.target
  const inputIsValid = input.checkValidity();
  if (inputIsValid) {
    hideErrorMessage(input, errorClass, inputErrorClass);
  }
  else {
    showErrorMessage(input, errorClass, input.validationMessage, inputErrorClass);
  }
}

// функция-обработчик при ошибке валидации
const showErrorMessage = (input, errorClass, errorMessage, inputErrorClass) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  input.classList.add(inputErrorClass);
}

// функция-обработчик при исправлении ошибки валидации
const hideErrorMessage = (input, errorClass, inputErrorClass) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  input.classList.remove(inputErrorClass);
}

// функция, отключающая кнопку отправки при ошибках валидации
const toggleSubmitState = (formElement, submitButtonSelector, inactiveButtonClass) => {
  const submit = formElement.querySelector(submitButtonSelector);
  const inactive = formElement.querySelector(inactiveButtonClass);
  const formIsInvalid = !formElement.checkValidity();
  if (formIsInvalid === true) {
    submit.classList.add(inactiveButtonClass)
    submit.disabled = true;
  }
  else {
    submit.classList.remove(inactiveButtonClass)
    submit.disabled = false;
  }
}

// функция валидации формы на основании параметров в объекте
const enableValidation = (parameters) => {
  const formElements = Array.from(document.querySelectorAll(parameters.formSelector));
  formElements.forEach(formElement => {
    const inputElements = Array.from(formElement.querySelectorAll(parameters.inputSelector));

    // добавляем на каждый инпут обработчик инпута
    inputElements.forEach(element => { element.addEventListener('input', function (event) { handleInput(event, parameters.errorClass, parameters.inputErrorClass) }) })

    // добавляем на каждую форму обработчик, отключающий кнопку отправки при ошибках валидации
    formElement.addEventListener('input', function () {toggleSubmitState(formElement, parameters.submitButtonSelector, parameters.inactiveButtonClass) })

  })
}

enableValidation(obj);
