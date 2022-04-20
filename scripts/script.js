const content = document.querySelector('.content');

const profile = content.querySelector('.profile');
const titleProfile = profile.querySelector('.profile__title');
const subtitleProfile = profile.querySelector('.profile__subtitle');
const btnEditProfile = profile.querySelector('.profile__button-edit');

const popup = document.querySelector('.popup');
const btnClosePopup = popup.querySelector('.popup__button_type_close');

const form = popup.querySelector('.popup__form');
const nameInput = form.querySelector('.popup__input_type_name');
const jobInput = form.querySelector('.popup__input_type_text');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = jobInput.value;
  closePopup();
}

function openEditForm() {
  openPopup();
  nameInput.value = titleProfile.textContent;
  jobInput.value = subtitleProfile.textContent;
}

btnEditProfile.addEventListener('click', openEditForm);
btnClosePopup.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);
