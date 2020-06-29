const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileForm = document.querySelector('.popup__form_type_profile');
const elementForm = document.querySelector('.popup__form_type_element ');
const popupProfileCloseButton = document.querySelector('.popup-profile__close-button');
const popupElementCloseButton = document.querySelector('.popup-element__close-button');
const popupWithImageCloseButton = document.querySelector('.popup-image__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const elementTitleInput = document.querySelector('.popup__input_type_title');
const elementUrlInput = document.querySelector('.popup__input_type_url');
const popupProfile = document.querySelector('.popup-profile');
const popupElement = document.querySelector('.popup-element');
const elements = document.querySelector('.elements');
const popupWithImage = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup-image__image');
const popupCaption = document.querySelector('.popup-image__caption');
const profileOverlay = document.querySelector('.popup-profile__overlay');
const elementOverlay = document.querySelector('.popup-element__overlay');
const imageOverlay = document.querySelector('.popup-image__overlay');

// функции открытия-закрытия попапов
const toggleClassOpened = (popup) => { popup.classList.toggle('popup_opened') }

const viewPopupProfile = () => {
  toggleClassOpened(popupProfile);
  if (popupProfile.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

// функция-обработчик формы заполнения профиля
const formSubmitHandlerProfile = (evt) => {
  evt.preventDefault();
  const nameInputValue = nameInput.value.trim();
  const jobInputValue = jobInput.value.trim();
  profileName.textContent = nameInputValue;
  profileJob.textContent = jobInputValue;
  toggleClassOpened(popupProfile)
}

// функция-обработчик формы создания карточки
const formSubmitHandlerElement = (evt) => {
  evt.preventDefault();
  const elementTitle = elementTitleInput.value.trim();
  const elementUrl = elementUrlInput.value.trim();
  const newElement = new Element(elementTitle, elementUrl, '#element');
  const element = newElement.createElement();
  elements.prepend(element);
  toggleClassOpened(popupElement)
  elementForm.reset()
}

// функция-обработчик нажатия на escape
const escapeKeyHandler = (event) => {
  const key = event.key;
  if (key === 'Escape') {
    if (popupWithImage.classList.contains('popup_opened')) {
      toggleClassOpened(popupWithImage)
    }
    if (popupProfile.classList.contains('popup_opened')) {
      toggleClassOpened(popupProfile)
    }
    if (popupElement.classList.contains('popup_opened')) {
      elementForm.reset();
      toggleClassOpened(popupElement)
    }
  }
}

// слушатели попапа profile
profileEditButton.addEventListener('click', viewPopupProfile);
popupProfileCloseButton.addEventListener('click', viewPopupProfile);
profileForm.addEventListener('submit', formSubmitHandlerProfile);
profileOverlay.addEventListener('click', viewPopupProfile);

// слушатели попапа element
profileAddButton.addEventListener('click', () => {
  toggleClassOpened(popupElement)
  toggleSubmitState(elementForm, obj.submitButtonSelector, obj.inactiveButtonClass)
});
popupElementCloseButton.addEventListener('click', () => { toggleClassOpened(popupElement) });
elementForm.addEventListener('submit', formSubmitHandlerElement);
elementOverlay.addEventListener('click', () => {
  elementForm.reset();
  toggleClassOpened(popupElement)
});

// слушатели попапа с картинкой
popupWithImageCloseButton.addEventListener('click', () => {toggleClassOpened(popupWithImage) });
imageOverlay.addEventListener('click', () => { toggleClassOpened(popupWithImage) });

// глобальный слушатель
document.addEventListener('keydown', (event) => {escapeKeyHandler(event) });