'use strict';

(function () {
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_NUMBER = 4;

  var generateWizardsData = function (array) {
    var randomData;
    var newArray = [];

    while (newArray.length < WIZARDS_NUMBER) {
      randomData = array[Math.floor(Math.random() * (array.length))];
      if (newArray.indexOf(randomData) === -1) {
        newArray.push(randomData);
      }
    }

    return newArray;
  };

  var generateWizardsArray = function () {
    var firstNames = generateWizardsData(FIRST_NAMES);
    var lastNames = generateWizardsData(LAST_NAMES);
    var coatColors = generateWizardsData(COAT_COLORS);
    var eyesColors = generateWizardsData(EYES_COLORS);
    var wizardsList = [];
    var randomWizard;

    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      randomWizard = {
        name: firstNames[i] + ' ' + lastNames[i],
        coatColor: coatColors[i],
        eyesColor: eyesColors[i]
      };

      wizardsList.push(randomWizard);
    }

    return wizardsList;
  };

  var showSetupWindow = function () {
    var setupWindow = document.querySelector('.setup');
    setupWindow.classList.remove('hidden');
  };

  var wizards = generateWizardsArray();
  showSetupWindow();
})();
