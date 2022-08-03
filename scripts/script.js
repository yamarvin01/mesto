import { Card } from "./card.js";
import { initialCards } from './data.js';

const content = document.querySelector(".content");
const profile = content.querySelector(".profile");
const titleProfile = profile.querySelector(".profile__title");
const subtitleProfile = profile.querySelector(".profile__subtitle");
const btnEditProfile = profile.querySelector(".profile__button-edit");

// Константы popup-ов
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
export const popupImg = document.querySelector(".popup_type_image");

// Константы формы редактирования профиля
const formEditProfile = document.forms.editProfile;
const nameInput = formEditProfile.elements.name;
const aboutYourSelfInput = formEditProfile.elements.aboutYourSelf;

// Константы формы добавления новой карточки
const formCard = document.forms.newCard;
const imageNameInput = formCard.elements.place;
const imageLinkInput = formCard.elements.link;
const formCardSubmitBtn = formCard.querySelector(".popup__button_type_submit");

const btnAddCard = profile.querySelector(".profile__button-add");

export const popupImage = popupImg.querySelector(".popup__image");
export const popupTitle = popupImg.querySelector(".popup__text");

// Функция добавления на страницу информации об авторе
function submitEditProfile(event) {
  event.preventDefault();
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = aboutYourSelfInput.value;
  closePopup(popupEditProfile);
}
formEditProfile.addEventListener("submit", submitEditProfile);

// Функция добавления на страницу и отправки на сервер новой карточки
function submitNewCard(event) {
  event.preventDefault();
  const cardLink = imageLinkInput.value;
  const cardName = imageNameInput.value;
  const card = new Card({ name: cardName, link: cardLink }, "#card-template");
  const cardElement = card.generateCard();
  document.querySelector(".cards").prepend(cardElement);
  formCardSubmitBtn.setAttribute("disabled", true);
  formCardSubmitBtn.classList.add("popup__button_inactive");
  formCard.reset();
  closePopup(popupAddCard);
}
formCard.addEventListener("submit", submitNewCard);

function openEditForm(event) {
  nameInput.value = titleProfile.textContent;
  aboutYourSelfInput.value = subtitleProfile.textContent;
  openPopup(popupEditProfile);
}
btnEditProfile.addEventListener("click", openEditForm);

btnAddCard.addEventListener("click", () => openPopup(popupAddCard));

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
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

// Функция закрытия popup при нажатии ESC
function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    openedPopup && closePopup(openedPopup);
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, "#card-template");
  const cardElement = card.generateCard();
  document.body.querySelector(".cards").append(cardElement);
});
