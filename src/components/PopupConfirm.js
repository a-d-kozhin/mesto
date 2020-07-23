import {Popup} from './Popup.js';

// класс попапа с формой, наследущий от класса Popup
export class PopupConfirm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup-confirm__button');
    this._callback = callback;
  }

  // приватный метод для обработки сабмита
  _handleFormSubmit() {
    // this._callback();
    }
  
  // публичный метод для установки обработчиков, расширяющий функционал метода родителя
  setEventListeners(){
    super.setEventListeners();
    this._button.addEventListener('click', () => {this._handleFormSubmit()});
  }

}