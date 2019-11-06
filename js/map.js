'use strict';

/**
 * Метод для работы с картой
 *
 * @return {object}  главный пин с параметрами и обычные пины
 */
window.map = (function () {
  var map = window.data.map;
  var mapPins = map.querySelector('.map__pins');
  var mapPinsFragment = document.createDocumentFragment();
  var PINS_QUANTITY = 5;

  /**
   * Описываю отрисовку пинов данных
   *
   * @param {object} arr массив с данными объявлений
   * @return {object}  отрисованные пины
   */
  var renderMatchingPins = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var pin = window.pin.render(arr[i]);
      pin.setAttribute('data-id', i);
      mapPinsFragment.appendChild(pin);
    }
    mapPins.appendChild(mapPinsFragment);
    return mapPins;
  };

  /**
   * Описываем отрисовку карточки
   *
   * @param  {object} dataArr текущий массив с данными
   * @param  {object} target пин, по которому произошел клик или ENTER
   */
  var renderMatchingCard = function (dataArr, target) {
    var index = target.getAttribute('data-id');
    var card = window.information.renderCard(dataArr, index);

    /**
     * По клику или ESCAPE удаляем карточку
     *
     * @param  {object} evt объект события Event
     */
    var popupButtonCloseHandler = function (evt) {
      if (evt.type === 'click' || evt.keyCode === window.util.KeyCode.ESCAPE) {
        card.remove();
      }
    };
    var closePopupButton = card.querySelector('.popup__close');
    closePopupButton.addEventListener('click', popupButtonCloseHandler);
    document.addEventListener('keydown', popupButtonCloseHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KeyCode.ESCAPE && !(document.querySelector('.map__card'))) {
        document.removeEventListener('keydown', popupButtonCloseHandler);
      }
    });
  };

  /**
   * Отрисовывем пины на странице
   *
   * @param {object} arr
   * @return {object}  отрисованные на странице пины
   */
  var renderPinsData = function (arr) {
    var pins = renderMatchingPins(arr.slice(0, PINS_QUANTITY));
    pins = pins.querySelectorAll('.map__pin');

    /**
     * Обработчик событий клика и ENTER, по наступлению которых
     * запускаем проверку отрисоку предыдущих карточек и
     * запускаем отрисовку новой
     *
     * @param  {object} evt событие Event
     */
    var popupCardOpenHandler = function (evt) {
      if (evt.type === 'click' || evt.keyCode === window.util.KeyCode.ENTER && document.activeElement === evt.currentTarget) {
        renderMatchingCard(arr, evt.currentTarget);
      }
    };
    for (var i = 0; i < pins.length; i++) {
      if (window.pin.isCommon(pins[i])) {
        pins[i].addEventListener('click', popupCardOpenHandler);
        pins[i].addEventListener('keydown', popupCardOpenHandler);
      }
    }
    return pins;
  };

  /**
   * Описание активации страницы:
   * удаляем у карты полупрозрачность
   * переключаем форму в активный режим
   * удаляем у детей формы атрибут addDisabled
   * отрисовываем моки
   * отрисовывем адрес гл пина в форму в поле с адресом
   * удаляем обработчик активации страницы
   */
  var activatePage = function () {
    map.classList.remove('map--faded');
    window.form.toggleToActive();
    window.util.removeDisabled(window.data.adForm.children);
    renderPinsData(window.data.server.adsArr);
    window.pinMain.renderAddress();
  };

  /**
   * Описание активации карты:
   * запуск активации страницы
   * валидация формы
   */
  var activateMap = function () {
    activatePage();
    window.form.validateCapacity();
    window.form.validateType();
    window.form.validateTimein();
  };

  /**
   * Обработчик активации карты
   *
   * @param  {object} evt Объект Event
   */
  var mapActivateHandler = function (evt) {
    window.backend.load(window.data.successLoad, window.data.failLoad);
    if (evt.type === 'keydown') {
      window.util.isEnterEvent(evt, activateMap);
    } else {
      activateMap();
    }
  };

  /**
   * Удаляем пины из разметки
   */
  var removePins = function () {
    var pins = map.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (pins[i] !== window.pinMain.pin) {
        pins[i].remove();
      }
    }
  };

  window.pinMain.pin.addEventListener('mousedown', mapActivateHandler);
  window.pinMain.pin.addEventListener('keydown', mapActivateHandler);

  return {
    ads: window.data.server.adsArr,
    activate: mapActivateHandler,
    reset: function () {
      window.pinMain.setStartCoords();
      removePins();
      window.information.removeCard();
      map.classList.add('map--faded');
      window.pinMain.pin.addEventListener('mousedown', mapActivateHandler);
      window.pinMain.pin.addEventListener('keydown', mapActivateHandler);
    },
    renderPins: renderPinsData
  };
})();
