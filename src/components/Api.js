export class Api {
  constructor({ url, headers = {} }) {
    this.url = url;
    this.headers = headers;
    this.authorization = headers.authorization;
  }

  _handleError(error) {
    console.error(`Oops, an error occured: ${error}`)
    return Promise.reject(error.message)
  }
  
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
    .then(response => {return response})
    .catch(error => console.error(error))
    }

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

    removeCard(_id) {
      return fetch(`${this.url}cards${_id}`, {headers: this.headers})
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