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
const timeBeforeShow = 1000 * 25;

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
})

setTimeout(function() {popupReminderOpen();}, timeBeforeShow);
//#################################################################
//#################################################################
// Post form
// post form

document.getElementById('contact').addEventListener('submit', function (form) {
    form.preventDefault();
    const name = document.querySelector('#contact-name').value;
    const tel = document.querySelector('#contact-phone').value;
    const email = document.querySelector('#contact-email').value;
    const description = document.querySelector('#contact-description').value;
    // TODO: how to rewrite these fields as if i wanted to reuse them?
    if (validatePrevent(name, tel, email, description)) {
        return;
    }
    const button = form.submitter;
    console.log();
    button.textContent = "Sending...";
    document.body.style.cursor = 'wait';
    delay(3000).then(() => createPost({
        title: name,
        body: tel,
    })).then(() => {
        button.textContent = "Submitted!";
        button.disabled = true;
        console.log(button);
        button.style.background = 'lightgreen';
        document.body.style.cursor = 'default';
    }).catch(
        () => {
            button.style.background = 'red';
            button.textContent = "Server Error";
        }
    );
});

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function createPost(newPost) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title: newPost.title,
            body: newPost.body
        })
    }).then(res => res.json()).then((post) => {
        console.log(post);

    });

}
// validate form
function validatePrevent(name, tel, email, description) {
    if (alertEmpty(tel, 'Phone number') || alertEmpty(name, "Name field")) {
        return true;
    }
    if (checkLang(name, 'name') || (description !== null && description !== '' && checkLang(description, 'description'))) {
        return true;
    }
    if (alertNonEmptyEmail(email)) {
        return true;
    }
    if (alertNonEmptyPhone(tel)) {
        return true;
    }
    return false;
}

function alertEmpty(s, field) {
    if (s === "" || s === null) {
        alert(field + ' is required to submit the form')
        return true
    }
    return false;
}

function checkLang(s, field_abbreviation) {
    if (s === null || typeof s !== 'string') {
        return false;
    }
    const regex = /^[a-zA-Zа-яА-Я0-9_.,'"!?;:& ]+$/i;
    if (!s.match(regex)) {
        alert('Please provide en/ru ' + field_abbreviation);
        return true;
    }
    return false;
}

function alertNonEmptyPhone(phone) {
    if (phone !== '' && !validatePhone(phone)) {
        alert('Please provide correct phone');
        return true;
    }
    return false;
}

function alertNonEmptyEmail(email) {
    if (email !== '' && !validateEmail(email)) {
        alert('Please provide correct email or do not fill that field');
        return true;
    }
    return false;
}

const validateEmail = (email) => {
    if (email === null || typeof email !== 'string') {
        return false;
    }
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return email.match(regex);
};

const validatePhone = (phone) => {
    if (phone === null || typeof phone !== 'string') {
        return false;
    }
    const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/i;
    return phone.match(regex);
};

const validate = () => {
    var result = document.getElementById('contact-email-result');
    const email = document.getElementById('contact-email').value;
    result.innerHTML = '';
    if (email === '') {
        return;
    }

    if (validateEmail(email)) {
        result.innerHTML = email + ' is valid.';
        result.style.color = 'green';
    } else {
        result.innerHTML = email + ' is invalid.';
        result.style.color = 'red';
    }
};

document.getElementById('contact-email').addEventListener('input', validate);