import { initialCards } from "../data.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import {
  titleProfile,
  subtitleProfile,
  btnEditProfile,
  formEditProfile,
  nameInput,
  aboutYourSelfInput,
  formCard,
  imageNameInput,
  imageLinkInput,
  btnAddCard,
  validationConfig,
  popupEditProfileClass,
  popupAddCardClass,
} from "../utils/constants.js";
import {
  popups,
  popupEditProfile,
  popupAddCard,
  openPopup,
  closePopup,
} from "../utils/utils.js";

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
  popupEditProfileClass.open();
}

// Функция открывает форму для добавления карточки
const openAddCardForm = () => {
  popupAddCardClass.open();
}

// Функция добавления на страницу информации об авторе
function handleSubmitEditProfile(event) {
  event.preventDefault();
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = aboutYourSelfInput.value;
  popupEditProfileClass.close();
  formValidatorEditProfile.disableSubmitButton();
}

// TODO
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

// Функция берет данные из формы и добавляет на страницу новую карточку
const handleSubmitAddCard = (event) => {
  event.preventDefault();
  const cardName = imageNameInput.value;
  const cardLink = imageLinkInput.value;
  const cardData = { name: cardName, link: cardLink };

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
  formCard.reset();
  popupAddCardClass.close();
};

// Функция включает валидацию форм
const enableFormValidation = () => {
  formValidatorEditProfile.enableValidation();
  formValidatorEditProfile.disableSubmitButton();
  formValidatorAddCard.enableValidation();
  formValidatorAddCard.disableSubmitButton();
};
enableFormValidation();

formEditProfile.addEventListener("submit", handleSubmitEditProfile);
formCard.addEventListener("submit", handleSubmitAddCard);
btnEditProfile.addEventListener("click", openEditForm);
btnAddCard.addEventListener("click", openAddCardForm);
