import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(selectorPopup, handlePopupDeleteCardClick) {
    super(selectorPopup);
    this._btnSubmit = this._popup.querySelector(".popup__button_type_submit");
    this._handlePopupDeleteCardClick = handlePopupDeleteCardClick;
    this._cardElement = null;
  }

  open(cardElement) {
    super.open();
    this._cardElement = cardElement;
  }

  close() {
    super.close();
    this._cardElement = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._btnSubmit.addEventListener("click", () => {
      this._handlePopupDeleteCardClick(this._cardElement);
    });
  }
}
