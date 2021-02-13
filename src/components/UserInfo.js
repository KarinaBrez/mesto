const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')

export default class UserInfo {
    constructor(profileName,profileJob){
this._profileName = profileName
this._profileJob = profileJob
    }

getUserInfo(nameInput,jobInput) {
    nameInput.value = this._profileName.textContent;
    jobInput.value = this._profileJob.textContent;  

}
setUserInfo ({nameInput,jobInput}){
this._profileName.textContent = nameInput.value;
this._profileJob.textContent = jobInput.value;
}
}
