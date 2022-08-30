export default class UserInfo {
  constructor() {
    this._profileTitleElement = document.querySelector('.profile__title');
    this._profileSubtitleElement = document.querySelector('.profile__subtitle');
  }

  getUserInfo() {
    this._profileTitle = this._profileTitleElement.textContent;
    this._profileSubtitle = this._profileSubtitleElement.textContent;
    return { userName: this._profileTitle, aboutYourSelf: this._profileSubtitle };
  }

  setUserInfo({ userName, aboutYourSelf }) {
    this._profileTitleElement.textContent = userName;
    this._profileSubtitleElement.textContent = aboutYourSelf;
  }
}
