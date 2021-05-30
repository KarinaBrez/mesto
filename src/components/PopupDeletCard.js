import PopupWithForm from './PopupWithForm.js'

export default class PopupDeletCard extends PopupWithForm{
    constructor(handleFormSubmit){
        super(handleFormSubmit)
      }
Submit(action){
this._handleFormSubmit = action;
}
}