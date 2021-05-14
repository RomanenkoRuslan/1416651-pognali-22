var popupLink = document.querySelector(".add-profile__business");
var popup = document.querySelector(".popup-business-rates");
var closeButton = popup.querySelector(".popup-business-rates__close");

popupLink.addEventListener("click", (evt) => {
  evt.preventDefault();
  popup.classList.remove('popup-business-rates-show');
})

closeButton.addEventListener("click", (evt) => {
	evt.preventDefault();
	popup.classList.add("popup-business-rates-show");
});

window.addEventListener("keydown", (evt) => {
  if (evt.keyCode === 27) {
    if (!popup.classList.contains("popup-business-rates-show")) {
      evt.preventDefault();
      popup.classList.add("popup-business-rates-show");
    }
  }
});

var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', () => {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});
