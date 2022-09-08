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

let cardSection = null;
const userInfo = new UserInfo();
const formValidatorEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
const formValidatorAddCard = new FormValidator(validationConfig, formCard);

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

// Функция отслеживает нажатие кнопки Delete на карточке
const handleCardDeleteClick = (cardElement) => {
  popupDeleteCard.open(cardElement);
};

// Функция отслеживает нажатие подтверждения удаления карточки
const handlePopupDeleteCardClick = (cardElement) => {
  deleteCardFromServer(cardElement.cardID);
  cardElement.remove();
  popupDeleteCard.close();
};

// Функция создания новой карточки
const createNewCardElement = (cardItem, cardTemplate, handleCardClick, handleCardDeleteClick, handleCardLikeClick) => {
  const card = new Card(cardItem, cardTemplate, handleCardClick, handleCardDeleteClick, handleCardLikeClick);
  const cardElement = card.generateCard();
  return cardElement;
};

// Функция открывает форму для добавления карточки
const openAddCardForm = () => {
  popupWithFormAddCard.open();
};

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
function addCardsToDOM() {
  fetch("https://mesto.nomoreparties.co/v1/cohort-49/cards", {
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
      // Добавление на страницу изначальных карточек
      cardSection = new Section(
        result,
        (cardItem) => {
          const cardElement = createNewCardElement(cardItem, "#card-template", handleCardClick, handleCardDeleteClick, handleCardLikeClick);
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
      link: cardLink,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((result) => {
      const cardElement = createNewCardElement(result, "#card-template", handleCardClick, handleCardDeleteClick, handleCardLikeClick);
      cardSection.addItemPrepend(cardElement);
      formValidatorAddCard.disableSubmitButton();
      popupWithFormAddCard.close();
    });
};
const popupWithFormAddCard = new PopupWithForm(
  ".popup_type_add-card",
  handleSubmitAddCard
);

// 6. Попап удаления карточки
const popupDeleteCard = new PopupDeleteCard(
  ".popup_type_deleteCard",
  handlePopupDeleteCardClick
);

// 7. Удаление карточки из данных сервера
function deleteCardFromServer(cardId) {
  fetch(`https://mesto.nomoreparties.co/v1/cohort-49/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "37ded591-0952-406f-9bd6-1d8027d482f6",
    },
  }).then((response) => {
    // Карточна успешно удалена если ок
    if (response.ok) {
      return response.json();
    }
  });
}




// Функция отслеживает статус лайка
const handleCardLikeClick = (cardItem) => {
  if (cardItem._likeStatus === "not active") {
    addCardLike(cardItem);
  }
  if (cardItem._likeStatus === "active") {
    removeCardLike(cardItem);
  }
}



// 8. Постановка лайка
function addCardLike(cardItem) {
  fetch(`https://mesto.nomoreparties.co/v1/cohort-49/cards/${cardItem._id}/likes`, {
    method: "PUT",
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
      cardItem._likes = result.likes;
      cardItem.setLikeStatusToCard();
    });
}

// Снятие лайка
function removeCardLike(cardItem) {
  fetch(`https://mesto.nomoreparties.co/v1/cohort-49/cards/${cardItem._id}/likes`, {
    method: "DELETE",
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
      cardItem._likes = result.likes;
      cardItem.setLikeStatusToCard();
    });
}















// Включаем валидацию
const enableFormValidation = () => {
  formValidatorEditProfile.enableValidation();
  formValidatorEditProfile.disableSubmitButton();
  formValidatorAddCard.enableValidation();
  formValidatorAddCard.disableSubmitButton();
};
enableFormValidation();

// Обработчики событий
btnEditProfile.addEventListener("click", openEditForm);
btnAddCard.addEventListener("click", openAddCardForm);
popupWithImage.setEventListeners();
popupWithFormEditProfile.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupDeleteCard.setEventListeners();
