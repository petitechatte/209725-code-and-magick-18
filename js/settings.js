// Модуль настройки свойств персонажа

'use strict';

(function () {
  window.settings = {
    // Допустимые цвета персонажа
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    // Скрытые поля, содержащие цвет плаща и глаз главного персонажа
    heroCoatInput: window.utils.setupWindow.querySelector('input[name="coat-color"]'),
    heroEyesInput: window.utils.setupWindow.querySelector('input[name="eyes-color"]')
  };

  // Находим элементы DOM
  var heroCoat = window.utils.setupWindow.querySelector('.wizard-coat');
  var heroEyes = window.utils.setupWindow.querySelector('.wizard-eyes');
  var fireball = window.utils.setupWindow.querySelector('.setup-fireball-wrap');
  var fireballInput = window.utils.setupWindow.querySelector('input[name="fireball-color"]');

  // Меняем по клику цвет для выбранного элемента персонажа

  var changeColor = function (element, input, properties) {
    if (element.tagName === 'DIV') {
      element.style.background = window.utils.changeValue(input, properties);
    } else {
      element.style.fill = window.utils.changeValue(input, properties);
    }
  };

  // Добавляем обрабочики клика

  var makeChangeable = function (element, input, properties) {
    // Меняем по клику цвет главного персонажа
    element.addEventListener('click', function () {
      changeColor(element, input, properties);
    });
    // Подбираем похожих персонажей с устранением "дребезга" при частых кликах
    element.addEventListener('click', window.debounce(function () {
      window.updateWizards();
    }));
  };

  makeChangeable(heroCoat, window.settings.heroCoatInput, window.settings.COAT_COLORS);
  makeChangeable(heroEyes, window.settings.heroEyesInput, window.settings.EYES_COLORS);
  makeChangeable(fireball, fireballInput, window.settings.FIREBALL_COLORS);
})();
