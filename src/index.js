import "./index.css";
import UserInfo from "./scripts/components/UserInfo.js";
import Card from "./scripts/components/Card.js";
import Section from "./scripts/components/Section.js";
import PopupWithImage from "./scripts/components/PopupWithImage";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import FormValidator from "./scripts/components/FormValidator.js";
import {
  btnEditProfile,
  formEditProfile,
  nameInput,
  aboutYourSelfInput,
  formCard,
  btnAddCard,
  validationConfig,
} from "./scripts/utils/constants.js";

const userInfo = new UserInfo();

const handleSubmitEditProfile = ({ name, aboutYourSelf }) => {
  userInfo.setUserInfo({ userName: name, aboutYourSelf: aboutYourSelf });
  popupWithFormEditProfile.close();
  formValidatorEditProfile.disableSubmitButton();
};
const popupWithFormEditProfile = new PopupWithForm(".popup_type_edit-profile", handleSubmitEditProfile);

// Функция открывает форму для редактирования профиля
const openEditForm = () => {
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.userName;
  aboutYourSelfInput.value = userInfoData.aboutYourSelf;
  popupWithFormEditProfile.open();
};

const popupWithImage = new PopupWithImage(".popup_type_image");

// Функция открывает Popup при клике на карточку
const handleCardClick = ({ imageTitle, imageLink }) => {
  popupWithImage.open({ imageTitle: imageTitle, imageLink: imageLink });
};

// Функция создания новой карточки
const createNewCardElement = (cardItem, cardTemplate, cardFunction) => {
  const card = new Card(cardItem, cardTemplate, cardFunction);
  const cardElement = card.generateCard();
  return cardElement;
};

// Добавление на страницу карточки из формы от пользователя
const handleSubmitAddCard = ({ place: cardName, link: cardLink }) => {
  const cardItem = { name: cardName, link: cardLink };
  const cardElement = createNewCardElement(cardItem, "#card-template", handleCardClick);
  cardSection.addItemPrepend(cardElement);
  formValidatorAddCard.disableSubmitButton();
  popupWithFormAddCard.close();
};
const popupWithFormAddCard = new PopupWithForm(".popup_type_add-card", handleSubmitAddCard);

// Функция открывает форму для добавления карточки
const openAddCardForm = () => {
  popupWithFormAddCard.open();
};

// Экземпляры классов для валидации
const formValidatorEditProfile = new FormValidator(validationConfig, formEditProfile);
const formValidatorAddCard = new FormValidator(validationConfig, formCard);

// Функция включает валидацию форм
const enableFormValidation = () => {
  formValidatorEditProfile.enableValidation();
  formValidatorEditProfile.disableSubmitButton();
  formValidatorAddCard.enableValidation();
  formValidatorAddCard.disableSubmitButton();
};
enableFormValidation();

btnEditProfile.addEventListener("click", openEditForm);
btnAddCard.addEventListener("click", openAddCardForm);
popupWithImage.setEventListeners();
popupWithFormEditProfile.setEventListeners();
popupWithFormAddCard.setEventListeners();

// 1. Загрузка информации о пользователе с сервера
function onUserInfo() {
  fetch("https://nomoreparties.co/v1/cohort-49/users/me", {
    method: "GET",
    headers: {
      authorization: "37ded591-0952-406f-9bd6-1d8027d482f6",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((result) => {
      userInfo.setUserInfo({
        userName: result.name,
        aboutYourSelf: result.about,
        avatar: result.avatar,
      });
    });
}
onUserInfo();

// 2. Загрузка карточек с сервера
fetch("https://mesto.nomoreparties.co/v1/cohort-49/cards", {
  method: "GET",
  headers: {
    authorization: "37ded591-0952-406f-9bd6-1d8027d482f6",
  },
})
  .then((response) => {
    console.log("cards объект ответа от сервера (JSON-формат): ", response);
    if (response.ok) {
      return response.json();
    }
  })
  .then((result) => {
    console.log("cards promise: ", result);
    // Добавление на страницу изначальных карточек
    const cardSection = new Section(
      result,
      (cardItem) => {
        const cardElement = createNewCardElement(cardItem, "#card-template", handleCardClick);
        cardSection.addItem(cardElement);
      },
      ".cards"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log("Ошибка. Запрос не выполнен");
  });
