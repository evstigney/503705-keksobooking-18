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
   * Простой фильтр по введенному значению
   *
   * @param  {object} arr    данные объявлений
   * @param  {string} value  введенное значение
   * @param  {string} filter фильтр
   * @return {object}        отфильтрованные данные
   */
  var filterByValue = function (arr, value, filter) {
    if (value !== 'any') {
      arr = arr.filter(function (ad) {
        return String(ad.offer[filter]) === value;
      });
      UsedFilter[filter.toUpperCase()].isApply = true;
    } else {
      UsedFilter[filter.toUpperCase()].isApply = false;
    }
    return arr;
  };

  /**
   * Фильтрация по типу жилья
   *
   * @param  {object} arr   данные объявлений
   * @param  {string} value введенное значение
   * @return {object}       отфильтрованные данные
   */
  UsedFilter.TYPE.action = function (arr, value) {
    return filterByValue(arr, value, 'type');
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
    return filterByValue(arr, value, 'rooms');
  };

  /**
   * Фильтрация по количество гостей
   *
   * @param  {object} arr   данные объявлений
   * @param  {string} value количество гостей
   * @return {object}       отфильтрованные данные
   */
  UsedFilter.GUESTS.action = function (arr, value) {
    return filterByValue(arr, value, 'guests');
  };

  /**
   * Фильтрация по фичам
   *
   * @param  {object} arr   данные объявлений
   * @param  {object} features массив выбранных фич
   * @return {object}       отфильтрованные данные
   */
  UsedFilter.FEATURES.action = function (arr, features) {
    if (features.length > 0) {
      arr = arr.filter(function (ad) {
        var flag = true;
        for (var i = 0; i < features.length; i++) {
          if (!ad.offer.features.includes(features[i])) {
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
