
export default class Api{
    constructor(config){
        this._baseUrl = config.baseUrl
        this._headers = config.headers

    }

getProfile() {
return fetch (`${this._baseUrl}/users/me`, {
    method: "GET",
    headers: this._headers
})
.then((res) =>{
    if(res.ok){
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`)
})
}
//Добавление карточек с сервера
getAllCards(){
    return fetch (`${this._baseUrl}/cards`, {
        method: "GET",
        headers: this._headers
    })
    .then((res) =>{
        if(res.ok){
            return res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`)
    })  
}
//редактирование профиля
editProfile(data){
    return fetch (`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({name:`${data.name}`, about:`${data.job}`})
    })
    .then((res) =>{
        if(res.ok){
            return res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`)
    })   
}
//добавление новой карточки
addNewCard({name,link}){
    return fetch (`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({name,
            link,
        })
    })
    .then((res) =>{
        if(res.ok){
            return res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`)
    })   
}
//редактирование аватара
editAvatar(data){
    return fetch (`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({avatar: `${data.avatar}`})
    })
    .then((res) =>{
        if(res.ok){
            return res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`)
    })    
}
changeLikeCardStatus(cardID, like) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
    .then((res) =>{
        if(res.ok){
            return res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`)
    })    
  }
}