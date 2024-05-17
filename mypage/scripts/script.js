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
const timeBeforeShow = 1000 * 100000;

const popupReminderOpen = function() {
    popupReminderElement.classList.add("popup_opened");
    popupReminderContainer.classList.add("popup__container_opened");
    localStorage.setItem("is-reminder-opened", "true");
}

const popupReminderClose = function() {
    popupReminderElement.classList.remove("popup_opened");
    popupReminderContainer.classList.remove("popup__container_opened");
    localStorage.setItem("is-reminder-opened", "false");
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
const contactLink = document.getElementById('contactLink');
const popupForm = document.querySelector('.popup__form');
const formContact = document.getElementById('contactForm');
const submitButton = contactForm.querySelector('.popup__send');

const popupFromClose = function() {
    popupForm.classList.remove('popup_opened');
    formContainer.classList.remove('popup__container_opened')
    const submitButton = contactForm.querySelector('.popup__send');
    submitButton.textContent = 'Submit';
    submitButton.style.backgroundColor = 'green';
    submitButton.style.cursor = 'pointer';
    submitButton.disabled = false; 
}

formCloseButton.addEventListener("click", function(evt) {
    popupFromClose();
})

contactLink.addEventListener('click', function(evt) {
    evt.preventDefault();
    popupForm.classList.add('popup_opened');
    formContainer.classList.add('popup__container_opened')
});

contactForm.addEventListener('submit', async function(evt) {
    evt.preventDefault();
    const formData = new FormData(formContact);

    const phone = formData.get('phone');
    const email = formData.get('email');
    const request = formData.get('request');


    if (!IsOnlyNumInPhone(phone)) {
        alert('Use only num in phone!');
        return;
    }
    if (!IsTen(phone)) {
        alert('Need 10 nums in phone!');
        return;
    } 
    if(!validateEmail(email)) {
        alert('wrong email');
        return;
    }
    if (!validateText(request)) {
        alert('use only englih letters');
        return;
    }

    submitButton.textContent = 'Sending...';
    submitButton.style.backgroundColor = 'orange';
    submitButton.style.cursor = 'not-allowed';
    submitButton.disabled = true;

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        });

        if (response.ok) {
            submitButton.textContent = 'Successfully send';
            submitButton.style.backgroundColor = 'green';
            submitButton.style.cursor = 'default';
            submitButton.disabled = true;
            formContact.reset();
            setTimeout(() => {
                popupFromClose();
            }, 3000);
        } else {
            throw new Error('Failed to submit form.');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to submit form. Please try again later.');
        submitButton.textContent = 'Submit';
        submitButton.style.backgroundColor = '';
        submitButton.style.cursor = '';
        submitButton.disabled = false;
    }
})

function IsOnlyNumInPhone(phone) {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone);
}

function IsTen(phone) {
    const phoneRegex = /^.{10}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateText(text) {
    const textRegex = /^[a-zA-Z\s]+$/;
    return textRegex.test(text);
}
//#################################################################
//#################################################################
// Timer
function countdown() {
    const countDownDate = new Date("May 30, 2024 09:00:00").getTime();
  
    const x = setInterval(function() {
      const now = new Date().getTime();
      const distance = countDownDate - now;
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      document.getElementById("countdown").innerHTML = days + "д " + hours + "ч "
      + minutes + "м " + seconds + "с ";
  
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Сдал?";
      }
    }, 1000);
  }
  
  countdown();
//#################################################################
//#################################################################
// Scroll menu
window.addEventListener('scroll', function() {
    const header = document.querySelector(".header");
    const menu = header.querySelector('.menu')
    const firstScreenHeight = window.innerHeight;
    const secondScreenOffset = firstScreenHeight * 2;
    const menuHeight = menu.offsetHeight;
    
    if (window.scrollY < firstScreenHeight) {
        header.classList.add('disabled');
        header.classList.remove('active');
        document.body.style.paddingTop = '0';
    } else {
        header.classList.remove('disabled');
        header.classList.add('active');
        document.body.style.paddingTop = '0';
    }
});
//#################################################################
//#################################################################
// SVG animations

const snowflakeButton = document.getElementById('snow-starting');
let isSnowing = false;

snowflakeButton.addEventListener('click', () => {
    const snow = document.getElementById('snow');
    if (isSnowing) {
        snow.classList.remove('snow');
    } else {
        snow.classList.add('snow');
    }
    isSnowing = !isSnowing;
});