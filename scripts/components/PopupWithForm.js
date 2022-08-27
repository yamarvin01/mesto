import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // Кроме селектора попапа принимает в конструктор колбэк сабмита формы
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    console.log(submitForm);
  }

  _getInputValues() {} // Приватный метод, который собирает данные всех полей формы

  setEventListeners() {} // Перезаписывает родительский метод
  //должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы

  close() {
    super.close();
  } // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться
}

// Для каждого попапа создавайте свой экземпляр класса PopupWithForm
