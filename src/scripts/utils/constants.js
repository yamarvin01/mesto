export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_type_submit",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};

// Константы главной странице
export const profile = document.querySelector(".profile");
export const btnEditProfile = profile.querySelector(".profile__button-edit");
export const btnEditAvatar = profile.querySelector(".profile__avatar-button");
export const btnAddCard = profile.querySelector(".profile__button-add");
