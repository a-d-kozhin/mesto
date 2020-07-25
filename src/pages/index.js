import './index.css';
import { profileName, profileJob, profileAvatar, profileAvatarButton, nameInput, jobInput, editProfile, addElement, elementSubmitButton, profileSubmitButton, avatarSubmitButton } from '../utils/constants.js';
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

const api = new Api(config);

Promise.all([api.getInfo(), api.getInitialCards()])
  .then((result) => {

    // функция-обработчик клика по картинке
    const handleCardClick = (name, link) => {
      popupWithImage.open(name, link);
    }

    // функция-обработчик клика по корзине
    const handleRemoveClick = (cardId, card) => {
      popupConfirm.open();
      popupConfirm.setHandler(
        function () {
          api.removeCard(cardId)
            .then(() => {
              card.remove();
              card = null;
            })
            .then(() => popupConfirm.close())
        }
      )
    }

    // функция-обработчик лайка
    const handleLikeClick = (like, likes, cardId) => {
      if (!like.classList.contains('element__like-button_active')) {
        return api.likeCard(cardId)
          .then(() => { likes.textContent++ })
      }
      else {
        return api.dislikeCard(cardId)
          .then(() => { likes.textContent-- })
      }
    }

    // функция рендера карточки со всем вышеупомянутым функционалом
    const renderElement = (item) => {
      const newElement = new Card('#element', handleCardClick, handleRemoveClick, handleLikeClick, userInfo.myId);
      const element = newElement.createElement(item);
      cardsList.setItem(element);
    }

    // создаем экземпляр Section, с указанием контейнера, в который будут добавляться элементы
    const cardsList = new Section({
      renderer: (item) => { renderElement(item) }
    },
      '.elements');

    // обновляем инфу в профиле в соответствии с полученными данными
    userInfo.setUserInfo(result[0])
    profileAvatar.src = result[0].avatar

    // отрисовываем карточки с сервера
    cardsList.renderItems(result[1])

    // функционал сабмита новой карточки
    const formSubmitHandlerElement = (item) => {
      elementSubmitButton.textContent = 'Сохранение...';
      return api.sendElement(item)
        .then(result => { renderElement(result) })
        .then(() => popupElement.close())
        .then(() => {
          validateElement.resetForm();
          elementSubmitButton.textContent = 'Сохранить'
        }
        )
    }

    // создаем экземпляр попапа element и вешаем обработчики
    const popupElement = new PopupWithForm('.popup-element', formSubmitHandlerElement)
    popupElement.setEventListeners();

    // обработчик кнопки добавления новой карточки
    addElement.addEventListener('click', () => {
      validateElement._toggleSubmitState();
      validateElement.resetForm();
      popupElement.open();
    })
  })

// включаем валидацию для форм
const validateProfile = new FormValidator(obj, '.popup__form_type_profile');
const validateElement = new FormValidator(obj, '.popup__form_type_element');
const validateAvatar = new FormValidator(obj, '.popup__form_type_avatar');
validateProfile.enableValidation();
validateElement.enableValidation();
validateAvatar.enableValidation();

// функционал сабмита формы редактирования профиля
const formSubmitHandlerProfile = (data) => {
  profileSubmitButton.textContent = 'Сохранение...';
  userInfo.setUserInfo(data);
  popupProfile.close();
  api.editInfo(userInfo.getUserInfo());
}

// функционал сабмита формы изменения аватара
const formSubmitHandlerAvatar = (data) => {
  avatarSubmitButton.textContent = 'Сохранение...';
  api.changeAvatar(data)
    .then(response => {
      userInfo.setUserAvatar(response)
    })
  popupAvatar.close()
}

// обработчик кнопки редактирования профиля
const editProfileHandler = () => {
  profileSubmitButton.textContent = 'Сохранить';
  validateProfile.resetForm();
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.about;
  popupProfile.open();
}

// обработчик кнопки смены аватара
const changeAvatarHandler = () => {
  avatarSubmitButton.textContent = 'Сохранить';
  validateAvatar._toggleSubmitState();
  validateAvatar.resetForm();
  popupAvatar.open();
}

// создаем по экземпляру попапов
const popupProfile = new PopupWithForm('.popup-profile', formSubmitHandlerProfile);
const popupAvatar = new PopupWithForm('.popup-avatar', formSubmitHandlerAvatar);
const popupWithImage = new PopupWithImage('.popup-image');
const popupConfirm = new PopupConfirm('.popup-confirm');

// добавляем попапам обработчики
popupProfile.setEventListeners();
popupWithImage.setEventListeners();
popupAvatar.setEventListeners();
popupConfirm.setEventListeners();

// добавляем слушатель кнопке редактирования профиля
editProfile.addEventListener('click', editProfileHandler);

// добавляем слушатель кнопке смены аватара
profileAvatarButton.addEventListener('click', changeAvatarHandler);
