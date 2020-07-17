import {Popup} from './Popup.js';

// класс попапа с изображением, наследущий от класса Popup
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageCaption = document.querySelector('.popup-image__caption');
    this._imageOfPopup = document.querySelector('.popup-image__image');
  }

  // публичный метод open, расширяющий функционал метода родителя
  open(image) {
    this._imageOfPopup.src = image.src;
    this._imageCaption.textContent = image.alt.slice(0, -6);
    super.open();
  }
}
