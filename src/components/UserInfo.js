const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const profileAvatar = document.querySelector('.profile__avatar')

export default class UserInfo {
    constructor(profileName,profileJob,profileAvatar){
this._profileName = profileName
this._profileJob = profileJob
this._profileAvatar = profileAvatar
}

getUserInfo() {
    return {
    nameInput: this._profileName.textContent,
    jobInput: this._profileJob.textContent,
    inputAvatar: this._profileAvatar.style.backgroundImage
}
}

setUserInfo ({nameInput,jobInput,inputAvatar}){
this._profileName.textContent = nameInput;
this._profileJob.textContent = jobInput;
this._profileAvatar.style.backgroundImage = `url(${inputAvatar})`;
}
}
