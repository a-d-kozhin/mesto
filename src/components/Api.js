// класс взаимодействия с сервером

export class Api {
  constructor({ url, headers = {} }) {
    this.url = url;
    this.headers = headers;
    this.authorization = headers.authorization;
  }

  // обработка ответа с сервера

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Oops, response is not ok. Status: ${response.status}`);
    }
  }

  // обработка ошибок
  _handleError(error) {
    console.error(`Oops, an error occured: ${error}`)
    return Promise.reject(error.message)
  }

  // получить профиль с сервера
  getInfo() {
    return fetch(`${this.url}users/me`, { headers: this.headers })
      .then(response => this._handleResponse(response))
      .catch(this._handleError)
  }

  // получить массив изначальных карточек
  getInitialCards() {
    return fetch(`${this.url}cards`, { headers: this.headers })
      .then(response => this._handleResponse(response))
      .catch(this._handleError)
  }

  // отправить обновленный профиль юзера на сервер
  editInfo(obj) {
    return fetch(`${this.url}users/me`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: obj.name,
          about: obj.about
        })
      })
      .then(response => this._handleResponse(response))
      .catch(this._handleError)
  }

  // отправить карточку на сервер
  sendElement(obj) {
    return fetch(`${this.url}cards`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: obj.title,
          link: obj.url
        })
      })
      .then(response => this._handleResponse(response))
      .catch(this._handleError)
  }

  // сменить аватарку на сервере
  changeAvatar(obj) {
    return fetch(`${this.url}users/me/avatar`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: obj.avatar
        })
      })
      .then(response => this._handleResponse(response))
      .catch(this._handleError)
  }

  // удалить карточку
  removeCard(_id) {
    return fetch(`${this.url}cards/${_id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(response => this._handleResponse(response))
      .catch(this._handleError)
  }

  // поставить лайк
  likeCard(_id) {
    return fetch(`${this.url}cards/likes/${_id}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(response => this._handleResponse(response))
      .catch(this._handleError)
  }

  // снять лайк
  dislikeCard(_id) {
    return fetch(`${this.url}cards/likes/${_id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(response => this._handleResponse(response))
      .catch(this._handleError)
  }
}