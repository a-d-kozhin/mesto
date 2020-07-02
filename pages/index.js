import {profileName, profileJob, nameInput, jobInput, popupProfile, popupElement, popupWithImage, toggleClassOpened, viewPopupProfile, formSubmitHandlerProfile, formSubmitHandlerElement} from '../utils/utils.js';
import {obj, initialElements} from "../utils/data.js";
import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";

// создаем карточки из массива и добавляем их в грид-контейнер
initialElements.forEach((item) => {
  const newElement = new Card(item.name, item.link, '#element');
  const element = newElement.createElement();
  document.querySelector('.elements').prepend(element);
  }
);

// включаем валидацию для обеих форм
const validateProfile = new FormValidator(obj, '.popup__form_type_profile');
validateProfile.enableValidation();
const validateElement = new FormValidator(obj, '.popup__form_type_element');
validateElement.enableValidation();

// слушатели попапа profile
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  validateProfile.resetForm();
  viewPopupProfile()});
document.querySelector('.popup-profile__close-button').addEventListener('click', viewPopupProfile);
document.querySelector('.popup__form_type_profile').addEventListener('submit', formSubmitHandlerProfile);
document.querySelector('.popup-profile__overlay').addEventListener('click', viewPopupProfile);

// слушатели попапа element
document.querySelector('.profile__add-button').addEventListener('click', () => {
  validateElement._toggleSubmitState();
  validateElement.resetForm();
  toggleClassOpened(popupElement);
});
document.querySelector('.popup-element__close-button').addEventListener('click', () => { toggleClassOpened(popupElement) });
document.querySelector('.popup__form_type_element').addEventListener('submit', formSubmitHandlerElement);
document.querySelector('.popup-element__overlay').addEventListener('click', () => { toggleClassOpened(popupElement) });

// слушатели попапа с картинкой
document.querySelector('.popup-image__close-button').addEventListener('click', () => {toggleClassOpened(popupWithImage) });
document.querySelector('.popup-image__overlay').addEventListener('click', () => { toggleClassOpened(popupWithImage) });