const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup__container');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input-name');
const jobInput = document.querySelector('.popup__input-job');

nameInput.value = profileName.childNodes[0].textContent.trim();
jobInput.value = profileJob.textContent;

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);

function openPopup() {
  popup.classList.add('popup_opened');
  return
}

function closePopup() {
  popup.classList.remove('popup_opened');
  return
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameInputValue = nameInput.value.trim();
	let jobInputValue = jobInput.value.trim();
	
	if(nameInputValue === '' || jobInputValue === '') {
		alert('Пожалуйста, заполните все поля формы');
	}
	
	else {
    profileName.childNodes[0].textContent = nameInputValue;
		profileJob.textContent = jobInputValue;
    closePopup();
		}
		return
}

