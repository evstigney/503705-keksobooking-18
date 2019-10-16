'use strict';

window.backend = (function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 6000;
  var MAP_ERRORS = {
    0: 'нет интернет соединения',
    400: 'неверный запрос',
    401: 'пользователь не авторизован',
    404: 'страницы не существует',
    500: 'ошибка сервера'
  };

  var getErrorMessage = function (status) {
    if (!MAP_ERRORS[status]) {
      MAP_ERRORS[status] = 'что-то пошло не так, мы уже решаем проблему';
    }
    var message = 'Ошибка ' + status + ': ' + MAP_ERRORS[status];
    return message;
  };

  var onTimeout = function (action) {
    var message = 'Запрос не выполнился за ' + TIMEOUT + 'ms';
    action(message);
  };
  return {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = TIMEOUT;

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.addEventListener('error', function () {
        onError(getErrorMessage(xhr.status));
      });

      xhr.addEventListener('timeout', function () {
        onTimeout(onError);
      });

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
