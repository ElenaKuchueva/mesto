let editProfileButton = document.querySelector('.profile__edit');
let editPopup = document.querySelector('.popup');
let userName = document.querySelector('#username');
let occupation = document.querySelector('#occupation');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.fields');

function close() {
  editPopup.classList.remove('popup_opened');
};

popupClose.addEventListener ('click',close);

editProfileButton.addEventListener ('click', function() {
  editPopup.classList.add('popup_opened');
  userName.value = profileTitle.textContent;
  occupation.value = profileSubtitle.textContent;
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = userName.value;
  profileSubtitle.textContent = occupation.value;
  close();
};
formElement.addEventListener('submit', handleFormSubmit);