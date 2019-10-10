'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinMainButton = map.querySelector('button.map__pin--main');
  var mapPinsFragment = document.createDocumentFragment();

  var MAIN_PIN_X = mapPinMain.getBoundingClientRect().x;
  var MAIN_PIN_Y = mapPinMain.getBoundingClientRect().y;
  var MAIN_PIN_WIDTH = mapPinMain.getBoundingClientRect().width;
  var MAIN_PIN_HEIGHT = mapPinMain.getBoundingClientRect().height;
  var MAIN_PIN_BUTTON_HEIGHT = mapPinMainButton.getBoundingClientRect().height;

  var getAuthorAvatar = function (index) {
    index = '0' + (index + 1);
    return 'img/avatars/user' + index + '.png';
  };

  var getLocationParameters = function (elem) {
    var max = elem.getBoundingClientRect().width;
    var locationX = window.util.getRandomNumber(0, max);
    var locationY = window.util.getRandomNumber(window.data.LOCATION_Y_MIN, window.data.LOCATION_Y_MAX);
    var location = {
      x: locationX,
      y: locationY
    };
    return location;
  };

  var getMockingAdsArr = function () {
    var mockingAds = [];
    for (var i = 0; i < window.data.ADS_QUANTITY; i++) {
      var locationParameters = getLocationParameters(map);
      var ad = {
        'author': {
          'avatar': getAuthorAvatar(i)
        },
        'offer': {
          'title': 'Заголовок предложения. Это очень хорошее предложение.',
          'address': locationParameters.x + ', ' + locationParameters.y,
          'price': window.util.getRandomNumber(window.data.PRICE_MIN, window.data.PRICE_MAX),
          'type': window.util.getRandomValue(window.data.TYPES_ARR),
          'rooms': window.util.getRandomNumber(window.data.ROOMS_MIN, window.data.ROOMS_MAX),
          'guests': window.util.getRandomNumber(window.data.GUESTS_MIN, window.data.GUESTS_MAX),
          'checkin': window.util.getRandomValue(window.data.CHECKIN_TIMES_ARR),
          'checkout': window.util.getRandomValue(window.data.CHECKOUT_TIMES_ARR),
          'features': window.util.getRandomArr(window.data.FEATURES_ARR),
          'description': 'С точки зрения банальной эрудиции каждый индивидуум не может игнорировать критерии утопического субъективизма.',
          'photos': window.util.getRandomArr(window.data.PHOTOS_ARR)
        },
        'location': {
          'x': locationParameters.x,
          'y': locationParameters.y
        }
      };
      mockingAds.push(ad);
    }
    return mockingAds;
  };

  var mockingData = {
    adsArr: getMockingAdsArr(),
    getCountOfPins: function () {
      return this.adsArr.length;
    }
  };

  var renderMatchingPins = function () {
    for (var i = 0; i < mockingData.getCountOfPins(); i++) {
      var pin = window.pin.renderPin(mockingData.adsArr[i]);
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
        map.removeChild(card);
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
      if (map.querySelector('.map__card.popup')) {
        var previousCard = map.querySelector('.map__card.popup');
        map.removeChild(previousCard);
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
    map.classList.remove('map--faded');
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
    map: map,
    mapPins: mapPins,
    MAIN_PIN_X: MAIN_PIN_X,
    MAIN_PIN_Y: MAIN_PIN_Y,
    MAIN_PIN_WIDHT: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_BUTTON_HEIGHT: MAIN_PIN_BUTTON_HEIGHT,
    mockingData: mockingData
  };
})();
