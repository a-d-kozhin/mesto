import './index.css';
import { profileName, profileJob, profileAvatar, nameInput, jobInput, editProfile, addElement, overlayPopupProfile, overlayPopupElement, overlayPopupWithImage} from '../utils/constants.js';
import { obj, initialElements, config } from "../utils/data.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';

// включаем функционал редактирования профиля
const userInfo = new UserInfo(profileName, profileJob);

const cardsList = new Section({
  renderer: (item) => {
    const newElement = new Card('#element', handleCardClick, userInfo.myId);
    const element = newElement.createElement(item);
    cardsList.setItem(element);
  },
}, '.elements');

const api = new Api(config);
api.getInitialCards()
  .then(result => cardsList.renderItems(result));
api.getInfo()
  .then(result => userInfo.setUserInfo(result))

// объявляем функцию клика по карточке для открытия попапа
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

// включаем валидацию для обеих форм
const validateProfile = new FormValidator(obj, '.popup__form_type_profile');
validateProfile.enableValidation();

const validateElement = new FormValidator(obj, '.popup__form_type_element');
validateElement.enableValidation();



// функционал сабмита формы редактирования профиля
const formSubmitHandlerProfile = (data) => {
  userInfo.setUserInfo(data);
  popupProfile.close();
  api.editInfo(userInfo.getUserInfo());
}

// функционал сабмита формы добавления новой карточки
const formSubmitHandlerElement = (data) => {
  api.sendElement(data)
    .then(result => {
      const newElement = new Card('#element', handleCardClick)
      return newElement.createElement(result)
    })
  popupElement.close();
  validateElement.resetForm();
}

// обработчик кнопки редактирования профиля
const editProfileHandler = () => {
  validateProfile.resetForm();
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.about;
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
