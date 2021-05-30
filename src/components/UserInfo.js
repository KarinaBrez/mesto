const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const profileAvatar = document.querySelector('.profile__avatar')

export default class UserInfo {
    constructor(profileName,profileJob,profileAvatar){
this._profileName = profileName
this._profileJob = profileJob
this._profileAvatar = profileAvatar
    }

getUserInfo(nameInput,jobInput,inputAvatar) {
    nameInput.value = this._profileName.textContent;
    jobInput.value = this._profileJob.textContent; 
    inputAvatar.value = this._profileAvatar.style.backgroundImage

}
setUserInfo ({nameInput,jobInput,inputAvatar}){
this._profileName.textContent = nameInput;
this._profileJob.textContent = jobInput;
this._profileAvatar.style.backgroundImage = `url(${inputAvatar})`;
}
}
