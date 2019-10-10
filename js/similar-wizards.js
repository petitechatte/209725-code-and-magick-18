// Модуль создания похожих персонажей

'use strict';

(function () {
  // Число похожих персонажей в диалоговом окне настройки
  var WIZARDS_NUMBER = 4;
  // Параметры сообщения об ошибке
  var ERROR_MESSAGE_HEADING = 'Хьюстон, у нас проблемы!';
  var ERROR_MESSAGE_WIDTH = 100;
  var ERROR_MESSAGE_HEIGHT = 100;
  var ERROR_MESSAGE_PADDING = 20;
  var ERROR_MESSAGE_BACKGROUND = 'white';
  var ERROR_MESSAGE_TEXT_COLOR = 'black';
  var ERROR_MESSAGE_HEADING_COLOR = 'red';
  var ERROR_MESSAGE_FONT_WEIGHT = 'bold';
  var ERROR_MESSAGE_TEXT_ALIGN = 'center';

  // Находим в разметке шаблон для персонажей и блок для их размещения

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarBlock = document.querySelector('.setup-similar');
  var similarWizardsList = window.utils.setupWindow.querySelector('.setup-similar-list');

  // Экспортируем функции для модуля работы диалогового окна

  window.similarWizards = {
    // Показываем блок с персонажами
    showSimilarWizards: function () {
      window.backend.load(createSimilarWizards, showErrorMessage);
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

  // Добавляем персонажей на страницу

  var createSimilarWizards = function (wizardsData) {
    var fragment = document.createDocumentFragment();

    // Используем try для защиты от некорректных данных с сервера
    try {
      var wizards = window.utils.selectData(wizardsData, WIZARDS_NUMBER);
      var newWizard;

      for (var i = 0; i < WIZARDS_NUMBER; i++) {
        newWizard = renderWizard(wizards[i]);
        fragment.appendChild(newWizard);
      }
    } catch (err) {
      showErrorMessage(err.message);
    }

    similarWizardsList.appendChild(fragment);
  };

  // Сообщаем об ошибке загрузки персонажей
  var showErrorMessage = function (errorMessage) {
    // Стилизуем блок сообщения об ошибке
    var errorNode = document.createElement('div');
    errorNode.style.width = String(ERROR_MESSAGE_WIDTH) + '%';
    errorNode.style.height = String(ERROR_MESSAGE_HEIGHT) + 'px';
    errorNode.style.padding = String(ERROR_MESSAGE_PADDING) + 'px';
    errorNode.style.background = ERROR_MESSAGE_BACKGROUND;
    errorNode.style.color = ERROR_MESSAGE_TEXT_COLOR;
    errorNode.style.fontWeight = ERROR_MESSAGE_FONT_WEIGHT;
    errorNode.style.textAlign = ERROR_MESSAGE_TEXT_ALIGN;
    errorNode.innerHTML = '<h3></h3>' + errorMessage;

    // Добавляем заголовок
    var errorHeading = errorNode.querySelector('h3');
    errorHeading.style.color = ERROR_MESSAGE_HEADING_COLOR;
    errorHeading.textContent = ERROR_MESSAGE_HEADING;

    // Выводим сообщение
    similarWizardsList.appendChild(errorNode);
  };
})();
