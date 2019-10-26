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
  var featureCheckboxes = allFilters.FEATURES.target;

  var applyFilter = function (value, action, arr) {
    map.querySelectorAll('.map__pin').forEach(function (pin) {
      if (window.pin.isPin(pin)) {
        pin.remove();
      }
    });
    var filteredAds = action(arr, value);
    window.map.renderPins(filteredAds);
    return filteredAds;
  };

  var checkUsedFilters = function () {
    var adsArr = ads.slice();
    for (var key in allFilters) {
      if (allFilters[key].isApply) {
        if (key === 'FEATURES') {
          var valueArr = [];
          featureCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
              valueArr.push(checkbox.value);
            }
          });
          adsArr = applyFilter(valueArr, allFilters[key].action, adsArr);
        } else {
          adsArr = applyFilter(allFilters[key].target.value, allFilters[key].action, adsArr);
        }
      }
    }
  };

  var typeSelectChangeHandler = function () {
    allFilters.TYPE.isApply = true;
    window.debounce(checkUsedFilters);
  };

  var priceSelectChangeHandler = function () {
    allFilters.PRICE.isApply = true;
    window.debounce(checkUsedFilters);
  };

  var roomsSelectChangeHandler = function () {
    allFilters.ROOMS.isApply = true;
    window.debounce(checkUsedFilters);
  };

  var guestsSelectChangeHandler = function () {
    allFilters.GUESTS.isApply = true;
    window.debounce(checkUsedFilters);
  };

  var featureCheckboxesChangeHandler = function () {
    allFilters.FEATURES.isApply = true;
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
