let profileButtonNode = document.querySelector('.profile__button-edit')
let popupNode = document.querySelector('.popup')
let profileCloseButtonNode = document.querySelector('.popup__close-button')
let formElement = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let nameInput = document.querySelector('.popup__field_value_name');
let jobInput = document.querySelector('.popup__field_value_job'); 

function getProfileInfo(){
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

function hadlyPopupOpenButton() {
    popupNode.classList.add('popup_opened');
    getProfileInfo()
};

function handlePopupCloseButton() {
    popupNode.classList.remove('popup_opened');

};

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    handlePopupCloseButton();
};

profileButtonNode.addEventListener ('click', hadlyPopupOpenButton)
profileCloseButtonNode.addEventListener('click', handlePopupCloseButton);
formElement.addEventListener('submit', formSubmitHandler);