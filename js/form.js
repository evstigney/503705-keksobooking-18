'use strict';

window.form = (function () {
  var adForm = document.querySelector('.ad-form');
  var noticeTitle = document.querySelector('.notice__title');
  var adAddressField = adForm.querySelector('#address');
  var adCapacitySelect = adForm.querySelector('#capacity');
  var adRoomNumberSelect = adForm.querySelector('#room_number');
  var adTypeSelect = adForm.querySelector('#type');
  var adPriceField = adForm.querySelector('#price');
  var adTimeinSelect = adForm.querySelector('#timein');
  var adTimeoutSelect = adForm.querySelector('#timeout');

  var validateTimein = function () {
    adTimeoutSelect.value = adTimeinSelect.value;
  };

  var validateTimeout = function () {
    adTimeinSelect.value = adTimeoutSelect.value;
  };

  var validatePrice = function () {
    var currentType = adTypeSelect.value;
    if (adPriceField.validity.rangeUnderflow) {
      adPriceField.setCustomValidity(window.data.MAP_MIN_PRICE[currentType].errorMessage);
    } else {
      adPriceField.setCustomValidity('');
    }
  };

  var validateType = function () {
    var currentType = adTypeSelect.value;
    adPriceField.min = window.data.MAP_MIN_PRICE[currentType].minPrice;
    adPriceField.setAttribute('placeholder', window.data.MAP_MIN_PRICE[currentType].minPrice);
  };

  var addDisabled = function (htmlCollection) {
    for (var i = 0; i < htmlCollection.length; i++) {
      htmlCollection[i].setAttribute('disabled', 'disabled');
    }
  };

  var toggleMapToDisabled = function () {
    addDisabled(adForm.children);
  };

  var validateCapacity = function () {
    var capacityOptions = adCapacitySelect.options;
    var selectedRooms = adRoomNumberSelect.value;
    var selectedRoomsArr = window.data.MAP_CAPACITY[selectedRooms];
    for (var i = 0; i < capacityOptions.length; i++) {
      var currentOption = capacityOptions[i];
      var flag = false;
      for (var j = 0; j < selectedRoomsArr.length; j++) {
        if (currentOption.value === selectedRoomsArr[0]) {
          adCapacitySelect.value = currentOption.value;
        }
        if (currentOption.value === selectedRoomsArr[j]) {
          flag = true;
          break;
        }
      }
      if (flag) {
        currentOption.removeAttribute('disabled');
      } else {
        currentOption.setAttribute('disabled', 'disabled');
      }
    }
  };

  var renderAddress = function () {
    var address = Math.round(window.map.MAIN_PIN_X + window.map.MAIN_PIN_WIDTH / 2 + pageXOffset) + ', ';
    if (adForm.classList.contains('ad-form--disabled')) {
      address += Math.round(window.map.MAIN_PIN_Y + window.map.MAIN_PIN_HEIGHT / 2 + pageYOffset);
    } else {
      address += Math.round(window.map.MAIN_PIN_Y + window.map.MAIN_PIN_HEIGHT + window.map.MAIN_PIN_BUTTON_HEIGHT + pageYOffset);
    }
    adAddressField.setAttribute('placeholder', address);
    adAddressField.value = address;
    return address;
  };

  adTimeinSelect.addEventListener('change', validateTimein);
  adTimeoutSelect.addEventListener('change', validateTimeout);
  adPriceField.addEventListener('change', validatePrice);
  adTypeSelect.addEventListener('change', function () {
    validateType();
    validatePrice();
  });
  adRoomNumberSelect.addEventListener('change', function () {
    validateCapacity();
  });

  toggleMapToDisabled();
  renderAddress();

  return {
    adForm: adForm,
    toggleFormToActive: function () {
      adForm.classList.remove('ad-form--disabled');
      noticeTitle.classList.remove('ad-form--disabled');
    },
    renderAddress: renderAddress,
    validateCapacity: validateCapacity,
    validateType: validateType,
    validateTimein: validateTimein
  };
})();
