'use strict';

/**
 * Модуль для работы с фильтами объявлений
 */
window.filter.form = (function () {
  var map = document.querySelector('.map');
  var ads = window.data.serverData.adsArr;
  var UsedFilter = window.filter.UsedFilter;
  var typeSelect = UsedFilter.TYPE.target;
  var priceSelect = UsedFilter.PRICE.target;
  var roomsSelect = UsedFilter.ROOMS.target;
  var guestsSelect = UsedFilter.GUESTS.target;
  var featureCheckboxes = UsedFilter.FEATURES.target;

  /**
   * Применяем фильтр
   *
   * @param  {type} value  выбранное значение фильтра
   * @param  {function} action функция фильтрации
   * @param  {object} arr    данные объявлений
   * @return {object}        отфильтрованные данные
   */
  var applyFilter = function (value, action, arr) {
    map.querySelectorAll('.map__pin').forEach(function (pin) {
      if (window.pin.isPin(pin)) {
        pin.remove();
      }
      var card = map.querySelector('.map__card.popup');
      if (card) {
        card.remove();
      }
    });
    var filteredAds = action(arr, value);
    window.map.renderPins(filteredAds);
    return filteredAds;
  };

  /**
   * Управление фильтрами
   */
  var checkUsedFilters = function () {
    var adsArr = ads.slice();
    for (var key in UsedFilter) {
      if (UsedFilter[key].isApply) {
        if (key === 'FEATURES') {
          var valueArr = Array.from(featureCheckboxes).filter(function (checkbox) {
            return checkbox.checked === true;
          }).map(function (checkbox) {
            return checkbox.value;
          });
        }
        adsArr = applyFilter(valueArr, UsedFilter[key].action, adsArr);
      } else {
        adsArr = applyFilter(UsedFilter[key].target.value, UsedFilter[key].action, adsArr);
      }
    }
  };

  /**
   * Запускаем фильтр
   *
   * @param  {string} filter
   */
  var initFilter = function (filter) {
    UsedFilter[filter].isApply = true;
    window.debounce(checkUsedFilters);
  };

  /**
   * Обработчик события изменения фильтра
   *
   * @param  {object} evt объект Event
   */
  var filterChangeHandler = function (evt) {
    for (var key in UsedFilter) {
      if (key === 'FEATURES') {
        initFilter(key);
      } else {
        if (UsedFilter[key].target === evt.target) {
          initFilter(key);
        }
      }
    }
  };

  typeSelect.addEventListener('change', filterChangeHandler);
  priceSelect.addEventListener('change', filterChangeHandler);
  roomsSelect.addEventListener('change', filterChangeHandler);
  guestsSelect.addEventListener('change', filterChangeHandler);
  featureCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', filterChangeHandler);
  });
})();
