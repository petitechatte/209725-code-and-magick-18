// Модуль работы с сервером данных

'use strict';

(function () {
  // Адрес сервера данных
  var URL = 'https://js.dump.academy/code-and-magick/data';

  window.backend = {
    // Получение данных с сервера
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', URL);

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.send();
    },
    // Отправление данных на сервер
    save: function (data, onLoad, onError) {

    }
  };

  //
})();
