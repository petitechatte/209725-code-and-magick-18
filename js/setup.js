'use strict';

(function () {
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_NUMBER = 4;
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var FOCUS_SHADOW = '0 0 10px #fff000'; // имитация фокуса для псевдокнопок

  var setupWindow = document.querySelector('.setup');
  var buttonSetupOpen = document.querySelector('.setup-open');
  var avatar = buttonSetupOpen.querySelector('.setup-open-icon');
  var buttonSetupClose = setupWindow.querySelector('.setup-close');
  var buttonUpload = setupWindow.querySelector('.upload');
  var setupAvatar = buttonUpload.querySelector('.setup-user-pic');
  var uploadInput = buttonUpload.querySelector('input');
  var userName = setupWindow.querySelector('.setup-user-name');
  var heroCoat = setupWindow.querySelector('.wizard-coat');
  var heroEyes = setupWindow.querySelector('.wizard-eyes');
  var fireball = setupWindow.querySelector('.setup-fireball-wrap');
  var heroCoatInput = setupWindow.querySelector('input[name="coat-color"]');
  var heroEyesInput = setupWindow.querySelector('input[name="eyes-color"]');
  var fireballInput = setupWindow.querySelector('input[name="fireball-color"]');

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
    document.removeEventListener('keydown', escKeydownHandler);
  };

  var escKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      closeButtonClickHandler();
    }
  };

  buttonSetupClose.addEventListener('click', closeButtonClickHandler);
  buttonSetupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      closeButtonClickHandler();
    }
  });

  // Если фокус находится на форме ввода имени, то окно закрываться не должно.

  userName.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      evt.stopPropagation();
      userName.blur();
    }
  });

  // Показываем окно настроек

  var openButtonClickHandler = function () {
    setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', escKeydownHandler);
  };

  buttonSetupOpen.addEventListener('click', openButtonClickHandler);
  buttonSetupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      openButtonClickHandler();
    }
  });

  // Имитируем фокус для псевдокнопок

  var simulateFocus = function (activeElement, highlightedElement) {
    activeElement.addEventListener('focus', function () {
      highlightedElement.style.boxShadow = FOCUS_SHADOW;
    });
    activeElement.addEventListener('blur', function () {
      highlightedElement.style.boxShadow = 'none';
    });
  };

  simulateFocus(buttonSetupOpen, avatar);
  simulateFocus(uploadInput, setupAvatar);

  // Изменение параметров персонажа

  var changeValue = function (input, properties) {
    var currentValue = input.value;
    var currentIndex = properties.indexOf(currentValue);
    var newIndex = currentIndex + 1;

    if (newIndex === properties.length) {
      newIndex = 0;
    }

    var newValue = properties[newIndex];
    input.value = newValue;
    return newValue;
  };

  var changeHeroColor = function (element, input, properties) {
    element.style.fill = changeValue(input, properties);
  };

  var changeFireballColor = function (element, input, properties) {
    element.style.background = changeValue(input, properties);
  };

  // Изменение цвета мантии персонажа по клику

  heroCoat.addEventListener('click', function () {
    changeHeroColor(heroCoat, heroCoatInput, COAT_COLORS);
  });

  // Изменение цвета глаз персонажа по клику

  heroEyes.addEventListener('click', function () {
    changeHeroColor(heroEyes, heroEyesInput, EYES_COLORS);
  });

  // Изменение цвета фаербола по клику

  fireball.addEventListener('click', function () {
    changeFireballColor(fireball, fireballInput, FIREBALL_COLORS);
  });
})();
