
import Popup from './Popup.js'


export default class PopupWithForm extends Popup{
    constructor({handleFormSubmit,popupElement,formSelector,resetFormState}){
    super(popupElement)
    this._form = formSelector
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._form.querySelector('.popup__submit-button')
    this._buttonText = this._button.textContent;
    }
    
  _getInputValues(){
    this._inputList = this._form.querySelectorAll('.popup__field');
    const data = {};
    this._inputList.forEach(input => {
        data[input.name] = input.value;
      });
    return data;
}


setEventListeners() {
  this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

    })
    super.setEventListeners();
   
  }
  close(){
    this._form.reset();
    super.close()
   }
  renderLoading(isSending) {
    this._button.textContent = isSending ? 'Сохранение...' : this._buttonText;
  }
}
