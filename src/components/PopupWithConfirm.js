import { Popup } from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".fields");
    this._submitButton = this._popupForm.querySelector(".submit");
  }

  handleConfirm(del) {
    this._handleSubmit = del;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this._handleSubmit();
    });
    super.setEventListeners();
  }
}

export {PopupWithConfirm};
