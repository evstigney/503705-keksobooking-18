'use strict';

/**
 * Модуль со служебными программами
 *
 * @return {object} набор служебных функций и данных
 */
window.util = (function () {
  return {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    /**
     * Событие происходит по нажатию клавиши ESC
     *
     * @param  {object} evt объект Event
     * @param  {function} action любая функция - обработчик события
     */
    isEscEvent: function (evt, action) {
      if (evt.keyCode === this.ESC_KEYCODE) {
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
      if (evt.keyCode === this.ENTER_KEYCODE) {
        action();
      }
    },

    /**
     * Получаем случайное целое число в заданном интервале
     *
     * @param  {number} minNumber минимальное число
     * @param  {number} maxNumber максимальное число
     * @return {number}           случайное число
     */
    getRandomNumber: function (minNumber, maxNumber) {
      return Math.floor(Math.random() * (Math.floor(maxNumber) - Math.ceil(minNumber) + 1) + Math.ceil(minNumber));
    },

    /**
     * Почулаем случайное значение из заданного массива
     *
     * @param  {object} arr массив с данными
     * @return {type}     случайное значение из массива, независимо от его типа данных
     */
    getRandomValue: function (arr) {
      var min = 0;
      var max = arr.length - 1;
      var index = this.getRandomNumber(min, max);
      return arr[index];
    },

    /**
     * Получаем случайный массив случайной длинны из заданного массива
     *
     * @param  {object} arr заданный массив с данными
     * @return {object}     случайный массив
     */
    getRandomArr: function (arr) {
      var min = 1;
      var max = arr.length - 1;
      var maxIndex = this.getRandomNumber(min, max);
      var randomArr = [];
      var flag = true;
      for (var i = 0; i <= maxIndex; i++) {
        var currentIndex = this.getRandomNumber(0, arr.length - 1);
        if (i > 0) {
          for (var j = 0; j < randomArr.length; j++) {
            flag = true;
            var currentValue = arr[currentIndex];
            var randomValue = randomArr[j];
            if (currentValue === randomValue) {
              flag = false;
              break;
            }
          }
        }
        if (flag) {
          randomArr.push(arr[currentIndex]);
        }
      }
      return randomArr;
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
