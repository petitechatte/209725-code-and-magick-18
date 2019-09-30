'use strict';

(function () {
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_NUMBER = 4;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setupWindow = document.querySelector('.setup');
  var buttonSetupOpen = document.querySelector('.setup-open-icon');
  var buttonSetupClose = setupWindow.querySelector('.setup-close');
  var userName = setupWindow.querySelector('.setup-user-name');

  // Находим в разметке шаблон для персонажей

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  // Получаем случайное значение из массива

  var getRandomValue = function (features) {
    return features[Math.floor(Math.random() * (features.length))];
  };

  // Собираем массив с неповторяющимися данными для свойств персонажей

  var generateWizardsProperties = function (features) {
    var randomProperty = '';
    var chosenProperties = [];

    while (chosenProperties.length < WIZARDS_NUMBER) {
      randomProperty = getRandomValue(features);
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
    var coatColors = generateWizardsProperties(COAT_COLORS);
    var eyesColors = generateWizardsProperties(EYES_COLORS);
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
    var similarWizardsList = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    var newWizard;

    var wizards = generateWizards();

    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      newWizard = renderWizard(wizards[i]);
      fragment.appendChild(newWizard);
    }

    similarWizardsList.appendChild(fragment);
  };

  // Показываем блок с персонажами

  var showSimilarWizards = function () {
    var similarBlock = document.querySelector('.setup-similar');
    similarBlock.classList.remove('hidden');
    createSimilarWizards();
  };

  showSimilarWizards();

  // Прячем окно настроек

  var closeButtonClickHandler = function () {
    setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', escPressHandler);
  };

  var escPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeButtonClickHandler();
    }
  };

  // Показываем окно настроек

  var openButtonClickHandler = function () {
    setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', escPressHandler);
  };

  // Добавляем обработчики событий

  buttonSetupOpen.addEventListener('click', openButtonClickHandler);
  buttonSetupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openButtonClickHandler();
    }
  });

  buttonSetupClose.addEventListener('click', closeButtonClickHandler);
  buttonSetupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeButtonClickHandler();
    }
  });

  //Если фокус находится на форме ввода имени, то окно закрываться не должно.

  userName.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
    userName.blur();
  });
})();
