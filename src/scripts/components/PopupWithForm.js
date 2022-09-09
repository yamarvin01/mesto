import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._btnSubmit = this._form.querySelector('.popup__button_type_submit');
  }

  _getInputValues() {
    let inputValues = {};
    this._inputList.forEach((element) => {
      inputValues[element.name] = element.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._btnSubmit.textContent = 'Сохранение...';
      const inputValues = this._getInputValues();
      this._submitForm(inputValues);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
