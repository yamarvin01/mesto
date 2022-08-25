import { initialCards } from '../data.js';
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig } from '../utils/constants.js';
import { popups, popupEditProfile, popupAddCard, openPopup, closePopup } from "../utils/utils.js";

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
// const cardsContainer = document.querySelector(".cards");
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

  // Было: cardsContainer.prepend(cardElement);
  // А теперь новая функциональность
  const section = new Section( {data: [cardElement], renderer: () => {} }, '.cards');
  section.renderItems();
  //

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

  // Было: cardsContainer.append(cardElement);
  // А теперь новая функциональность
  const section = new Section({ data: [cardElement], renderer: () => {} }, '.cards');
  section.renderItems();
  //
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
