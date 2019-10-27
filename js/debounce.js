'use strict';

/**
 * Модуль для устранения дребезга
 */
(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  /**
   * debounce
   *
   * @param  {function} action любая функция
   */
  window.debounce = function (action) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action, DEBOUNCE_INTERVAL);
  };
})();
