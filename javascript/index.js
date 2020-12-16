let profileButtonNode = document.querySelector('.profile__button-edit')
let popupNode = document.querySelector('.popup')
let profileCloseButtonNode = document.querySelector('.popup__close-button')
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
let popImageAddCloseButton = document.querySelector('.popup__close-button-add')
let placeInput = document.querySelector('.popup__field_value_place')
let linkInput = document.querySelector('.popup__field_value_link')
let fornAdd = document.querySelector('.popup__form_add')
let formAddSubmitButton = document.querySelector('.popup__submit-button_add')
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


function getProfileInfo(){
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

function hadlyPopupOpenButton(popupNode) {
    popupNode.classList.add('popup_opened');
    getProfileInfo()
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

//Поп-ап с изображением
function handliPopupImageOpen (){
    popupImageBig.classList.add('popup_opened'); 
    const bigImage = documend.querySelector('.popup__image')
    const titleImage = documend.querySelector('.popup_title')   
}
//Открытие и закрытие поп-апа с формой
profileButtonNode.addEventListener ('click',()=> hadlyPopupOpenButton(popupEdForm))
profileCloseButtonNode.addEventListener('click', ()=> handlePopupCloseButton (popupEdForm));
formElement.addEventListener('submit', formSubmitHandler);

//Открытие и закрытие поп-апа с добавление мест
popImageAddCloseButton.addEventListener('click', ()=> handlePopupCloseButton(popupAddImage));
imageAddButton.addEventListener('click', ()=> hadlyPopupOpenButton(popupAddImage))


function readerList (){
    const listItems = initialCards.map(composeItem)
  
    listCardsElement.append(...listItems)    
}
//Добавление элементов
function composeItem(item) {
    const templateElement = document.querySelector('.template').content;
    const newItem = templateElement.cloneNode(true);
    newItem.querySelector('.element__image').src = item.link;
    newItem.querySelector('.element__title').textContent = item.name;
    const imageAddSubmitButton = document.querySelector('.popup__submit-button-add');
    imageAddSubmitButton.addEventListener('click',addImage);
    newItem.querySelector('.element__button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__button_active');
    });
    newItem.querySelector('.element__button-delet').addEventListener('click',function (event){
        const targetItem = event.target.closest('.element');
        targetItem.remove();
    })
    newItem.querySelector('.element__image').addEventListener('click', (event) => {
            popupImageBig.classList.add('popup_opened')
            let popupCard = event.target.closest('.element')
            let popupPicture = popupCard.querySelector('.element__image')
            let popupDescription = popupCard.querySelector('.element__title')
            let bigImage = document.querySelector('.popup__image').src = popupPicture.src
            let bigTitle = document.querySelector('.popup__title').textContent = popupDescription.textContent
        })
        
    return newItem;  
}
function handlePopupImageCloseButton(popupImageBig) {
    popupImageBig.classList.remove('popup_opened');
};
const closeButtonPopupImage = document.querySelector('.popup__close-button-img')
closeButtonPopupImage.addEventListener('click', ()=> handlePopupCloseButton(popupImageBig));
readerList()

function addImage(event){
    event.preventDefault();
    const newLink = linkInput.value;
    const newTitle = placeInput.value;
    const newItem = composeItem({name: newTitle, link: newLink});
    listCardsElement.prepend(newItem);
    placeInput.value = ' ';
    linkInput.value = ' ';
    handlePopupCloseButton(popupAddImage)
}

//function showBigImage (){
   // popupImageBig.classList.add('popup_opened') 
   // let popupPicture = document.querySelector('.popup__image') 
    //let popupDescription =document.querySelector('.popup_title')
   // popupPicture = document.querySelector('.element__image').src
    //popupDescription = document.querySelector('.element__title').textContent
//}

//const openBigImage = document.querySelector('.element__image').addEventListener('click', showBigImage)

//newItem.querySelector('.element__image').addEventListener('click', (event) => {
   // popupImageBig.classList.add('popup_opened')
    //let popupPicture = event.target.closest('.element__image')
    //let popupDescription = newItem.querySelector('.element__title')
    //let bigImage = document.querySelector('.popup__image').src = popupPicture.src
    //let bigTitle = document.querySelector('.popup_title').textContent = popupDescription.textContent
//})