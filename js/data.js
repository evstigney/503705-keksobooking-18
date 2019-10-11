'use strict';

window.data = (function () {
  var ADS_QUANTITY = 8;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 100000;
  var TYPES_ARR = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 10;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 50;
  var CHECKIN_TIMES_ARR = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES_ARR = ['12:00', '13:00', '14:00'];
  var FEATURES_ARR = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_ARR = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var map = document.querySelector('.map');

  var getAuthorAvatar = function (index) {
    index = '0' + (index + 1);
    return 'img/avatars/user' + index + '.png';
  };

  var getLocationParameters = function (elem) {
    var max = elem.getBoundingClientRect().width;
    var locationX = window.util.getRandomNumber(0, max);
    var locationY = window.util.getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var location = {
      x: locationX,
      y: locationY
    };
    return location;
  };

  var getMockingAdsArr = function () {
    var mockingAds = [];
    for (var i = 0; i < ADS_QUANTITY; i++) {
      var locationParameters = getLocationParameters(map);
      var ad = {
        'author': {
          'avatar': getAuthorAvatar(i)
        },
        'offer': {
          'title': 'Заголовок предложения. Это очень хорошее предложение.',
          'address': locationParameters.x + ', ' + locationParameters.y,
          'price': window.util.getRandomNumber(PRICE_MIN, PRICE_MAX),
          'type': window.util.getRandomValue(TYPES_ARR),
          'rooms': window.util.getRandomNumber(ROOMS_MIN, ROOMS_MAX),
          'guests': window.util.getRandomNumber(GUESTS_MIN, GUESTS_MAX),
          'checkin': window.util.getRandomValue(CHECKIN_TIMES_ARR),
          'checkout': window.util.getRandomValue(CHECKOUT_TIMES_ARR),
          'features': window.util.getRandomArr(FEATURES_ARR),
          'description': 'С точки зрения банальной эрудиции каждый индивидуум не может игнорировать критерии утопического субъективизма.',
          'photos': window.util.getRandomArr(PHOTOS_ARR)
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

  return {
    TYPES_ARR: TYPES_ARR,
    CHECKIN_TIMES_ARR: CHECKIN_TIMES_ARR,
    CHECKOUT_TIMES_ARR: CHECKOUT_TIMES_ARR,
    FEATURES_ARR: FEATURES_ARR,
    PHOTOS_ARR: PHOTOS_ARR,
    ADS_QUANTITY: ADS_QUANTITY,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    PRICE_MIN: PRICE_MIN,
    PRICE_MAX: PRICE_MAX,
    ROOMS_MIN: ROOMS_MIN,
    ROOMS_MAX: ROOMS_MAX,
    GUESTS_MIN: GUESTS_MIN,
    GUESTS_MAX: GUESTS_MAX,
    MAP_FEATURES_CLASSES: {
      'wifi': 'popup__feature--wifi',
      'dishwasher': 'popup__feature--dishwasher',
      'parking': 'popup__feature--parking',
      'washer': 'popup__feature--washer',
      'elevator': 'popup__feature--elevator',
      'conditioner': 'popup__feature--conditioner'
    },
    MAP_TYPES: {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    },
    MAP_CAPACITY: {
      1: ['1'],
      2: ['2', '1'],
      3: ['3', '2', '1'],
      100: ['0']
    },
    MAP_MIN_PRICE: {
      'bungalo': {
        minPrice: '0',
        errorMessage: 'Для бунгало минимальная цена за ночь - 0 рублей.'
      },
      'flat': {
        minPrice: '1000',
        errorMessage: 'Для квартиры минимальная цена за ночь - 1000 рублей.'
      },
      'palace': {
        minPrice: '10000',
        errorMessage: 'Для дворца минимальная цена за ночь - 10000 рублей.'
      },
      'house': {
        minPrice: '5000',
        errorMessage: 'Для дома минимальная цена за ночь - 5000 рублей.'
      }
    },
    map: map,
    mockingData: {
      adsArr: getMockingAdsArr(),
      getCountOfPins: function () {
        return this.adsArr.length;
      }
    }
  };
})();
