
export default class Card{
    constructor({item,handleCardClick},cardSelector){
this._name = item.name
this._link = item.link
this._cardSelector = cardSelector
this._handleCardClick = handleCardClick
}
_getTemplate(){
    const templateElement = document
    .querySelector(this._cardSelector)
    .content 
    .querySelector('.element') 
    .cloneNode(true);  
    return templateElement
} 
generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners()

    this._element.querySelector('.element__image').src = this._link
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
}

_handleLikeClick(){
    this._element.querySelector('.element__button').classList.toggle('element__button_active');
}
_handleDeletClick(){
    this._element.querySelector('.element__button-delet').closest('.element').remove() 
}
_setEventListeners(){
    this._element.querySelector('.element__button').addEventListener('click', () =>{
    this._handleLikeClick()
    })
    this._element.querySelector('.element__button-delet').addEventListener('click', () =>{
        this._handleDeletClick()
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
        this._handleCardClick(this._name,this._link)
    })
}
}
