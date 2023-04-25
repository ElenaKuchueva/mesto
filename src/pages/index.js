import "./index.css";

import { FormValidator, config } from "../components/FormValidator";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import {
  cards,
  profileEditButton,
  profileAddButton,
  popupEditForm,
  popupEditFormUserNameInput,
  popupEditFormOccupationInput,
  popupAddform,
} from "../utils/constants.js";

//валидация
//создание нового экземпляра валидации для формы изменения профиля
const validationPopupEditForm = new FormValidator(config, popupEditForm);
validationPopupEditForm.enableValidation();

//создание нового экземпляра валидации для формы добавлени карточки
const validationPopupAddform = new FormValidator(config, popupAddform);
validationPopupAddform.enableValidation();

//получаем экземпляр с данными о пользователе
const userInfo = new UserInfo({
  name: ".profile__title",
  occupation: ".profile__subtitle",
});

const userInfoPopup = new PopupWithForm({
  popupSelector: "#popupEdit",
  handleFormSubmit: ({ name, occupation }) => {
    userInfo.setUserInfo({ name, occupation });
  },
});

//обрабатываем нажатие на кнопку открытия формы редактирования профиля
profileEditButton.addEventListener("click", function () {
  validationPopupEditForm.resetValidation();
  userInfoPopup.open();
  const user = userInfo.getUserInfo();
  userInfoPopup.setInputValues(user);
});
userInfoPopup.setEventListeners();

//создать экземпляр попапа открытия картинки
const popupImage = new PopupWithImage("#fullImage");
popupImage.setEventListeners();

//coздать экзкмпляр попапа добавления карточки
const newCardPopup = new PopupWithForm({
  popupSelector: "#popupAdd",
  handleFormSubmit: handleFormAddSubmit,
});
newCardPopup.setEventListeners();

//создать экземпляр новой карточки
const section = new Section(
  {
    cards: cards,
    renderer: renderNewCard,
  },
  ".elements"
);
//вывести первые 6 карточек
section.renderFirstCards();

//создать новую карточку
function createCard(cardElement) {
  const card = new Card(
    cardElement,
    "#card",
    popupImage.open
  );
  const cardGenerate = card.generateCard();
  return cardGenerate;
}

//при отправке формы подставить значения в новую карточку, добавить на страницу и закрыть попап
function handleFormAddSubmit({ place, link }) {
  const cardElement = createCard({
    name: place,
    link: link,
  });
  section.addCard(cardElement);
  newCardPopup.close();
}

//вставить новую карточку в разметку
function renderNewCard(cardElement) {
  const newCard = createCard(cardElement);
  section.addCard(newCard);
}

// открыть форму для создания новой карточки
profileAddButton.addEventListener("click", () => {
  validationPopupAddform.resetValidation();
  newCardPopup.open();
});
