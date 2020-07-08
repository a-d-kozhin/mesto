import {profileName, profileJob, nameInput, jobInput, popupWithImage, handleCardClick} from '../utils/utils.js';
import {obj, initialElements} from "../utils/data.js";
import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithForm} from '../components/PopupWithForm.js';

// создаем карточки из массива и добавляем их в грид-контейнер
initialElements.forEach((item) => {
  const newElement = new Card(item.name, item.link, '#element', handleCardClick);
  const element = newElement.createElement();
  document.querySelector('.elements').prepend(element);
  }
);

// включаем валидацию для обеих форм
const validateProfile = new FormValidator(obj, '.popup__form_type_profile');
validateProfile.enableValidation();
const validateElement = new FormValidator(obj, '.popup__form_type_element');
validateElement.enableValidation();

// включаем функционал редактирования профиля
const profileUserInfo = new UserInfo(profileName, profileJob);

// callback самбита формы профиля
const formSubmitHandlerProfile = (evt) => {
  evt.preventDefault();
  profileUserInfo.setUserInfo();
  popupProfile.close();
}

// callback самбита формы добавления новой карточки
const formSubmitHandlerElement = (evt) => {
  evt.preventDefault();
  const elementTitleInput = document.querySelector('.popup__input_type_title');
  const elementUrlInput = document.querySelector('.popup__input_type_url');
  const elementTitle = elementTitleInput.value.trim();
  const elementUrl = elementUrlInput.value.trim();
  const newElement = new Card(elementTitle, elementUrl, '#element', handleCardClick);
  const element = newElement.createElement();
  document.querySelector('.elements').prepend(element);
  popupElement.close();
  document.querySelector('.popup__form_type_element').reset();
}

export const popupProfile = new PopupWithForm('.popup-profile', formSubmitHandlerProfile);
export const popupElement = new PopupWithForm('.popup-element', formSubmitHandlerElement);

// слушатели попапа profile
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  validateProfile.resetForm();
  profileUserInfo.getUserInfo();
  popupProfile.open();
});
document.querySelector('.popup__form_type_profile').addEventListener('submit', formSubmitHandlerProfile);
document.querySelector('.popup-profile__overlay').addEventListener('click', () => popupProfile.close());

// слушатели попапа element
document.querySelector('.profile__add-button').addEventListener('click', () => {
  validateElement._toggleSubmitState();
  validateElement.resetForm();
  popupElement.open();
});
document.querySelector('.popup__form_type_element').addEventListener('submit', formSubmitHandlerElement);
document.querySelector('.popup-element__overlay').addEventListener('click', () => popupElement.close());

// слушатели попапа с картинкой
document.querySelector('.popup-image__overlay').addEventListener('click', () => popupWithImage.close());