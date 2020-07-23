// класс карточки
  export class Card {
  constructor(templateSelector, handleCardClick, handleRemoveClick, handleLikeClick, myId) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._handleLikeClick = handleLikeClick;
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
  _likeClick() {
    this._like.disabled = true;
    this._handleLikeClick(this._like, this._likes, this._cardId)
      .then(() =>{
        this._like.classList.toggle('element__like-button_active');
      })
      .finally(() => {
        this._like.disabled = false;
      })
  }

  // приватный метод расстановки обработчиков
  _setEventListeners() {
    this._like.addEventListener('click', () => {this._likeClick()})
    this._image.addEventListener('click', () => {this._handleCardClick(this._image)})
    if (this.myId === this._ownerId) {
      this._removeBtn.addEventListener('click', () => { this._handleRemoveClick(this._cardId, this._element) })
    }
    else {this._removeBtn.remove()};
  }

  // публичный метод, возвращающий готовую карточку
  createElement(obj) {
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.element__like-button');
    this._removeBtn = this._element.querySelector('.element__remove-button');
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