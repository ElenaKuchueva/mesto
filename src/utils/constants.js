//профиль
export const profileEditButton = document.querySelector(".profile__edit");
export const profileAddButton = document.querySelector(".profile__add");
export const profileAditAvatarButton = document.querySelector(".edit-avatar");
//поп-ап: измененить профиля
export const popupEditForm = document.forms["popupEdit-form"];
//поп-ап: добавить карточку
export const popupAddform = document.forms["PopupAdd-Form"];
//поп-ап: изменить аватар
export const popupEditAvatarForm = document.forms["PopupChangeAvatar-form"];

export const config = {
  formSelector: ".fields",
  inputSelector: ".field",
  submitButtonSelector: ".submit",
  inactiveButtonClass: "submit_inactive",
  inputErrorClass: "field_type_error",
  inputMessageErrorClass: "field-message-error_active",
  errorClass: "-message-error",
};
