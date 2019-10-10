'use strict';

window.util = (function () {
  return {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    isEscEvent: function (evt, action) { // под вопросом, пока не понадобилась
      if (evt.keyCode === this.ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) { // под вопросом, пока не понадобилась
      if (evt.keyCode === this.ENTER_KEYCODE) {
        action();
      }
    },
    getRandomNumber: function (minNumber, maxNumber) {
      return Math.floor(Math.random() * (Math.floor(maxNumber) - Math.ceil(minNumber) + 1) + Math.ceil(minNumber));
    },
    getRandomValue: function (arr) {
      var min = 0;
      var max = arr.length - 1;
      var index = this.getRandomNumber(min, max);
      return arr[index];
    },
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
    removeDisabled: function (htmlCollection) {
      for (var i = 0; i < htmlCollection.length; i++) {
        htmlCollection[i].removeAttribute('disabled');
      }
    }
  };
})();
