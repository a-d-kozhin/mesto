import {Card} from "../components/Card.js"

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const popupProfile = document.querySelector('.popup-profile');
export const popupElement = document.querySelector('.popup-element');
export const popupWithImage = document.querySelector('.popup-image');

// функция-обработчик нажатия на escape
export const escapeKeyHandler = (event) => {
  const key = event.key;
  const popupOpened = document.querySelector('.popup_opened');
  if (key === 'Escape' && popupOpened) {
    toggleClassOpened(popupOpened);
  }
}

// функции открытия-закрытия попапов
export const toggleClassOpened = (popup) => {
  popup.classList.toggle('popup_opened');
  const popupOpened = document.querySelector('.popup_opened');
  // установка и удаление глобального слушателя для закрытия попапа по нажатию escape
  if (popupOpened) {
    document.addEventListener('keydown', function callback() {escapeKeyHandler(event)});
  }
  if (!popupOpened) {
    document.removeEventListener('keydown', function callback() {escapeKeyHandler(event)});
  }
};

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