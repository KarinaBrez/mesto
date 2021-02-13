export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_invalid',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
  }

  export class FormValidator {
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
    }
    
    _hideError() {
      const error = this._form.querySelector(`#${this._input.id}-error`)
      error.textContent = ''
      this._input.classList.remove(this._inputErrorClass)
    }
    
    _checkInputValidity(input) {
      this._input = input
      if(this._input.validity.valid){
        this._hideError()
      } else {
        this._showError()
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
    
    _setEventListener() {
      this._inputList = this._form.querySelectorAll(this._inputSelector)
    
      this._inputList.forEach(input => {
        input.addEventListener('input', ()=> {
          this._checkInputValidity(input)
          this.setButtonState(this._form.checkValidity())
        })
      })
    }
    
    enableValidation () {
      this._setEventListener()
      this._form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.setButtonState(this._form.checkValidity())}
      );
    }
  }