const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const titleProfile = profile.querySelector('.profile__title');
const subtitleProfile = profile.querySelector('.profile__subtitle');
const btnEditProfile = profile.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const btnClosePopupEditProfile = popupEditProfile.querySelector('.popup__button_type_close');
const formEditProfile = popupEditProfile.querySelector('.popup__form_type_edit-profile');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_text');
const addCardForm = document.querySelector('.popup__form_type_add-card');
const popupAddCard = document.querySelector('.popup_type_add-card');
const btnAddCard = profile.querySelector(".profile__button-add");
const btnClosePopupAddCard = popupAddCard.querySelector('.popup__button_type_close');
const cardsHtml = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const popupImg = document.querySelector('.popup_type_image');
const btnClosePopupImg = popupImg.querySelector('.popup__button_type_close');

// Фнкция создания карточки
function createCard(card) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__image').src = card.link;
  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__button_type_like').addEventListener('click', setActiveLikeBtn);
  newCard.querySelector('.card__button_type_delete').addEventListener('click', deleteCard);
  newCard.querySelector('.card__image').addEventListener('click', showImg);
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
function formSubmitHandler(event) {
  event.preventDefault();
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = jobInput.value;
  closePopupEditProfile();
}

// Функция добавления на страницу и отправки на сервер новой карточки
function submitNewCard(event) {
  event.preventDefault();
  const cardLink = event.target.querySelector('.popup__input_type_link').value;
  const cardName = event.target.querySelector('.popup__input_type_place').value;
  if (cardLink !== '' && cardName !== '') {
    const newCard = {name: cardName, link: cardLink};
    addCardHtml(newCard);
    event.target.reset();
  }
  closePopupAddCard();
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
function showImg(event) {
  openPopupImg();
  const imageLink = event.target.currentSrc;
  const imageTitle = event.target.nextElementSibling.querySelector('.card__title').textContent;;
  popupImg.querySelector('.popup__image').src = imageLink;
  popupImg.querySelector('.popup__text').textContent = imageTitle;
}

function openEditForm() {
  openPopupEditProfile();
  nameInput.value = titleProfile.textContent;
  jobInput.value = subtitleProfile.textContent;
}

function openPopupEditProfile() {
  toggleModal(popupEditProfile);
}

function closePopupEditProfile() {
  toggleModal(popupEditProfile);
}

function openPopupAddCard() {
  toggleModal(popupAddCard);
}

function closePopupAddCard() {
  toggleModal(popupAddCard);
}

function openPopupImg() {
  toggleModal(popupImg);
}

function closePopupImg() {
  toggleModal(popupImg);
}

btnEditProfile.addEventListener('click', openEditForm);
btnClosePopupEditProfile.addEventListener('click', closePopupEditProfile);
formEditProfile.addEventListener('submit', formSubmitHandler);
btnAddCard.addEventListener('click', openPopupAddCard);
btnClosePopupAddCard.addEventListener('click', closePopupAddCard);
addCardForm.addEventListener('submit', submitNewCard);
btnClosePopupImg.addEventListener('click', closePopupImg);



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
