import './index.css';
import { profileName, profileJob, nameInput, jobInput, editProfile, addElement, overlayPopupProfile, overlayPopupElement, overlayPopupWithImage} from '../utils/constants.js';
import { obj, initialElements } from "../utils/data.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';

// объявляем функцию клика по карточке для открытия попапа
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

// создаем карточки из массива и добавляем их в грид-контейнер
const cardsList = new Section({
  data: initialElements,
  renderer: (item) => {
    const newElement = new Card(item.name, item.link, '#element', handleCardClick);
    const element = newElement.createElement();
    cardsList.setItem(element);
  },
}, '.elements');
cardsList.renderItems();

// включаем валидацию для обеих форм
const validateProfile = new FormValidator(obj, '.popup__form_type_profile');
validateProfile.enableValidation();

const validateElement = new FormValidator(obj, '.popup__form_type_element');
validateElement.enableValidation();

// включаем функционал редактирования профиля
const userInfo = new UserInfo(profileName, profileJob);

// функционал сабмита формы редактирования профиля
const formSubmitHandlerProfile = (data) => {
  userInfo.setUserInfo(data);
  popupProfile.close();
}

// функционал сабмита формы добавления новой карточки
const formSubmitHandlerElement = (data) => {
  const newElement = new Card(data.title, data.url, '#element', handleCardClick);
  const element = newElement.createElement();
  cardsList.setItem(element);
  popupElement.close();
  validateElement.resetForm();
}

// обработчик кнопки редактирования профиля
const editProfileHandler = () => {
  validateProfile.resetForm();
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
  popupProfile.open();
}

// обработчик кнопки добавления новой карточки
const addElementHandler = () => {
  validateElement._toggleSubmitState();
  validateElement.resetForm();
  popupElement.open();
}

// создаем по экземпляру каждого попапа
const popupProfile = new PopupWithForm('.popup-profile', formSubmitHandlerProfile);
const popupElement = new PopupWithForm('.popup-element', formSubmitHandlerElement);
const popupWithImage = new PopupWithImage('.popup-image');

// добавляем попапам обработчики
popupProfile.setEventListeners();
popupElement.setEventListeners();
popupWithImage.setEventListeners();

// добавляем слушатели попапа profile
editProfile.addEventListener('click', editProfileHandler);
overlayPopupProfile.addEventListener('click', () => popupProfile.close());

// добавляем слушатели попапа element
addElement.addEventListener('click', addElementHandler);
overlayPopupElement.addEventListener('click', () => popupElement.close());

// добавляем слушатель попапа с картинкой
overlayPopupWithImage.addEventListener('click', () => popupWithImage.close());