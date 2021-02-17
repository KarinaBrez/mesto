import './index.css';
import Card from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import {profileButtonNode,profileName,profileJob,nameInput,jobInput,
listCardsElement,popupEdForm,formEd,popupImageBig,imageAddButton, formAdd,initialCards,validationConfig} from '../utils/constans.js'


// Открытие и закрытие поп-апа с изображением
const showImage = new PopupWithImage (popup_img)

function createCard(item){
    const card = new Card ({ 
        item, 
        handleCardClick:(name,link) =>{ 
            showImage.open(name,link) 
        } 
    },'.template') 
       const cardElement = card.generateCard()
       cardTemplate.addItem(cardElement)
}


//Создание карточки
const cardTemplate = new Section ({ 
    items: initialCards, 
    renderer: createCard,},
    listCardsElement); 
 showImage.setEventListeners() 
 cardTemplate.renderItems() 

//валидация формы с добавлением места
const aValid = new FormValidator(validationConfig,formAdd)
aValid.enableValidation()
//валидация формы с редактирование формы
const bValid = new FormValidator(validationConfig,formEd)
bValid.enableValidation()


// Информация для формы редактирования профиля
const userInfo = new UserInfo(profileName,profileJob)

//открытие и закрытие поп-апа с редактирование профиля
const formEdProfile = new PopupWithForm({
    popupSelector: popup_ed,
    formSelector: form_ed,
    handleFormSubmit:()=>{
        userInfo.setUserInfo({nameInput,jobInput})  
        formEdProfile.close()
    }
})
formEdProfile.setEventListeners()

profileButtonNode.addEventListener ('click',()=>{
    userInfo.getUserInfo(nameInput,jobInput)
    formEdProfile.open()
})


//откртыие и закрытие поп-апа с добавление фото
const formAddImage = new PopupWithForm({ 
    popupSelector: popup_add, 
    formSelector: form_add, 
    handleFormSubmit:(data)=>{ 
        const item = { 
            name: data.place, 
            link: data.link 
        } 
    createCard(item),
    formAddImage.close()
    } 
}) 
formAddImage.setEventListeners() 

imageAddButton.addEventListener('click', ()=>{
    const buttonSubmit = document.querySelector('#button_submit')
    buttonSubmit.classList.add('popup__submit-button_invalid')
    buttonSubmit.disabled = true
    formAddImage.open()
})
    