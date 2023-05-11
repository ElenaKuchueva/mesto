class Section {
  constructor({ renderer }, containerSelector) {
    this.renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

 renderFirstCards(data) {
   data.forEach((cardElement) => this.renderer(cardElement));
 }

  addCard(cardElement) {
    this._containerSelector.prepend(cardElement);
  }
}

export {Section};
