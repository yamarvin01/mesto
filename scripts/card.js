import { popupImage, popupTitle, openPopup, popupImg } from "./script.js";

export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _handleCardClick() {
    popupImage.src = this._image;
    popupTitle.textContent = this._title;
    popupImage.alt = "";
    popupImage.alt = "Иллюстрация природы: " + this._title;
    openPopup(popupImg);
  }

  _handleCardLikeClick() {
    this._element
      .querySelector(".card__button_type_like")
      .classList.toggle("card__button_status_active");
  }

  _handleCardDeleteClick() {
    this._element.remove();
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
    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__image").alt =
      "Иллюстрация природы: " + this._title;
    this._setEventListeners();
    return this._element;
  }
}
