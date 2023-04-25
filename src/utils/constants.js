export const cards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "горы",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Зимний лес вокруг озера",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Вечерние многоэтажки",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Гора",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Пустая жеолезная дорога",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Озеро подо льдом",
  },
];

//профиль
export const profileEditButton = document.querySelector(".profile__edit");
export const profileAddButton = document.querySelector(".profile__add");
//поп-ап: измененить профиля
export const popupEditForm = document.forms["popupEdit-form"];
export const popupEditFormUserNameInput = document.querySelector("#username");
export const popupEditFormOccupationInput =
  document.querySelector("#occupation");
//поп-ап: добавить карточку
export const popupAddform = document.forms["PopupAdd-Form"];

export const config = {
  formSelector: ".fields",
  inputSelector: ".field",
  submitButtonSelector: ".submit",
  inactiveButtonClass: "submit_inactive",
  inputErrorClass: "field_type_error",
  inputMessageErrorClass: "field-message-error_active",
  errorClass: "-message-error",
};
