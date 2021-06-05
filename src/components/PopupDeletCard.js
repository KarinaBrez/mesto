import PopupWithForm from './PopupWithForm.js'

export default class PopupDeletCard extends PopupWithForm{
    constructor(handleFormSubmit){
        super(handleFormSubmit)
      }
submit(action){
this._handleFormSubmit = action;
}
}