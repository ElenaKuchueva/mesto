class Card {
    constructor(data, templateSelector) {
        this.name = data.name;
        this.link = data.link;
        this.alt = data.alt;
        this.templateSelector = templateSelector;
    }
    getTemplate() {
        const cardElement = document
          .querySelector(this.templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
    
        return cardElement;
      }
      
      _setLikeHandler() {
        const icon = this.element.querySelector('.element__icon');
        icon.addEventListener('click', (evt) => {
          const eventTarget = evt.target;
          eventTarget.classList.toggle("element__icon_active");
        });
      };
    
      _setDeleteHandler() {
        const delate = this.element.querySelector('.element__delate');
        delate.addEventListener('click', () => {
          const delateElement = delate.closest('.element');
          delateElement.remove();
        });
      }

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
        this.element = this.getTemplate();
        this._setLikeHandler();
        this._setDeleteHandler();
        this._setOpenFullImageHandler();
        
        this.element.querySelector('.element__image').setAttribute('src', this.link);
        this.element.querySelector('.element__title').textContent = this.name;
        this.element.querySelector('.element__image').setAttribute('alt', this.alt);
    
        return this.element;
      }
  
    setOpenFullImageHandler() {
        const cardImage = this.element.querySelector('.element__image');
        const cardHeading = this.element.querySelector('.element__title');
        cardImage.addEventListener('click', (evt) => {
          openPopup(popupImage);
          popupImagePic.src = evt.target.src;
          popupImagePic.alt = evt.target.alt;
          popupImageTitle.textContent = cardHeading.textContent;
        });
    }
    
  };
  
const card = new Card();

  const addNewCard = (cardFilling) => {
    const newCard = createCard(cardFilling);
    elements.prepend(newCard);
  };
  
  //перебрать карточки и вывести на старте
  cards.forEach(addNewCard);