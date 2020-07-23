// класс взаимодействия с сервером

export class Api {
  constructor({ url, headers = {} }) {
    this.url = url;
    this.headers = headers;
    this.authorization = headers.authorization;
  }
  // обработка ошибок
  _handleError(error) {
    console.error(`Oops, an error occured: ${error}`)
    return Promise.reject(error.message)
  }

  // получить профиль с сервера
  getInfo() {
    return fetch(`${this.url}users/me`, {headers: this.headers})
    .then( (response) => {
      if(response.ok) {
        return(response.json())
      } else {
        console.error(`oops, status:${response.status}`)
      }
    })
      .catch(error => this._handleError(error))
    }

  // получить массив изначальных карточек
  getInitialCards() {
    return fetch(`${this.url}cards`, {headers: this.headers})
    .then( (response) => {
      if(response.ok) {
       return response.json();
      } else {
        console.error(`oops, status:${response.status}`)
      }
    })
    .catch(error => this._handleError(error))
    }

  // отправить обновленный профиль юзера на сервер
  editInfo(obj) {
    return fetch(`${this.url}users/me`, 
    { method: 'PATCH',
      headers: {
        authorization: '9b4159b0-f593-4984-be9b-af6528533bd7',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: obj.name,
        about: obj.about
      })
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        console.error(`oops, status:${response.status}`)
      }
    })
    .catch(error => this._handleError(error))
    }
  
  // отправить карточку на сервер
  sendElement(obj) {
    return fetch(`${this.url}cards`, 
    { method: 'POST',
      headers: {
        authorization: '9b4159b0-f593-4984-be9b-af6528533bd7',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: obj.title,
        link: obj.url
      })
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        console.error(`oops, status:${response.status}`)
      }
    })
    .catch(error => console.error(error))
    }

  // сменить аватарку на сервере
  changeAvatar(obj) {
    return fetch(`${this.url}users/me/avatar`, 
    { method: 'PATCH',
      headers: {
        authorization: '9b4159b0-f593-4984-be9b-af6528533bd7',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: obj.avatar
      })
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        console.error(`oops, status:${response.status}`)
      }
    })
    .then(response => {return response})
    .catch(error => console.error(error))
    }  

  // удалить карточку
  removeCard(_id) {
    return fetch(`${this.url}cards/${_id}`, {
      method:'DELETE', 
      headers: this.headers
    })
    .then( (response) => {
      if(response.ok) {
        return(response.json())
      } else {
        console.error(`oops, status:${response.status}`)
      }
    })
      .catch(error => this._handleError(error))
  }

  // поставить лайк
  likeCard(_id) {
    return fetch(`${this.url}cards/likes/${_id}`, {
      method:'PUT', 
      headers: this.headers
    })
    .then( (response) => {
      if(response.ok) {
        return(response.json())
      } else {
        console.error(`oops, status:${response.status}`)
      }
    })
      .catch(error => this._handleError(error))
    }
    
  // снять лайк
    dislikeCard(_id) {
      return fetch(`${this.url}cards/likes/${_id}`, {
        method:'DELETE', 
        headers: this.headers
      })
      .then( (response) => {
        if(response.ok) {
          return(response.json())
        } else {
          console.error(`oops, status:${response.status}`)
        }
      })
        .catch(error => this._handleError(error))
      }
  }