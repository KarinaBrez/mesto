
import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
    constructor(popupElement){
       super(popupElement)
       this._imagePopup = this._popupElement.querySelector('.popup__image')
       this._titlePopup = this._popupElement.querySelector('.popup__title')
 }
open(name,link){
    this._imagePopup.src = link
    this._titlePopup.textContent = name
    this._imagePopup.alt = name
    super.open()
}

}