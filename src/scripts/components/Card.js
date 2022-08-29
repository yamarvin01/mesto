export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._title = name;
    this._imageLink = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _handleCardLikeClick() {
    this._element
      .querySelector(".card__button_type_like")
      .classList.toggle("card__button_status_active");
  }

  _handleCardDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
    this._element
      .querySelector(".card__button_type_like")
      .addEventListener("click", () => {
        this._handleCardLikeClick();
      });
    this._element
      .querySelector(".card__button_type_delete")
      .addEventListener("click", () => {
        this._handleCardDeleteClick();
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._title;
    this._element.querySelector(".card__image").src = this._imageLink;
    this._element.querySelector(".card__image").alt =
      "Изображение: " + this._title;
    this._setEventListeners();
    return this._element;
  }
}
