import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector,handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.fields');
    this._inputList = this._popupForm.querySelectorAll('.field');
    this._submitButton = this._popupForm.querySelector('.submit');
    this._submitButtonTextContent = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => inputValues[input.name] = input.value);
    return inputValues;
  };

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  loadingOnPage(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    }
    else {
      this._submitButton.textContent = this._submitButtonTextContent;
    }
  }

}