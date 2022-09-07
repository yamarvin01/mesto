export default class Card {
  constructor( { name, link, likes, owner, _id }, cardSelector, handleCardClick, handleCardDeleteClick ) {
    this._title = name;
    this._imageLink = link;
    this._likes = likes;
    this._owner = owner;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
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

  _makeBtnDeleteVisible() {
    if (this._owner._id === "3feab90d034df0900ec642f3") {
      this._elementBtnDelete.classList.add("card__button_visible");
    }
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick({ imageTitle: this._title, imageLink: this._imageLink });
    });
    this._elementBtnLike.addEventListener("click", () => {
      this._handleCardLikeClick();
    });
    this._elementBtnDelete.addEventListener("click", () => {
      this._handleCardDeleteClick(this._element);
    });
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector(".card__title");
    this._elementImage = this._element.querySelector(".card__image");
    this._elementLikes = this._element.querySelector(".card__likeText");
    this._elementBtnLike = this._element.querySelector(".card__button_type_like");
    this._elementBtnDelete = this._element.querySelector(".card__button_type_delete");
    this._elementTitle.textContent = this._title;
    this._elementImage.src = this._imageLink;
    this._elementImage.alt = "Изображение: " + this._title;
    this._elementLikes.textContent = this._likes.length;
    this._element.cardID = this._id;
    this._makeBtnDeleteVisible();
    this._setEventListeners();
    return this._element;
  }
}
