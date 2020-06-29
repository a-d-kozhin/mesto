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

  // класс карточки
class Element {
  constructor(elementName, elementLink, templateSelector) {
    this._name = elementName;
    this._link = elementLink;
    this._templateSelector = templateSelector;
  }

  // приватный метод получения шаблона карточки
  _getTemplate() {
    const elementTemplate = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return elementTemplate;

  }

  // приватный метод для обработки лайка
  _handleLikeClick() {
    this._like.classList.toggle('element__like-button_active');
  }

  // приватный метод для обработки удаления
  _handleRemoveClick() {
    this._remove.parentNode.remove()
    this._element = null;
  }

  // приватный метод для раскрытия попапа с картинкой
  _handleImageClick() {
    toggleClassOpened(popupWithImage);
    if (!this._image.classList.contains('popup_opened')) {
      popupImage.src = this._image.src;
      popupCaption.textContent = this._image.alt.slice(0, -6);
    }
  }

  // приватный метод расстановки обработчиков
  _setEventListeners() {
    this._remove.addEventListener('click', () => { this._handleRemoveClick() })
    this._like.addEventListener('click', () => { this._handleLikeClick() })
    this._image.addEventListener('click', () => { this._handleImageClick() })
  }

  // публичный метод, возвращающий готовую карточку
  createElement() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.element__like-button');
    this._remove = this._element.querySelector('.element__remove-button');
    this._image = this._element.querySelector('.element__image');
    this._title = this._element.querySelector('.element__title');
    this._image.src = this._link;
    this._title.textContent = this._name;
    this._image.alt = `${this._name}. Фото`;
    this._setEventListeners();
    return this._element;
  }
}

  // создаем карточки из массива и добавляем их в грид-контейнер
  initialElements.forEach((item) => {
  const newElement = new Element(item.name, item.link, '#element');
  const element = newElement.createElement();
  elements.append(element);
  }
);