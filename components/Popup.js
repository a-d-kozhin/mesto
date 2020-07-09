// класс попапа

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

  // публичный метод открытия попапа и добавления обработчика
  open() {
    this._popup.classList.add(this._openedClass);
    document.addEventListener('keydown', this._handleEscClose);
    this.setEventListeners();
  }

  // публичный метод закрытия попапа и удаления обработчика
  close() {
    this._popup.classList.remove(this._openedClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // приватный метод, реализующий функционал закрытия попапа по нажатию Escape
  _handleEscClose(event) {
    this._key = event.key;
    this._popupIsOpened = document.querySelector('.popup_opened');
    if (this._key === 'Escape' && this._popupIsOpened) {
      this.close();
    }
  }

  // публичный метод для установки обработчика на кнопку close каждого попапа
  setEventListeners() {
    this._closeButton.addEventListener('click', this.close, {once: true})
  }
}