import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";

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
export const popupEditProfile = new Popup('.popup_type_edit-profile');
export const popupAddCard = new Popup('.popup_type_add-card');
export const popupWithImage = new PopupWithImage('.popup_type_image');
