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

  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template');
    var wizardElement = similarWizardTemplate.content.cloneNode(true);
    var wizardName = wizardElement.querySelector('.setup-similar-label');
    var wizardCoat = wizardElement.querySelector('.wizard-coat');
    var wizardEyes = wizardElement.querySelector('.wizard-eyes');

    wizardName.textContent = wizard.name;
    wizardCoat.style.fill = wizard.coatColor;
    wizardEyes.style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var createSimilarWizards = function () {
    var similarWizardsList = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    var newWizard;

    var wizards = generateWizardsArray();

    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      newWizard = renderWizard(wizards[i]);
      fragment.appendChild(newWizard);
    }

    similarWizardsList.appendChild(fragment);
  };

  var showSimilarWizards = function () {
    var similarBlock = document.querySelector('.setup-similar');
    similarBlock.classList.remove('hidden');
    createSimilarWizards();
  };

  var showSetupWindow = function () {
    var setupWindow = document.querySelector('.setup');
    setupWindow.classList.remove('hidden');
  };

  showSetupWindow();
  showSimilarWizards();
})();
