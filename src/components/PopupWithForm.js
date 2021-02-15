
import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
    constructor({handleFormSubmit,popupSelector,formSelector}){
    super(popupSelector)
    this._formSelector = formSelector
    this._handleFormSubmit = handleFormSubmit;

    }
    
  _getInputValues(){
    this._inputList = this._formSelector.querySelectorAll('.popup__field');
    const data = {};
    this._inputList.forEach(input => {
        data[input.name] = input.value;
      });
    return data;
}

close(){
 super.close()
 this._formSelector.reset()
}

setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }
}
