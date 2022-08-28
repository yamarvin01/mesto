import {titleProfile, subtitleProfile} from '../utils/constants.js';

export default class UserInfo {
  constructor({userName, aboutYourSelf}) {
    this._userName = userName;
    this._aboutYourSelf = aboutYourSelf;
  }

  getUserInfo() {
    return {userName: this._userName, aboutYourSelf: this._aboutYourSelf};
  }

  setUserInfo({userName, aboutYourSelf}) {
    this._userName = userName;
    this._aboutYourSelf = aboutYourSelf;
    titleProfile.textContent = this._userName;
    subtitleProfile.textContent = this._aboutYourSelf;
  }
}
