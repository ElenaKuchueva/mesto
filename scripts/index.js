const сards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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
const formElement = document.querySelector('.fields');
const userName = document.querySelector('#username');
const occupation = document.querySelector('#occupation');
//поп-ап: добавить карточку
const addPopup = document.querySelector('#addPopup');
//поп-ап: открыть картинку на весь экран


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

//отправить формы
formElement.addEventListener('submit', handleFormSubmit);

//шаблон создания корточки
const elements = document.querySelector('.elements');

function createCard({name,link}) {
  const newCard = document.querySelector('#card').content.cloneNode(true);
  const cardHeading = newCard.querySelector('.element__title');
  cardHeading.textContent = name;
  const cardImage = newCard.querySelector('.element__image');
  cardImage.setAttribute('src', link);
  like();
  deleteCard();
  openFullImage();
  return newCard;
};
сards.forEach(createCard => {addNewCard(createCard);});

//добавление новой карточки
function addNewCard(){
  const newCard = createCard();
  elements.prepend(newCard);
};

// открыть форму для создания новой карточки
AddProfileButton.addEventListener ('click', ()=> {
  addPopup.classList.add('popup_opened');
});

//закрыть форму для создания новой карточки
function closeAddProfile() {
  addPopup.classList.remove('popup_opened');
};

buttonCLoseAddProfile = document.querySelector('.popup__close_addPopup');
buttonCLoseAddProfile.addEventListener('click',closeAddProfile);

//форма для создания новой карточки
function handleFormEddSubmit (evt) {
evt.preventDefault();
addNewCard();
evt.target.reset();
closeAddProfile();
};
//отправка формы
const popupButtonSabmit = document.querySelector('.submit_addPopup');
popupButtonSabmit.addEventListener('submit', handleFormEddSubmit);

//удаление карточки
function deleteCard() {
  const delate = document.querySelector('.element__delate');
  delate.addEventListener('click', () => {
  const delateElement = delate.closest ('.element');
  delateElement.remove();
});
};

//лайк
function like(){
  const icon = document.querySelector('.element__icon');
  icon.addEventListener('click', (evt) => {
  const eventTarget = evt.target;
  eventTarget.classList.toggle("element__icon_active");
});
};

//открыть поп-ап для картинки
const popupImage = document.querySelector('#fullImage');
function openPopupImage () {
  popupImage.classList.add('popup_opened');
};

//закрыть поп-ап для картинки
function closePopupImage() {
  popupImage.classList.remove('popup_opened');
};

//поп-ап - открыть картинку карточки
function openFullImage () {
  const cardImage = document.querySelector('.element__image');
  cardImage.addEventListener('click', (evt) => {
    openPopupImage ();
    const popupImageCard = document.querySelector('.popup__image');
    popupImageCard.src = evt.target.src;
    const popupImageTitle = document.querySelector('.popup__title');
    const cardHeading = document.querySelector('.element__title');
    popupImageTitle.textContent = cardHeading.textContent;
  });
};
closeImageButton = document.querySelector('.popup__container_full-image');
closeImageButton.addEventListener ('click',closePopupImage);