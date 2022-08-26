export const popups = document.querySelectorAll(".popup");
export const popupEditProfile = document.querySelector(".popup_type_edit-profile");
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const popupImg = document.querySelector(".popup_type_image");
export const popupImage = popupImg.querySelector(".popup__image");
export const popupTitle = popupImg.querySelector(".popup__text");

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKeyDown);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKeyDown);
}

function handleEscKeyDown(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    openedPopup && closePopup(openedPopup);
  }
}
