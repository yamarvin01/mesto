export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(settings.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      settings.submitButtonSelector
    );
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  // Метод проверяет валидность поля
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Метод, который выводит сообщение об ошибке
  _showInputError = (inputElement, _errorMessage) => {
    const _errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    _errorElement.textContent = _errorMessage;
    _errorElement.classList.add(this._settings.errorClass);
  };

  // Метод, который скрывает сообщение об ошибке
  _hideInputError = (inputElement) => {
    const _errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    _errorElement.classList.remove(this._settings.errorClass);
    _errorElement.textContent = "";
  };

  // Метод принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  _disableSubmitButton() {
    this._buttonElement.disabled = "true";
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
  }

  resetValidation() {
    this._disableSubmitButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  disableSubmitButton() {
    this._disableSubmitButton();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
