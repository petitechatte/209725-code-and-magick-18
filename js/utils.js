// Вспомогательный модуль

'use strict';

(function () {
  // Базовые параметры сообщения об ошибке
  var ERROR_MESSAGE_HEIGHT = 150;
  var ERROR_MESSAGE_PADDING = 20;
  var ERROR_MESSAGE_BACKGROUND = 'white';
  var ERROR_MESSAGE_TEXT_COLOR = 'black';
  var ERROR_MESSAGE_HEADING_COLOR = 'red';
  var ERROR_MESSAGE_FONT_WEIGHT = 'bold';
  var ERROR_MESSAGE_TEXT_ALIGN = 'center';
  var WRAPPER_ELEMENT = 'div';
  var HEADING_ELEMENT = 'h3';

  window.utils = {
    // Находим диалоговое окно настройки
    setupWindow: document.querySelector('.setup'),

    // Создаем окно сообщения об ошибке
    createMessage: function (heading, errorMessage) {
      // Стилизуем блок сообщения об ошибке
      var errorNode = document.createElement(WRAPPER_ELEMENT);
      errorNode.style.height = String(ERROR_MESSAGE_HEIGHT) + 'px';
      errorNode.style.padding = String(ERROR_MESSAGE_PADDING) + 'px';
      errorNode.style.background = ERROR_MESSAGE_BACKGROUND;
      errorNode.style.color = ERROR_MESSAGE_TEXT_COLOR;
      errorNode.style.fontWeight = ERROR_MESSAGE_FONT_WEIGHT;
      errorNode.style.textAlign = ERROR_MESSAGE_TEXT_ALIGN;
      errorNode.textContent = errorMessage;

      // Добавляем заголовок
      var errorHeading = document.createElement(HEADING_ELEMENT);
      errorHeading.style.color = ERROR_MESSAGE_HEADING_COLOR;
      errorHeading.textContent = heading;
      errorNode.insertAdjacentElement('afterbegin', errorHeading);

      return errorNode;
    },

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

    // Выбираем элементы для массива заданной длины из другого массива

    selectData: function (data, elementsNumber) {
      var selectedElements = [];
      var element;

      while (selectedElements.length < elementsNumber) {
        element = window.utils.getRandomValue(data);

        if (selectedElements.indexOf(element) === -1) {
          selectedElements.push(element);
        }
      }

      return selectedElements;
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
