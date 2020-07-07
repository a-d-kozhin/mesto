import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(image) {
    super.open();
    document.querySelector('.popup-image__image').src = image.src;
    document.querySelector('.popup-image__caption').textContent = image.alt.slice(0, -6);
  }
}
