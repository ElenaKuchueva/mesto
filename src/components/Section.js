class Section {
  constructor({ cards, renderer }, containerSelector) {
    this._cards = cards;
    this.renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderFirstCards() {
    this._cards.forEach((cardElement) => this.renderer(cardElement));
  }

  addCard(cardElement) {
    this._containerSelector.prepend(cardElement);
  }
}

export default Section;
