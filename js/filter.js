'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var typeSelect = filterForm.querySelector('#housing-type');
  var priceSelect = filterForm.querySelector('#housing-price');
  var roomsSelect = filterForm.querySelector('#housing-rooms');
  var guestsSelect = filterForm.querySelector('#housing-guests');
  var featureCheckboxes = filterForm.querySelectorAll('input[name="features"]');

  var isMatchingPrice = function (adPrice, selectedPrice) {
    if (selectedPrice !== 'any') {
      var priceMap = {
        middle: adPrice >= 10000 && adPrice <= 50000,
        low: adPrice < 10000,
        high: adPrice > 50000
      };
      return (priceMap[selectedPrice]) ? true : false;
    } else {
      return true;
    }
  };

  var isMatchingFeatures = function (adFeatures) {
    var selectedFeatures = Array.from(featureCheckboxes)
                                .filter(function (checkbox) {
                                  return checkbox.checked === true;
                                })
                                .map(function (checkbox) {
                                  return checkbox.value;
                                });
    var isMatching = true;
    for (var i = 0; i < selectedFeatures.length; i++) {
      if (!adFeatures.includes(selectedFeatures[i])) {
        isMatching = false;
        break;
      }
    }
    return isMatching;
  };

  var isMatchingValue = function (adValue, selectedValue) {
    return String(adValue) === selectedValue || selectedValue === 'any';
  };

  var filterFormChangeHandler = function () {
    var ads = window.data.server.adsArr.slice()
              .filter(function (ad) {
                return isMatchingValue(ad.offer.type, typeSelect.value) &&
                      isMatchingPrice(ad.offer.price, priceSelect.value) &&
                      isMatchingValue(ad.offer.rooms, roomsSelect.value) &&
                      isMatchingValue(ad.offer.guests, guestsSelect.value) &&
                      isMatchingFeatures(ad.offer.features);
              });
    document.querySelectorAll('.map__pin').forEach(function (pin) {
      if (window.pin.isCommon(pin)) {
        pin.remove();
      }
    });
    window.information.removeCard();
    window.map.renderPins(ads);
  };

  filterForm.addEventListener('change', filterFormChangeHandler);
})();
