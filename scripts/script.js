//#################################################################
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
//#################################################################
//#################################################################
// Reminder
const popupReminderElement = document.querySelector(".popup__reminder");
const popupReminderContainer = popupReminderElement.querySelector(".popup__container_reminder");
const popupReminderCloseButton = popupReminderElement.querySelector(".popup__close-button");
const timeBeforeShow = 1000 * 200000;

const popupReminderOpen = function() {
    popupReminderElement.classList.add("popup_opened");
    popupReminderContainer.classList.add("popup__container_opened");
    localStorage.setItem("is-reminder-opened", "true"); // Сохраняем состояние попапа
}

const popupReminderClose = function() {
    popupReminderElement.classList.remove("popup_opened");
    popupReminderContainer.classList.remove("popup__container_opened");
    localStorage.setItem("is-reminder-opened", "false"); // Сохраняем состояние попапа
}

const popupReminderOpenFirst = function () {
    const isReminderOpened = localStorage.getItem("is-reminder-opened");
    if (isReminderOpened === "true") {
        popupReminderOpen();
    } else {
        setTimeout(popupReminderOpen, timeBeforeShow);
    }
}
popupReminderOpenFirst();

popupReminderCloseButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    localStorage.setItem("is-reminder-opened", "false");
    popupReminderClose();
    setTimeout(function() {popupReminderOpen();}, timeBeforeShow);
})

popupReminderContainer.addEventListener("click", function(evt) {
    evt.stopPropagation();
    setTimeout(function() {popupReminderOpen();}, timeBeforeShow);
});

popupReminderElement.addEventListener("click", function(evt) {
    localStorage.setItem("is-reminder-opened", "false");
    popupReminderClose();
    evt.stopPropagation();
    setTimeout(function() {popupReminderOpen();}, timeBeforeShow);
})

setTimeout(function() {popupReminderOpen();}, timeBeforeShow);
//#################################################################
//#################################################################
// Post form
const contactForm = document.querySelector('.popup__form');
const formContainer = contactForm.querySelector('.popup__container_form')
const formCloseButton = formContainer.querySelector('.popup__close-button')

contactForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission
    const formData = new FormData(contactForm);
    
    // Here you can perform client-side validation before sending the data
    // For simplicity, let's assume all fields are required and have a minimum length

    if (formData.get('phone').length !== 10 || !validateEmail(formData.get('email')) || formData.get('request').length < 10) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const response = await fetch('https://example.com/submit', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        // Update button text and style to indicate successful submission
        const submitButton = contactForm.querySelector('.popup__send');
        submitButton.textContent = 'Successfully sent';
        submitButton.style.backgroundColor = 'green';
        submitButton.style.cursor = 'default';
        submitButton.disabled = true;
    } else {
        alert('Failed to submit form. Please try again later.');
    }
});
const popupFromClose = function() {
    popupForm.classList.remove('popup_opened');
}

formCloseButton.addEventListener("click", function(evt) {
    popupFromClose();
})

function validateEmail(email) {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const contactLink = document.getElementById('contactLink');
const popupForm = document.querySelector('.popup__form');

contactLink.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    popupForm.classList.add('popup_opened'); // Открываем форму
});