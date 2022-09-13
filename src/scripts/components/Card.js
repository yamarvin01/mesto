export default class Card {
  constructor(
    { name, link, likes, owner, _id },
    cardSelector,
    userId,
    handleCardClick,
    handleCardDeleteClick,
    handleCardLikeClick
  ) {
    this._title = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._handleCardLikeClick = handleCardLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _makeBtnDeleteVisible() {
    if (this._owner._id === this._userId) {
      this._elementBtnDelete.classList.add("card__button_visible");
    }
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick({ imageTitle: this._title, imageLink: this._link });
    });
    this._elementBtnLike.addEventListener("click", () => {
      this._handleCardLikeClick(this);
    });
    this._elementBtnDelete.addEventListener("click", () => {
      this._handleCardDeleteClick(this._element);
    });
  }

  _setLikeStatusToCard() {
    this._elementLikes.textContent = this._likes.length;
    const cardLikeStatus = this._likes.some(like => like._id === this._userId);
    if (cardLikeStatus) {
      this._likeStatus = "active";
      this._elementBtnLike.classList.add("card__button_status_active");
    } else {
      this._likeStatus = "not active";
      this._elementBtnLike.classList.remove("card__button_status_active");
    }
  }

  setLikeStatusToCard() {
    this._setLikeStatusToCard();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector(".card__title");
    this._elementImage = this._element.querySelector(".card__image");
    this._elementLikes = this._element.querySelector(".card__like-text");
    this._elementBtnLike = this._element.querySelector(".card__button_type_like");
    this._elementBtnDelete = this._element.querySelector(".card__button_type_delete");
    this._elementTitle.textContent = this._title;
    this._elementImage.src = this._link;
    this._elementImage.alt = "Изображение: " + this._title;
    this._element.cardID = this._id;
    this._makeBtnDeleteVisible();
    this._setLikeStatusToCard();
    this._setEventListeners();
    return this._element;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
