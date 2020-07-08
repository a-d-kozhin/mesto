export class Popup {
  constructor(popupSelector) {
  this._popupSelector = popupSelector;
  this._popup = document.querySelector(popupSelector);
  this._openedClass = 'popup_opened';
  this._handleEscClose = this._handleEscClose.bind(this);
  this.setEventListeners = this.setEventListeners.bind(this);
  this.close = this.close.bind(this);
  this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this._popup.classList.add(this._openedClass);
    document.addEventListener('keydown', this._handleEscClose);
    this.setEventListeners();
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
  
  setEventListeners() {
    this._closeButton.addEventListener('click', this.close, {once: true})
  }
}