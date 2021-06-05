
export default class Popup {
    constructor(popupElement){
    this._popupElement = popupElement;
    this._handleEscClosee = this._handleEscClosee.bind(this)

    }
  open(){
    this._popupElement.classList.add('popup_opened');
   document.addEventListener('keydown', this._handleEscClosee);
  }  

  close(){
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClosee);
  }

 _handleEscClosee(e){
    if (e.key === 'Escape') {
        this.close();
         } 
  }

  setEventListeners (){
    this._popupElement.addEventListener('click', (evt)=> {
     if (evt.target.classList.contains('popup_opened')){
      this.close();
     }  
     if (evt.target.classList.contains('popup__close-button')){
      this.close()
     }
  })
}
}

