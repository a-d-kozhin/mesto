// класс валидации
export class FormValidator {
  constructor(options, formElement) {
    this._formElement = document.querySelector(formElement);
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formSelector = options.formSelector;
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }
  // приватный метод обработки инпута
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
  // приватный метод для показа системных ошибок
  _showErrorMessage(input, errorMessage) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    input.classList.add(this._inputErrorClass);
  }
  // приватный метод для скрытия системных ошибок
  _hideErrorMessage(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    input.classList.remove(this._inputErrorClass);
  }
  // приватный метод для включения/отключения сабмита формы
  _toggleSubmitState() {
    const submit = this._formElement.querySelector(this._submitButtonSelector);
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
  // публичный метод для очистки формы и ошибок валидации
  resetForm() {
    this._inputElements.forEach(element => this._hideErrorMessage(element));
    this._formElement.reset();
  }
  // публичный метод, включающий валидацию формы
  enableValidation() {
      this._inputElements.forEach(element => {element.addEventListener('input', (event) => { this._handleInput(event) }) })
      this._formElement.addEventListener('input', () => { this._toggleSubmitState() })    
  }
}