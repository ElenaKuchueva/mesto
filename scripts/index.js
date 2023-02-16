let editProfileButton = document.querySelector('.profile__button');
let editPopup = document.querySelector('.popup');
let userName = document.querySelector('#username');
let occupation = document.querySelector('#occupation');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

editProfileButton.addEventListener ('click', function() {
  editPopup.classList.add('popup_opened');
  userName.value = profileTitle.textContent;
  occupation.value = profileSubtitle.textContent;
});

let popupClose = document.querySelector('.popup__close');

popupClose.addEventListener ('click',function() {
  editPopup.classList.remove('popup_opened');
});


let formElement = document.querySelector('.fields');
function handleFormSubmit (evt) {
  evt.preventDefault();

 let valueUserName = userName.value;
 let valueOccupation = occupation.value;

  profileTitle.textContent = valueUserName;
  profileSubtitle.textContent = valueOccupation;
};
formElement.addEventListener('submit', handleFormSubmit);