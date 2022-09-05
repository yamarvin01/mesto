export default class UserInfo {
  constructor() {
    this._profileTitleElement = document.querySelector('.profile__title');
    this._profileSubtitleElement = document.querySelector('.profile__subtitle');
    this._profileAvatarElement = document.querySelector('.profile__avatar');
  }

  getUserInfo() {
    this._profileTitle = this._profileTitleElement.textContent;
    this._profileSubtitle = this._profileSubtitleElement.textContent;
    this._profileAvatar = this._profileAvatarElement.src;
    return { userName: this._profileTitle, aboutYourSelf: this._profileSubtitle, avatar: this._profileAvatar };
  }

  setUserInfo({ userName, aboutYourSelf, avatar }) {
    this._profileTitleElement.textContent = userName;
    this._profileSubtitleElement.textContent = aboutYourSelf;
    this._profileAvatarElement.src = avatar;
  }
}
