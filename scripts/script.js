const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const titleProfile = profile.querySelector('.profile__title');
const subtitleProfile = profile.querySelector('.profile__subtitle');
const btnEditProfile = profile.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const btnClosePopupEditProfile = popupEditProfile.querySelector('.popup__button_type_close');

// Константы формы редактирования профиля
const formEditProfile = document.forms.editProfile;
const nameInput = formEditProfile.elements.name;
const aboutYourSelfInput = formEditProfile.elements.aboutYourSelf;

// Константы форма добавления новой карточки
const formCard = document.forms.newCard;
const imageNameInput = formCard.elements.place;
const imageLinkInput = formCard.elements.link;

const popupAddCard = document.querySelector('.popup_type_add-card');
const btnAddCard = profile.querySelector(".profile__button-add");
const btnClosePopupAddCard = popupAddCard.querySelector('.popup__button_type_close');
const cardsHtml = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const popupImg = document.querySelector('.popup_type_image');
const btnClosePopupImg = popupImg.querySelector('.popup__button_type_close');

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

// Функция добавления на страницу информации об авторе
function submitEditProfile(event) {
  event.preventDefault();
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = aboutYourSelfInput.value;
  closePopup(event);
}

// Функция добавления на страницу и отправки на сервер новой карточки
function submitNewCard(event) {
  event.preventDefault();
  const cardLink = imageLinkInput.value;
  const cardName = imageNameInput.value;
  const newCard = {name: cardName, link: cardLink};
  addCardHtml(newCard);
  formCard.reset();
  closePopup(event);
}

// Функция удаления карточки
function deleteCard(event) {
  event.target.closest('.card').remove();
}

// Функция toggle (открытия/закрытия popup)
function toggleModal(modal) {
  modal.classList.toggle('popup_opened');
}

// Функция лайк карточке
function setActiveLikeBtn(event) {
  event.target.classList.toggle('card__button_status_active');
}

// Фнкция вывода изображения на полный экран
function showImg(card) {
  const popupImage = popupImg.querySelector('.popup__image');
  const popupTitle = popupImg.querySelector('.popup__text');
  popupImage.src = card.link;
  popupTitle.textContent = card.name;
  popupImage.alt = '';
  popupImage.alt = 'Иллюстрация природы: ' + card.name;
  openPopupImg();
}

// Функция закрытия popup при нажатии ESC
function escClose(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function openEditForm(event) {
  nameInput.value = titleProfile.textContent;
  aboutYourSelfInput.value = subtitleProfile.textContent;
  openPopupEditProfile();
}

function openPopupEditProfile() {
  toggleModal(popupEditProfile);
}

function openPopupAddCard() {
  toggleModal(popupAddCard);
}

function openPopupImg() {
  toggleModal(popupImg);
}

function closePopup(event) {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
}

formEditProfile.addEventListener('submit', submitEditProfile);
formCard.addEventListener('submit', submitNewCard);
btnEditProfile.addEventListener('click', openEditForm);
btnAddCard.addEventListener('click', openPopupAddCard);

btnClosePopupAddCard.addEventListener('click', closePopup);
btnClosePopupEditProfile.addEventListener('click', closePopup);
btnClosePopupImg.addEventListener('click', closePopup);

document.addEventListener('keydown', escClose);

// Функции и обработчики событий для скрытия popup при клике снаружи
function clickOverlayEditProfile(event) {
  if (event.target === event.currentTarget) {
    toggleModal(popupEditProfile);
  }
}
popupEditProfile.addEventListener('click', clickOverlayEditProfile);

function clickOverlayAddCard(event) {
  if (event.target === event.currentTarget) {
    toggleModal(popupAddCard);
  }
}
popupAddCard.addEventListener('click', clickOverlayAddCard);

function clickOverlayImg(event) {
  if (event.target === event.currentTarget) {
    toggleModal(popupImg);
  }
}
popupImg.addEventListener("click", clickOverlayImg);

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
