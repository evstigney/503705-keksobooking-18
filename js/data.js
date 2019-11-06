'use strict';

/**
 * Модуль для работы с данными
 *
 * @return {object}
 */
window.data = (function () {
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var MIN_PRICE_FOR_THE_BUNGALO = '0';
  var ERROR_MESSAGE_FOR_THE_BUNGALO = 'Для бунгало минимальная цена за ночь - 0 рублей.';
  var MIN_PRICE_FOR_THE_FLAT = '1000';
  var ERROR_MESSAGE_FOR_THE_FLAT = 'Для квартиры минимальная цена за ночь - 1000 рублей.';
  var MIN_PRICE_FOR_THE_PALACE = '10000';
  var ERROR_MESSAGE_FOR_THE_PALACE = 'Для дворца минимальная цена за ночь - 10000 рублей.';
  var MIN_PRICE_FOR_THE_HOUSE = '5000';
  var ERROR_MESSAGE_FOR_THE_HOUSE = 'Для дома минимальная цена за ночь - 5000 рублей.';
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
    Array.from(data).forEach(function (object) {
      serverAdsArr.push(object);
    });
    if (serverAdsArr.length > 0) {
      window.map.renderPins(serverAdsArr);
    }
    return serverAdsArr;
  };

  /**
   * Отрисовываем на странице сообщение об ошибке
   *
   * @param  {string}   message
   * @param  {boolean}  isDataSaveFunction  вызвана ли функцией отправки данных на сервер
   */
  var renderErrorMessage = function (message, isDataSaveFunction) {
    /**
     * Удаляем сообщение
     *
     * @param {object}  evt объект Event
     */
    var popupCloseHandler = function (evt) {
      if (evt.type === 'keydown') {
        window.util.isEscEvent(evt, function () {
          popupError.remove();
        });
      } else {
        popupError.remove();
      }
      button.removeEventListener('click', popupCloseHandler);
      document.removeEventListener('click', popupCloseHandler);
      document.removeEventListener('keydown', popupCloseHandler);
      if (!isDataSaveFunction) {
        window.backend.load(successLoad, renderErrorMessage);
      }
    };
    popupMessage.textContent = message;
    main.append(popupError);
    if (main.querySelector('.error')) {
      var popup = main.querySelector('.error');
      var button = popup.querySelector('.error__button');
      button.addEventListener('click', popupCloseHandler);
      document.addEventListener('click', popupCloseHandler);
      document.addEventListener('keydown', popupCloseHandler);
    }
  };

  return {
    /**
     * Вертикальные ограничения передвижения гл пина
     */
    BoundingLocationY: {
      MIN: LOCATION_Y_MIN,
      MAX: LOCATION_Y_MAX
    },

    /**
     * Карта соответствий наличия фичей (удобств) в жильте и css классов в разметке
     */
    featuresClassesMap: {
      wifi: 'popup__feature--wifi',
      dishwasher: 'popup__feature--dishwasher',
      parking: 'popup__feature--parking',
      washer: 'popup__feature--washer',
      elevator: 'popup__feature--elevator',
      conditioner: 'popup__feature--conditioner'
    },

    /**
     * Карта соответствий типов жилья и их значений
     */
    HousingTypes: {
      FLAT: 'Квартира',
      BUNGALO: 'Бунгало',
      HOUSE: 'Дом',
      PALACE: 'Дворец'
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
     * сообщения об ошибке
     */
    minPriceMap: {
      'bungalo': new window.MinPrice(MIN_PRICE_FOR_THE_BUNGALO, ERROR_MESSAGE_FOR_THE_BUNGALO),
      'flat': new window.MinPrice(MIN_PRICE_FOR_THE_FLAT, ERROR_MESSAGE_FOR_THE_FLAT),
      'palace': new window.MinPrice(MIN_PRICE_FOR_THE_PALACE, ERROR_MESSAGE_FOR_THE_PALACE),
      'house': new window.MinPrice(MIN_PRICE_FOR_THE_HOUSE, ERROR_MESSAGE_FOR_THE_HOUSE)
    },
    map: map,
    main: main,
    adForm: adForm,
    adAddressField: adAddressField,
    server: {
      adsArr: serverAdsArr
    },
    failLoad: renderErrorMessage,
    successLoad: successLoad
  };
})();
