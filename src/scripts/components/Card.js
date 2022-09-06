export default class Card {
  constructor({ name, link, likes, owner }, cardSelector, handleCardClick) {
    this._title = name;
    this._imageLink = link;
    this._likes = likes;
    this._owner = owner;
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
    this._elementBtnLike.classList.toggle("card__button_status_active");
  }

  _handleCardDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick({ imageTitle: this._title, imageLink: this._imageLink});
    });
    this._elementBtnLike.addEventListener("click", () => {
      this._handleCardLikeClick();
    });
    this._elementBtnDelete.addEventListener("click", () => {
        this._handleCardDeleteClick();
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector(".card__title");
    this._elementImage = this._element.querySelector(".card__image");
    this._elementLikes = this._element.querySelector('.card__likeText');
    this._elementBtnLike = this._element.querySelector(".card__button_type_like");
    this._elementBtnDelete = this._element.querySelector(".card__button_type_delete");

    this._elementTitle.textContent = this._title;
    this._elementImage.src = this._imageLink;
    this._elementLikes.textContent = this._likes.length;
    this._elementImage.alt = "Изображение: " + this._title;

    this._setEventListeners();
    return this._element;
  }
}
