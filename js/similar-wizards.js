// Модуль создания похожих персонажей

'use strict';

(function () {
  var WIZARDS_NUMBER = 4; // число похожих персонажей в диалоговом окне настройки
  var URL = 'https://js.dump.academy/code-and-magick/data'; // адрес запроса данных магов

  // Находим в разметке шаблон для персонажей и блок для их размещения

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarBlock = document.querySelector('.setup-similar');
  var similarWizardsList = window.utils.setupWindow.querySelector('.setup-similar-list');

  // Экспортируем функции для модуля работы диалогового окна

  window.similarWizards = {
    // Показываем блок с персонажами
    showSimilarWizards: function () {
      // Тренируемся с JSONP
      var script = document.createElement('script');
      script.src = URL + '?callback=' + 'createSimilarWizards';
      document.body.appendChild(script);
      // createSimilarWizards();
      similarBlock.classList.remove('hidden');
    },
    // Удаляем персонажей при закрытии окна
    removeSimilarWizards: function () {
      similarBlock.classList.add('hidden');
      similarWizardsList.innerHTML = '';
    }
  };

  // Создаем разметку для одного персонажа

  var renderWizard = function (character) {
    var wizard = similarWizardTemplate.cloneNode(true);
    var wizardName = wizard.querySelector('.setup-similar-label');
    var wizardCoat = wizard.querySelector('.wizard-coat');
    var wizardEyes = wizard.querySelector('.wizard-eyes');

    wizardName.textContent = character.name;
    wizardCoat.style.fill = character.colorCoat;
    wizardEyes.style.fill = character.colorEyes;

    return wizard;
  };

  // Собираем массив случайных волшебников

  var selectData = function (data, elementsNumber) {
    var selectedElements = [];
    var element;

    while (selectedElements.length < elementsNumber) {
      element = window.utils.getRandomValue(data);

      if (selectedElements.indexOf(element) === -1) {
        selectedElements.push(element);
      }
    }

    return selectedElements;
  };

  // Добавляем персонажей на страницу

  window.createSimilarWizards = function (wizardsData) {
    var fragment = document.createDocumentFragment();
    var wizards = selectData(wizardsData, WIZARDS_NUMBER);
    var newWizard;

    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      newWizard = renderWizard(wizards[i]);
      fragment.appendChild(newWizard);
    }

    similarWizardsList.appendChild(fragment);
  };
})();
