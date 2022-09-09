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
export const profileAvatar = document.querySelector(".profile__avatar");
export const btnEditProfile = profile.querySelector(".profile__button-edit");
export const btnEditAvatar = profile.querySelector('.profile__avatar-button');

// Константы формы редактирования аватара
export const formEditAvatar = document.forms.editAvatar;

// Константы формы редактирования профиля
export const formEditProfile = document.forms.editProfile;
export const nameInput = formEditProfile.elements.name;
export const aboutInput = formEditProfile.elements.aboutYourSelf;

// Константы формы добавления новой карточки
export const formAddCard = document.forms.newCard;
export const btnAddCard = profile.querySelector(".profile__button-add");
