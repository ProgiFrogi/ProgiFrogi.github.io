//#######################################################
// Gallery
const popupGallery = document.querySelector(".popup__gallery");
const popupGalleryContainer = popupGallery.querySelector(".popup__container");
const popupGalleryImage = popupGalleryContainer.querySelector(".popup__img");

const popupGalleryCloseButton = popupGallery.querySelector(".popup__close-button");
const popupGalleryNextButton = popupGallery.querySelector(".popup__next-button");
const popupGalleryPrevButton = popupGallery.querySelector(".popup__prev-button");

const imgContainerArray = document.querySelectorAll(".cards__card");

let currentImageContainer = document.querySelector(".cards__card");
let currentImageLink = currentImageContainer.querySelector(".cards__img").src;

function openPopupGallery() {
    popupGallery.classList.add("popup_opened");
    popupGalleryContainer.classList.add("popup__container_opened");
}

function closePopupGallery() {
    popupGallery.classList.remove("popup_opened");
    popupGalleryContainer.classList.remove("popup__container_opened");
}

function switchNext() {
    let temp = currentImageContainer.nextElementSibling;
    if (temp == null) {
        return;
    }
    currentImageContainer = temp;
    currentImageLink = currentImageContainer.querySelector(".cards__img").src;
}

function switchPrev() {
    let temp = currentImageContainer.previousElementSibling;
    if (temp == null) {
        return;
    }
    currentImageContainer = temp;
    currentImageLink = currentImageContainer.querySelector(".cards__img").src;
}

function switchNavigationButtons() {
    let temp = currentImageContainer.previousElementSibling;
    if (temp == null) {
        popupGalleryPrevButton.classList.add("popup__prev-button_disabled");
    } else {
        popupGalleryPrevButton.classList.remove("popup__prev-button_disabled");
    }
    temp = currentImageContainer.nextElementSibling;
    if (temp == null) {
        popupGalleryNextButton.classList.add("popup__next-button_disabled");
    } else {
        popupGalleryNextButton.classList.remove("popup__next-button_disabled");
    }
}

function setImage() {
    popupGalleryImage.src = currentImageLink;
}

imgContainerArray.forEach(function (item) {
    item.addEventListener("click", function () {
        console.log(item);
        currentImageContainer = item;
        currentImageLink = item.querySelector(".cards__img").src;
        setImage();
        openPopupGallery();
        switchNavigationButtons();
    })
})

popupGalleryNextButton.addEventListener("click", function (evt) {
    switchNext();
    setImage();
    switchNavigationButtons();
    evt.stopPropagation();
})

popupGalleryPrevButton.addEventListener("click", function (evt) {
    switchPrev();
    setImage();
    switchNavigationButtons();
    evt.stopPropagation();
})

popupGalleryCloseButton.addEventListener("click", function (evt) {
    closePopupGallery();
    evt.stopPropagation();
})

popupGallery.addEventListener("click", function (evt) {
    closePopupGallery();
    evt.stopPropagation();
})
//#######################################################
// Reminder
const popupReminderElement = document.querySelector(".popup__reminder");
const popupReminderContainer = popupReminderElement.querySelector(".popup__container_reminder");
const popupReminderCloseButton = popupReminderElement.querySelector(".popup__close-button");
const timeBeforeShow = 3;

const popupReminderOpen = function() {
    popupReminderElement.classList.add("popup_opened");
    popupReminderContainer.classList.add("popup__container_opened");
}

const popupReminderClose = function() {
    popupReminderElement.classList.remove("popup_opened");
    popupReminderContainer.classList.remove("popup__container_opened");
}

const popupReminderOpenFirst = function () {
    if (!localStorage.getItem("is-reminder-opened")) {
        localStorage.setItem("show", "true");
        setTimeout(popupReminderOpen, timeBeforeShow);
    }
}
popupReminderOpenFirst();

popupReminderCloseButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    localStorage.setItem("is-reminder-opened", "false");
    popupReminderClose();
})

popupReminderContainer.addEventListener("click", function(evt) {
    evt.stopPropagation();
});

popupReminderElement.addEventListener("click", function(evt) {
    localStorage.setItem("is-reminder-opened", "false");
    popupReminderClose();
    evt.stopPropagation();
})

setTimeout(function() {popupReminderOpen();}, timeBeforeShow);
//#######################################################
// document.addEventListener("DOMContentLoaded", function() {
//     const popup = document.querySelector(".popup__reminder");
//     const popupContainer = popup.querySelector("popup__container_reminder");
//     const closeButton = popup.querySelector("popup__close-button");
//     const timeBeforeShow = 1;
//     let show = false;
  
//     const popupReminderOpen = function() {
//       if (!localStorage.getItem("show")) {
//         popup.classList.add("popup_opened");
//         popup.classList.add("popup__container_opened");
//         localStorage.setItem("show", "true");
//       }
//     }
  
//     const popupReminderClose = function() {
//       popup.classList.remove("popup_opened");
//       popup.classList.remove("popup__container_opened");
//     }
  
//     setTimeout(function() {
//         popupReminderOpen();
//     }, timeBeforeShow);
  
//     closeButton.addEventListener("click", function() {
//         popupReminderClose();
//     })
  
//     popup.addEventListener('click', e => {
//       if (!(e.composedPath().includes(popupContainer) || e.composedPath().includes(closeButton))) {
//         popup.classList.remove("popup_opened");
//         popup.classList.remove("popup__container_opened");
//       }
//     })
//   })