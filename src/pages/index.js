import "./index.css";

import { FormValidator, config } from "../components/FormValidator";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import  { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import { Api } from "../components/Api.js";
import {
  profileEditButton,
  profileAddButton,
  profileAditAvatarButton,
  popupEditForm,
  popupAddform,
  popupEditAvatarForm
} from "../utils/constants.js";


//--------------------------------
//          Валидация
//--------------------------------

//создание нового экземпляра валидации для формы изменения профиля
const validationPopupEditForm = new FormValidator(config, popupEditForm);
validationPopupEditForm.enableValidation();

//создание нового экземпляра валидации для формы добавлени карточки
const validationPopupAddform = new FormValidator(config, popupAddform);
validationPopupAddform.enableValidation();

const validationPopupEditAvatarForm = new FormValidator(config, popupEditAvatarForm);
validationPopupEditAvatarForm.enableValidation();


//---------------------------------
//           Карточки
//---------------------------------

//экземпляр класса Api
const api = new Api("https://mesto.nomoreparties.co/v1/cohort-65/", {
  authorization: "96facf9d-e199-4449-9f73-b185bc2a61b7",
  "Content-Type": "application/json",
});

Promise.all([api.getInitialCards(), api.getInitialUserInfo()])
  .then(([cardData, userInfoData]) => {
    section.renderFirstCards(cardData);
    userInfo.setUserInfo(userInfoData);
  })
  .catch((err) => console.log(err));

//создание новой картинки
function createCard(data) {
  const card = new Card(
    {
      data: data,
      userId: userInfo.getUserId(),
      handlerImageClick: (link, name) => {
        popupImage.open(link, name);
      },
    
     handlerDeleteCard: () => {
      сonfirmPopup.open();
      сonfirmPopup.handleConfirm(() => {
          api.deleteCard(card.getId())
              .then(() => {
                  card.deleteCard();
                  сonfirmPopup.close();
              })
              .catch((err) => console.log(err))
      })
    },
    handlerLikeClick: () => {
      if (card.isLiked){
      api
        .deleteLike(card.getId())
        .then(likes => {
          card.deleteLike();
          card.countTotalLike(likes);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .addLike(card.getId())
        .then(likes => {
          card.addLike();
          card.countTotalLike(likes);
        })
        .catch((err) => console.log(err));
    }
  },
    },
    "#card"
  );
  return card.generateCard();
}

//
const section = new Section(
  {
    renderer: (data) => {
      const newCard = createCard(data);
      section.addCard(newCard);
    },
  },
  ".elements"
);


//экземпляр попапа подтвержнения удаления карточки
const сonfirmPopup = new PopupWithConfirm("#popupConfirm");
сonfirmPopup.setEventListeners();



//открыть форму для создания новой карточки
profileAddButton.addEventListener("click", () => {
  validationPopupAddform.resetValidation();
  newCardPopup.open();
});


//экземпляр поп-апа для загрузки новой карточки на страницу
const newCardPopup = new PopupWithForm(
  "#popupAdd",
  handleAddNewCardFormSubmit);

//обработка информации о новой карточке
function handleAddNewCardFormSubmit(data) {
  newCardPopup.loadingOnPage(true);
  api
    .postNewCard(data)
      .then((res) => {
        section.addCard(createCard(res));
      })
        .catch((err) => console.log(err))
          .finally(() => {
            newCardPopup.loadingOnPage(false);
            newCardPopup.close();
          });
}

newCardPopup.setEventListeners();


//---------------------------------
//  Поп-ап: увеличенная картинка
//---------------------------------

//экземпляр попапа открытия картинки
const popupImage = new PopupWithImage("#fullImage");
popupImage.setEventListeners();


//----------------------------------
//  Поп-ап: изменение данных профиля
//----------------------------------

//Открыть поп-ап редактирования профиля
profileEditButton.addEventListener("click", function () {
  validationPopupEditForm.resetValidation();
  userInfoPopup.open();
  const user = userInfo.getUserInfo();
  userInfoPopup.setInputValues(user);
});

//экземпляр с данными о пользователе
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".avatar"
);


//экземпляр поп-апа новой информации о пользователе
const userInfoPopup = new PopupWithForm(
  "#popupEdit", 
  handleUserInfoFormSubmit);

//обработка информации о пользователе
function handleUserInfoFormSubmit(data) {
  userInfoPopup.loadingOnPage(true);
  api
    .changeValuesUserInfo(data)
      .then((res) => userInfo.setUserInfo(res))
        .catch((err) => console.log(err))
          .finally(() => {
            userInfoPopup.loadingOnPage(false);
            userInfoPopup.close();
    });
}
userInfoPopup.setEventListeners();


//--------------------------------
//   Поп-ап: изменение аватара
//--------------------------------

//Открыть поп-ап изменения аватара
profileAditAvatarButton.addEventListener("click", () => {
  validationPopupEditAvatarForm.resetValidation();
  avatarPopup.open();
});

//экземпляр поп-апа для загрузки нового аватара
const avatarPopup = new PopupWithForm(
  "#PopupAvatar",
  handleAvatarPopupFormSubmit
);

//обработка изменения аватара
function handleAvatarPopupFormSubmit(data) {
  avatarPopup.loadingOnPage(true);
  api
    .changeAvatar(data)
      .then((res) => userInfo.setUserInfo(res))
        .catch((err) => console.log(err))
          .finally(() => {
            avatarPopup.loadingOnPage(false);
            avatarPopup.close();
          });
}

avatarPopup.setEventListeners();


