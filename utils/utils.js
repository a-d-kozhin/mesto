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

// функция открытия-закрытия попапов
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