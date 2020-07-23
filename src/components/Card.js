// класс карточки
  export class Card {
  constructor(templateSelector, handleCardClick, handleRemoveClick, myId) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this.myId = myId;
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

  // // приватный метод для обработки удаления
  // _handleRemoveClick() {
  //   this._element.remove()
  //   this._element = null;
  // }

  // приватный метод расстановки обработчиков
  _setEventListeners() {
    this._like.addEventListener('click', () => { this._handleLikeClick() })
    this._image.addEventListener('click', () => {this._handleCardClick(this._image)})
    if (this.myId === this._ownerId) {
      this._remove.addEventListener('click', () => { this._handleRemoveClick(this._cardId, this._element) })
    }
    else {this._remove.remove()};
  }

  // публичный метод, возвращающий готовую карточку
  createElement(obj) {
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.element__like-button');
    this._remove = this._element.querySelector('.element__remove-button');
    this._image = this._element.querySelector('.element__image');
    this._title = this._element.querySelector('.element__title');
    this._likes = this._element.querySelector('.element__likes-count');
    this._image.src = obj.link;
    this._title.textContent = obj.name;
    this._image.alt = `${obj.name}. Фото`;
    this._likes.textContent = obj.likes.length;
    this._cardId = obj._id;
    this._ownerId = obj.owner._id;
    this._setEventListeners(obj);
    return this._element;
  }
}