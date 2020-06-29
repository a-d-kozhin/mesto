const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

class FormValidator {
  constructor(options, formElement) {
    this._formElement = document.querySelector(formElement);
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formSelector = options.formSelector;
  }

  _handleInput(e) {
    this._input = e.target
    this._inputIsValid = this._input.checkValidity();
    if (this._inputIsValid) {
      this._hideErrorMessage(this._input);
    }
    else {
      this._showErrorMessage(this._input, this._input.validationMessage);
    }
  }
  
  _showErrorMessage = (input, errorMessage) => {
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    input.classList.add(this._inputErrorClass);
  }

  _hideErrorMessage = (input) => {
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    input.classList.remove(this._inputErrorClass);
  }

  _toggleSubmitState = () => {
    const submit = this._formElement.querySelector(this._submitButtonSelector);
    const inactive = this._formElement.querySelector(this._inactiveButtonClass);
    const formIsInvalid = !this._formElement.checkValidity();
    if (formIsInvalid) {
      submit.classList.add(this._inactiveButtonClass)
      submit.disabled = true;
    }
    else {
      submit.classList.remove(this._inactiveButtonClass)
      submit.disabled = false;
    }
  }

  enableValidation = () => {
      this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._inputElements.forEach(element => {element.addEventListener('input', (event) => { this._handleInput(event) }) })
      this._formElement.addEventListener('input', () => { this._toggleSubmitState() })    
  }

}
const validateProfile = new FormValidator(obj, '.popup__form_type_profile');
validateProfile.enableValidation();
const validateElement = new FormValidator(obj, '.popup__form_type_element');
validateElement.enableValidation();

// // функция-обработчик инпута. проверяет валидность и в зависимости от ситуации вызывает соответствующие функции (показать или скрыть ошибку)
// const handleInput = (e, errorClass, inputErrorClass) => {
//   const input = e.target
//   const inputIsValid = input.checkValidity();
//   if (inputIsValid) {
//     hideErrorMessage(input, errorClass, inputErrorClass);
//   }
//   else {
//     showErrorMessage(input, errorClass, input.validationMessage, inputErrorClass);
//   }
// }

// // функция-обработчик при ошибке валидации
// const showErrorMessage = (input, errorClass, errorMessage, inputErrorClass) => {
//   const errorElement = document.querySelector(`#${input.id}-error`);
//   errorElement.classList.add(errorClass);
//   errorElement.textContent = errorMessage;
//   input.classList.add(inputErrorClass);
// }

// // функция-обработчик при исправлении ошибки валидации
// const hideErrorMessage = (input, errorClass, inputErrorClass) => {
//   const errorElement = document.querySelector(`#${input.id}-error`);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
//   input.classList.remove(inputErrorClass);
// }

// // функция, отключающая кнопку отправки при ошибках валидации
// const toggleSubmitState = (formElement, submitButtonSelector, inactiveButtonClass) => {
//   const submit = formElement.querySelector(submitButtonSelector);
//   const inactive = formElement.querySelector(inactiveButtonClass);
//   const formIsInvalid = !formElement.checkValidity();
//   if (formIsInvalid === true) {
//     submit.classList.add(inactiveButtonClass)
//     submit.disabled = true;
//   }
//   else {
//     submit.classList.remove(inactiveButtonClass)
//     submit.disabled = false;
//   }
// }

// // функция валидации формы на основании параметров в объекте
// const enableValidation = (parameters) => {
//   const formElements = Array.from(document.querySelectorAll(parameters.formSelector));
//   formElements.forEach(formElement => {
//     const inputElements = Array.from(formElement.querySelectorAll(parameters.inputSelector));

//     // добавляем на каждый инпут обработчик инпута
//     inputElements.forEach(element => { element.addEventListener('input', function (event) { handleInput(event, parameters.errorClass, parameters.inputErrorClass) }) })

//     // добавляем на каждую форму обработчик, отключающий кнопку отправки при ошибках валидации
//     formElement.addEventListener('input', function () {toggleSubmitState(formElement, parameters.submitButtonSelector, parameters.inactiveButtonClass) })

//   })
// }

// enableValidation(obj);