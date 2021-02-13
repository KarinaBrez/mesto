
export default class Popup {
    constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._handleEscClosee = this._handleEscClosee.bind(this)

    }
  open(){
    this._popupSelector.classList.add('popup_opened');
   document.addEventListener('keydown', this._handleEscClosee);
    console.log("press")
  }  

  close(){
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClosee);
  }

 _handleEscClosee(e){
    if (e.key === 'Escape') {
        this.close();
        console.log('presed')
         } 
  }

  setEventListeners (){
    this._popupSelector.addEventListener('click', (evt)=> {
     if (evt.target.classList.contains('popup_opened')){
      this.close();
     }  
     if (evt.target.classList.contains('popup__close-button')){
      this.close()
     }
  })
}
}

