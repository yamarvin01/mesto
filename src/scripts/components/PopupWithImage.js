import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._textElement = this._popup.querySelector(".popup__text");
    this._imageElement = this._popup.querySelector(".popup__image");
  }

  open({ imageTitle, imageLink }) {
    this._textElement.textContent = imageTitle;
    this._imageElement.src = imageLink;
    this._imageElement.alt = "Изображение: " + imageTitle;
    super.open();
  }
}
