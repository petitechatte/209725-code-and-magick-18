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

  // Создаем переменные для хранения данных
  var loadedData = [];
  var sortedWizards = [];
  var mainWizardCurrentLook = {
    coatColor: '',
    eyesColor: ''
  };

  // Получаем настройки цвета главного персонажа
  var getMainWizardColors = function () {
    mainWizardCurrentLook.coatColor = window.settings.heroCoatInput.value;
    mainWizardCurrentLook.eyesColor = window.settings.heroEyesInput.value;
  };

  // Устанавливаем текущий рейтинг каждого загруженного персонажа

  var getRank = function (wizard) {
    var rank = 0;

    // Назначаем баллы за основной критерий сходства - цвет плаща
    if (wizard.colorCoat === mainWizardCurrentLook.coatColor) {
      rank += 2;
    }

    // Назначаем дополнительные баллы за вторичный критерий сходства - цвет глаз
    if (wizard.colorEyes === mainWizardCurrentLook.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  // Сортируем персонажей по убыванию рейтинга

  var sortWizards = function () {
    // Используем try для защиты от некорректных данных с сервера
    try {
      var copiedWizards = loadedData.slice();

      copiedWizards.sort(function (a, b) {
        return getRank(b) - getRank(a);
      });
    } catch (err) {
      showErrorMessage(err.message);
    }
    return copiedWizards;
  };

  // Создаем персонажей
  var createSimilarWizards = function (wizardsData) {
    var fragment = document.createDocumentFragment();
    var newWizard;

    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      newWizard = renderWizard(wizardsData[i]);
      fragment.appendChild(newWizard);
    }

    similarWizardsList.appendChild(fragment);
  };

  // Удаляем персонажей

  var removeSimilarWizards = function () {
    similarWizardsList.innerHTML = '';
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

  var getWizards = function (data) {
    // Сохраняем данные
    loadedData = data;
    // Создаем похожих персонажей
    window.updateWizards();
    // Показываем блок с персонажами
    similarBlock.classList.remove('hidden');
  };

  // Обновляем список похожих персонажей

  window.updateWizards = function () {
    removeSimilarWizards();
    getMainWizardColors();
    sortedWizards = sortWizards();
    createSimilarWizards(sortedWizards);
  };

  window.backend.load(getWizards, showErrorMessage);
})();
