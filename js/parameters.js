'use strict';

(function () {
  // Пространство имен не использовалось, чтобы не вносить изменения в исходный модуль game.js

  window.fireballSize = 22;
  window.wizardSpeed = 3;
  window.wizardWidth = 70;
  var wizardHeightMultiplier = 1.337;
  var wizardXMultiplier = 0.5;
  var wizardYMultiplier = 2 / 3;

  window.getFireballSpeed = function (left) {
    return left ? 5 : 2;
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
