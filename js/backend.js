'use strict';

/**
 * Получение данных с сервера
 *
 * @return {object} методы загрузки и сохранения
 */
window.backend = (function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 6000;
  var isDataSaveFunction = false;

  /**
   * Карта сообщений об ошибках
   */
  var errorCodeMap = {
    0: 'нет интернет соединения',
    400: 'неверный запрос',
    401: 'пользователь не авторизован',
    404: 'страницы не существует',
    500: 'ошибка сервера'
  };

  /**
   * Получаем сообщение об ошибке
   *
   * @param  {number} status код ошибки
   * @return {string}
   */
  var getErrorMessage = function (status) {
    if (!errorCodeMap[status]) {
      errorCodeMap[status] = 'что-то пошло не так, мы уже решаем проблему';
    }
    return 'Ошибка ' + status + ': ' + errorCodeMap[status];
  };

  /**
   * Обработка события timeout
   *
   * @param  {function} action показ сообщения
   */
  var onTimeout = function (action) {
    var message = 'Запрос не выполнился за ' + TIMEOUT + 'ms';
    action(message);
  };

  return {
    /**
     * Загрузка данных с сервера
     *
     * @param  {function} onLoad  успешная загрузка
     * @param  {function} onError ошибка загрузки
     */
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = TIMEOUT;
      isDataSaveFunction = false;
      var onErrorHandler = function () {
        onError(getErrorMessage(xhr.status), isDataSaveFunction);
      };
      var onTimeoutHandler = function () {
        onTimeout(onError);
        xhr.removeEventListener('timeout', onTimeoutHandler);
      };
      xhr.addEventListener('error', onErrorHandler);
      xhr.addEventListener('timeout', onTimeoutHandler);
      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
        xhr.removeEventListener('timeout', onTimeoutHandler);
        xhr.removeEventListener('error', onErrorHandler);
      });
      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    /**
     * Загрузка даных на сервер
     *
     * @param  {object} data    данные
     * @param  {function} onLoad
     * @param  {function} onError
     */
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = TIMEOUT;
      isDataSaveFunction = true;
      var onErrorHandler = function () {
        onError(getErrorMessage(xhr.status), isDataSaveFunction);
        xhr.removeEventListener('error', onErrorHandler);
      };
      var onTimeoutHandler = function () {
        onTimeout(onError);
        xhr.removeEventListener('timeout', onTimeoutHandler);
      };
      xhr.addEventListener('error', onErrorHandler);
      xhr.addEventListener('timeout', onTimeoutHandler);
      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
