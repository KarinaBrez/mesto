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
    userName: this._profileName.textContent,
    userDescription: this._profileJob.textContent,
    userAvatar: this._profileAvatar.style.backgroundImage
}
}

setUserInfo ({userName, userDescription, userAvatar}){
if (userName) this._profileName.textContent = userName;
if (userDescription) this._profileJob.textContent = userDescription;
if (userAvatar) this._profileAvatar.style.backgroundImage = `url(${userAvatar})`;
}
}
