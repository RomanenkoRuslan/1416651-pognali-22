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


if (document.querySelector('.filter-country')) {
    var filterCountry = document.querySelector('.filter-country');
    var filterCountryToggle = document.querySelector('.filter-country__toggle');

  filterCountry.classList.remove('filter-country--nojs');

  filterCountryToggle.addEventListener('click', function() {
    if (filterCountry.classList.contains('filter-country--closed')) {
      filterCountry.classList.remove('filter-country--closed');
      filterCountry.classList.add('filter-country--opened');
    } else {
      filterCountry.classList.add('filter-country--closed');
      filterCountry.classList.remove('filter-country--opened');
    }
  });
}

if (document.querySelector(".add-profile__business")) {
  var popupLink = document.querySelector(".add-profile__business");
  var popup = document.querySelector(".popup-business-rates");
  var closeButton = popup.querySelector(".popup-business-rates__close");

  popupLink.addEventListener("click", (evt) => {
    evt.preventDefault();
    popup.classList.remove('popup-business-rates--show');
  })

  closeButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    popup.classList.add("popup-business-rates--show");
  });

  window.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 27) {
      if (!popup.classList.contains("popup-business-rates--show")) {
        evt.preventDefault();
        popup.classList.add("popup-business-rates--show");
      }
    }
  });
}

if (document.querySelector('.add-plan__country--select')) {
  var selectButton = document.querySelector('.add-plan__country--select');
  var countryList = document.querySelector('.add-plan__country-dropdown');
  var selectWraP = document.querySelector('.add-plan__country-area--select');

  selectButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    countryList.classList.remove('add-plan__country-dropdown--close');
    selectButton.classList.add('add-plan__country--opened');
    selectWraP.classList.add('.add-plan__country-area--opened');
  })

  var buttonClose = document.querySelector('.add-plan__country-dropdown-button');

  buttonClose.addEventListener("click", (evt) => {
    evt.preventDefault();
    countryList.classList.add('add-plan__country-dropdown--close');
    selectButton.classList.remove('add-plan__country--opened');
    selectWraP.classList.remove('.add-plan__country-area--opened');
  })
}
