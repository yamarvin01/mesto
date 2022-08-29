import "./index.css";
import UserInfo from "./scripts/components/UserInfo.js";
import Card from "./scripts/components/Card.js";
import Section from "./scripts/components/Section.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import FormValidator from "./scripts/components/FormValidator.js";
import { initialCards } from "./scripts/data.js";
import {
  titleProfile,
  subtitleProfile,
  btnEditProfile,
  formEditProfile,
  nameInput,
  aboutYourSelfInput,
  formCard,
  btnAddCard,
  validationConfig,
  popupWithImage,
} from "./scripts/utils/constants.js";

// Функция открывает Popup при клике на карточку
const handleCardClick = () => {
  popupWithImage.open({ imageTitle: this._title, imageLink: this._imageLink });
};

// Экзепляр класса UserInfo с... угадайте... правильно... информацией о позователе)
const userInfo = new UserInfo({
  userName: titleProfile.textContent,
  aboutYourSelf: subtitleProfile.textContent,
});

// Экземлпяр класса и функция отправки формы при добавлении новой карточки
const popupWithFormAddCard = new PopupWithForm(
  ".popup_type_add-card",
  ({ 0: cardName, 1: cardLink }) => {
    const cardData = { name: cardName, link: cardLink };

    // Экземпляр класса cardUnit связывает между собой классы Section и Card
    // и отрисовывает на странице карточку, полученную от пользователя из формы
    const cardUnit = new Section(
      {
        data: [cardData],
        renderer: () => {
          const card = new Card(cardData, "#card-template", handleCardClick);
          const cardElement = card.generateCard();
          cardUnit.addItemPrepend(cardElement);
        },
      },
      ".cards"
    );
    cardUnit.renderItems();

    formValidatorAddCard.disableSubmitButton();
    popupWithFormAddCard.close();
  }
);

// Экземлпяр класса и функция отправки формы при редактировании профиля
const popupWithFormEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  ({ 0: name, 1: aboutYourSelf }) => {
    userInfo.setUserInfo({ userName: name, aboutYourSelf: aboutYourSelf });
    popupWithFormEditProfile.close();
    formValidatorEditProfile.disableSubmitButton();
  }
);

// Экземпляры классов для валидации
const formValidatorEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
const formValidatorAddCard = new FormValidator(validationConfig, formCard);

// Функция открывает форму для редактирования профиля
const openEditForm = () => {
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.userName;
  aboutYourSelfInput.value = userInfoData.aboutYourSelf;
  popupWithFormEditProfile.open();
};

// Функция открывает форму для добавления карточки
const openAddCardForm = () => {
  popupWithFormAddCard.open();
};

// Добавление на страницу изначальных карточек
const cardList = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, "#card-template", handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".cards"
);
cardList.renderItems();

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
