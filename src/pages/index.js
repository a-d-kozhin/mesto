import './index.css';
import { profileName, profileJob, profileAvatar, profileAvatarButton, nameInput, jobInput, editProfile, addElement, overlayPopupProfile, overlayPopupElement, overlayPopupWithImage, overlayPopupAvatar, overlayPopupConfirm} from '../utils/constants.js';
import { obj, config } from "../utils/data.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupConfirm } from '../components/PopupConfirm.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';

// включаем функционал редактирования профиля
const userInfo = new UserInfo(profileName, profileJob, profileAvatar);

// функция рендера карточки
function renderElement(item) {
  const newElement = new Card('#element', handleCardClick, handleRemoveClick, userInfo.myId);
  const element = newElement.createElement(item);
  cardsList.setItem(element);
} 

const cardsList = new Section(
  {
    renderer: (item) => {renderElement(item)}},
    '.elements'
);

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

const handleRemoveClick = (cardId, card) => {
  popupConfirm.open();
  popupConfirm.setHandler(
    function() {
      api.removeCard(cardId)
        .then(response => {
          card.remove();
          card = null;
        })
        .then(response => popupConfirm.close())
    }
  );
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
const formSubmitHandlerElement = (item) => {
  api.sendElement(item)
    .then(item => {renderElement(item)})
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
const popupConfirm = new PopupConfirm('.popup-confirm');

// добавляем попапам обработчики
popupProfile.setEventListeners();
popupElement.setEventListeners();
popupWithImage.setEventListeners();
popupAvatar.setEventListeners();
popupConfirm.setEventListeners();

// добавляем слушатели попапа profile
editProfile.addEventListener('click', editProfileHandler);
overlayPopupProfile.addEventListener('click', () => popupProfile.close());

// добавляем слушатели попапа element
addElement.addEventListener('click', addElementHandler);
overlayPopupElement.addEventListener('click', () => popupElement.close());

// добавляем слушатель попапа с картинкой
overlayPopupWithImage.addEventListener('click', () => popupWithImage.close());

// добавляем слушатели попапа avatar
profileAvatarButton.addEventListener('click', changeAvatarHandler)
overlayPopupAvatar.addEventListener('click', () => popupAvatar.close());

// добавляем слушатель попапа с картинкой
overlayPopupConfirm.addEventListener('click', () => popupConfirm.close());