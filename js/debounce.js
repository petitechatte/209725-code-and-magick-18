// Модуль для устранения "дребезга"

'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (cb) {
    // Создаем переменную для таймера под каждый input
    var lastTimeout = null;

    return function () {
      // Получаем аргументы, переданные в функцию
      var parameters = arguments;
      // Обнуляем текущий таймер перед созданием нового таймера
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      // Добавляем новый таймер
      lastTimeout = window.setTimeout(function () {
        // Вызываем функцию-коллбэк и передаем в нее аргументы
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
