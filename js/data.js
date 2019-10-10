'use strict';

window.data = (function () {
  return {
    TYPES_ARR: ['palace', 'flat', 'house', 'bungalo'],
    CHECKIN_TIMES_ARR: ['12:00', '13:00', '14:00'],
    CHECKOUT_TIMES_ARR: ['12:00', '13:00', '14:00'],
    FEATURES_ARR: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS_ARR: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    ADS_QUANTITY: 8,
    LOCATION_Y_MIN: 130,
    LOCATION_Y_MAX: 630,
    PRICE_MIN: 1000,
    PRICE_MAX: 100000,
    ROOMS_MIN: 1,
    ROOMS_MAX: 10,
    GUESTS_MIN: 1,
    GUESTS_MAX: 50,
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
    }
  };
})();
