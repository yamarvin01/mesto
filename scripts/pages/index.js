import { initialCards } from "../data.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
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
} from "../utils/constants.js";

// Экземлпяр класса и функция отправки формы при добавлении новой карточки
const popupWithFormAddCard = new PopupWithForm(
  ".popup_type_add-card",
  ({ 0: cardName, 1: cardLink }) => {
    const cardData = { name: cardName, link: cardLink };
    console.log("cardData: ", cardData);

    // Экземпляр класса cardUnit связывает между собой классы Section и Card
    // и отрисовывает на странице карточку, полученную от пользователя из формы
    const cardUnit = new Section(
      {
        data: [cardData],
        renderer: () => {
          const card = new Card(cardData, "#card-template");
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
popupWithFormAddCard.setEventListeners();

// Экземлпяр класса и функция отправки формы при редактировании профиля
const popupWithFormEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  ({ 0: name, 1: aboutYourSelf }) => {
    titleProfile.textContent = name;
    subtitleProfile.textContent = aboutYourSelf;
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
  nameInput.value = titleProfile.textContent;
  aboutYourSelfInput.value = subtitleProfile.textContent;
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
      const card = new Card(cardItem, "#card-template");
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
