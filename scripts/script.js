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
function createElement(elementName, elementLink) {
  const element = elementTemplate.content.cloneNode(true);
  element.querySelector('.element__image').src = elementLink;
  element.querySelector('.element__title').textContent = elementName;
  element.querySelector('.element__image').alt = `${elementName}. Фото`;
  const elementContainer = element.querySelector('.element')
  elementContainer.addEventListener('click', removeElement)
  elementContainer.addEventListener('click', toggleLike)
  elementContainer.addEventListener('click', getImage)
  return element;
}

// функция добавления карточки в начало контейнера
function renderElement(element, container) {
  container.prepend(element); 
}

// создаем карточки из массива и добавляем их в грид-контейнер
initialElements.forEach((item) => renderElement(createElement(item.name, item.link), elements));

// функции открытия-закрытия попапов
const toggleClassOpened = (popup) => {popup.classList.toggle('popup_opened');}

function viewPopupProfile() {
  toggleClassOpened(popupProfile);
  if (popupProfile.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

// функция, реализующая лайки
function toggleLike(evt) {
  if (evt.target.classList.contains('element__like-button')) {
    const likeButtonOfElement = evt.target.closest('.element__like-button');
    likeButtonOfElement.classList.toggle('element__like-button_active');
  }
}

// функция для удаления карточек
function removeElement(evt) {
  if (evt.target.classList.contains('element__remove-button')) {
    const elementRemoveButton = evt.target.closest('.element__remove-button');
    elementRemoveButton.parentNode.remove()
  }
}

// функция, открывающая попап с изображением и получающая содержимое для него
function getImage(evt) {
  if (evt.target.classList.contains('element__image')) {
    toggleClassOpened(popupWithImage)
    popupImage.src = evt.target.src;
    popupCaption.textContent = evt.target.alt.slice(0,-6);
  }
}

// функция-обработчик формы заполнения профиля
function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value.trim();
  const jobInputValue = jobInput.value.trim();
  profileName.textContent = nameInputValue;
  profileJob.textContent = jobInputValue;
  toggleClassOpened(popupProfile)
}

// функция-обработчик формы создания карточки
function formSubmitHandlerElement(evt) {
  evt.preventDefault();
  const elementTitle = elementTitleInput.value.trim();
  const elementUrl = elementUrlInput.value.trim();
  renderElement(createElement(elementTitle, elementUrl), elements)
  toggleClassOpened(popupElement)
}

// слушатели попапа profile
profileEditButton.addEventListener('click', viewPopupProfile);
popupProfileCloseButton.addEventListener('click', viewPopupProfile);
profileForm.addEventListener('submit', formSubmitHandlerProfile);

// слушатели попапа element
profileAddButton.addEventListener('click', function (){toggleClassOpened(popupElement)});
popupElementCloseButton.addEventListener('click', function (){toggleClassOpened(popupElement)});
elementForm.addEventListener('submit', formSubmitHandlerElement);

// слушатели попапа с картинкой
popupWithImageCloseButton.addEventListener('click', function (){toggleClassOpened(popupWithImage)});