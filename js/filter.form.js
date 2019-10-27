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
          var valueArr = [];
          featureCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
              valueArr.push(checkbox.value);
            }
          });
          adsArr = applyFilter(valueArr, UsedFilter[key].action, adsArr);
        } else {
          adsArr = applyFilter(UsedFilter[key].target.value, UsedFilter[key].action, adsArr);
        }
      }
    }
  };

  var typeSelectChangeHandler = function () {
    UsedFilter.TYPE.isApply = true;
    window.debounce(checkUsedFilters);
  };

  var priceSelectChangeHandler = function () {
    UsedFilter.PRICE.isApply = true;
    window.debounce(checkUsedFilters);
  };

  var roomsSelectChangeHandler = function () {
    UsedFilter.ROOMS.isApply = true;
    window.debounce(checkUsedFilters);
  };

  var guestsSelectChangeHandler = function () {
    UsedFilter.GUESTS.isApply = true;
    window.debounce(checkUsedFilters);
  };

  var featureCheckboxesChangeHandler = function () {
    UsedFilter.FEATURES.isApply = true;
    window.debounce(checkUsedFilters);
  };

  typeSelect.addEventListener('change', typeSelectChangeHandler);
  priceSelect.addEventListener('change', priceSelectChangeHandler);
  roomsSelect.addEventListener('change', roomsSelectChangeHandler);
  guestsSelect.addEventListener('change', guestsSelectChangeHandler);
  featureCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', featureCheckboxesChangeHandler);
  });
})();
