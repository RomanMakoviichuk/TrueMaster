'use strict';

//Prevent touchscroll on IOS
var preventTouchScroll = function preventTouchScroll(bool) {
    if (bool === true) {
        document.body.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });
    } else {
        document.body.removeEventListener('touchmove', function (e) {
            e.preventDefault();
        });
    }
};

// Loader
var overlayLoading = document.querySelector('.loader-bg');
if (overlayLoading) {
    window.addEventListener('load', function () {
        document.body.removeAttribute('style');
        overlayLoading.style.display = 'none';
    });
}

//Navigation
var nav = document.querySelector('.navigation'),
    navToggler = document.querySelector('.nav-toggle'),
    navOverlay = document.querySelector('.navigation-overlay');

var isMenuOpen = false;

var toggleNav = function toggleNav() {
    isMenuOpen = !isMenuOpen;
    navToggler.setAttribute('aria-expanded', String(isMenuOpen));
    if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
        nav.classList.add('active');
        navOverlay.classList.add('active');
        preventTouchScroll(true);
    } else {
        document.body.removeAttribute('style');
        nav.classList.remove('active');
        navOverlay.classList.remove('active');
        preventTouchScroll(false);
    }
};

navToggler.addEventListener('click', function () {
    toggleNav();
});

//Anchors
var distanceToTop = function distanceToTop(el) {
    var topCoords = Math.floor(el.getBoundingClientRect().top);
    return topCoords;
};

var scrollAnchors = function scrollAnchors(e, anchor) {
    e.preventDefault();
    var targetID = anchor.getAttribute('href');
    var targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    var originalTop = distanceToTop(targetAnchor);
    window.scrollBy({ top: originalTop - 100, left: 0, behavior: 'smooth' });
    window.innerWidth <= 992 ? toggleNav() : false;
};

var links = document.querySelectorAll('.navigation-menu li a');
links.forEach(function (item) {
    item.addEventListener('click', function (e) {
        scrollAnchors(e, item);
    });
});

//Popups
var popupOpen = function popupOpen(popup) {
    var overlay = popup.parentNode;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

var popupClose = function popupClose(popup) {
    var overlay = popup.parentNode;
    overlay.classList.remove('active');
    document.body.removeAttribute('style');
};

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('overlay') && e.target.classList.contains('active')) {
        popupClose(e.target.querySelector('.popup'));
    }
});

var consultationPopup = document.getElementById('consultation_popup');
var reviewPopup = document.getElementById('reviews_popup');
var openPopupLinks = document.querySelectorAll('.popup-open');
var closePopupLinks = document.querySelectorAll('.popup-close');

openPopupLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        popupOpen(consultationPopup);
    });
});

closePopupLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        popupClose(link.parentNode);
    });
});

// document.getElementById('add_review').addEventListener('click', (e) => {
//     e.preventDefault();
//     popupOpen(reviewPopup);
// });

//Animations
window.addEventListener('load', function () {
    document.querySelectorAll('.animate').forEach(function (animate) {
        var waypoint = new Waypoint({
            element: animate,
            handler: function handler() {
                animate.classList.add('animated');
            },
            offset: '75%'
        });
    });
});

//Form validate
var forms = document.querySelectorAll('form');
forms.forEach(function (form) {
    var name = form.querySelector('.name') || null;
    var phone = form.querySelector('.phone') || null;
    var textarea = form.querySelector('.textarea') || null;
    var formElems = Array.from(form.elements);
    formElems.forEach(function (elem) {
        elem.addEventListener('input', function () {
            elem.classList.remove('error');
        });
    });
    form.addEventListener('submit', function (e) {
        if (validation(form, name, phone, textarea) === false) {
            e.preventDefault();
        }
    });
});

var validation = function validation(form, nameField, phoneField, textareaField) {
    var err = 0;

    if (nameField) {
        var name = nameField.value.trim();
        if (name.length < 1) {
            nameField.classList.add('error');
            err = err + 1;
        } else {
            nameField.classList.remove('error');
        }
    }

    if (phoneField) {
        var phone = phoneField.value.trim();
        if (phone.length < 16) {
            phoneField.classList.add('error');
            err = err + 1;
        } else {
            phoneField.classList.remove('error');
        }
    }

    if (textareaField) {
        var textarea = textareaField.value.trim();
        if (textarea.length < 1) {
            textareaField.classList.add('error');
            err = err + 1;
        } else {
            textareaField.classList.remove('error');
        }
    }

    if (err > 0) {
        return false;
    }
};

//Tel mask
var phoneFields = document.querySelectorAll('.phone');
phoneFields.forEach(function (field) {
    var phoneMask = new IMask(field, {
        mask: '+{380}00-000-000-0'
    });
});

//GMap
var initMap = function initMap() {
    // The location of Uluru
    var uluru = { lat: 50.418962816615895, lng: 30.541233977063094 };
    // The map, centered at Uluru
    var map = new google.maps.Map(document.getElementById('g_map'), { zoom: 18, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
};