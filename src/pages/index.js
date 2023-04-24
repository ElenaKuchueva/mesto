import "./index.css";

import { FormValidator, config } from "../components/FormValidator";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

const cards = [
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
const profileEditButton = document.querySelector(".profile__edit");
const profileAddButton = document.querySelector(".profile__add");
//поп-ап: измененить профиля
const popupEditForm = document.forms["popupEdit-form"];
const popupEditFormUserNameInput = document.querySelector("#username");
const popupEditFormOccupationInput = document.querySelector("#occupation");
//поп-ап: добавить карточку
const popupAddform = document.forms["PopupAdd-Form"];

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

//получаем экземпляр с формой для редактирования данных пользователя
const userInfoPopup = new PopupWithForm({
  popupSelector: "#popupEdit",
  handleFormSubmit: ({ occupation, username }) => {
    userInfo.setUserInfo({ name: username, occupation });
  },
});

//обрабатываем нажатие на кнопку открытия формы редактирования профиля
profileEditButton.addEventListener("click", function () {
  validationPopupEditForm.resetValidation();
  userInfoPopup.open();
  const user = userInfo.getUserInfo();
  popupEditFormUserNameInput.value = user.name;
  popupEditFormOccupationInput.value = user.occupation;
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

function handleFormAddSubmit({ place, link }) {
  const cardElement = createCard({
    name: place,
    link: link,
  });
  section.addCard(cardElement);
  newCardPopup.close();
}

//создать новую карточку
function createCard(cardElement) {
  const card = new Card(
    cardElement,
    "#card",
    popupImage.open,
    ".element__delate"
  );
  const cardGenerate = card.generateCard();
  return cardGenerate;
}

//вставить новую карточку в разметку
function renderNewCard(cardElement) {
  const newCard = createCard(cardElement);
  section.addCard(newCard);
}

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

// открыть форму для создания новой карточки
profileAddButton.addEventListener("click", () => {
  validationPopupAddform.resetValidation();
  newCardPopup.open();
});

