import './index.css'; 
import Card from '../components/Card.js' 
import FormValidator from '../components/FormValidator.js' 
import Section from '../components/Section.js' 
import UserInfo from '../components/UserInfo.js' 
import PopupWithImage from '../components/PopupWithImage.js' 
import PopupWithForm from '../components/PopupWithForm.js' 
import {profileButtonNode,profileName,profileJob,nameInput,jobInput, 
listCardsElement,imageAddButton, formAdd,validationConfig,profileAvatar,formEdAvatar,placesWrap,formEd} from '../utils/constans.js' 
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
    popupElement: popup_del,
    formSelector: form_del,
    handleFormSubmit:()=>{}
})
    deletCardPopup.setEventListeners()


//валидация формы с добавлением места 
const addCardFormValidator = new FormValidator(validationConfig,formAdd) 
addCardFormValidator.enableValidation() 
//валидация формы с редактирование формы 
const editProfileFormValidator = new FormValidator(validationConfig,formEd) 
editProfileFormValidator.enableValidation() 
//валидация формы с редактированием аватара
const editAvatarFormValidator = new FormValidator(validationConfig,formEdAvatar) 
editAvatarFormValidator.enableValidation() 



//создание карточки
const createCard = (cardData) => {
    const card = new Card ({
      data: {...cardData, currentUserId: userId},
      handleCardClick: (name,link) =>{
        showImage.open(name,link)
      },
      handleDeletClick: ()=>{
        deletCardPopup.submit(()=>{
            deletCardPopup.renderLoading(true)
            api.deletCard(card.getCardId())
            .then(()=>{
                card.removeCard()
                deletCardPopup.close()
            })
            .catch(err => console.log(`При удалении карточки: ${err}`))
            .finally(() => deletCardPopup.renderLoading(false));

        }),deletCardPopup.open()
        },
        handleLikeClick: () => {
            api.changeLikeCardStatus(card.getCardId(), !card.isLiked())
        .then(data => {
          card.setLikes({ ...data });
        })
        .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`))
          },
         
   }, placesWrap) 
   return card.generateCard();
   
  }
   //создание разметки 
const cardsList = new Section ({  
    renderer: (item)=>{
        cardsList.addItem(createCard(item))},
       
   },
   listCardsElement);    
   showImage.setEventListeners()

  //откртыие и закрытие поп-апа с добавление фото
const formAddImage = new PopupWithForm({ 
    popupElement: popup_add, 
    formSelector: form_add, 
    handleFormSubmit:(data)=>{ 
        formAddImage.renderLoading(true);
        const item = {  
            name: data.place,  
            link: data.link  
        }  
        api.addNewCard(item)
        .then((cardData)=>{
            cardsList.addItem(createCard(cardData))
            formAddImage.close()
        })
        .catch((err) => {console.log(err); })  
        .finally(() => formAddImage.renderLoading(false));    
    } 
}) 
formAddImage.setEventListeners() 



imageAddButton.addEventListener('click', ()=>{
    addCardFormValidator.setButtonState()
    formAddImage.open()
})

//Редактирование профиля
//открытие и закрытие поп-апа с редактирование профиля
const formEdProfile = new PopupWithForm({
    popupElement: popup_ed,
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
            formEdProfile.close() 
         }) 
          .catch((err) => {console.log(err); })   
          .finally(() => formEdProfile.renderLoading(false));
    }
})
formEdProfile.setEventListeners()

profileButtonNode.addEventListener ('click',()=>{
    const currentUserInfo = userInfo.getUserInfo()
        nameInput.value = currentUserInfo.userName,
        jobInput.value = currentUserInfo.userDescription;
       formEdProfile.open()
})

//изменение аватара
const formEditAvatar = new PopupWithForm ({
    popupElement: popup_avatar, 
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
                    formEditAvatar.close() 
                })
                .catch((err) => {
                    console.log(err);
                 })
                 .finally(() => formEditAvatar.renderLoading(false));  
    } 
    }) 
    formEditAvatar.setEventListeners() 
    
    profileAvatar.addEventListener('click',()=>{
        editAvatarFormValidator.setButtonState()
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
  cardsList.renderItems(cards.reverse());
  })
 .catch(err => console.log(`Ошибка загрузки данных: ${err}`))

