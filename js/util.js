'use strict';

/**
 * Модуль со служебными программами
 *
 * @return {object} набор служебных функций и данных
 */
window.util = (function () {
  return {
    /**
     * Коды клавиатуры
     */
    KeyCode: {
      ESCAPE: 27,
      ENTER: 13
    },

    /**
     * Поддерживаемые расширения изображений
     */
    IMAGE_FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],

    /**
     * Событие происходит по нажатию клавиши ESC
     *
     * @param  {object} evt объект Event
     * @param  {function} action любая функция - обработчик события
     */
    isEscEvent: function (evt, action) {
      if (evt.keyCode === this.KeyCode.ESCAPE) {
        action();
      }
    },

    /**
     * Событие происходит по нажатию клавиши ENTER
     *
     * @param  {object} evt объект Event
     * @param  {function} action любая функция - обработчик события
     */
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === this.KeyCode.ENTER) {
        action();
      }
    },

    /**
     * Удаляем атрибут disabled у заданных html элементов
     *
     * @param  {object} htmlCollection коллекция html элементов с атрибутом disabled
     * @return {object}                эта же коллекция без атрибута disabled
     */
    removeDisabled: function (htmlCollection) {
      for (var i = 0; i < htmlCollection.length; i++) {
        htmlCollection[i].removeAttribute('disabled');
      }
      return htmlCollection;
    },

    /**
     * Добавляем атрибут disabled к заданным html элементам
     *
     * @param  {object} htmlCollection коллекция html элементов
     * @return {object}                эта же коллекция с атрибутомами disabled
     */
    addDisabled: function (htmlCollection) {
      for (var i = 0; i < htmlCollection.length; i++) {
        htmlCollection[i].setAttribute('disabled', 'disabled');
      }
      return (htmlCollection);
    }
  };
})();
