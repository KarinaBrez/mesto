
  export default class FormValidator {
    constructor (config, form) {
      this._form = form
      this._formSelector = config.formSelector
      this._inputSelector = config.inputSelector
      this._submitButtonSelector = config.submitButtonSelector
      this._inactiveButtonClass = config.inactiveButtonClass
      this._inputErrorClass = config.inputErrorClass
      this._errorClass = config.errorClass
    }
  
    _showError() {
      const error = this._form.querySelector(`#${this._input.id}-error`)
      error.textContent = this._input.validationMessage
      this._input.classList.add(this._inputErrorClass)
      error.classList.add(this._errorClass)
    }
    
    _hideError() {
      const error = this._form.querySelector(`#${this._input.id}-error`)
      error.textContent = ''
      this._input.classList.remove(this._inputErrorClass);
      error.classList.remove(this._errorClass)
    }
    
    _checkInputValidity(input) {
      this._input = input
      if(!this._input.validity.valid){
        this._showError(input,input.validationMessage)
      } else {
        this._hideError(input)
      }
    }
    
    setButtonState(isActive) {
      this._button = this._form.querySelector(this._submitButtonSelector)
      if(isActive){
        this._button.classList.remove(this._inactiveButtonClass)
        this._button.disabled = false
      } else {
        this._button.classList.add(this._inactiveButtonClass)
        this._button.disabled = true
      }
    }
    
    _hideErrorMessages(){
      const error = this._form.querySelector(`#${this._input.id}-error`)
      error.textContent = ''
      this._input.classList.remove(this._inputErrorClass);
      error.classList.remove(this._errorClass)
    }
   
    _setEventListener() {
      this._form.addEventListener('reset', () => {
        this._hideErrorMessages();
      })
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))
      this._inputList.forEach(input => {
        input.addEventListener('input', ()=> {
          this._checkInputValidity(input)
          this.setButtonState(this._form.checkValidity())
        })
      })
    }
    
    enableValidation () {
      this._setEventListener()
     
    }
  }