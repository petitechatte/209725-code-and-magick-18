'use strict';

(function () {
  window.setup = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  // Находим элементы DOM
  var heroCoat = window.util.setupWindow.querySelector('.wizard-coat');
  var heroEyes = window.util.setupWindow.querySelector('.wizard-eyes');
  var fireball = window.util.setupWindow.querySelector('.setup-fireball-wrap');
  var heroCoatInput = window.util.setupWindow.querySelector('input[name="coat-color"]');
  var heroEyesInput = window.util.setupWindow.querySelector('input[name="eyes-color"]');
  var fireballInput = window.util.setupWindow.querySelector('input[name="fireball-color"]');

  // Меняем по клику цвет для выбранного элемента персонажа

  var changeHeroColor = function (element, input, properties) {
    element.addEventListener('click', function () {
      if (element.tagName === 'DIV') {
        element.style.background = window.util.changeValue(input, properties);
      } else {
        element.style.fill = window.util.changeValue(input, properties);
      }
    });
  };

  changeHeroColor(heroCoat, heroCoatInput, window.setup.COAT_COLORS);
  changeHeroColor(heroEyes, heroEyesInput, window.setup.EYES_COLORS);
  changeHeroColor(fireball, fireballInput, window.setup.FIREBALL_COLORS);
})();
