'use strict';

/**
 * Модуль с функциями сортировки данных
 *
 * @return {object} методы
 */
window.filter = (function () {
  var ADS_QUANTITY = 5;

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
   * Сортировка по типу жилья
   *
   * @param  {object} arr  данные объявлений
   * @param  {string} type тип жилья
   * @return {object}      отсортированные данные
   */
  var filterByType = function (arr, type) {
    var sortedArr = arr.slice();
    if (type !== 'any') {
      sortedArr = arr.filter(function (ad) {
        return ad.offer.type === type;
      });
    }
    return checkArrLength(sortedArr);
  };

  return {
    byType: filterByType,
    byLength: checkArrLength
  };
})();
