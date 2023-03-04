//профиль
const editProfileButton = document.querySelector('.profile__edit');
const AddProfileButton = document.querySelector('.profile__add');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
//поп-ап: измененить профиля
const editPopup = document.querySelector('#editPopup');
const popupClose = document.querySelector('.popup__close');
const formElement = document.querySelector('.fields');
const userName = document.querySelector('#username');
const occupation = document.querySelector('#occupation');
//поп-ап: добавить карточку
const addPopup = document.querySelector('#addPopup');
const place = document.querySelector('#place');
const link = document.querySelector('#link');
//поп-ап: открыть картинку на весь экран
const popupImage = document.querySelector('.popup-image');
const popupImageCard = document.querySelector('.popup-image__image');
const popupImageTitle = document.querySelector('.popup-image__title');

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

//шаблон создания корточки
const elements = document.querySelector('.elements');

const createCard = function (card) {
  const newCard = document.querySelector('#card').content.cloneNode(true);
  const cardHeading = newCard.querySelector('.element__title');
  cardHeading.textContent = card.name;
  const cardImage = newCard.querySelector('.element__image');
  cardImage.setAttribute('src',card.link);
  elements.prepend(newCard);
  //deleteCard;
  like();
  //openFullImage;
  //return newCard;
};
сards.forEach(createCard);

//удаление карточки
const delate = document.querySelector('.element__delate');
const deleteCard = delate.addEventListener('click', () => {
  const delateElement = delate.closest ('.element');
  delateElement.remove();
});

//лайк
const icon = document.querySelector('.element__icon');
function like(){
  icon.addEventListener('click', (evt) => {
  const eventTarget = evt.target;
  eventTarget.classList.toggle("element__icon_active");
});
} 

// открыть форму для создания новой карточки
AddProfileButton.addEventListener ('click', ()=> {
  addPopup.classList.add('popup_opened');
});

//добавить новую карточку
//function handleFormEddSubmit (evt) {
//evt.preventDefault();
//createCard();
//close();
//};
//formElement.addEventListener('submit', handleFormEddSubmit);

//поп-ап - открыть картинку карточки
//function openPopupImage () {
//popupImage.classList.add('popup-image_opened');
//popupImageCard.src = 
//popupImageTitle.textContent = 
//};
//const openFullImage = popupImageCard.addEventListener('click', openPopupImage());

//const renderCard = ({name,link}) => {
//createCard;
//elements.prepend(newCard);
//};
