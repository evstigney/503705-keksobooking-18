'use strict';

/**
 * Модуль для работы с фильтами объявлений
 */
window.filter.form = (function () {
  var map = document.querySelector('.map');
  var ads = window.data.serverData.adsArr;
  var allFilters = window.filter.UsedFilter;
  var typeSelect = allFilters.TYPE.target;
  var priceSelect = allFilters.PRICE.target;
  var roomsSelect = allFilters.ROOMS.target;
  var guestsSelect = allFilters.GUESTS.target;

  var applyFilter = function (target, action, arr) {
    map.querySelectorAll('.map__pin').forEach(function (pin) {
      if (window.pin.isPin(pin)) {
        pin.remove();
      }
    });
    var filteredAds = action(arr, target.value);
    window.map.renderPins(filteredAds);
    return filteredAds;
  };

  var typeSelectChangeHandler = function () {
    allFilters.TYPE.isApply = true;
    checkUsedFilters();
  };

  var priceSelectChangeHandler = function () {
    allFilters.PRICE.isApply = true;
    checkUsedFilters();
  };

  var roomsSelectChangeHandler = function () {
    allFilters.ROOMS.isApply = true;
    checkUsedFilters();
  };

  var guestsSelectChangeHandler = function () {
    allFilters.GUESTS.isApply = true;
    checkUsedFilters();
  };

  var checkUsedFilters = function () {
    var adsArr = ads.slice();
    for (var key in allFilters) {
      if (allFilters[key].isApply) {
        adsArr = applyFilter(allFilters[key].target, allFilters[key].action, adsArr);
      }
    }
  };

  typeSelect.addEventListener('change', typeSelectChangeHandler);
  priceSelect.addEventListener('change', priceSelectChangeHandler);
  roomsSelect.addEventListener('change', roomsSelectChangeHandler);
  guestsSelect.addEventListener('change', guestsSelectChangeHandler);
})();
