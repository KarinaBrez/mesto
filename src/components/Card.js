
export default class Card{
    constructor({data,handleCardClick,handleDeletClick,handleLikeClick},cardSelector){
this._name = data.name
this._link = data.link
this._likes = data.likes;
this._userId = data.currentUserId
this._ownerId = data.owner._id
this._cardId = data._id
this._cardSelector = cardSelector
this._handleCardClick = handleCardClick
this._handleDeletClick = handleDeletClick
this._handleLikeClick = handleLikeClick
}
//Получение разметки
_getTemplate(){
    const templateElement = document
    .querySelector(this._cardSelector)
    .content 
    .querySelector('.element') 
    .cloneNode(true);  
    return templateElement
} 
//Создание карточки
generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();
    this._updateLikesView();

    if (this._ownerId === this._userId){
        this._element.querySelector('.element__button-delet').classList.remove('element__button-delet_hidden')
    }
    this._element.querySelector('.element__image').src = this._link
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
}
//удаление карточки
removeCard(){
    this._element.remove()  
    this._element = null
}
//запрос ID карточки
Id() {
    return this._cardId;
  }
 // навешевание события
_setEventListeners(){
    this._element.querySelector('.element__button').addEventListener('click', () =>{
    this._handleLikeClick()
    })

    this._element.querySelector('.element__image').addEventListener('click', () => {
        this._handleCardClick(this._name,this._link)
    })
    this._element.querySelector('.element__button-delet').addEventListener('click', () => {
        this._handleDeletClick()
    })
}

_updateLikesView() {
  this._element.querySelector('.element__number-like').textContent = this._likes.length;

  if (this.isLiked()) this._element.querySelector('.element__button')
    .classList.add('element__button_active');
  else this._element.querySelector('.element__button')
    .classList.remove('element__button_active');
}
isLiked() {
  return Boolean(this._likes.find(item => item._id === this._userId));
}
setLikes(data) {
  this._likes = data.likes;
  this._updateLikesView();
}
}