'use strict';

/**
 * Модуль с функциями сортировки данных
 *
 * @return {object} методы
 */
window.filter = (function () {
  var ADS_QUANTITY = 5;

  var mapFilters = document.querySelector('.map__filters');

  var UsedFilter = {
    TYPE: {
      isApply: false,
      target: mapFilters.querySelector('#housing-type')
    },
    PRICE: {
      isApply: false,
      target: mapFilters.querySelector('#housing-price')
    },
    ROOMS: {
      isApply: false,
      target: mapFilters.querySelector('#housing-rooms')
    },
    GUESTS: {
      isApply: false,
      target: mapFilters.querySelector('#housing-guests')
    },
    FEATURES: {
      isApply: false,
      target: mapFilters.querySelector('#housing-features').querySelectorAll('[name="features"]')
    }
  };

  /**
   * Проверка количества выходных данных
   *
   * @param  {object} arr весь массив данных
   * @return {object}     массив определенной длинны
   */
  var checkArrLength = function (arr) {
    var sortedArr = arr.slice();
    if (sortedArr.length > ADS_QUANTITY) {
      sortedArr = sortedArr.slice(0, ADS_QUANTITY);
    }
    return sortedArr;
  };

  /**
   * Ищем соответствие цены значениям селекта
   *
   * @param  {number} price  цена
   * @return {string}        значение селекта
   */
  var getPriceValue = function (price) {
    var value = 'any';
    var priceMap = {
      middle: price >= 10000 && price <= 50000,
      low: price < 10000,
      high: price > 50000
    };
    for (var key in priceMap) {
      if (priceMap[key]) {
        value = key;
        break;
      }
    }
    return value;
  };

  /**
   * Фильтрация по типу жилья
   *
   * @param  {object} arr  данные объявлений
   * @param  {string} type тип жилья
   * @return {object}      отфильтрованные данные
   */
  UsedFilter.TYPE.action = function (arr, type) {
    UsedFilter.TYPE.isApply = true;
    if (type !== 'any') {
      arr = arr.filter(function (ad) {
        return ad.offer.type === type;
      });
      UsedFilter.TYPE.isApply = true;
    } else {
      UsedFilter.TYPE.isApply = false;
    }
    return arr;
  };

  /**
   * Фильтрация по цене
   *
   * @param  {object} arr   данные объявлений
   * @param  {string} value значение селекта (интервал для цены)
   * @return {object}       отфильтрованные данные
   */
  UsedFilter.PRICE.action = function (arr, value) {
    var isMatchingPrice = function (ad) {
      var flag = false;
      if (getPriceValue(ad.offer.price) === value) {
        flag = true;
      }
      return flag;
    };
    if (value !== 'any') {
      arr = arr.filter(isMatchingPrice);
      UsedFilter.PRICE.isApply = true;
    } else {
      UsedFilter.PRICE.isApply = false;
    }
    return arr;
  };

  /**
   * Фильтрация по количестку комнат
   *
   * @param  {object} arr   данные объявлений
   * @param  {string} value количество комнат
   * @return {object}       отфильтрованные данные
   */
  UsedFilter.ROOMS.action = function (arr, value) {
    if (value !== 'any') {
      arr = arr.filter(function (ad) {
        return String(ad.offer.rooms) === value;
      });
      UsedFilter.ROOMS.isApply = true;
    } else {
      UsedFilter.ROOMS.isApply = false;
    }
    return arr;
  };

  /**
   * Фильтрация по количество гостей
   *
   * @param  {object} arr   данные объявлений
   * @param  {string} value количество гостей
   * @return {object}       отфильтрованные данные
   */
  UsedFilter.GUESTS.action = function (arr, value) {
    if (value !== 'any') {
      arr = arr.filter(function (ad) {
        return String(ad.offer.guests) === value;
      });
      UsedFilter.GUESTS.isApply = true;
    } else {
      UsedFilter.GUESTS.isApply = false;
    }
    return arr;
  };

  /**
   * Фильтрация по фичам
   *
   * @param  {object} arr   данные объявлений
   * @param  {object} value выбранные фичи
   * @return {object}       отфильтрованные данные
   */
  UsedFilter.FEATURES.action = function (arr, value) {
    if (value.length > 0) {
      arr = arr.filter(function (ad) {
        var flag = false;
        for (var i = 0; i < value.length; i++) {
          if (ad.offer.features.includes(value[i])) {
            flag = true;
          } else {
            flag = false;
            break;
          }
        }
        return flag;
      });
      UsedFilter.FEATURES.isApply = true;
    } else {
      UsedFilter.FEATURES.isApply = false;
    }
    return arr;
  };

  return {
    UsedFilter: UsedFilter,
    byLength: checkArrLength
  };
})();
