// Модуль задания базовых параметров игры

'use strict';

(function () {
  // Устанавливаем размер фаербола
  var FIREBALL_SIZE = 22;
  // Устанавливаем скорость движения персонажа
  var WIZARD_SPEED = 3;
  // Устанавливаем ширину персонажа
  var WIZARD_WIDTH = 70;
  // Устанавливаем коэффициенты пропорциональности согласно ТЗ
  var WIZARD_HEIGHT_MULTIPLIER = 1.337;
  var WIZARD_X_MULTIPLIER = 0.5;
  var WIZARD_Y_MULTIPLIER = 2 / 3;
  // Устанавливаем скорость движения фаербола
  var DOWNWIND_SPEED = 5;
  var UPWIND_SPEED = 2;

  // Экспортируем переменные для модуля game.js
  // Пространство имен не использовалось, чтобы не вносить изменения в исходный модуль game.js
  window.fireballSize = FIREBALL_SIZE;
  window.wizardSpeed = WIZARD_SPEED;
  window.wizardWidth = WIZARD_WIDTH;

  // Определяем скорость движения фаербола с поправкой на ветер

  window.getFireballSpeed = function (left) {
    return left ? DOWNWIND_SPEED : UPWIND_SPEED;
  };

  // Определяем высоту персонажа

  window.getWizardHeight = function () {
    return WIZARD_HEIGHT_MULTIPLIER * WIZARD_WIDTH;
  };

  // Определяем исходное положение персонажа

  window.getWizardX = function (width) {
    return WIZARD_X_MULTIPLIER * width - WIZARD_WIDTH / 2;
  };

  window.getWizardY = function (height) {
    return height - WIZARD_Y_MULTIPLIER * height - window.getWizardHeight();
  };
})();
