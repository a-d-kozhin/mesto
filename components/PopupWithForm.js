import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._submit = this._popup.querySelector('.popup__submit-button');
    this._callback = callback;
  }

  _getInputValues() {
    this._popupInputs = this._popup.querySelectorAll('.popup__input');
    return this._popupInputs;
  }

  setEventListeners(){
    super.setEventListeners();
    this._submit.addEventListener('click', this._callback, {once: true});
  }
}