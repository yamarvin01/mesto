export default class UserInfo {
  constructor() {
    this._profileTitleElement = document.querySelector('.profile__title');
    this._profileSubtitleElement = document.querySelector('.profile__subtitle');
    this._profileAvatarElement = document.querySelector('.profile__avatar');
    // this._userId
  }

  getUserInfo() {
    this._profileTitle = this._profileTitleElement.textContent;
    this._profileSubtitle = this._profileSubtitleElement.textContent;
    this._profileAvatar = this._profileAvatarElement.src;
    return { name: this._profileTitle, about: this._profileSubtitle, avatar: this._profileAvatar };
  }

  setUserInfo({ name, about, avatar = this._profileAvatarElement.src }) {
    this._profileTitleElement.textContent = name;
    this._profileSubtitleElement.textContent = about;
    this._profileAvatarElement.src = avatar;
  }
}
