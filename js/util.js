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
    }
  };
})();
