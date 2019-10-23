'use strict';

/**
 * Модуль с функциями сортировки данных
 *
 * @return {object} методы
 */
window.sort = (function () {

  /**
   * Сортировка по типу жилья
   *
   * @param  {object} arr  данные объявлений
   * @param  {string} type тип жилья
   * @return {object}      отсортированные данные
   */
  var sortByType = function (arr, type) {
    arr.sort(function (a) {
      var result = 1;
      if (a.offer.type === type) {
        result = -1;
      }
      return result;
    });
    return arr;
  };

  return {
    byType: sortByType
  };
})();
