// Модуль создания похожих персонажей

'use strict';

(function () {
  // Число похожих персонажей в диалоговом окне настройки
  var WIZARDS_NUMBER = 4;
  // Параметры сообщения об ошибке
  var ERROR_MESSAGE_HEADING = 'Хьюстон, у нас проблемы!';
  var ERROR_MESSAGE_WIDTH = 100;

  // Находим в разметке шаблон для персонажей и блок для их размещения

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarBlock = document.querySelector('.setup-similar');
  var similarWizardsList = window.utils.setupWindow.querySelector('.setup-similar-list');

  // Создаем переменную для хранения данных с сервера
  var loadedData = [];

  // Экспортируем функции для модуля работы диалогового окна

  window.similarWizards = {
    // Показываем блок с персонажами
    showSimilarWizards: function () {
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
    var newWizard;

    // Используем try для защиты от некорректных данных с сервера
    try {
      var wizards = wizardsData;

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
    // Создаем базовое сообщение
    var errorNode = window.utils.createMessage(ERROR_MESSAGE_HEADING, errorMessage);

    // Дополнительно стилизуем
    errorNode.style.width = String(ERROR_MESSAGE_WIDTH) + '%';

    // Выводим сообщение
    similarWizardsList.appendChild(errorNode);
  };

  // Загружаем данные персонажей

  var getWizardsData = function (data) {
    loadedData = data;
  };

  window.backend.load(getWizardsData, showErrorMessage);
})();
