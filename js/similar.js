'use strict';

(function () {
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_NUMBER = 4; // Число похожих персонажей в диалоговом окне настройки

  // Находим в разметке шаблон для персонажей и блок для их размещения

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarBlock = document.querySelector('.setup-similar');
  var similarWizardsList = window.util.setupWindow.querySelector('.setup-similar-list');

  // Собираем массив с неповторяющимися данными для свойств персонажей

  var generateWizardsProperties = function (features) {
    var randomProperty = '';
    var chosenProperties = [];

    while (chosenProperties.length < WIZARDS_NUMBER) {
      randomProperty = window.util.getRandomValue(features);

      if (chosenProperties.indexOf(randomProperty) === -1) {
        chosenProperties.push(randomProperty);
      }
    }

    return chosenProperties;
  };

  // Собираем массив объектов, описывающих персонажей

  var generateWizards = function () {
    var firstNames = generateWizardsProperties(FIRST_NAMES);
    var lastNames = generateWizardsProperties(LAST_NAMES);
    var coatColors = generateWizardsProperties(window.setup.COAT_COLORS);
    var eyesColors = generateWizardsProperties(window.setup.EYES_COLORS);
    var wizardsList = [];
    var currentWizard = {};

    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      currentWizard = {
        name: firstNames[i] + ' ' + lastNames[i],
        coatColor: coatColors[i],
        eyesColor: eyesColors[i]
      };

      wizardsList.push(currentWizard);
    }

    return wizardsList;
  };

  // Создаем разметку для одного персонажа

  var renderWizard = function (character) {
    var wizard = similarWizardTemplate.cloneNode(true);
    var wizardName = wizard.querySelector('.setup-similar-label');
    var wizardCoat = wizard.querySelector('.wizard-coat');
    var wizardEyes = wizard.querySelector('.wizard-eyes');

    wizardName.textContent = character.name;
    wizardCoat.style.fill = character.coatColor;
    wizardEyes.style.fill = character.eyesColor;

    return wizard;
  };

  // Добавляем персонажей на страницу

  var createSimilarWizards = function () {
    var fragment = document.createDocumentFragment();
    var newWizard;

    var wizards = generateWizards();

    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      newWizard = renderWizard(wizards[i]);
      fragment.appendChild(newWizard);
    }

    similarWizardsList.appendChild(fragment);
  };

  window.similar = {
    // Показываем блок с персонажами
    showSimilarWizards: function () {
      createSimilarWizards();
      similarBlock.classList.remove('hidden');
    },
    // Удаляем персонажей при закрытии окна
    removeSimilarWizards: function () {
      similarBlock.classList.add('hidden');
      similarWizardsList.innerHTML = '';
    }
  };
})();
