import { Popup } from "./Popup";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".fields");
    this._inputList = this._popupForm.querySelectorAll(".field");
  }

  _getInputValues() {
    const formInfo = {};
    this._inputList.forEach((input) => (formInfo[input.name] = input.value));
    return formInfo;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const imputValues = this._getInputValues();
      this._handleFormSubmit(imputValues);
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export { PopupWithForm };
