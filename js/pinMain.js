'use strict';

/**
 * Модуль по работе с главным пином карты
 *
 * @return {object}  главый пин, его координаты, метод
 */
window.pinMain = (function () {
  var map = window.data.map;
  var pinMain = map.querySelector('.map__pin--main');
  var pinButton = map.querySelector('button.map__pin--main');
  var addressField = window.data.adAddressField;

  var MAP_WIDTH = map.getBoundingClientRect().width;
  var MAIN_PIN_BUTTON_WIDTH = pinButton.getBoundingClientRect().width;
  var MAIN_PIN_BUTTON_HEIGHT = pinButton.getBoundingClientRect().height;

  var location = new window.Location(
      Math.round(pinButton.offsetLeft + MAIN_PIN_BUTTON_WIDTH / 2),
      Math.round(pinButton.offsetTop + MAIN_PIN_BUTTON_HEIGHT)
  );

  /**
   * Получаем координаты
   *
   * @return {object} координаты
   */
  var getStartCoords = function () {
    return new window.Location(location.x, location.y);
  };

  var pinStartCoords = getStartCoords();

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
   * Устанавливаем начальные координаты гл пина
   */
  var setStartCoords = function () {
    location = pinStartCoords;
    pinMain.style.top = (location.y - MAIN_PIN_BUTTON_HEIGHT) + 'px';
    pinMain.style.left = (location.x - MAIN_PIN_BUTTON_WIDTH / 2) + 'px';
    renderAddress();
  };

  /**
   * Описываем событие по нажатию на гл пин
   *
   * @param  {object} evt объект события Event
   */
  var onMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = new window.Location(evt.clientX, evt.clientY);

    /**
     * Описываем событие по перемещению зажатой мыши
     *
     * @param  {object} moveEvt объект события Event
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = new window.Location(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);
      location = {
        x: location.x - shift.x,
        y: location.y - shift.y
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var styleTop = pinMain.offsetTop - shift.y;
      if (location.y > window.data.BoundingLocationY.MAX || location.y < window.data.BoundingLocationY.MIN) {
        location.y = (location.y > window.data.BoundingLocationY.MAX) ? window.data.BoundingLocationY.MAX : window.data.BoundingLocationY.MIN;
        styleTop = pinMain.offsetTop;
      }
      var styleLeft = pinMain.offsetLeft - shift.x;
      if (location.x < 0 || location.x > MAP_WIDTH) {
        location.x = (location.x < 0) ? 0 : MAP_WIDTH;
        styleLeft = pinMain.offsetLeft;
      }
      pinMain.style.top = styleTop + 'px';
      pinMain.style.left = styleLeft + 'px';
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
      document.removeEventListener('mouseup', onMouseUp);
    };
    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinMain.addEventListener('mousedown', onMouseDown);


  return {
    pin: pinMain,
    location: location,
    renderAddress: renderAddress,
    setStartCoords: setStartCoords
  };
})();
