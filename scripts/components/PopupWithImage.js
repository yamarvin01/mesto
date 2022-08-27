import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popup = document.querySelector(this._selectorPopup);
  }

  open({imageTitle, imageLink}) {
    this._popup.querySelector('.popup__text').textContent = imageTitle;
    this._popup.querySelector('.popup__image').src = imageLink;
    this._popup.querySelector('.popup__image').alt = "Изображение: " + imageTitle;
    super.open();
  }
}
