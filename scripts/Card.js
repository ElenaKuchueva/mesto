class Card {
    constructor(card, templateSelector, handlerImageClick) {
        this.name = card.name;
        this.link = card.link;
        this.alt = card.alt;
        this.templateSelector = templateSelector;
        this.handlerImageClick = handlerImageClick;
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
    
        cardImage.addEventListener('click', () => {
          this.handlerImageClick(this.name, this.link);
          console.log(this.link);
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

  export {Card};