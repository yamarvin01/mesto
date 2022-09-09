export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._popup = document.querySelector(this._selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      console.log('сработало закрытие popup на ESC');
      this.close();
    }
  }

  open() {
    console.log('popup открылся');
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    console.log('popup закрылся')
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        console.log('сработало закрытие по пустоте вокруг popup');
        this.close();
      }
      if (evt.target.classList.contains("popup__button_type_close")) {
        console.log('сработало закрытие на крестик popup');
        this.close();
      }
    });
  }
}
