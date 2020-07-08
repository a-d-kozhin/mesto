import {Popup} from "../components/Popup.js";
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const popupWithImage = new PopupWithImage('.popup-image');

export const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}