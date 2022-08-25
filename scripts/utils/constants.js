export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

// Константы формы добавления новой карточки
export const formCard = document.forms.newCard;
export const imageNameInput = formCard.elements.place;
export const imageLinkInput = formCard.elements.link;
