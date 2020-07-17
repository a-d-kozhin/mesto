// класс карточки
  export class Card {
  constructor(elementName, elementLink, templateSelector, handleCardClick) {
    this._name = elementName;
    this._link = elementLink;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.remove()
    this._element = null;
  }

  // приватный метод расстановки обработчиков
  _setEventListeners() {
    this._remove.addEventListener('click', () => { this._handleRemoveClick() })
    this._like.addEventListener('click', () => { this._handleLikeClick() })
    this._image.addEventListener('click', () => {this._handleCardClick(this._image)})
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