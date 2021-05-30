import './index.css'; 
import Card from '../components/Card.js' 
import {FormValidator} from '../components/FormValidator.js' 
import Section from '../components/Section.js' 
import UserInfo from '../components/UserInfo.js' 
import PopupWithImage from '../components/PopupWithImage.js' 
import PopupWithForm from '../components/PopupWithForm.js' 
import {profileButtonNode,profileName,profileJob,nameInput,jobInput, 
listCardsElement,popupEdForm,formEd,popupImageBig,imageAddButton, formAdd,validationConfig,profileAvatar,formEdAvatar,inputAvatar} from '../utils/constans.js' 
import Api from '../components/API.js' 
import PopupDeletCard from '../components/PopupDeletCard.js' 


//валидация формы с добавлением места 
const aValid = new FormValidator(validationConfig,formAdd) 
aValid.enableValidation() 
//валидация формы с редактирование формы 
const bValid = new FormValidator(validationConfig,formEd) 
bValid.enableValidation() 
//валидация формы с редактированием аватара
const сValid = new FormValidator(validationConfig,formEdAvatar) 
сValid.enableValidation() 



const userInfo = new UserInfo(profileName,profileJob,profileAvatar) 
 

//Класс API
const api = new Api({
    baseUrl:"https://mesto.nomoreparties.co/v1/cohort-24",
    headers:{
        authorization: 'd66557a3-a587-4b53-87af-2f8ab3e15cbd',
        'Content-Type': 'application/json' 
    }
    })

 
let userId = null;
       
      

// Открытие и закрытие поп-апа с изображением
const showImage = new PopupWithImage (popup_img)

//открытие попапа для подверждения удаления
const deletCardPopup = new PopupDeletCard ({
    popupSelector: popup_del,
    formSelector: form_del,
    handleFormSubmit:()=>{}
})
    deletCardPopup.setEventListeners()

    
//создание карточки
const createCard = (cardData) => {
    const card = new Card ({
      data: {...cardData, currentUserId: userId},
      handleCardClick: (name,link) =>{
        showImage.open(name,link)
      },
      handleDeletClick: ()=>{
        deletCardPopup.Submit(()=>{
            deletCardPopup.renderLoading(true)
            api.deletCard(card.Id())
            .then(()=>{
                card.removeCard()
                deletCardPopup.close()
            })
            .catch(err => console.log(`При удалении карточки: ${err}`))
            .finally(() => deletCardPopup.renderLoading(false));

        }),deletCardPopup.open()
        },
        handleLikeClick: () => {
            api.changeLikeCardStatus(card.Id(), !card.isLiked())
        .then(data => {
          card.setLikes({ ...data });
        })
        .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`))
          },
         
   },'.template') 
   return card.generateCard();
   
  }
   //создание разметки 
const cardTemplate = new Section ({  
    renderer: (item)=>{
        cardTemplate.addItem(createCard(item))},
       
   },
   listCardsElement);    
   showImage.setEventListeners()

  //откртыие и закрытие поп-апа с добавление фото
const formAddImage = new PopupWithForm({ 
    popupSelector: popup_add, 
    formSelector: form_add, 
    handleFormSubmit:(data)=>{ 
        formAddImage.renderLoading(true);
        const item = {  
            name: data.place,  
            link: data.link  
        }  
        api.addNewCard(item)
        .then((cardData)=>{
            createCard(cardData)
        })
        .catch((err) => { console.log(err); })  
        .finally(() => formAddImage.renderLoading(false));
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

//Редактирование профиля
//открытие и закрытие поп-апа с редактирование профиля
const formEdProfile = new PopupWithForm({
    popupSelector: popup_ed,
    formSelector: form_ed,
    handleFormSubmit:(data)=>{
        formEdProfile.renderLoading(true);
        api.editProfile(data)
        .then(()=>{
        userInfo.setUserInfo({
            nameInput:nameInput.value,
            jobInput:jobInput.value})
         })  
          .finally(() => formEdProfile.renderLoading(false));
          formEdProfile.close() 
    }
})
formEdProfile.setEventListeners()

profileButtonNode.addEventListener ('click',()=>{
    //userInfo.getUserInfo(nameInput,jobInput)
    formEdProfile.open()
})

//изменение аватара
const formEditAvatar = new PopupWithForm ({
    popupSelector: popup_avatar, 
    formSelector: form_avatar, 
    handleFormSubmit:(data)=>{ 
        formEditAvatar.renderLoading(true)
        api.editAvatar(data)
                .then((info) =>{
                    userInfo.setUserInfo({
                        inputAvatar: info.avatar
                    }) 
                })
                .catch((err) => {
                    console.log(err);
                 })
                 .finally(() => formEditAvatar.renderLoading(false));  
                 formEditAvatar.close() 
    } 
    }) 
    formEditAvatar.setEventListeners() 
    
    profileAvatar.addEventListener('click',()=>{
        formEditAvatar.open()
    })
    
    
fetch('https://mesto.nomoreparties.co/v1/cohort-21/cards', {
    headers: {
      authorization: '740f9597-869e-4a07-8bee-47ad4b50f4a9'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
  
    //запрос ID  пользователя, данные с сервера
 Promise.all([api.getProfile(),api.getAllCards()])
 .then(([userData, cards]) => {
 userId = userData._id
  userInfo.setUserInfo({
     nameInput: userData.name,
     jobInput: userData.about,
     inputAvatar: userData.avatar
  })
  cardTemplate.renderItems(cards.reverse());
  })
 .catch(err => console.log(`Ошибка загрузки данных: ${err}`))