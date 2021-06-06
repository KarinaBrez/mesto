
export default class Api{
    constructor(config){
        this._baseUrl = config.baseUrl
        this._headers = config.headers

    }

_getResponse(res) {
 return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
 }

getProfile() {
return fetch (`${this._baseUrl}/users/me`, {
    method: "GET",
    headers: this._headers
})
.then(this._getResponse)
}
//Добавление карточек с сервера
getAllCards(){
    return fetch (`${this._baseUrl}/cards`, {
        method: "GET",
        headers: this._headers
    })
    .then(this._getResponse) 
}
//редактирование профиля
editProfile(data){
    return fetch (`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({name:`${data.name}`, about:`${data.job}`})
    })
    .then(this._getResponse) 
}
//добавление новой карточки
addNewCard({name,link}){
    return fetch (`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name,
            link,
        })
    })
    .then(this._getResponse)  
}
//редактирование аватара
editAvatar(data){
    return fetch (`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({avatar: `${data.avatar}`})
    })
    .then(this._getResponse)   
}
changeLikeCardStatus(cardID,like) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
    .then(this._getResponse)    
  }
  deletCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getResponse)   
  }
}

