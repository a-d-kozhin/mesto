const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileForm = document.querySelector('.popup__profile-form');
const elementForm = document.querySelector('.popup__element-form');
const popupProfileCloseButton = document.querySelector('.popup-profile__close-button');
const popupElementCloseButton = document.querySelector('.popup-element__close-button');
const popupWithImageCloseButton = document.querySelector('.popup-image__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const elementTitleInput = document.querySelector('.popup__input_type_element-title');
const elementUrlInput = document.querySelector('.popup__input_type_element-url');
const popupProfile = document.querySelector('.popup-profile');
const popupElement = document.querySelector('.popup-element');
const elements = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element");
const popupWithImage = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup-image__image');
const popupCaption = document.querySelector('.popup-image__caption');
const profileOverlay = document.querySelector('.popup-profile__overlay');
const elementOverlay = document.querySelector('.popup-element__overlay');
const imageOverlay = document.querySelector('.popup-image__overlay');
const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// функция создания карточек
const createElement = (elementName, elementLink) => {
  const element = elementTemplate.content.cloneNode(true);
  element.querySelector('.element__image').src = elementLink;
  element.querySelector('.element__title').textContent = elementName;
  element.querySelector('.element__image').alt = `${elementName}. Фото`;
  return element;
}

const setEventListeners = (element) => {
  const like = element.querySelector('.element__like-button')
  const remove = element.querySelector('.element__remove-button')
  const image = element.querySelector('.element__image')
  remove.addEventListener('click', function () {(removeElement(remove))})
  like.addEventListener('click', function () {(toggleLike(like))})
  image.addEventListener('click', function () {(viewImage(image))})
}

// функция добавления карточки в начало контейнера
const renderElement = (element, container) => {
  setEventListeners(element);
  container.prepend(element); 
}

// создаем карточки из массива и добавляем их в грид-контейнер
initialElements.forEach((item) => renderElement(createElement(item.name, item.link), elements));

// функции открытия-закрытия попапов
const toggleClassOpened = (popup) => {popup.classList.toggle('popup_opened')}

const viewPopupProfile = () => {
  toggleClassOpened(popupProfile);
  if (!popupProfile.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

// функция, реализующая лайки
const toggleLike = (likeButton) => {likeButton.classList.toggle('element__like-button_active');}

// функция для удаления карточек
const removeElement = (removeButton) => {removeButton.parentNode.remove()}

// функция, открывающая попап с изображением и получающая содержимое для него
const viewImage = (image) => {
    toggleClassOpened(popupWithImage)
    if (!popupImage.classList.contains('popup_opened')) {
      popupImage.src = image.src;
      popupCaption.textContent = image.alt.slice(0,-6);
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
  renderElement(createElement(elementTitle, elementUrl), elements)
  toggleClassOpened(popupElement)
}

// функция-обработчик нажатия на escape
const escapeKeyHandler = (event) => {
  const key = event.key;
  if (key === 'Escape') {
    if (popupWithImage.classList.contains('popup_opened')) {
      toggleClassOpened(popupWithImage)}
    if (popupProfile.classList.contains('popup_opened')) {
      toggleClassOpened(popupProfile)} 
    if (popupElement.classList.contains('popup_opened')) {
      toggleClassOpened(popupElement)} 
    }
}

// слушатели попапа profile
profileEditButton.addEventListener('click', viewPopupProfile);
popupProfileCloseButton.addEventListener('click', viewPopupProfile);
profileForm.addEventListener('submit', formSubmitHandlerProfile);
profileOverlay.addEventListener('click', viewPopupProfile);

// слушатели попапа element
profileAddButton.addEventListener('click', function (){toggleClassOpened(popupElement)});
popupElementCloseButton.addEventListener('click', function (){toggleClassOpened(popupElement)});
elementForm.addEventListener('submit', formSubmitHandlerElement);
elementOverlay.addEventListener('click', function (){toggleClassOpened(popupElement)});

// слушатели попапа с картинкой
popupWithImageCloseButton.addEventListener('click', function (){toggleClassOpened(popupWithImage)});
imageOverlay.addEventListener('click', function (){toggleClassOpened(popupWithImage)});

// глобальный слушатель
document.addEventListener('keydown', function() {escapeKeyHandler(event)})
