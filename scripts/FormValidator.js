export class FormValidator {
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
    return this._inputList.some((_inputElement) => {
      return !_inputElement.validity.valid;
    });
  };

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((_inputElement) => {
      _inputElement.addEventListener("input", () => {
        this._isValid(_inputElement);
        this._toggleButtonState();
      });
    });
  };

  // Метод проверяет валидность поля
  _isValid = (_inputElement) => {
    if (!_inputElement.validity.valid) {
      this._showInputError(_inputElement, _inputElement.validationMessage);
    } else {
      this._hideInputError(_inputElement);
    }
  };

  // Метод, который выводит сообщение об ошибке
  _showInputError = (_inputElement, _errorMessage) => {
    const _errorElement = this._formElement.querySelector(`.${_inputElement.id}-error`);
    _inputElement.classList.add(this._settings.inputErrorClass);
    _errorElement.textContent = _errorMessage;
    _errorElement.classList.add(this._settings.errorClass);
  };

  // Метод, который скрывает сообщение об ошибке
  _hideInputError = (_inputElement) => {
    const _errorElement = this._formElement.querySelector(`.${_inputElement.id}-error`);
    _inputElement.classList.remove(this._settings.inputErrorClass);
    _errorElement.classList.remove(this._settings.errorClass);
    _errorElement.textContent = "";
  };

  // Метод принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", true);
    }
  };

  enableValidation() {
    this._setEventListeners();
  }
}
