let profileButtonNode = document.querySelector('.profile__button-edit')
let popupNode = document.querySelector('.popup')
let profileCloseButtonNode = document.querySelector('.popup__close-button')
let formElement = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let nameInput = document.querySelector('.popup__field-name');
let jobInput = document.querySelector('.popup__field-job'); 

profileButtonNode.addEventListener ('click',
function () {
    popupNode.classList.add('popup__opened');
}
);


profileCloseButtonNode.addEventListener('click', handlePopupCloseButton)

function handlePopupCloseButton() {
    popupNode.classList.remove('popup__opened');

};

formElement.addEventListener('submit', formSubmitHandler);

function getProfileInfo(){
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

}

getProfileInfo()
function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    handlePopupCloseButton();
}
