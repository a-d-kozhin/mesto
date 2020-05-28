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


function openClosePopup(popup) {
  return function() { 
    popup.classList.toggle('popup_opened');
      if (popup === popupProfile && popup.classList.contains('popup_opened')) {
      popup.classList.toggle('open-smoothly');
      nameInput.value = profileName.textContent;
      jobInput.value = profileJob.textContent;
    }
    if (popup === popupElement) {
      popup.classList.toggle('open-smoothly')};
  }
}

function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  let nameInputValue = nameInput.value.trim();
	let jobInputValue = jobInput.value.trim();
  profileName.textContent = nameInputValue;
	profileJob.textContent = jobInputValue;
  popupProfile.classList.toggle('popup_opened');
}

function formSubmitHandlerElement (evt) {
  evt.preventDefault();
  let elementTitleInputValue = elementTitleInput.value.trim();
  let elementUrlInputValue = elementUrlInput.value.trim();
  const userElement = elementTemplate.cloneNode(true);
  userElement.querySelector('.element__image').src = elementUrlInputValue;
  userElement.querySelector('.element__title').textContent = elementTitleInputValue;
  userElement.querySelector('.element__image').alt = elementTitleInputValue;
  const userElementRemoveButton = userElement.querySelector('.element__remove-button');
  const userElementLike = userElement.querySelector('.element__like-button')
  const userElementImage = userElement.querySelector('.element__image')
  userElementLike.addEventListener('click', toggleLike);
  userElementRemoveButton.addEventListener('click', removeElement);
  popupElement.classList.toggle('popup_opened');
  userElementImage.addEventListener('click', getImage);
  elements.prepend(userElement);
}

profileEditButton.addEventListener('click', openClosePopup(popupProfile));
popupProfileCloseButton.addEventListener('click', openClosePopup(popupProfile));
profileForm.addEventListener('submit', formSubmitHandlerProfile);

profileAddButton.addEventListener('click', openClosePopup(popupElement));
popupElementCloseButton.addEventListener('click', openClosePopup(popupElement));
elementForm.addEventListener('submit', formSubmitHandlerElement);
//////////////////////////////////////////////////////////////////

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

const elements = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element").content;

for (let i = 0; i < initialElements.length; i += 1) {
  const initialElement = elementTemplate.cloneNode(true);
  initialElement.querySelector('.element__image').src = initialElements[i].link;
  initialElement.querySelector('.element__title').textContent = initialElements[i].name;
  initialElement.querySelector('.element__image').alt = initialElements[i].name;
  elements.append(initialElement);
}

const popupWithImage = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup-image__image');
const popupCaption = document.querySelector('.popup-image__caption');
const elementContainers = document.querySelectorAll('.element');
const elementImage = document.querySelector('.element__image');

function toggleLike(evt) {
  if (evt.target.classList.contains('element__like-button')) {
      const likeButtonOfElement = evt.target.closest('.element__like-button');
      likeButtonOfElement.classList.add('element__like-button_active');
  }
}

function removeElement(evt) {
  if (evt.target.classList.contains('element__remove-button')) {
      const elementRemoveButton = evt.target.closest('.element__remove-button');
      elementRemoveButton.parentNode.remove()
  }
}

function getImage(evt) {
  if (evt.target.classList.contains('element__image')) {
    popupWithImage.classList.toggle('popup_opened');
    popupImage.src = evt.target.src;
    popupCaption.textContent = evt.target.alt;
  }
}

elementContainers.forEach(element => element.addEventListener('click', removeElement)); 
elementContainers.forEach(element => element.addEventListener('click', toggleLike));
elementContainers.forEach(element => element.addEventListener('click', getImage));
popupWithImageCloseButton.addEventListener('click', openClosePopup(popupWithImage));