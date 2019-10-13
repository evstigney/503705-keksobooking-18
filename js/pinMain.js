'use strict';

/**
 * Модуль по работе с главным пином карты
 *
 * @return {object}  главый пин, его координаты
 */
window.pinMain = (function () {
  var map = window.data.map;
  var pinMain = map.querySelector('.map__pin--main');
  var pinButton = map.querySelector('button.map__pin--main');
  var addressField = window.data.adAddressField;

  // var MAIN_PIN_WIDTH = pinMain.getBoundingClientRect().width;
  //  var MAIN_PIN_HEIGHT = pinMain.getBoundingClientRect().height;
  var MAIN_PIN_BUTTON_WIDTH = pinButton.getBoundingClientRect().width;
  var MAIN_PIN_BUTTON_HEIGHT = pinButton.getBoundingClientRect().height;
  // var LOCATION_X_MIN = map.offsetLeft + MAIN_PIN_WIDTH / 2;
  // var LOCATION_X_MAX = map.offsetLeft + window.data.map.getBoundingClientRect().width - MAIN_PIN_WIDTH / 2;

  var location = {
    x: Math.round(pinButton.offsetLeft + MAIN_PIN_BUTTON_WIDTH / 2),
    y: Math.round(pinButton.offsetTop + MAIN_PIN_BUTTON_HEIGHT)
  };

  /**
   *  Отрисовка адреса в форме в поле ввода адреса в зависимости
   *  от положения главного пина
   *
   * @return {string}  координаты главного пина
   */
  var renderAddress = function () {
    var address = location.x + ', ' + location.y;
    addressField.setAttribute('placeholder', address);
    addressField.value = address;
    return address;
  };

  /**
   * Проверяем активна ли карта
   *
   * @return {boolean}  если true - активна
   */
  var isMapActive = function () {
    var flag = (map.classList.contains('map--faded')) ? false : true;
    return flag;
  };

  /**
   * Описываем событие по нажатию на гл пин
   *
   * @param  {object} evt объект события Event
   */
  var onMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * Описываем событие по перемещению зажатой мыши
     *
     * @param  {object} moveEvt объект события Event
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      location = {
        x: location.x - shift.x,
        y: location.y - shift.y
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var styleTop = pinMain.offsetTop - shift.y;
      if (location.y > window.data.LOCATION_Y_MAX || location.y < window.data.LOCATION_Y_MIN) {
        location.y = (location.y > window.data.LOCATION_Y_MAX) ? window.data.LOCATION_Y_MAX : window.data.LOCATION_Y_MIN;
        styleTop = pinMain.offsetTop;
      }
      pinMain.style.top = styleTop + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      renderAddress();
    };

    /**
     * Описываем событие по поднятию клавиши мыши
     *
     * @param  {object} upEvt объект события Event
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      map.removeEventListener('mousedown', onMouseDown);
      map.removeEventListener('mousemove', onMouseMove);
    };
    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  /**
   * Обработчик проверяет активна ли карта и запускает событие нажатия
   */
  var pinMainHandler = function () {
    if (isMapActive) {
      pinMain.addEventListener('mousedown', onMouseDown);
    }
  };

  pinMain.addEventListener('mousedown', pinMainHandler);

  return {
    pin: pinMain,
    location: location,
    renderAddress: renderAddress
  };
})();
