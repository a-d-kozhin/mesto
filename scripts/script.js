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
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
profileEditButton.addEventListener('click', openClosePopup);
popupCloseButton.addEventListener('click', openClosePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameInputValue = nameInput.value.trim();
	let jobInputValue = jobInput.value.trim();
  profileName.textContent = nameInputValue;
	profileJob.textContent = jobInputValue;
  popup.classList.remove('popup_opened');
}
form.addEventListener('submit', formSubmitHandler);
