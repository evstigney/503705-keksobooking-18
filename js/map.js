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
  var ads = window.data.serverData.adsArr;

  var ADS_QUANTITY = 5;

  /**
   * Описываю отрисовку пинов данных
   *
   * @param {object} arr массив с данными объявлений
   * @return {object}  отрисованные пины
   */
  var renderMatchingPins = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var pin = window.pin.renderPin(arr[i]);
      mapPinsFragment.appendChild(pin);
    }
    mapPins.appendChild(mapPinsFragment);
    return mapPins;
  };

  /**
   * Описываем отрисовку карточку в зависимости от кликнутого пина,
   * добавляем в нее событие закрытия по нажатию на ESCAPE или клику на крестик
   *
   * @param  {object} target пин, по которому произошел клик или ENTER
   */
  var renderMatchingCard = function (target) {
    var allPins = mapPins.querySelectorAll('.map__pin');
    var matchingPins = [];
    for (var i = 0; i < allPins.length; i++) {
      if (window.pin.isPin(allPins[i])) {
        matchingPins.push(allPins[i]);
      }
    }
    var index = matchingPins.indexOf(target);
    var card = window.card.renderCard(index);

    /**
     * По клику или ESCAPE удаляем карточку
     *
     * @param  {object} evt объект события Event
     */
    var closePopupButtonHandler = function (evt) {
      if (evt.type === 'click' || evt.keyCode === window.util.KeyCode.escape) {
        card.remove();
      }
    };

    var closePopupButton = card.querySelector('.popup__close');
    closePopupButton.addEventListener('click', closePopupButtonHandler);
    document.addEventListener('keydown', closePopupButtonHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KeyCode.escape && !(document.querySelector('.map__card'))) {
        document.removeEventListener('keydown', closePopupButtonHandler);
      }
    });
  };

  /**
   * Отрисовывем пины на странице,
   * добавление событий открытия карточки по клику или ENTER,
   * проверка карточки
   *
   * @param {object} arr
   * @param {function} filter
   * @return {object}  отрисованные на странице пины
   */
  var renderPinsData = function (arr) {
    arr = arr.slice(ADS_QUANTITY);
    var pins = renderMatchingPins(arr);
    pins = pins.querySelectorAll('.map__pin');

    /**
     * Обработчик событий клика и ENTER, по наступлению которых
     * запускаем проверку отрисоку предыдущих карточек и
     * запускаем отрисовку новой
     *
     * @param  {object} evt событие Event
     */
    var openPopupCardHandler = function (evt) {
      if (evt.type === 'click' || evt.keyCode === window.util.KeyCode.enter && document.activeElement === evt.currentTarget) {
        renderMatchingCard(evt.currentTarget);
      }
    };

    for (var i = 0; i < pins.length; i++) {
      if (window.pin.isPin(pins[i])) {
        pins[i].addEventListener('click', openPopupCardHandler);
        pins[i].addEventListener('keydown', openPopupCardHandler);
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
    window.form.toggleFormToActive();
    window.util.removeDisabled(window.data.adForm.children);
    renderPinsData(ads);
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
  var activateMapHandler = function (evt) {
    window.util.isEnterEvent(evt, activateMap);
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

  window.pinMain.pin.addEventListener('mousedown', activateMap);
  window.pinMain.pin.addEventListener('keydown', activateMapHandler);

  return {
    ads: ads,
    mapPins: mapPins,
    reset: function () {
      window.pinMain.setStartCoords();
      removePins();
      window.card.remove();
      map.classList.add('map--faded');
    },
    renderPins: renderPinsData
  };
})();
