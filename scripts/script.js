const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileForm = document.querySelector('.popup__profile-form');
const elementForm = document.querySelector('.popup__element-form');
const popupProfileCloseButton = document.querySelector('.popup-profile__close-button');
const popupElementCloseButton = document.querySelector('.popup-element__close-button');
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
      nameInput.value = profileName.textContent;
      jobInput.value = profileJob.textContent;
    }
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
  popupElement.classList.toggle('popup_opened');
  const userElementLike = userElement.querySelector('.element__like-button')
  userElementLike.addEventListener('click', function() {userElementLike.classList.toggle('element__like-button_active')});
  const userElementRemoveButton = userElement.querySelector('.element__remove-button');
  userElementRemoveButton.addEventListener('click', function() {userElementRemoveButton.parentNode.remove()});
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


const elementLikeButton = document.querySelectorAll('.element__like-button');

for (let i = 0; i < elementLikeButton.length; i += 1) {
  elementLikeButton[i].addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__like-button_active');
})
;}

const elementRemoveButton = document.querySelectorAll('.element__remove-button');

for (let i = 0; i < elementRemoveButton.length; i += 1) {
elementRemoveButton[i].addEventListener('click', function() {elementRemoveButton[i].parentNode.remove()})}
