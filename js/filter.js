'use strict';

(function () {
  var map = window.data.map;
  var filterForm = document.querySelector('.map__filters');
  var typeSelect = filterForm.querySelector('#housing-type');
  var priceSelect = filterForm.querySelector('#housing-price');
  var roomsSelect = filterForm.querySelector('#housing-rooms');
  var guestsSelect = filterForm.querySelector('#housing-guests');
  var featureCheckboxes = filterForm.querySelectorAll('input[name="features"]');

  var isMatchingPrice = function (price, value) {
    if (value !== 'any') {
      var priceMap = {
        middle: price >= 10000 && price <= 50000,
        low: price < 10000,
        high: price > 50000
      };
      return (priceMap[value]) ? true : false;
    } else {
      return true;
    }
  };

  var isMatchingFeatures = function (adFeatures, selectedFeatures) {
    var flag = true;
    for (var i = 0; i < selectedFeatures.length; i++) {
      if (!adFeatures.includes(selectedFeatures[i])) {
        flag = false;
        break;
      }
    }
    return flag;
  };

  var filterFormChangeHandler = function () {
    var ads = window.data.serverData.adsArr.slice()
              .filter(function (ad) {
                return ad.offer.type === typeSelect.value || typeSelect.value === 'any';
              })
              .filter(function (ad) {
                return isMatchingPrice(ad.offer.price, priceSelect.value);
              })
              .filter(function (ad) {
                return String(ad.offer.rooms) === roomsSelect.value || roomsSelect.value === 'any';
              })
              .filter(function (ad) {
                return String(ad.offer.guests) === guestsSelect.value || guestsSelect.value === 'any';
              })
              .filter(function (ad) {
                var selectedFeatures = Array.from(featureCheckboxes)
                                            .filter(function (checkbox) {
                                              return checkbox.checked === true;
                                            })
                                            .map(function (checkbox) {
                                              return checkbox.value;
                                            });
                return isMatchingFeatures(ad.offer.features, selectedFeatures);
              });
    document.querySelectorAll('.map__pin').forEach(function (pin) {
      if (window.pin.isPin(pin)) {
        pin.remove();
      }
    });
    var card = map.querySelector('.map__card.popup');
    if (card) {
      card.remove();
    }
    window.map.renderPins(ads);
  };

  filterForm.addEventListener('change', filterFormChangeHandler);
})();
