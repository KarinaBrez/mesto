const profileButtonNode = document.querySelector('.profile__button-edit')
const popupNode = document.querySelector('.popup')
const profileCloseButtonNode = document.querySelector('.popup__close-button')
let formElement = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let nameInput = document.querySelector('.popup__field_value_name');
let jobInput = document.querySelector('.popup__field_value_job'); 
const listCardsElement = document.querySelector('.elements');
let popupEdForm = document.querySelector('#popup_ed')
let popupAddImage = document.querySelector('#popup_add')
let popupImageBig = document.querySelector('#popup_img')
let imageAddButton = document.querySelector('.profile__button-add')
const popImageAddCloseButton = document.querySelector('.popup__close-button-add')
let placeInput = document.querySelector('.popup__field_value_place')
let linkInput = document.querySelector('.popup__field_value_link')
let fornAdd = document.querySelector('.popup__form_add')
let formAddSubmitButton = document.querySelector('.popup__submit-button_add')
const closeButtonPopupImage = document.querySelector('.popup__close-button-img')
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


function hadlyPopupOpenButton(popupNode) {
    popupNode.classList.add('popup_opened');
};

function handlePopupCloseButton(popupNode) {
    popupNode.classList.remove('popup_opened');

};

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    handlePopupCloseButton(popupEdForm);
};

//Открытие и закрытие поп-апа с формой
profileButtonNode.addEventListener ('click',()=> hadlyPopupOpenButton(popupEdForm),()=>{
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;  
}
)
profileCloseButtonNode.addEventListener('click', ()=> handlePopupCloseButton (popupEdForm));
formElement.addEventListener('submit', formSubmitHandler);

//Открытие и закрытие поп-апа с добавление мест
popImageAddCloseButton.addEventListener('click', ()=> handlePopupCloseButton(popupAddImage));
imageAddButton.addEventListener('click', ()=> hadlyPopupOpenButton(popupAddImage))

//закрытие поп-апа с изображением
closeButtonPopupImage.addEventListener('click', ()=> handlePopupCloseButton(popupImageBig));


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
    newItem.querySelector('.element__image').addEventListener('click', (event) => {
            hadlyPopupOpenButton(popupImageBig)
            const popupCard = event.target.closest('.element')
            const popupPicture = popupCard.querySelector('.element__image')
            let popupDescription = popupCard.querySelector('.element__title')
            const imagePopup = document.querySelector('.popup__image')
            const titlePopup = document.querySelector('.popup__title')
            imagePopup.src = popupPicture.src
            titlePopup.textContent = popupDescription.textContent
            imagePopup.alt = popupDescription.textContent
        })
        
    return newItem;  
}
//Сохранение новых картинок
const imageAddSubmitButton = document.querySelector('.popup__submit-button-add');
imageAddSubmitButton.addEventListener('click',addImage);
readerList()

function addImage(event){
    event.preventDefault();
    const newLink = linkInput.value;
    const newTitle = placeInput.value;
    const newItem = composeItem({name: newTitle, link: newLink});
    listCardsElement.prepend(newItem);
    fornAdd.reset()
    handlePopupCloseButton(popupAddImage)
}

