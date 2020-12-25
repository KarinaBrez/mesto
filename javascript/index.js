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
const popupImageBig = document.querySelector('#popup_img')
const imageAddButton = document.querySelector('.profile__button-add')
const placeInput = document.querySelector('.popup__field_value_place')
const linkInput = document.querySelector('.popup__field_value_link')
const formAdd = document.querySelector('.popup__form_add')
const formAddSubmitButton = document.querySelector('.popup__submit-button_add')
const closeButtonPopupImage = popupImageBig.querySelector('.popup__close-button-img')
const imagePopup = document.querySelector('.popup__image')
const titlePopup = document.querySelector('.popup__title')
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


function openPopup(popupNode) {
    document.addEventListener('keydown', handleKeyDown);
    popupNode.classList.add('popup_opened');
}

function closePopup(popupNode) {
    document.removeEventListener('keydown',handleKeyDown);
    popupNode.classList.remove('popup_opened');
};

const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
        const popupActive = document.querySelector('.popup_opened')
        closePopup(popupActive)
        console.log('presed')
         } 
}

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
imageAddButton.addEventListener('click', ()=> openPopup(popupAddImage))

//закрытие поп-апа с изображением
closeButtonPopupImage.addEventListener('click', ()=> closePopup(popupImageBig));


function readerList (){
    const listItems = initialCards.map(composeItem)
  
    listCardsElement.append(...listItems)    
}
//Добавление элементов
function composeItem(item) {
    const templateElement = document.querySelector('.template').content;
    const newItem = templateElement.cloneNode(true);
    const imageCard = newItem.querySelector('.element__image');
    const titleCard = newItem.querySelector('.element__title').textContent = item.name;
    imageCard.src = item.link;
    titleCard.textContent = item.name;
    imageCard.alt = item.name;
    newItem.querySelector('.element__button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__button_active');
    });
    newItem.querySelector('.element__button-delet').addEventListener('click',function (event){
          event.target.closest('.element').remove()
    })
    imageCard.addEventListener('click', () => {
            openPopup(popupImageBig)
            imagePopup.src = item.link
            titlePopup.textContent = item.name
            imagePopup.alt = item.name
        })
        
    return newItem;  
}
//Сохранение новых картинок
formAdd.addEventListener('submit',addImage);
readerList()

function addImage(event){
    event.preventDefault();
    const newLink = linkInput.value;
    const newTitle = placeInput.value;
    const newItem = composeItem({name: newTitle, link: newLink});
    listCardsElement.prepend(newItem);
    formAdd.reset()
    closePopup(popupAddImage)
}


// закрытие поп-апа через оверлей
const popupList = Array.from(document.querySelectorAll(".popup"));
popupList.forEach((popupElement) => {
popupElement.addEventListener("click",function(event) {
 if (event.target == popupElement) {
    closePopup(popupElement);
    }
 });
});



