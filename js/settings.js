// Модуль настройки свойств персонажа

'use strict';

(function () {
  window.settings = {
    // Допустимые цвета персонажа
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  };

  // Находим элементы DOM
  var heroCoat = window.utils.setupWindow.querySelector('.wizard-coat');
  var heroEyes = window.utils.setupWindow.querySelector('.wizard-eyes');
  var fireball = window.utils.setupWindow.querySelector('.setup-fireball-wrap');
  var heroCoatInput = window.utils.setupWindow.querySelector('input[name="coat-color"]');
  var heroEyesInput = window.utils.setupWindow.querySelector('input[name="eyes-color"]');
  var fireballInput = window.utils.setupWindow.querySelector('input[name="fireball-color"]');

  // Создаем объект для хранения текущих цветов персонажа
  var currentLook = {
    coatColor: '',
    eyesColor: ''
  };

  // Запоминаем данные персонажа
  var getMainWizardColors = function () {
    currentLook.coatColor = heroCoatInput.value;
    currentLook.eyesColor = heroEyesInput.value;
    return currentLook;
  };

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
    element.addEventListener('click', function () {
      changeColor(element, input, properties);
      currentLook = getMainWizardColors();
    });
  };

  makeChangeable(heroCoat, heroCoatInput, window.settings.COAT_COLORS);
  makeChangeable(heroEyes, heroEyesInput, window.settings.EYES_COLORS);
  makeChangeable(fireball, fireballInput, window.settings.FIREBALL_COLORS);
})();
