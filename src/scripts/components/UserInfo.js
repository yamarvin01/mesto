export default class UserInfo {
  constructor() {
    this._profileTitleElement = document.querySelector(".profile__title");
    this._profileSubtitleElement = document.querySelector(".profile__subtitle");
    this._profileAvatarElement = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
    this._profileTitle = this._profileTitleElement.textContent;
    this._profileSubtitle = this._profileSubtitleElement.textContent;
    this._profileAvatar = this._profileAvatarElement.src;
    return {
      name: this._profileTitle,
      about: this._profileSubtitle,
      avatar: this._profileAvatar,
      _id: this._id,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._profileTitleElement.textContent = name;
    this._profileSubtitleElement.textContent = about;
    this._profileAvatarElement.src = avatar;
    this._id = _id;
  }
}
