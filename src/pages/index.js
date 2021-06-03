import './index.css'; 
import Card from '../components/Card.js' 
import FormValidator from '../components/FormValidator.js' 
import Section from '../components/Section.js' 
import UserInfo from '../components/UserInfo.js' 
import PopupWithImage from '../components/PopupWithImage.js' 
import PopupWithForm from '../components/PopupWithForm.js' 
import {profileButtonNode,profileName,profileJob,nameInput,jobInput, 
listCardsElement,formEd,imageAddButton, formAdd,validationConfig,profileAvatar,formEdAvatar} from '../utils/constans.js' 
import Api from '../components/API.js' 
import PopupDeletCard from '../components/PopupDeletCard.js' 



const userInfo = new UserInfo(profileName,
    profileJob,profileAvatar) 
 

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


//валидация формы с добавлением места 
const validAddImage = new FormValidator(validationConfig,formAdd) 
validAddImage.enableValidation() 
//валидация формы с редактирование формы 
const bValid = new FormValidator(validationConfig,formEd) 
bValid.enableValidation() 
//валидация формы с редактированием аватара
const сValid = new FormValidator(validationConfig,formEdAvatar) 
сValid.enableValidation() 



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
            cardTemplate.addItem(createCard(cardData))
        })
        .catch((err) => {console.log(err); })  
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
        api.editProfile({
            name: data.name,
            job: data.job,
        })
        .then((info)=>{
        userInfo.setUserInfo({
            userName: info.name,
            userDescription: info.about})
         })  
          .finally(() => formEdProfile.renderLoading(false));
          formEdProfile.close() 
    }
})
formEdProfile.setEventListeners()

profileButtonNode.addEventListener ('click',()=>{
    userInfo.getUserInfo(
        nameInput.value = profileName.textContent,
        jobInput.value = profileJob.textContent,
    )
    formEdProfile.open()
})

//изменение аватара
const formEditAvatar = new PopupWithForm ({
    popupSelector: popup_avatar, 
    formSelector: formEdAvatar, 
    handleFormSubmit:(data)=>{ 
        formEditAvatar.renderLoading(true)
        api.editAvatar({
            avatar: data.avatar
        })
                .then((info) =>{
                    userInfo.setUserInfo({
                        userAvatar: info.avatar
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
        const buttonSubmitAvatar = document.querySelector('#button_submit-avatar')
        buttonSubmitAvatar.classList.add('popup__submit-button_invalid')
        buttonSubmitAvatar.disabled = true
        formEditAvatar.open()
    })
    

  
    //запрос ID  пользователя, данные с сервера
 Promise.all([api.getAllCards(),api.getProfile()])
 .then(([cards,userData]) => {
 userId = userData._id
  userInfo.setUserInfo({
     userName: userData.name,
     userDescription: userData.about,
     userAvatar: userData.avatar
  })
  cardTemplate.renderItems(cards.reverse());
  })
 .catch(err => console.log(`Ошибка загрузки данных: ${err}`))