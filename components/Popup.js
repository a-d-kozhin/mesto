export class Popup {
  constructor(popupSelector) {
  this._popupSelector = popupSelector;
  this._popup = document.querySelector(popupSelector);
  this._openedClass = 'popup_opened';
  this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(this._openedClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._openedClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    this._key = event.key;
    this._popupIsOpened = document.querySelector('.popup_opened');
    if (this._key === 'Escape' && this._popupIsOpened) {
      this.close();
    }
  }
}