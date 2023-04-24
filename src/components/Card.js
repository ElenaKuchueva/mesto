class Card {
    constructor(card, templateSelector, handlerImageClick, buttonDelate) {
        this.name = card.name;
        this.link = card.link;
        this.alt = card.alt;
        this.templateSelector = templateSelector;
        this.handlerImageClick = handlerImageClick;
        this.buttonDelate = buttonDelate;
    }
  
    //клонируем темплейт-элемент
    _getTemplate() {
        const cardElement = document
          .querySelector(this.templateSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
    
        return cardElement;
      };

    _setLikeHandler(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle("element__icon_active");
      };

    _setDeleteHandler() {
        const delateElement = this.element.querySelector(this.buttonDelate).closest('.element');
        delateElement.remove();
      };

    _setEventListeners() {
      this.element.querySelector('.element__icon').addEventListener('click', (evt) => this._setLikeHandler(evt));

      this.element.querySelector(this.buttonDelate).addEventListener('click', () => this._setDeleteHandler());

      this._cardImage.addEventListener('click', () => {
        this.handlerImageClick(this.name, this.link);
      });
    };

    generateCard() {
      this.element = this._getTemplate();
      this._cardImage = this.element.querySelector('.element__image');

      this._cardImage .setAttribute('src', this.link);
      this._cardImage .setAttribute('alt', this.alt);
      this.element.querySelector('.element__title').textContent = this.name;

      this._setEventListeners();

        return this.element;
      };
  };

  export {Card};