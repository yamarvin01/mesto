import "./index.css";
import UserInfo from "./scripts/components/UserInfo.js";
import Card from "./scripts/components/Card.js";
import Section from "./scripts/components/Section.js";
import PopupWithImage from "./scripts/components/PopupWithImage";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import PopupDeleteCard from "./scripts/components/PopupDeleteCard.js";
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
let cardSection = null;

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

// Функция открывает форму для добавления карточки
const openAddCardForm = () => {
  popupWithFormAddCard.open();
};

// Экземпляры классов для валидации
const formValidatorEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
const formValidatorAddCard = new FormValidator(validationConfig, formCard);

// Функция включает валидацию форм
const enableFormValidation = () => {
  formValidatorEditProfile.enableValidation();
  formValidatorEditProfile.disableSubmitButton();
  formValidatorAddCard.enableValidation();
  formValidatorAddCard.disableSubmitButton();
};
enableFormValidation();

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
        // console.log("UserInfo объект ответа от сервера (JSON-формат): ", response);
        return response.json();
      }
    })
    .then((result) => {
      // console.log("UserInfo promise: ", result);
      userInfo.setUserInfo({
        userName: result.name,
        aboutYourSelf: result.about,
        avatar: result.avatar,
      });
    });
}
onUserInfo();

// 2. Загрузка карточек с сервера
function addCardsToDOM() {
  fetch("https://mesto.nomoreparties.co/v1/cohort-49/cards", {
    method: "GET",
    headers: {
      authorization: "37ded591-0952-406f-9bd6-1d8027d482f6",
    },
  })
    .then((response) => {
      // console.log("cards объект ответа от сервера (JSON-формат): ", response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((result) => {
      console.log("cards promise: ", result);
      console.log('ownerID: ', result[0].owner._id);
      // Добавление на страницу изначальных карточек
      cardSection = new Section(
        result,
        (cardItem) => {
          const cardElement = createNewCardElement(cardItem, "#card-template", handleCardClick);
          cardSection.addItem(cardElement);
        },
        ".cards"
      );
      cardSection.renderItems();
    });
}
addCardsToDOM();

// 3. Редактирование профиля
function onEditProfile() {
  fetch("https://mesto.nomoreparties.co/v1/cohort-49/users/me", {
    method: "PATCH",
    headers: {
      authorization: "37ded591-0952-406f-9bd6-1d8027d482f6",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Йода",
      about: "Гранд-мастер Ордена джедаев",
    }),
  });
}
onEditProfile();
onUserInfo();

// 4. Добавление новой карточки
const handleSubmitAddCard = ({ place: cardName, link: cardLink }) => {
  fetch("https://mesto.nomoreparties.co/v1/cohort-49/cards", {
    method: "POST",
    headers: {
      authorization: "37ded591-0952-406f-9bd6-1d8027d482f6",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    }),
  })
    .then((response) => {
      // console.log("card объект ответа от сервера (JSON-формат): ", response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((result) => {
      const cardElement = createNewCardElement(result, "#card-template",handleCardClick);
      cardSection.addItemPrepend(cardElement);
      formValidatorAddCard.disableSubmitButton();
      popupWithFormAddCard.close();
    });
}
const popupWithFormAddCard = new PopupWithForm(".popup_type_add-card", handleSubmitAddCard);

// 5. Отображение количества лайков карточки


// 6. Попап удаления карточки
const popupDeleteCard = new PopupDeleteCard('.popup_type_deleteCard');
console.log('popupDeleteCard: ', popupDeleteCard);


popupDeleteCard.open();
// popupDeleteCard.close();













btnEditProfile.addEventListener("click", openEditForm);
btnAddCard.addEventListener("click", openAddCardForm);
popupWithImage.setEventListeners();
popupWithFormEditProfile.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupDeleteCard.setEventListeners();
