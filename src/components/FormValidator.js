import { config } from "../utils/constants.js";

class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this.formElement = formElement;

    this._inputList = Array.from(
      this.formElement.querySelectorAll(this.config.inputSelector)
    );
    this._buttonElement = this.formElement.querySelector(
      this.config.submitButtonSelector
    );
  }

  //показать ошибку валидации
  _showInputError(inputElement, errorMessage) {
    const fieldErrorMessage = this.formElement.querySelector(
      `.${inputElement.id}${this.config.errorClass}`
    );
    inputElement.classList.add(this.config.inputErrorClass);
    fieldErrorMessage.textContent = errorMessage;
    fieldErrorMessage.classList.add(this.config.inputMessageErrorClass);
  }

  //скрыть ошибку валидации
  _hideInputError(inputElement) {
    const fieldErrorMessage = this.formElement.querySelector(
      `.${inputElement.id}${this.config.errorClass}`
    );
    inputElement.classList.remove(this.config.inputErrorClass);
    fieldErrorMessage.classList.remove(this.config.inputMessageErrorClass);
    fieldErrorMessage.textContent = "";
  }

  //проверить на валидность
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //проверка на невалидность полей
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //неактивная кнопка формы
  _disabledFormButton() {
    this._buttonElement.classList.add(this.config.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  //активная кнопка формы
  _enabledFormButton() {
    this._buttonElement.classList.remove(this.config.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  //изменить цвета кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disabledFormButton();
    } else {
      this._enabledFormButton();
    }
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    this._toggleButtonState();

    this.formElement.addEventListener("reset", () => {
      this._disabledFormButton();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //добавить всем формам слушатель
  enableValidation() {
    this._setEventListeners();
  }
}
export { FormValidator, config };
