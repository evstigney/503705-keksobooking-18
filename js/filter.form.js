'use strict';

/**
 * Модуль для работы с фильтами объявлений
 */
window.filter.form = (function () {
  var map = document.querySelector('.map');
  var ads = window.data.serverData.adsArr;
  var mapFilters = document.querySelector('.map__filters');
  var typeSelect = mapFilters.querySelector('#housing-type');
  var priceSelect = mapFilters.querySelector('#housing-price');
  var allFilters = window.filter.UsedFilter;

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
})();
