// Вспомогательный модуль

'use strict';

(function () {
  window.utils = {
    // Находим диалоговое окно настройки
    setupWindow: document.querySelector('.setup'),

    // Получаем случайное значение из массива
    getRandomValue: function (features) {
      return features[Math.floor(Math.random() * (features.length))];
    },

    // Поиск наибольшего значения массива
    getMaxValue: function (array) {
      var maxValue = array[0];
      for (var i = 1; i < array.length; i++) {
        if (array[i] > maxValue) {
          maxValue = array[i];
        }
      }
      return maxValue;
    },

    // Изменение параметров персонажа
    changeValue: function (input, properties) {
      var currentValue = input.value;
      var currentIndex = properties.indexOf(currentValue);
      var newIndex = currentIndex + 1;

      if (newIndex === properties.length) {
        newIndex = 0;
      }

      var newValue = properties[newIndex];
      input.value = newValue;
      return newValue;
    },

    // Получение координат мыши
    getMouseCoordinates: function (evt) {
      return {
        x: evt.clientX,
        y: evt.clientY
      };
    }
  };
})();
