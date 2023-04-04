import {FormValidator, validation} from './FormValidator.js';
import {Card} from './Card.js';

export const cards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'горы'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Зимний лес вокруг озера'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Вечерние многоэтажки'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Гора'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Пустая жеолезная дорога'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Озеро подо льдом'
  }
];

//профиль
const profileEditButton = document.querySelector('.profile__edit');
const profileAddButton = document.querySelector('.profile__add');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
//поп-ап: измененить профиля
const popupEdit = document.querySelector('#popupEdit');
const popupEditCloseButton = document.querySelector('.popup__close_popup-edit');
const popupEditForm = document.forms['popupEdit-form'];
const popupEditFormUserNameInput = document.querySelector('#username');
const popupEditFormOccupationInput = document.querySelector('#occupation');
//поп-ап: добавить карточку
const popupAdd = document.querySelector('#popupAdd');
const popupAddform = document.forms['PopupAdd-Form'];
const popupAddCloseButton = document.querySelector('.popup__close_popup-add');
const popupAddNewPlaceInput = document.querySelector('#newPlace');
const popupAddLinkInput = document.querySelector('#link');
//поп-ап: открыть картинку на весь экран
const popupImage = document.querySelector('#fullImage');
const popupImageCloseButton = document.querySelector('.popup__close_full-image');
const popupImagePic = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__title');
//шаблон создания корточки
const elements = document.querySelector('.elements');

//обработать событие нажатие кнопки Esc
function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// //обработать событие клика по overlay
// function closeOverlayPopup(evt) {
//   if (evt.target.classList.contains('popup')) {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// };

//обработать событие клика по overlay
function closeOverlayPopup(evt) {
  if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
};

//шаблон: открыть любой поп-ап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup);
  document.addEventListener('mousedown', closeOverlayPopup);
};

//обработчик клика по картинке карточки
const handlerImageClick = (name, link) => {
  popupImageTitle.textContent = name;
  popupImagePic.src = link;
  popupImagePic.alt = name;
  openPopup(popupImage);
  
};
//шаблон: закрыть любой  поп ап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup);
  document.removeEventListener('mousedown', closeOverlayPopup);
};

//открыть поп-апа изменения профиля
profileEditButton.addEventListener('click', function () {
  openPopup(popupEdit);
  popupEditFormUserNameInput.value = profileTitle.textContent;
  popupEditFormOccupationInput.value = profileSubtitle.textContent;
});
//закрыть поп-ап изменения профиля
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));

// форма изменения профиля пользователя
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupEditFormUserNameInput.value;
  profileSubtitle.textContent = popupEditFormOccupationInput.value;
  closePopup(popupEdit);
};
popupEditForm.addEventListener('submit', handleProfileFormSubmit);

// //добавить новую карточку
// const addNewCard = (card) => {
//   const cardGenerate = new Card(card, "#card", handlerImageClick);
//   const newCard = cardGenerate.generateCard();
//   elements.prepend(newCard);
// };

function createCard(cardElement) {
  const card = new Card(cardElement, "#card", handlerImageClick);
  const cardGenerate = card.generateCard();
  return cardGenerate;
};

const addNewCard = (cardElement) => {
  const newCard = createCard(cardElement);
  elements.prepend(newCard);
};

//перебрать карточки и вывести на старте
cards.forEach(cardElement => addNewCard(cardElement));

//форма для создания новой карточки
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  addNewCard(
    {
      name: popupAddNewPlaceInput.value,
      link: popupAddLinkInput.value
    });
  evt.target.reset();
  closePopup(popupAdd);
};
popupAddform.addEventListener('submit', handleFormAddSubmit);

// открыть форму для создания новой карточки
profileAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
});
// закрыть форму для создания новой карточки
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
// закрыть поп-ап с картинкой
popupImageCloseButton.addEventListener('click', () => closePopup(popupImage));