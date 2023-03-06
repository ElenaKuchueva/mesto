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
const editProfileButton = document.querySelector('.profile__edit');
const AddProfileButton = document.querySelector('.profile__add');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
//общий поп-ап
const popup = document.querySelector('.popup');
//поп-ап: измененить профиля
const editPopup = document.querySelector('#editPopup');
const popupClose = document.querySelector('.popup__close');
const form = document.querySelector('.fields');
const userName = document.querySelector('#username');
const occupation = document.querySelector('#occupation');
//поп-ап: добавить карточку
const addPopup = document.querySelector('#addPopup');
const formAddPopup = document.querySelector('.fields__addPopup');
const buttonCLoseAddProfile = document.querySelector('.popup__close_addPopup');
//поп-ап: открыть картинку на весь экран
const popupImage = document.querySelector('#fullImage');
const closeImageButton = document.querySelector('.popup__close_full-image');
//шаблон создания корточки
const elements = document.querySelector('.elements');

//шаблон: закрыть поп-ап
function close() {
  editPopup.classList.remove('popup_opened');
};

//закрыть поп-ап
popupClose.addEventListener ('click',close);

//открыть поп-апа
editProfileButton.addEventListener ('click', function() {
  editPopup.classList.add('popup_opened');
  userName.value = profileTitle.textContent;
  occupation.value = profileSubtitle.textContent;
});

//шаблон: обработчик события - заполнение формы профиля пользователя
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = userName.value;
  profileSubtitle.textContent = occupation.value;
  close();
};
form.addEventListener('submit', handleFormSubmit);

//удаление карточки
function deleteCard(element) {
  const delate = element.querySelector('.element__delate');
  delate.addEventListener('click', () => {
  const delateElement = delate.closest ('.element');
  delateElement.remove();
});
};

//лайк
function like(element){
  const icon = element.querySelector('.element__icon');
  icon.addEventListener('click', (evt) => {
  const eventTarget = evt.target;
  eventTarget.classList.toggle("element__icon_active");
});
};

//шаблон карточки
function createCard({name,link,alt}) {
  const card = document.querySelector('#card').content.cloneNode(true);
  const cardHeading = card.querySelector('.element__title');
  cardHeading.textContent = name;
  const cardImage = card.querySelector('.element__image');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', alt);
  like(card);
  deleteCard(card);
  openFullImage(card);
  return card;
};

//добавление новой карточки
const addNewCard = (cardFilling) =>{
  const newCard = createCard(cardFilling);
  elements.prepend(newCard);
};

//перебрать карточки и вывести на старте
cards.forEach(function(createCard) {
  addNewCard(createCard);
});

//форма для создания новой карточки
function handleFormEddSubmit (evt) {
  evt.preventDefault();
const addPopupInputNewPlace = document.querySelector('#newPlace');
const addPopupInputLink = document.querySelector('#link');
addNewCard(
  {name: addPopupInputNewPlace.value,
   link: addPopupInputLink.value
  });
evt.target.reset();
closeAddProfile();
};
//отправка формы
formAddPopup.addEventListener('submit', handleFormEddSubmit);

// открыть форму для создания новой карточки
AddProfileButton.addEventListener ('click', ()=> {
  addPopup.classList.add('popup_opened');
});

//закрыть форму для создания новой карточки
function closeAddProfile() {
  addPopup.classList.remove('popup_opened');
};
buttonCLoseAddProfile.addEventListener('click',closeAddProfile);


//открыть поп-ап для картинки
function openPopupImage () {
  popupImage.classList.add('popup_opened');
};

//закрыть поп-ап для картинки
function closePopupImage() {
  popupImage.classList.remove('popup_opened');
};

//поп-ап - открыть картинку карточки
function openFullImage (element) {
  const cardImage = element.querySelector('.element__image');
  const cardHeading = element.querySelector('.element__title');
  cardImage.addEventListener('click', (evt) => {
    openPopupImage ();
    const popupImageCard = document.querySelector('.popup__image');
    popupImageCard.src = evt.target.src;
    const popupImageTitle = document.querySelector('.popup__title');
    popupImageTitle.textContent = cardHeading.textContent;
  });
};
closeImageButton.addEventListener ('click',closePopupImage);