import { Card } from "./Card.js";
import { initialCards } from './data.js';
import { FormValidator } from './FormValidator.js';
import { popups, popupEditProfile, popupAddCard, openPopup, closePopup } from "./utils.js";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
}

const content = document.querySelector(".content");
const profile = content.querySelector(".profile");
const titleProfile = profile.querySelector(".profile__title");
const subtitleProfile = profile.querySelector(".profile__subtitle");
const btnEditProfile = profile.querySelector(".profile__button-edit");

// Константы формы редактирования профиля
const formEditProfile = document.forms.editProfile;
const nameInput = formEditProfile.elements.name;
const aboutYourSelfInput = formEditProfile.elements.aboutYourSelf;
const btnAddCard = profile.querySelector(".profile__button-add");

// Константы формы добавления новой карточки
const cardsContainer = document.querySelector(".cards");
const formCard = document.forms.newCard;
const imageNameInput = formCard.elements.place;
const imageLinkInput = formCard.elements.link;

// Экземпляры классов для валидации
const formValidatorEditProfile = new FormValidator(validationConfig, formEditProfile);
const formValidatorAddCard = new FormValidator(validationConfig, formCard);

// Функция добавления на страницу информации об авторе
function handleSubmitEditProfile(event) {
  event.preventDefault();
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = aboutYourSelfInput.value;
  closePopup(popupEditProfile);
  formValidatorEditProfile.disableSubmitButton();
}

// Функция добавления на страницу карточки
function handleSubmitAddCard(event) {
  event.preventDefault();
  const cardLink = imageLinkInput.value;
  const cardName = imageNameInput.value;
  const card = new Card({ name: cardName, link: cardLink }, "#card-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  formValidatorAddCard.disableSubmitButton();
  formCard.reset();
  closePopup(popupAddCard);
}

function openEditForm(event) {
  nameInput.value = titleProfile.textContent;
  aboutYourSelfInput.value = subtitleProfile.textContent;
  openPopup(popupEditProfile);
}

// Функция добавляет события закрытия popup-ов
const setCloseEventListenersToPopups = (popups) => {
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        closePopup(popup);
      }
      if (evt.target.classList.contains("popup__button_type_close")) {
        closePopup(popup);
      }
    });
  });
};
setCloseEventListenersToPopups(popups);

// Метод пробегает по списку карточек и добавляет их на страницу
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

// Функция включает валидацию форм
const enableFormValidation = () => {
  formValidatorEditProfile.enableValidation();
  formValidatorEditProfile.disableSubmitButton();
  formValidatorAddCard.enableValidation();
  formValidatorAddCard.disableSubmitButton();
}
enableFormValidation();

formEditProfile.addEventListener("submit", handleSubmitEditProfile);
formCard.addEventListener("submit", handleSubmitAddCard);
btnEditProfile.addEventListener("click", openEditForm);
btnAddCard.addEventListener("click", () => openPopup(popupAddCard));
