
const showError = (form,input,config) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
};

const hideError = (form,input,config) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = " ";
};

const checkInputValidity = (form, input, config) => {
  if (!input.validity.valid) {
    showError(form, input,config);
  } else {
    hideError(form,input,config);
  }
};
function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  function toggleButtonState(inputList,buttonElement,config){
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false
  } 
  }
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement,config);
      toggleButtonState(inputList, buttonElement,config);
    });
  });
};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}
enableValidation(validationConfig);

