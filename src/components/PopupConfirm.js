import {Popup} from './Popup.js';

// класс попапа с формой, наследущий от класса Popup
export class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup-confirm__button');
  }

  // приватный метод для обработки сабмита
  setHandler(handler) {
    this._submitHandler = handler;
    }
  
  // публичный метод для установки обработчиков, расширяющий функционал метода родителя
  setEventListeners(){
    super.setEventListeners();
    this._button.addEventListener('click', () => {this._submitHandler()});
  }

}