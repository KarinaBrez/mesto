import {Card} from './Card.js'
import {openPopup,closePopup} from './utils.js'
import {FormValidator,validationConfig} from './FormValidator.js'

const profileButtonNode = document.querySelector('.profile__button-edit')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const nameInput = document.querySelector('.popup__field_value_name');
const jobInput = document.querySelector('.popup__field_value_job'); 
const listCardsElement = document.querySelector('.elements');
const popupEdForm = document.querySelector('#popup_ed')
const profileCloseButtonNode = popupEdForm.querySelector('.popup__close-button')
const formEd = popupEdForm.querySelector('#form_ed')
const popupAddImage = document.querySelector('#popup_add')
const popImageAddCloseButton = popupAddImage.querySelector('.popup__close-button-add')
export const popupImageBig = document.querySelector('#popup_img')
const imageAddButton = document.querySelector('.profile__button-add')
const placeInput = document.querySelector('.popup__field_value_place')
const linkInput = document.querySelector('.popup__field_value_link')
const formAdd = document.querySelector('.popup__form_add')
const formAddSubmitButton = document.querySelector('.popup__submit-button_add')
export const closeButtonPopupImage = popupImageBig.querySelector('.popup__close-button-img')
export const imagePopup = document.querySelector('.popup__image')
export const titlePopup = document.querySelector('.popup__title')
const form = document.querySelector('.popup__form')
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 
initialCards.forEach((item) => {
    const card = new Card (item, '.template');
    const cardElement = card.generateCard();
    document.querySelector('.elements').append(cardElement);
})

//валидация формы с добавлением места
const aValid = new FormValidator(validationConfig,formAdd)
aValid.enableValidation()
//валидация формы с редактирование формы
const bValid = new FormValidator(validationConfig,formEd)
bValid.enableValidation()


function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdForm);
};

//Открытие и закрытие поп-апа с формой
profileButtonNode.addEventListener ('click',()=>{
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;  
    openPopup(popupEdForm) 

})
profileCloseButtonNode.addEventListener('click', ()=> closePopup (popupEdForm));
formEd.addEventListener('submit', formSubmitHandler);

//Открытие и закрытие поп-апа с добавление мест
popImageAddCloseButton.addEventListener('click', ()=> closePopup(popupAddImage));
imageAddButton.addEventListener('click', ()=>{
formAdd.reset()
openPopup(popupAddImage)
aValid.setButtonState()
})


//закрытие поп-апа с изображением
closeButtonPopupImage.addEventListener('click', ()=> closePopup(popupImageBig));



//Добавление новых карточек
function addImage(event){
    event.preventDefault();
    const newImage = linkInput.value;
    const newTitle = placeInput.value;
    const newItem = new Card ({link:newImage,name:newTitle},'.template').generateCard()
    listCardsElement.prepend(newItem);
    formAdd.reset()
    closePopup(popupAddImage)
}
formAdd.addEventListener('submit',addImage);




