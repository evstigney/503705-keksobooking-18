'use strict';

/**
 * Модуль для работы с данными
 *
 * @return {object}
 */
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
  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var adAddressField = adForm.querySelector('#address');
  var popupError = document.querySelector('#error').content.querySelector('.error');
  var popupMessage = popupError.querySelector('.error__message');
  var serverAdsArr = [];

  /**
   * Получаем данные в массив
   *
   * @param  {object} data полученные данные
   * @return {object}      массив полученных данных
   */
  var successLoad = function (data) {
    for (var i = 0; i < data.length; i++) {
      serverAdsArr.push(data[i]);
    }
    return serverAdsArr;
  };

  /**
   * Отрисовываем на странице сообщение об ошибке
   *
   * @param  {string} message
   */
  var renderErrorMessage = function (message) {

    /**
     * Удаляем сообщение
     */
    var closePopupHandler = function () {
      popupError.remove();
    };

    popupMessage.textContent = message;
    main.append(popupError);

    if (main.querySelector('.error')) {
      var popup = main.querySelector('.error');
      var button = popup.querySelector('.error__button');

      button.addEventListener('click', closePopupHandler);
      document.addEventListener('click', closePopupHandler);
      document.addEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, closePopupHandler);
      });
    }
  };

  /**
   * Обработки ошибки загрузки данных
   * пока оставлю на случай, если - кроме сообщения - другие действия нужны будут
   *
   * @param  {string} message
   */
  var failLoad = function (message) {
    renderErrorMessage(message);
  };

  window.backend.load(successLoad, failLoad);

  /**
   * Получаем адрес мокового аватара пользователя
   *
   * @param  {number} index индекс текущего объявления
   * @return {string}       адрес изображения аватара пользователя
   */
  var getAuthorAvatar = function (index) {
    index = '0' + (index + 1);
    return 'img/avatars/user' + index + '.png';
  };

  /**
   * Получаем координаты пина пользователя - набор случайных цифр
   * в заданном диапазоне
   *
   * @param  {object} elem пин пользователя (обычный, не главный)
   * @return {object}      объект с координатами x y пина
   */
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

  /**
   * Составляем массив из объектов с моковыми данными
   *
   * @return {object}  массив с моковыми данными
   */
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
    BoundingLocationY: {
      MIN: LOCATION_Y_MIN,
      MAX: LOCATION_Y_MAX
    },

    /**
     * Карта соответствий наличия фичей (удобств) в жильте и css классов в разметке
     */
    featuresClassesMap: {
      'wifi': 'popup__feature--wifi',
      'dishwasher': 'popup__feature--dishwasher',
      'parking': 'popup__feature--parking',
      'washer': 'popup__feature--washer',
      'elevator': 'popup__feature--elevator',
      'conditioner': 'popup__feature--conditioner'
    },

    /**
     * Карта соответствий типов жилья и их значений
     */
    housingTypesMap: {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    },

    /**
     * Карта соответствий количества комнат и количества гостей
     */
    capacityMap: {
      1: ['1'],
      2: ['2', '1'],
      3: ['3', '2', '1'],
      100: ['0']
    },

    /**
     * Карта соответствий типа жилья и его минимальной стоимости,
     * а также сообщения об ошибке при неверном вводе стоимости для
     * данного типа жилья
     */
    minPriceMap: {
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
    main: main,
    adForm: adForm,
    adAddressField: adAddressField,
    mockingData: {
      adsArr: getMockingAdsArr()
    },
    serverData: {
      adsArr: serverAdsArr
    },
    failLoad: failLoad
  };
})();
