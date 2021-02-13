
import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
       super(popupSelector)
       this._imagePopup = document.querySelector('.popup__image')
       this._titlePopup = document.querySelector('.popup__title')
 }
open(name,link){
    this._imagePopup.src = link
    this._titlePopup.textContent = name
    this._imagePopup.alt = name
    super.open()
}
close() {
    super.close()
}
setEventListeners(){
    super.setEventListeners()    
}
}