import { titleProfile, subtitleProfile } from "../utils/constants.js";

export default class UserInfo {
  constructor({ userName, aboutYourSelf }) {
    this._userName = userName;
    this._aboutYourSelf = aboutYourSelf;

    this._profileTitleElement = document.querySelector('.profile__title');
    this._profileSubtitleElement = document.querySelector('.profile__subtitle');

    console.log('profileTitle: ', this._profileTitleElement);
    console.log('profileSubtitle: ', this._profileSubtitleElement);

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
