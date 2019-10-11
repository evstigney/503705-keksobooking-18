'use strict';

window.map = (function () {
  var mapPins = window.data.map.querySelector('.map__pins');
  var mapPinMain = window.data.map.querySelector('.map__pin--main');
  var mapPinMainButton = window.data.map.querySelector('button.map__pin--main');
  var mapPinsFragment = document.createDocumentFragment();

  var MAIN_PIN_X = mapPinMain.getBoundingClientRect().x;
  var MAIN_PIN_Y = mapPinMain.getBoundingClientRect().y;
  var MAIN_PIN_WIDTH = mapPinMain.getBoundingClientRect().width;
  var MAIN_PIN_HEIGHT = mapPinMain.getBoundingClientRect().height;
  var MAIN_PIN_BUTTON_HEIGHT = mapPinMainButton.getBoundingClientRect().height;

  var renderMatchingPins = function () {
    for (var i = 0; i < window.data.mockingData.getCountOfPins(); i++) {
      var pin = window.pin.renderPin(window.data.mockingData.adsArr[i]);
      mapPinsFragment.appendChild(pin);
    }
    mapPins.appendChild(mapPinsFragment);
    return mapPins;
  };

  var renderMatchingCard = function (target) {
    var allPins = mapPins.querySelectorAll('.map__pin');
    var matchingPins = [];
    for (var i = 0; i < allPins.length; i++) {
      if (window.pin.isPin(allPins[i])) {
        matchingPins.push(allPins[i]);
      }
    }
    var index = matchingPins.indexOf(target);
    var card = window.card.renderCard(index);
    var closePopupButtonHandler = function (evt) {
      if (evt.type === 'click' || evt.keyCode === window.util.ESC_KEYCODE) {
        window.data.map.removeChild(card);
      }
    };
    var closePopupButton = card.querySelector('.popup__close');
    closePopupButton.addEventListener('click', closePopupButtonHandler);
    document.addEventListener('keydown', closePopupButtonHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE && !(document.querySelector('.map__card'))) {
        document.removeEventListener('keydown', closePopupButtonHandler);
      }
    });
  };

  var renderMockingData = function () {
    var pins = renderMatchingPins();
    pins = pins.querySelectorAll('.map__pin');
    var checkCard = function () {
      if (window.data.map.querySelector('.map__card.popup')) {
        var previousCard = window.data.map.querySelector('.map__card.popup');
        window.data.map.removeChild(previousCard);
      }
    };
    var openPopupCardHandler = function (evt) {
      if (evt.type === 'click' || evt.keyCode === window.util.ENTER_KEYCODE && document.activeElement === evt.currentTarget) {
        checkCard();
        renderMatchingCard(evt.currentTarget);
      }
    };
    for (var i = 0; i < pins.length; i++) {
      if (window.pin.isPin(pins[i])) {
        pins[i].addEventListener('click', openPopupCardHandler);
        pins[i].addEventListener('keydown', openPopupCardHandler);
      }
    }
    return pins;
  };

  var toggleMapToActive = function () {
    window.data.map.classList.remove('map--faded');
  };

  var activatePage = function () {
    toggleMapToActive();
    window.form.toggleFormToActive();
    window.util.removeDisabled(window.form.adForm.children);
    renderMockingData();
    window.form.renderAddress();
    mapPinMain.removeEventListener('mousedown', activateMap);
    mapPinMain.removeEventListener('keydown', activateMapHandler);
  };

  var activateMap = function () {
    activatePage();
    window.form.validateCapacity();
    window.form.validateType();
    window.form.validateTimein();
  };

  var activateMapHandler = function (evt) {
    window.util.isEnterEvent(evt, activateMap);
  };

  mapPinMain.addEventListener('mousedown', activateMap);
  mapPinMain.addEventListener('keydown', activateMapHandler);

  return {
    mapPins: mapPins,
    MAIN_PIN_X: MAIN_PIN_X,
    MAIN_PIN_Y: MAIN_PIN_Y,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_BUTTON_HEIGHT: MAIN_PIN_BUTTON_HEIGHT
  };
})();
