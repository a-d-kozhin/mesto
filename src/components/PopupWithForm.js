import {Popup} from './Popup.js';

// класс попапа с формой, наследущий от класса Popup
export class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._callback = callback;
  }

  // приватный метод для получения всех инпутов попапа
  _getInputValues() {
    this._popupInputs = this._popup.querySelectorAll('.popup__input'); 
    this._formValues = {};
    this._popupInputs.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  // приватный метод для обработки сабмита
  _handleFormSubmit() {
    this._getInputValues();
    this._callback(this._getInputValues());
    }
  
  // публичный метод для установки обработчиков, расширяющий функционал метода родителя
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {evt.preventDefault(); this._handleFormSubmit()});
  }

}