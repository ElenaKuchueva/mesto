class Api {
  constructor(url, headers) {
    this.url = url;
    this.headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      (res) => console.log(res.json);
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

//----------Карточки----------------

//Базовые карточки 
  getInitialCards() {
    return fetch(`${this.url}cards`, {
      metod: "GET",
      headers: this.headers,
    })
    .then((res) => this._handleResponse(res))
  }

//Добавить новую карточка
  postNewCard(data) {
    return fetch(`${this.url}cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._handleResponse(res))
  }

//Удалить карточку
deleteCard(cardId) {
    return fetch(`${this.url}cards/${cardId} `, {
      method: "DELETE",
      headers: this.headers
    })
    .then((res) => this._handleResponse(res))
  }

//--------Данные пользователя------------------

//Актуальные данные о пользователе
  getInitialUserInfo() {
    return fetch(`${this.url}users/me`, {
      metod: "GET",
      headers: this.headers,
    }).then((res) => this._handleResponse(res))
  }

//Изменить даные о пользователе
  changeValuesUserInfo(data) {
    return fetch(`${this.url}users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ 
        name: data.name, 
        about: data.about 
      }),
    })
    .then((res) => this._handleResponse(res))
  }


//---------Аватарка-------------------

//Изменить аватар
  changeAvatar(data) {
    return fetch(`${this.url}users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(
        { avatar: data.avatar }
        ),
      })
    .then((res) => this._handleResponse(res))
  }


//------------Лайки------------------

//Удалить лайк на карточке
  deleteLike(cardId) {
    return fetch(`${this.url}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    })
    .then((res) => this._handleResponse(res))
  }


//Добавить лайк
  addLike(cardId) {
    return fetch(`${this.url}cards/${cardId}/likes`, {
        method: "PUT",
        headers: this.headers,
      })
      .then((res) => this._handleResponse(res))
 }

}

export { Api };
