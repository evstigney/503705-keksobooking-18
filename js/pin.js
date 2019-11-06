'use strict';

/**
 * Модуль для работы с пином
 *
 * @return {object}  методы
 */
window.pin = (function () {
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

  return {
    /**
     * Составляем один html элемент пина на основе заданного объявления
     *
     * @param  {object} ad объявление - объект с данными одного объявления
     * @return {object}    html элемент пина на основе заданного объявления
     */
    render: function (ad) {
      var pinElement = mapPin.cloneNode(true);
      var pinElementImg = pinElement.querySelector('img');
      pinElement.style = 'left: ' + (ad.location.x - pinElement.querySelector('img').style.width / 2) + 'px; top: ' + (ad.location.y - pinElement.querySelector('img').style.height) + 'px;';
      pinElementImg.src = ad.author.avatar;
      pinElementImg.alt = ad.offer.title;
      return pinElement;
    },

    /**
     * Проверяем является ли пин обычным (т е не главным)
     *
     * @param  {object} elem проверяемый пин
     * @return {boolean} true - пин обычный, false - главный
     */
    isCommon: function (elem) {
      return !elem.classList.contains('map__pin--main');
    }
  };
})();
