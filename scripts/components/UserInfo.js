// Класс UserInfo отвечает за управление отображением информации о пользователе на странице
import {titleProfile, subtitleProfile} from '../utils/constants.js';

export default class UserInfo {
  // Принимает в конструктор объект с селекторами двух элементов:
  // элемента имени пользователя и элемента информации о себе
  constructor({userName, aboutYourSelf}) {
    this._userName = userName;
    this._aboutYourSelf = aboutYourSelf;
  }

  // Публичный метод, который возвращает объект с данными пользователя
  // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    console.log('getUserInfo сработал: ', {userName: this._userName, aboutYourSelf: this._aboutYourSelf});
    return {userName: this._userName, aboutYourSelf: this._aboutYourSelf};
  }

  // Содержит публичный метод setUserInfo,
  // который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({userName, aboutYourSelf}) {
    this._userName = userName;
    this._aboutYourSelf = aboutYourSelf;
    console.log('setUserInfo сработал: ', {userName: this._userName, aboutYourSelf: this._aboutYourSelf});
    titleProfile.textContent = this._userName;
    subtitleProfile.textContent = this._aboutYourSelf;
  }
}
