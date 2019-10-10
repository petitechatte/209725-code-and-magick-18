// Модуль работы с сервером данных

'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data'; // адрес сервера данных
  var OK_STATUS = 200; // ожидаемый ответ сервера

  window.backend = {
    // Получение данных с сервера
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', URL);

      xhr.addEventListener('load', function () {
        if (xhr.status === OK_STATUS) {
          onLoad(xhr.response);
        } else {
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
