import Popup from "../components/Popup.js";

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_type_submit",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};

// Константы профиля на главной странице
export const profile = document.querySelector(".profile");
export const titleProfile = profile.querySelector(".profile__title");
export const subtitleProfile = profile.querySelector(".profile__subtitle");
export const btnEditProfile = profile.querySelector(".profile__button-edit");

// Константы формы редактирования профиля
export const formEditProfile = document.forms.editProfile;
export const nameInput = formEditProfile.elements.name;
export const aboutYourSelfInput = formEditProfile.elements.aboutYourSelf;

// Константы формы добавления новой карточки
export const formCard = document.forms.newCard;
export const imageNameInput = formCard.elements.place;
export const imageLinkInput = formCard.elements.link;
export const btnAddCard = profile.querySelector(".profile__button-add");

// Константы popup-ов
export const popupEditProfileClass = new Popup('.popup_type_edit-profile');
export const popupAddCardClass = new Popup('.popup_type_add-card');
export const popupImgClass = new Popup('.popup_type_image');

// Константы popup-а "Вывода Изображения Карточки" на полный экран
export const popupImg = document.querySelector(".popup_type_image");
export const popupImage = popupImg.querySelector(".popup__image");
export const popupTitle = popupImg.querySelector(".popup__text");
