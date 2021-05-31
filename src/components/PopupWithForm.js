
import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
    constructor({handleFormSubmit,popupSelector,formSelector}){
    super(popupSelector)
    this._formSelector = formSelector
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._formSelector.querySelector('.popup__submit-button')
    this._buttonText = this._button.textContent;

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
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

    })
    super.setEventListeners();
  }
  renderLoading(isSending) {
    this._button.textContent = isSending ? 'Сохранение...' : this._buttonText;
  }
}
