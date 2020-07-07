import {profileName, profileJob, nameInput, jobInput, popupWithImage, handleCardClick, popupElement} from '../utils/utils.js';
import {obj, initialElements} from "../utils/data.js";
import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";

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

// функция открытия-закрытия попапа profile
export const viewPopupProfile = () => {
  toggleClassOpened(popupProfile);
  if (popupProfile.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

// функция-обработчик формы заполнения профиля
export const formSubmitHandlerProfile = (evt) => {
  evt.preventDefault();
  const nameInputValue = nameInput.value.trim();
  const jobInputValue = jobInput.value.trim();
  profileName.textContent = nameInputValue;
  profileJob.textContent = jobInputValue;
  toggleClassOpened(popupProfile)
}

// функция-обработчик формы создания новой карточки
export const formSubmitHandlerElement = (evt) => {
  evt.preventDefault();
  const elementTitleInput = document.querySelector('.popup__input_type_title');
  const elementUrlInput = document.querySelector('.popup__input_type_url');
  const elementTitle = elementTitleInput.value.trim();
  const elementUrl = elementUrlInput.value.trim();
  const newElement = new Card(elementTitle, elementUrl, '#element');
  const element = newElement.createElement();
  document.querySelector('.elements').prepend(element);
  toggleClassOpened(popupElement)
  document.querySelector('.popup__form_type_element').reset();
}

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
  popupElement.open();
});
document.querySelector('.popup-element__close-button').addEventListener('click', () => {popupElement.close();});
document.querySelector('.popup__form_type_element').addEventListener('submit', formSubmitHandlerElement);
document.querySelector('.popup-element__overlay').addEventListener('click', () => {popupElement.close();});

// слушатели попапа с картинкой
document.querySelector('.popup-image__close-button').addEventListener('click', () => {toggleClassOpened(popupWithImage) });
document.querySelector('.popup-image__overlay').addEventListener('click', () => { toggleClassOpened(popupWithImage) });