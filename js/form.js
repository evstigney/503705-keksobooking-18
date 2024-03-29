'use strict';

/**
 * Модуль для работы с формой объявления
 *
 * @return {object}  форма, методы
 */
window.form = (function () {
  var adForm = window.data.adForm;
  var main = window.data.main;
  var noticeTitle = document.querySelector('.notice__title');
  var adCapacitySelect = adForm.querySelector('#capacity');
  var adRoomNumberSelect = adForm.querySelector('#room_number');
  var adTypeSelect = adForm.querySelector('#type');
  var adPriceField = adForm.querySelector('#price');
  var adTimeinSelect = adForm.querySelector('#timein');
  var adTimeoutSelect = adForm.querySelector('#timeout');
  var popupSuccess = document.querySelector('#success').content.querySelector('.success');

  /**
   * Время выезда приравниваем к времени заезда
   */
  var validateTimein = function () {
    adTimeoutSelect.value = adTimeinSelect.value;
  };

  /**
   * Время заезда приравниваем к времени выезда
   */
  var validateTimeout = function () {
    adTimeinSelect.value = adTimeoutSelect.value;
  };

  /**
   * Проверяем поле ввода цены, если неверно - выводим сообщение об ошибке
   */
  var validatePrice = function () {
    var currentType = adTypeSelect.value;
    if (adPriceField.validity.rangeUnderflow) {
      adPriceField.setCustomValidity(window.data.minPriceMap[currentType].errorMessage);
    } else {
      adPriceField.setCustomValidity('');
    }
  };

  /**
   * В зависимости от выбранного типа жилья записываем в placeholder
   * минимальную цену для этого типа
   */
  var validateType = function () {
    var currentType = adTypeSelect.value;
    adPriceField.min = window.data.minPriceMap[currentType].minPrice;
    adPriceField.setAttribute('placeholder', window.data.minPriceMap[currentType].minPrice);
  };

  /**
   * В зависимости от выбранного количества комнат делаем неактивными
   *  количество гостей, которые к этому количеству комнат не подходят по ТЗ
   */
  var validateCapacity = function () {
    var capacityOptions = Array.from(adCapacitySelect.options);
    var selectedRooms = adRoomNumberSelect.value;
    var selectedRoomsArr = Array.from(window.data.capacityMap[selectedRooms]);
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

  /**
   * Отрисовывем сообщение об успешной загрузке объяления на сервер
   */
  var renderSuccessMessage = function () {
    main.append(popupSuccess);
    var popupRemoveHandler = function (evt) {
      if (evt.type === 'keydown') {
        window.util.isEscEvent(evt, function () {
          popupSuccess.remove();
        });
      } else {
        popupSuccess.remove();
      }
      document.removeEventListener('click', popupRemoveHandler);
      document.removeEventListener('keydown', popupRemoveHandler);
    };
    if (main.querySelector('.success')) {
      document.addEventListener('click', popupRemoveHandler);
      document.addEventListener('keydown', popupRemoveHandler);
    }
  };

  /**
   * Приводим форму в начальное состояние
   */
  var resetForm = function () {
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    noticeTitle.classList.add('ad-form--disabled');
    window.util.addDisabled(adForm.children);
    validateCapacity();
  };

  /**
   * Выполняем при успешной загрузке
   */
  var onLoad = function () {
    renderSuccessMessage();
    resetForm();
    window.map.reset();
  };

  /**
   * Обработчик события отправки формы
   *
   * @param  {object} evt объект Event
   */
  var submitHandler = function (evt) {
    window.backend.save(new FormData(adForm), onLoad, window.data.failLoad);
    evt.preventDefault();
    adForm.removeEventListener('submit', submitHandler);
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
  adForm.addEventListener('submit', submitHandler);

  window.util.addDisabled(adForm.children);
  window.pinMain.renderAddress();

  return {
    /**
     * Метод визуально переключает форму в активное состояние путем удаления классов
     */
    toggleToActive: function () {
      window.data.adForm.classList.remove('ad-form--disabled');
      noticeTitle.classList.remove('ad-form--disabled');
      adForm.addEventListener('submit', submitHandler);
    },
    validateCapacity: validateCapacity,
    validateType: validateType,
    validateTimein: validateTimein,
    submitForm: submitHandler
  };
})();
