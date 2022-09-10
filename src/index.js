import "./index.css";
import UserInfo from "./scripts/components/UserInfo.js";
import Card from "./scripts/components/Card.js";
import Section from "./scripts/components/Section.js";
import PopupWithImage from "./scripts/components/PopupWithImage";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import PopupDeleteCard from "./scripts/components/PopupDeleteCard.js";
import FormValidator from "./scripts/components/FormValidator.js";
import { api } from "./scripts/services/api.js";
import {
  btnEditAvatar,
  btnEditProfile,
  btnAddCard,
  formEditAvatar,
  formEditProfile,
  formAddCard,
  validationConfig,
} from "./scripts/utils/constants.js";

let userId = null;
let cardSection = null;
const userInfo = new UserInfo();

// Загрузка данных пользователя и карточек с сервера при старте страницы
function addInitialUserInfoAndCardsToDOM() {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      // Установка данных пользователя с сервера
      userInfo.setUserInfo(userData);
      userId = userData._id;
      // Установка и отрисовка карточек с сервера
      cardSection = new Section(
        cards,
        (cardItem) => {
          const cardElement = createNewCardElement(
            cardItem,
            "#card-template",
            userId,
            handleCardClick,
            handleCardDeleteClick,
            handleCardLikeClick
          );
          cardSection.addItem(cardElement);
        },
        ".cards"
      );
      cardSection.renderItems();
    })
    .catch((err) => {
      console.log(err);
    });
}
addInitialUserInfoAndCardsToDOM();

// Функция создания новой карточки
const createNewCardElement = (
  cardItem,
  cardTemplate,
  userId,
  handleCardClick,
  handleCardDeleteClick,
  handleCardLikeClick
) => {
  const card = new Card(
    cardItem,
    cardTemplate,
    userId,
    handleCardClick,
    handleCardDeleteClick,
    handleCardLikeClick
  );
  const cardElement = card.generateCard();
  return cardElement;
};



// Функция обработывает сабмит формы Редактирования Аватара
const handleSubmitEditAvatar = ({ avatar }) => {
  api
    .editProfileAvatar(avatar)
    .then((result) => {
      userInfo.setUserInfo(result);
      formValidatorEditAvatar.disableSubmitButton();
      popupWithFormEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormEditAvatar._btnSubmit.textContent = "Сохранение";
    });
};
const popupWithFormEditAvatar = new PopupWithForm(".popup_type_edit-avatar", handleSubmitEditAvatar);
const openEditAvatarForm = () => {
  popupWithFormEditAvatar.open();
};

// Функция обработывает сабмит формы Редактирования Профиля
const handleSubmitEditProfile = ({ name, about }) => {
  api
    .editProfile({ name: name, about: about })
    .then((result) => {
      userInfo.setUserInfo(result);
      formValidatorEditProfile.disableSubmitButton();
      popupWithFormEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormEditProfile._btnSubmit.textContent = "Сохранение";
    });
};
const popupWithFormEditProfile = new PopupWithForm(".popup_type_edit-profile", handleSubmitEditProfile);
const openEditProfileForm = () => {
  const userInfoData = userInfo.getUserInfo();
  popupWithFormEditProfile.setInputValues(userInfoData);
  popupWithFormEditProfile.open();
};

// Функция обработывает сабмит добавления новой карточки
const handleSubmitAddCard = ({ place: cardName, link: cardLink }) => {
  api
    .addNewCard({ name: cardName, link: cardLink })
    .then((result) => {
      const cardElement = createNewCardElement(
        result,
        "#card-template",
        userId,
        handleCardClick,
        handleCardDeleteClick,
        handleCardLikeClick
      );
      cardSection.addItemPrepend(cardElement);
      formValidatorAddCard.disableSubmitButton();
      popupWithFormAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAddCard._btnSubmit.textContent = "Создать";
    });
};
const popupWithFormAddCard = new PopupWithForm(".popup_type_add-card", handleSubmitAddCard);
const openAddCardForm = () => {
  popupWithFormAddCard.open();
};



// Функция отслеживает нажатие кнопки Delete на карточке
const handleCardDeleteClick = (cardElement) => {
  popupDeleteCard.open(cardElement);
};

// Функция отслеживает нажатие подтверждения удаления карточки
const handleSubmitDeleteCard = (cardElement) => {
  api
    .deleteCard(cardElement.cardID)
    .then((result) => {
      if (result.message === "Пост удалён") {
        cardElement.remove();
        popupDeleteCard.close();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const popupDeleteCard = new PopupDeleteCard(".popup_type_deleteCard", handleSubmitDeleteCard);



// Функция открывает Popup при клике на карточку
const handleCardClick = ({ imageTitle, imageLink }) => {
  popupWithImage.open({ imageTitle: imageTitle, imageLink: imageLink });
};
const popupWithImage = new PopupWithImage(".popup_type_image");



// Функция отслеживает нажатие кнопки лайк
const handleCardLikeClick = (cardItem) => {
  if (cardItem._likeStatus === "not active") {
    addCardLike(cardItem);
  }
  if (cardItem._likeStatus === "active") {
    removeCardLike(cardItem);
  }
};

// Функция устанавливает лайк
function addCardLike(cardItem) {
  api
    .addLikeToCard(cardItem._id)
    .then((result) => {
      cardItem._likes = result.likes;
      cardItem.setLikeStatusToCard();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция удаляет лайк
function removeCardLike(cardItem) {
  api
    .removeLikeFromCard(cardItem._id)
    .then((result) => {
      cardItem._likes = result.likes;
      cardItem.setLikeStatusToCard();
    })
    .catch((err) => {
      console.log(err);
    });
}



const formValidatorEditAvatar = new FormValidator(validationConfig, formEditAvatar);
const formValidatorEditProfile = new FormValidator(validationConfig, formEditProfile);
const formValidatorAddCard = new FormValidator(validationConfig, formAddCard);

// Включаем валидацию
const enableFormValidation = () => {
  formValidatorEditAvatar.enableValidation();
  formValidatorEditAvatar.disableSubmitButton();
  formValidatorEditProfile.enableValidation();
  formValidatorEditProfile.disableSubmitButton();
  formValidatorAddCard.enableValidation();
  formValidatorAddCard.disableSubmitButton();
};
enableFormValidation();

// Обработчики событий
btnEditAvatar.addEventListener("click", openEditAvatarForm);
btnEditProfile.addEventListener("click", openEditProfileForm);
btnAddCard.addEventListener("click", openAddCardForm);
popupWithImage.setEventListeners();
popupWithFormEditAvatar.setEventListeners();
popupWithFormEditProfile.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupDeleteCard.setEventListeners();
