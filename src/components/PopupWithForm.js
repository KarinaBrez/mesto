
import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
    constructor({handleFormSubmit,popupSelector,formSelector},enableValidation){
    super(popupSelector)
    this._formSelector = formSelector
    this._handleFormSubmit = handleFormSubmit;
    this._enableValidation = enableValidation;

    }
    
  _getInputValues(){
    this._inputList = this._formSelector.querySelectorAll('.popup__field');
    const data = {};
    this._inputList.forEach(input => {
        data[input.name] = input.value;
      });
    return data;
}
open(){
   super.open()
 }
close(){
 super.close()
}

setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close()
      this._formSelector.reset()
    })
  }
}
