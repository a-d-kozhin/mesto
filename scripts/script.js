const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup__container');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

function openClosePopup() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameInputValue = nameInput.value.trim();
	let jobInputValue = jobInput.value.trim();
  profileName.textContent = nameInputValue;
	profileJob.textContent = jobInputValue;
  openClosePopup();
}

profileEditButton.addEventListener('click', openClosePopup);
popupCloseButton.addEventListener('click', openClosePopup);
form.addEventListener('submit', formSubmitHandler);

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




// initialElements.forEach(function (item) {
// const initialElement = elementTemplate.cloneNode(true);
// initialElement.querySelector('.element__image').src = initialElements[0].link;
// initialElement.querySelector('.element__title').textContent = initialElements[0].name;
// elements.append(initialElement);
// });


// initialElements.forEach(function (){
//   const initialElement = elementTemplate.cloneNode(true);
//   initialElement.querySelector('.element__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
// });

/*
// клонируем содержимое тега template
const userElement = userTemplate.cloneNode(true);

// наполняем содержимым
userElement.querySelector('.user__avatar').src = 'tinyurl.com/v4pfzwy';
userElement.querySelector('.user__name').textContent = 'Дюк Корморант';

// отображаем на странице
usersOnline.append(userElement);*/