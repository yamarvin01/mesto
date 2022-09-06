import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._btnSubmit = this._popup.querySelector('.popup__button_type_submit');
  }

  setEventListeners() {
    super.setEventListeners();
    this._btnSubmit.addEventListener('click', (evt) => {
      console.log(1);
      this.close();
    });
  }
}
