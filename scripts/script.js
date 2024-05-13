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

const popupFromClose = function() {
    popupForm.classList.remove('popup_opened');
    const submitButton = contactForm.querySelector('.popup__send');
    submitButton.textContent = 'Submit';
    submitButton.style.backgroundColor = 'green'; // Возвращаем исходный цвет
    submitButton.style.cursor = 'pointer'; // Возвращаем исходный вид курсора
    submitButton.disabled = false; 
}

formCloseButton.addEventListener("click", function(evt) {
    popupFromClose();
})

const contactLink = document.getElementById('contactLink');
const popupForm = document.querySelector('.popup__form');
const formContact = document.getElementById('contactForm');
const submitButton = contactForm.querySelector('.popup__send');

contactLink.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    popupForm.classList.add('popup_opened'); // Открываем форму
});

contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(formContact);

    // Валидация данных формы
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

    // Изменение текста и стилей кнопки отправки
    submitButton.textContent = 'Sending...';
    submitButton.style.backgroundColor = 'orange';
    submitButton.style.cursor = 'not-allowed';
    submitButton.disabled = true;

    // Отправка данных методом POST
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries())) // Преобразуем FormData в объект и конвертируем в JSON
        });

        if (response.ok) {
            // Успешная отправка формы
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
        submitButton.style.backgroundColor = ''; // Возвращаем исходный цвет
        submitButton.style.cursor = ''; // Возвращаем исходный вид курсора
        submitButton.disabled = false; // Разрешаем снова отправку формы
    }
})

// Функция валидации телефона
function IsOnlyNumInPhone(phone) {
    const phoneRegex = /^\d+$/; // Проверяем, что телефон состоит из 10 цифр
    return phoneRegex.test(phone);
}

function IsTen(phone) {
    const phoneRegex = /^.{10}$/; // Проверяем, что телефон состоит из 10 цифр
    return phoneRegex.test(phone);
}

// Функция валидации имейла
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Простая проверка формата имейла
    return emailRegex.test(email);
}

// Функция валидации текста (текст может быть только на русском или английском языке)
function validateText(text) {
    const textRegex = /^[a-zA-Z\s]+$/; // Проверяем, что текст состоит только из букв
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
  
  countdown(); // Запуск таймера при загрузке страницы
//#################################################################
//#################################################################
// Scroll menu
window.addEventListener('scroll', function() {
    const header = document.querySelector(".header"); // Получаем элемент меню
    const firstScreenHeight = window.innerHeight; // Высота первого экрана
    const secondScreenOffset = firstScreenHeight * 2; // Смещение для второго экрана
    const headerHeight = header.offsetHeight; // Высота меню
    
    if (window.scrollY < firstScreenHeight) {
        header.classList.add('disabled');
        header.classList.remove('active');
        document.body.style.paddingTop = '0';
    } else {
        header.classList.remove('disabled');
        header.classList.add('active');
        document.body.style.paddingTop = headerHeight - 15 + 'px';
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