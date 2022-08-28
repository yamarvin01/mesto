import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // Кроме селектора попапа принимает в конструктор колбэк сабмита формы
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._btnSubmit = this._form.querySelector('.popup__button_type_submit');
  }

  // Приватный метод, который собирает данные всех полей формы
  _getInputValues() {
    let inputValues = {};
    this._inputList.forEach( (element, index) => {
      inputValues[index] = element.value;
    });
    return inputValues;
  }

  // Перезаписывает родительский метод
  // должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._submitForm(inputValues);
    });
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться
  close() {
    super.close();
    this._form.reset();
  }
}
