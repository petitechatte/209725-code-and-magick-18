// Модуль работы с сервером данных

'use strict';

(function () {
  // Адрес сервера данных
  var URL = 'https://js.dump.academy/code-and-magick/data';
  // Ожидаемые статусы HTTP-ответа
  var OK_STATUS = 200;
  var WRONG_REQUEST_STATUS = 400;
  var UNAUTHORIZED_STATUS = 401;
  var NOT_FOUND_STATUS = 404;
  var SERVER_ERROR_STATUS = 500;

  window.backend = {
    // Получение данных с сервера
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', URL);

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case OK_STATUS:
            onLoad(xhr.response);
            break;
          case WRONG_REQUEST_STATUS:
            onError('Неверный запрос. Оторвите программисту руки.');
            break;
          case UNAUTHORIZED_STATUS:
            onError('Кажется, Вы забыли залогиниться.');
            break;
          case NOT_FOUND_STATUS:
            onError('Ничего не найдено. В следующий раз мы поищем лучше.');
            break;
          case SERVER_ERROR_STATUS:
            onError('Сервер недоступен. Перезвоните позже');
            break;
          default:
            onError('Статус ответа: ' + String(xhr.status) + ' ' + xhr.statusText);
        }
      });

      xhr.send();
    },
    // Отправление данных на сервер
    save: function (data, onLoad, onError) {

    }
  };
})();
