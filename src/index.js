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
  nameInput,
  aboutInput,
  validationConfig,
} from "./scripts/utils/constants.js";

let cardSection = null;
const userInfo = new UserInfo();

const formValidatorEditProfile = new FormValidator(validationConfig, formEditProfile);
const formValidatorAddCard = new FormValidator(validationConfig, formAddCard);
const formValidatorEditAvatar = new FormValidator(validationConfig, formEditAvatar);

// 1. Загрузка информации о пользователе с сервера
function addUserInfo() {
  api
    .getUserInfo()
    .then((result) => {
      userInfo.setUserInfo({
        userName: result.name,
        aboutYourSelf: result.about,
        avatar: result.avatar,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
addUserInfo();

// 2. Загрузка карточек с сервера
function addInitialCards() {
  api
    .getInitialCards()
    .then((result) => {
      cardSection = new Section(
        result,
        (cardItem) => {
          const cardElement = createNewCardElement(
            cardItem,
            "#card-template",
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
addInitialCards();

// Функция создания новой карточки
const createNewCardElement = (
  cardItem,
  cardTemplate,
  handleCardClick,
  handleCardDeleteClick,
  handleCardLikeClick
) => {
  const card = new Card(
    cardItem,
    cardTemplate,
    handleCardClick,
    handleCardDeleteClick,
    handleCardLikeClick
  );
  const cardElement = card.generateCard();
  return cardElement;
};





//TODO
const handleSubmitEditAvatar = ({ avatar }) => {
  popupWithFormEditAvatar.close();
  popupWithFormEditAvatar.disableSubmitButton();
};
const popupWithFormEditAvatar = new PopupWithForm(".popup_type_edit-avatar", handleSubmitEditAvatar);
const openEditAvatarForm = () => {
  popupWithFormEditAvatar.open();
};

// 3. Функция обработывает сабмит формы Редактирования Профиля
const handleSubmitEditProfile = ({ name, aboutYourSelf }) => {
  api.editProfile({name: name, about: aboutYourSelf})
    .then((result) => {
      userInfo.setUserInfo({ userName: result.name, aboutYourSelf: result.about });
      popupWithFormEditProfile.close();
      formValidatorEditProfile.disableSubmitButton();
    })
    .catch((err) => {
      console.log(err);
    });
};
const popupWithFormEditProfile = new PopupWithForm(".popup_type_edit-profile", handleSubmitEditProfile);
const openEditProfileForm = () => {
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.userName;
  aboutInput.value = userInfoData.aboutYourSelf;
  popupWithFormEditProfile.open();
};

// 4. Функция обработывает сабмит добавления новой карточки
const handleSubmitAddCard = ({ place: cardName, link: cardLink }) => {
  api.addNewCard({name: cardName, link: cardLink})
    .then((result) => {
      const cardElement = createNewCardElement(
        result,
        "#card-template",
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
  api.deleteCard(cardElement.cardID)
    .then((result) => {
      if (result.message === 'Пост удалён') {
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
  api.addLikeToCard(cardItem._id)
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
  api.removeLikeFromCard(cardItem._id)
    .then((result) => {
      cardItem._likes = result.likes;
      cardItem.setLikeStatusToCard();
    })
    .catch((err) => {
      console.log(err);
    });
}













































// Включаем валидацию
const enableFormValidation = () => {
  formValidatorEditProfile.enableValidation();
  formValidatorEditProfile.disableSubmitButton();
  formValidatorAddCard.enableValidation();
  formValidatorAddCard.disableSubmitButton();
  formValidatorEditAvatar.enableValidation();
  formValidatorEditAvatar.disableSubmitButton();
};
enableFormValidation();

// Обработчики событий
btnEditAvatar.addEventListener("click", openEditAvatarForm);
btnEditProfile.addEventListener("click", openEditProfileForm);
btnAddCard.addEventListener("click", openAddCardForm);
popupWithImage.setEventListeners();
popupWithFormEditProfile.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupDeleteCard.setEventListeners();
