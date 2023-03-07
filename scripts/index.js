const cards = [
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
const popupEditCloseButton = document.querySelector('.popup__close');
const popupEditForm = document.forms['popupEdit-form'];
const popupEditFormUserNameInput = document.querySelector('#username');
const popupEditFormOccupationInput = document.querySelector('#occupation');
//поп-ап: добавить карточку
const popupAdd = document.querySelector('#popupAdd');
const popupAddform = document.forms['PopupAdd-Form'];
const PopupAddCloseButton = document.querySelector('.popup__close_popupAdd');
const popupAddNewPlaceInput = document.querySelector('#newPlace');
const popupAddLinkInput = document.querySelector('#link');
//поп-ап: открыть картинку на весь экран
const popupImage = document.querySelector('#fullImage');
const popupImageCloseButton = document.querySelector('.popup__close_full-image');
const popupImagePic = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__title');
//шаблон создания корточки
const elements = document.querySelector('.elements');

//шаблон: открыть любой поп-ап
function openPopup(popup) {
  popup.classList.add('popup_opened');
};
//шаблон: закрыть любой  поп ап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

//удаление карточки
function setDeleteHandler(element) {
  const delate = element.querySelector('.element__delate');
  delate.addEventListener('click', () => {
    const delateElement = delate.closest('.element');
    delateElement.remove();
  });
};

//лайк
function setLikeHandler(element) {
  const icon = element.querySelector('.element__icon');
  icon.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("element__icon_active");
  });
};

//шаблон карточки
function createCard({ name, link, alt }) {
  const card = document.querySelector('#card').content.cloneNode(true);
  const cardHeading = card.querySelector('.element__title');
  cardHeading.textContent = name;
  const cardImage = card.querySelector('.element__image');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', alt);
  setLikeHandler(card);
  setDeleteHandler(card);
  setOpenFullImageHandler(card, name, link, alt);
  return card;
};

//добавление новой карточки
const addNewCard = (cardFilling) => {
  const newCard = createCard(cardFilling);
  elements.prepend(newCard);
};

//перебрать карточки и вывести на старте
cards.forEach(addNewCard);

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
PopupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));

//поп-ап - открыть картинку карточки
function setOpenFullImageHandler(element) {
  const cardImage = element.querySelector('.element__image');
  const cardHeading = element.querySelector('.element__title');
  cardImage.addEventListener('click', (evt) => {
    openPopup(popupImage);
    popupImagePic.src = evt.target.src;
    popupImagePic.alt = evt.target.alt;
    popupImageTitle.textContent = cardHeading.textContent;
  });
};
popupImageCloseButton.addEventListener('click', () => closePopup(popupImage));