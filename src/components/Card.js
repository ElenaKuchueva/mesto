class Card {
  constructor({ data, handlerImageClick, handlerLikeClick, 
    userId, handlerDeleteCard},templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.cardId = data._id;
    this._owner = data.owner._id;
    this._userId = userId;

    this._templateSelector = templateSelector;
    this._element = this._getTemplate();

    this.handlerImageClick = handlerImageClick;
    this.handlerLikeClick = handlerLikeClick;
    this._handlerDeleteCard = handlerDeleteCard;
   

    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__title");
    this._cardButtonDelate = this._element.querySelector(".element__delate");
    this._cardLikeButton = this._element.querySelector(".element__icon");
    this._likeTotal = this._element.querySelector(".element__total-icon");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

//-------------------------------------
//          Лайки
//-------------------------------------

getId() {
  return this.cardId;
}

//Проверить id пользователей
_checkLike() {
  return this._likes.some(like => like._id === this._userId);
}


_changeStatusLike = () => {
  this._likeTotal.textContent = this._likes.length;
  if (this._checkLike()) {
    this.addLike();
  } else {
    this.deleteLike();
  }
}

//Удалить лайк
deleteLike() {
  this._cardLikeButton.classList.remove('element__icon_active');
this.isLiked = false;
}

//Добавить лайк
addLike() {
  this._cardLikeButton.classList.add('element__icon_active');
this.isLiked = true;
}

//Посчитать лайки
countTotalLike(sum) {
  this._likeTotal.textContent = sum.likes.length;
}

_setLikeEventListener() {
  this._cardLikeButton.addEventListener('click', () => 
    this.handlerLikeClick());
}
//---------------------------------
//          Картинка
//---------------------------------

_setImageEventListener() {
  this._cardImage.addEventListener('click', () => {
    this.handlerImageClick(this._name, this._link);
  })
}

//----------------------------------
//      Удаление карточки
//----------------------------------


//Оставить иконки удаления на своей карточке
_handleStatusIdDeleteButton(){
  if(this._owner !== this._userId ){
    this._cardButtonDelate.remove();
  }
}

//Удаление карточки
deleteCard(){
  this._element.remove();
  this._element = null;
}

_setDelateCardEventListener() {
  this._cardButtonDelate.addEventListener('click', () => {
  this._handlerDeleteCard();
})
}

//-------------------------------------

//Слушатели
setEventListeners() {
  this._setLikeEventListener();
  this._setImageEventListener();
  this._setDelateCardEventListener();
}

//Генерация карточки
generateCard() {
  this._cardImage.src = this._link;
  this._cardImage.alt = this._name;
  this._cardTitle.textContent = this._name;
  this._likeTotal.textContent = this._likes.length;
  this._changeStatusLike;
  this._handleStatusIdDeleteButton();
  this.setEventListeners();

  return this._element;
  }

};

export {Card};
