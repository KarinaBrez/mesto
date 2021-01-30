import {openPopup} from './utils.js'
import {imagePopup,titlePopup,popupImageBig} from './index.js'
export class Card{
    constructor(data,cardSelector){
this._name = data.name
this._link = data.link
this._cardSelector = cardSelector

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
_showPopupImage(){
    imagePopup.src =  this._link
    titlePopup.textContent = this._name
    imagePopup.alt = this._link
    openPopup(popupImageBig);
}
_setEventListeners(){
    this._element.querySelector('.element__button').addEventListener('click', () =>{
    this._handleLikeClick()
    })
    this._element.querySelector('.element__button-delet').addEventListener('click', () =>{
        this._handleDeletClick()
    })
    this._element.querySelector('.element__image').addEventListener('click', () =>{
        this._showPopupImage()
    })
 
}
}
