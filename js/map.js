'use strict';

window.map = (function () {
  var mapPins = window.data.map.querySelector('.map__pins');
  var mapPinMain = window.data.map.querySelector('.map__pin--main');
  var mapPinMainButton = window.data.map.querySelector('button.map__pin--main');
  var mapPinsFragment = document.createDocumentFragment();

  var MAIN_PIN_X = mapPinMain.getBoundingClientRect().x;
  var MAIN_PIN_Y = mapPinMain.getBoundingClientRect().y;
  var MAIN_PIN_WIDTH = mapPinMain.getBoundingClientRect().width;
  var MAIN_PIN_HEIGHT = mapPinMain.getBoundingClientRect().height;
  var MAIN_PIN_BUTTON_HEIGHT = mapPinMainButton.getBoundingClientRect().height;

  /**
   * Описываю отрисовку пинов на основе моковых данных
   *
   * @return {object}  отрисованные пины
   */
  var renderMatchingPins = function () {
    for (var i = 0; i < window.data.mockingData.getCountOfPins(); i++) {
      var pin = window.pin.renderPin(window.data.mockingData.adsArr[i]);
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
      if (evt.type === 'click' || evt.keyCode === window.util.ESC_KEYCODE) {
        card.remove();
      }
    };

    var closePopupButton = card.querySelector('.popup__close');
    closePopupButton.addEventListener('click', closePopupButtonHandler);
    document.addEventListener('keydown', closePopupButtonHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE && !(document.querySelector('.map__card'))) {
        document.removeEventListener('keydown', closePopupButtonHandler);
      }
    });
  };

  /**
   * Отрисовывем пины на странице на основе моки,
   * добавление событий открытия карточки по клику или ENTER,
   * проверка карточки
   *
   * @return {object}  отрисованные на странице пины
   */
  var renderMockingData = function () {
    var pins = renderMatchingPins();
    pins = pins.querySelectorAll('.map__pin');

    /**
     * Проверяем перед открытием карточки - не открыта ли другая на странице,
     * если открыта - предыдущую удаляем
     */
    var checkCard = function () {
      if (window.data.map.querySelector('.map__card.popup')) {
        var previousCard = window.data.map.querySelector('.map__card.popup');
        window.data.map.removeChild(previousCard);
      }
    };

    /**
     * Обработчик событий клика и ENTER, по наступлению которых
     * запускаем проверку отрисоку предыдущих карточек и
     * запускаем отрисовку новой
     *
     * @param  {object} evt событие Event
     */
    var openPopupCardHandler = function (evt) {
      if (evt.type === 'click' || evt.keyCode === window.util.ENTER_KEYCODE && document.activeElement === evt.currentTarget) {
        checkCard();
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
    window.data.map.classList.remove('map--faded');
    window.form.toggleFormToActive();
    window.util.removeDisabled(window.form.adForm.children);
    renderMockingData();
    window.form.renderAddress();
    mapPinMain.removeEventListener('mousedown', activateMap);
    mapPinMain.removeEventListener('keydown', activateMapHandler);
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

  var activateMapHandler = function (evt) {
    window.util.isEnterEvent(evt, activateMap);
  };

  mapPinMain.addEventListener('mousedown', activateMap);
  mapPinMain.addEventListener('keydown', activateMapHandler);

  return {
    mapPins: mapPins,
    MAIN_PIN_X: MAIN_PIN_X,
    MAIN_PIN_Y: MAIN_PIN_Y,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_BUTTON_HEIGHT: MAIN_PIN_BUTTON_HEIGHT
  };
})();
