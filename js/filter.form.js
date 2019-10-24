'use strict';

/**
 * Модуль для работы с фильтами объявлений
 */
window.filter.form = (function () {
  var map = document.querySelector('.map');
  var ads = window.data.serverData.adsArr;
  var mapFilters = document.querySelector('.map__filters');
  var typeSelect = mapFilters.querySelector('#housing-type');

  typeSelect.addEventListener('change', function (evt) {
    map.querySelectorAll('.map__pin').forEach(function (pin) {
      if (window.pin.isPin(pin)) {
        pin.remove();
      }
    });
    var sortedAds = window.filter.byType(ads.slice(), evt.target.value);
    window.map.renderPins(sortedAds);
  });
})();
