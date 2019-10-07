'use strict';

(function () {
  // Модуль задания базовых параметров игры

  // Пространство имен не использовалось, чтобы не вносить изменения в исходный модуль game.js

  // Устанавливаем размер фаербола
  window.fireballSize = 22;
  // Устанавливаем скорость движения персонажа
  window.wizardSpeed = 3;
  // Устанавливаем ширину персонажа
  window.wizardWidth = 70;
  // Устанавливаем коэффициенты пропорциональности согласно ТЗ
  var wizardHeightMultiplier = 1.337;
  var wizardXMultiplier = 0.5;
  var wizardYMultiplier = 2 / 3;
  // Устанавливаем скорость движения фаербола
  var downWindSpeed = 5;
  var upWindSpeed = 2;

  // Определяем скорость движения фаербола с поправкой на ветер

  window.getFireballSpeed = function (left) {
    return left ? downWindSpeed : upWindSpeed;
  };

  window.getWizardHeight = function () {
    return wizardHeightMultiplier * window.wizardWidth;
  };

  window.getWizardX = function (width) {
    return wizardXMultiplier * width - window.wizardWidth / 2;
  };

  window.getWizardY = function (height) {
    return height - wizardYMultiplier * height - window.getWizardHeight();
  };
})();
