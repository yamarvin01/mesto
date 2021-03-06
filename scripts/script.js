const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const titleProfile = profile.querySelector('.profile__title');
const subtitleProfile = profile.querySelector('.profile__subtitle');
const btnEditProfile = profile.querySelector('.profile__button-edit');

// Константы popup-ов
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImg = document.querySelector('.popup_type_image');

// Константы формы редактирования профиля
const formEditProfile = document.forms.editProfile;
const nameInput = formEditProfile.elements.name;
const aboutYourSelfInput = formEditProfile.elements.aboutYourSelf;

// Константы формы добавления новой карточки
const formCard = document.forms.newCard;
const imageNameInput = formCard.elements.place;
const imageLinkInput = formCard.elements.link;
const formCardSubmitBtn = formCard.querySelector('.popup__button_type_submit');

const btnAddCard = profile.querySelector(".profile__button-add");
const cardsHtml = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

const popupImage = popupImg.querySelector('.popup__image');
const popupTitle = popupImg.querySelector('.popup__text');

// Фнкция создания карточки
// Ожидает карточку ввиде объекта {name: 'someName', link: 'https://somelink.jpg'}
function createCard(card) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  const newCardTitle = newCard.querySelector('.card__title');
  const newCardLikeBtn = newCard.querySelector('.card__button_type_like');
  const newCardDeleteBtn = newCard.querySelector('.card__button_type_delete');
  newCardImage.src = card.link;
  newCardImage.alt = 'Иллюстрация природы: ' + card.name;
  newCardTitle.textContent = card.name;
  newCardLikeBtn.addEventListener('click', setActiveLikeBtn);
  newCardDeleteBtn.addEventListener('click', deleteCard);
  newCardImage.addEventListener('click', () => showImg(card));
  return newCard;
}

// Функция добавления карточки на страницу
function addCardHtml(card) {
    const newCard = createCard(card);
    cardsHtml.prepend(newCard);
}

// Функция добавления массива карточек на страницу
function addCardsHtml(cards) {
  cards.forEach((card) => {
    addCardHtml(card);
  });
}

// Функция удаления карточки
function deleteCard(event) {
  event.target.closest('.card').remove();
}

// Функция лайк карточке
function setActiveLikeBtn(event) {
  event.target.classList.toggle('card__button_status_active');
}

// Функция добавления на страницу информации об авторе
function submitEditProfile(event) {
  event.preventDefault();
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = aboutYourSelfInput.value;
  closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', submitEditProfile);

// Функция добавления на страницу и отправки на сервер новой карточки
function submitNewCard(event) {
  event.preventDefault();
  const cardLink = imageLinkInput.value;
  const cardName = imageNameInput.value;
  const newCard = {name: cardName, link: cardLink};
  addCardHtml(newCard);
  formCardSubmitBtn.setAttribute('disabled', true);
  formCardSubmitBtn.classList.add('popup__button_inactive');
  formCard.reset();
  closePopup(popupAddCard);
}
formCard.addEventListener('submit', submitNewCard);

// Фнкция вывода изображения на полный экран
function showImg(card) {
  popupImage.src = card.link;
  popupTitle.textContent = card.name;
  popupImage.alt = '';
  popupImage.alt = 'Иллюстрация природы: ' + card.name;
  openPopup(popupImg);
}

function openEditForm(event) {
  nameInput.value = titleProfile.textContent;
  aboutYourSelfInput.value = subtitleProfile.textContent;
  openPopup(popupEditProfile);
}
btnEditProfile.addEventListener('click', openEditForm);

btnAddCard.addEventListener('click', () => openPopup(popupAddCard));

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey);
}

// Функция добавляет события закрытия popup-ов
const setCloseEventListenersToPopups = (popups) => {
  popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
          if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
          }
          if (evt.target.classList.contains('popup__button_type_close')) {
            closePopup(popup);
          }
      });
  });
}
setCloseEventListenersToPopups(popups);

// Функция закрытия popup при нажатии ESC
function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    openedPopup && closePopup(openedPopup);
  }
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

addCardsHtml(initialCards);
