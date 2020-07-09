import {Popup} from './Popup.js';

// класс попапа с изображением, наследущий от класса Popup
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // публичный метод open, расширяющий функционал метода родителя
  open(image) {
    super.open();
    document.querySelector('.popup-image__image').src = image.src;
    document.querySelector('.popup-image__caption').textContent = image.alt.slice(0, -6);
  }
}
