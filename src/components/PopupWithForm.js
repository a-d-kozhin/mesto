import {Popup} from './Popup.js';

// класс попапа с формой, наследущий от класса Popup
export class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._submit = this._popup.querySelector('.popup__submit-button');
    this._callback = callback;
  }

  // приватный метод для получения всех инпутов попапа
  _getInputValues() {
    this._popupInputs = this._popup.querySelectorAll('.popup__input');
    return this._popupInputs;
  }

  // публичный метод для установки обработчиков, расширяющий функционал метода родителя
  setEventListeners(){
    super.setEventListeners();
    this._submit.addEventListener('click', this._callback, {once: true});
  }
}