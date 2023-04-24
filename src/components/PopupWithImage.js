import { Popup } from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = document.querySelector(".popup__image");
    this._popupImageTitle = document.querySelector(".popup__title");
  }

  open = (name, link) => {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageTitle.textContent = name;
  };
}

export { PopupWithImage };
