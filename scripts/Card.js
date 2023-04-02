class Card {
    constructor(card, templateSelector) {
        this.name = card.name;
        this.link = card.link;
        this.alt = card.alt;
        this.templateSelector = templateSelector;
    }
  
    //клонируем темплейт-элемент
    _getTemplate() {
        const cardElement = document
          .querySelector(this.templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
    
        return cardElement;
      }
      
      //обработчик лайка для всех карточек
      _setLikeHandler() {
        const icon = this.element.querySelector('.element__icon');
        icon.addEventListener('click', (evt) => {
          const eventTarget = evt.target;
          eventTarget.classList.toggle("element__icon_active");
        });
      };
    
      //обработчик удаления
      _setDeleteHandler() {
        const delate = this.element.querySelector('.element__delate');
        delate.addEventListener('click', () => {
          const delateElement = delate.closest('.element');
          delateElement.remove();
        });
      }
  
      //открываем поп-ап с картинкой
      _setOpenFullImageHandler() {
        const cardImage = this.element.querySelector('.element__image');
        const cardHeading = this.element.querySelector('.element__title');
        cardImage.addEventListener('click', (evt) => {
          openPopup(popupImage);
          popupImagePic.src = evt.target.src;
          popupImagePic.alt = evt.target.alt;
          popupImageTitle.textContent = cardHeading.textContent;
        });
    }
  
      generateCard() {
        this.element = this._getTemplate();
        this._setLikeHandler();
        this._setDeleteHandler();
        this._setOpenFullImageHandler();
  
        
        this.element.querySelector('.element__image').setAttribute('src', this.link);
        this.element.querySelector('.element__title').textContent = this.name;
        this.element.querySelector('.element__image').setAttribute('alt', this.alt);
    
        return this.element;
      }
  };
  
//   const addNewCard = (card) => {
//     const cardGenerate = new Card(card, "#card");
//     const newCard = cardGenerate.generateCard();
//     elements.prepend(newCard);
//   };

  export {Card};