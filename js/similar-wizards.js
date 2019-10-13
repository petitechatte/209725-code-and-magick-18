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
    // Создаем персонажей
    createSimilarWizards: function (wizardsData) {
      var fragment = document.createDocumentFragment();
      var newWizard;

      // Используем try для защиты от некорректных данных с сервера
      try {
        for (var i = 0; i < WIZARDS_NUMBER; i++) {
          newWizard = renderWizard(wizardsData[i]);
          console.log(newWizard);
          fragment.appendChild(newWizard);
        }
      } catch (err) {
        showErrorMessage(err.message);
      }

      similarWizardsList.appendChild(fragment);
    },
    // Удаляем персонажей
    removeSimilarWizards: function () {
      similarWizardsList.innerHTML = '';
    },
    // sortWizards: function (wizards) {

    // }
  };

  // Создаем разметку для одного персонажа

  var renderWizard = function (character) {
    console.log(character);
    var wizard = similarWizardTemplate.cloneNode(true);
    var wizardName = wizard.querySelector('.setup-similar-label');
    var wizardCoat = wizard.querySelector('.wizard-coat');
    var wizardEyes = wizard.querySelector('.wizard-eyes');

    wizardName.textContent = character.name;
    wizardCoat.style.fill = character.colorCoat;
    wizardEyes.style.fill = character.colorEyes;

    return wizard;
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
    // Создаем похожих персонажей
    window.similarWizards.createSimilarWizards(loadedData);
    // Показываем блок с персонажами
    similarBlock.classList.remove('hidden');
  };

  window.backend.load(getWizardsData, showErrorMessage);
})();
