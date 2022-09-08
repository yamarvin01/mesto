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
export const btnEditProfile = profile.querySelector(".profile__button-edit");

// Константы формы редактирования профиля
export const formEditProfile = document.forms.editProfile;
export const nameInput = formEditProfile.elements.name;
export const aboutYourSelfInput = formEditProfile.elements.aboutYourSelf;

// Константы формы редактирования аватара
export const formEditAvatar = document.forms.editAvatar;

// Константы формы добавления новой карточки
export const formCard = document.forms.newCard;
export const btnAddCard = profile.querySelector(".profile__button-add");
