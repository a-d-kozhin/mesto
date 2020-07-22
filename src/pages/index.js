import './index.css';
import { profileName, profileJob, profileAvatar, nameInput, jobInput, editProfile, addElement, overlayPopupProfile, overlayPopupElement, overlayPopupWithImage, overlayPopupAvatar} from '../utils/constants.js';
import { obj, config } from "../utils/data.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';

// включаем функционал редактирования профиля
const userInfo = new UserInfo(profileName, profileJob, profileAvatar);

const cardsList = new Section({
  renderer: (item) => {
    const newElement = new Card('#element', handleCardClick, userInfo.myId);
    const element = newElement.createElement(item);
    cardsList.setItem(element);
  },
}, '.elements');

const api = new Api(config);

Promise.all([api.getInfo(), api.getInitialCards()])
  .then((result) => {
    userInfo.setUserInfo(result[0])
    profileAvatar.src = result[0].avatar
    cardsList.renderItems(result[1])
  })

// объявляем функцию клика по карточке для открытия попапа
const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

// включаем валидацию для форм
const validateProfile = new FormValidator(obj, '.popup__form_type_profile');
const validateElement = new FormValidator(obj, '.popup__form_type_element');
const validateAvatar = new FormValidator(obj, '.popup__form_type_avatar');
validateProfile.enableValidation();
validateElement.enableValidation();
validateAvatar.enableValidation();

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

// функционал сабмита формы изменения аватара
const formSubmitHandlerAvatar = (data) => {
  api.changeAvatar(data)
    .then(response => {userInfo.setUserAvatar(response)})
  popupAvatar.close();
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

// обработчик кнопки смены аватара
const changeAvatarHandler = () => {
  validateAvatar._toggleSubmitState();
  validateAvatar.resetForm();
  popupAvatar.open();
}

// создаем по экземпляру каждого попапа
const popupProfile = new PopupWithForm('.popup-profile', formSubmitHandlerProfile);
const popupElement = new PopupWithForm('.popup-element', formSubmitHandlerElement);
const popupAvatar = new PopupWithForm('.popup-avatar', formSubmitHandlerAvatar);
const popupWithImage = new PopupWithImage('.popup-image');

// добавляем попапам обработчики
popupProfile.setEventListeners();
popupElement.setEventListeners();
popupWithImage.setEventListeners();
popupAvatar.setEventListeners();

// добавляем слушатели попапа profile
editProfile.addEventListener('click', editProfileHandler);
overlayPopupProfile.addEventListener('click', () => popupProfile.close());

// добавляем слушатели попапа element
addElement.addEventListener('click', addElementHandler);
overlayPopupElement.addEventListener('click', () => popupElement.close());

// добавляем слушатель попапа с картинкой
overlayPopupWithImage.addEventListener('click', () => popupWithImage.close());

// добавляем слушатели попапа avatar
profileAvatar.addEventListener('click', changeAvatarHandler)
overlayPopupAvatar.addEventListener('click', () => popupAvatar.close());
