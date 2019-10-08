// Модуль поведения диалогового окна

'use strict';

(function () {
  // Коды управляющих клавиш
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var FOCUS_SHADOW = '0 0 10px #fff000'; // имитация фокуса для псевдокнопок

  // Находим элементы DOM
  var buttonSetupOpen = document.querySelector('.setup-open');
  var avatar = buttonSetupOpen.querySelector('.setup-open-icon');
  var buttonSetupClose = window.util.setupWindow.querySelector('.setup-close');
  var buttonUpload = window.util.setupWindow.querySelector('.upload');
  var setupAvatar = buttonUpload.querySelector('.setup-user-pic');
  var uploadInput = buttonUpload.querySelector('input[name="avatar"]');
  var userName = window.util.setupWindow.querySelector('.setup-user-name');

  // Получаем исходное положение окна

  var startSetupCoordinates = {
    x: window.util.setupWindow.style.left,
    y: window.util.setupWindow.style.top
  };

  // Обработчик нажатия клавиши Esc с учетом фокуса в поле ввода
  var escKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      if (evt.target === userName) {
        evt.stopPropagation();
        evt.target.blur();
      } else {
        closeSetupWindow();
      }
    }
  };

  // Если фокус находится на поле ввода имени, то окно закрываться не должно.
  userName.addEventListener('keydown', escKeydownHandler);

  // Определение нажатия клавиши Enter
  var enterKydownHandler = function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      if (evt.target === buttonSetupOpen) {
        openSetupWindow();
      } else if (evt.target === buttonSetupClose) {
        closeSetupWindow();
      }
    }
  };

  // Прячем окно настроек

  var closeSetupWindow = function () {
    // Скрываем окно
    window.util.setupWindow.classList.add('hidden');
    // Удаляем сгенерированных персонажей
    window.similarWizards.removeSimilarWizards();
    // Убираем обработчик нажатия Esc
    document.removeEventListener('keydown', escKeydownHandler);
    // Возвращаем обработчики на кнопку открытия окна
    buttonSetupOpen.addEventListener('click', openButtonClickHandler);
    buttonSetupOpen.addEventListener('keydown', enterKydownHandler);
    buttonSetupOpen.addEventListener('focus', buttonFocusHandler);
    // Возвращаем кнопку в порядок фокуса
    buttonSetupOpen.tabIndex = '0';
    // Возвращаем исходные координаы окна
    window.util.setupWindow.style.left = startSetupCoordinates.x;
    window.util.setupWindow.style.top = startSetupCoordinates.y;
  };

  // Добавляем обработчики на кнопку закрытия окна

  buttonSetupClose.addEventListener('click', function () {
    closeSetupWindow();
  });

  buttonSetupClose.addEventListener('keydown', enterKydownHandler);

  // Показываем окно настроек

  var openSetupWindow = function () {
    // Генерируем новых случайных персонажей
    window.similarWizards.showSimilarWizards();
    // Показываем окно
    window.util.setupWindow.classList.remove('hidden');
    // Добавляем временный обработчик нажатия Esc
    document.addEventListener('keydown', escKeydownHandler);
    // Удаляем обработчики c кнопки открытия
    buttonSetupOpen.removeEventListener('click', openButtonClickHandler);
    buttonSetupOpen.removeEventListener('keydown', enterKydownHandler);
    buttonSetupOpen.removeEventListener('focus', buttonFocusHandler);
    // Удаляем кнопку открытия из порядка фокуса
    buttonSetupOpen.tabIndex = '-1';
    buttonSetupOpen.blur();
  };

  var openButtonClickHandler = function () {
    openSetupWindow();
  };

  // Добавляем обработчики на кнопку открытия окна

  buttonSetupOpen.addEventListener('click', openButtonClickHandler);
  buttonSetupOpen.addEventListener('keydown', enterKydownHandler);

  // Имитируем фокус для псевдокнопок

  var getHighlightedElement = function (activeElement) {
    var highlightedElement;
    if (activeElement === buttonSetupOpen) {
      highlightedElement = avatar;
    } else if (activeElement === uploadInput) {
      highlightedElement = setupAvatar;
    }
    return highlightedElement;
  };

  var setBoxShadow = function (element, shadow) {
    element.style.boxShadow = shadow;
  };

  var buttonFocusHandler = function (evt) {
    var activeElement = getHighlightedElement(evt.target);
    setBoxShadow(activeElement, FOCUS_SHADOW);
  };

  var buttonBlurHandler = function (evt) {
    var activeElement = getHighlightedElement(evt.target);
    setBoxShadow(activeElement, 'none');
  };

  var simulateFocus = function (element) {
    element.addEventListener('focus', buttonFocusHandler);
    element.addEventListener('blur', buttonBlurHandler);
  };

  simulateFocus(buttonSetupOpen);
  simulateFocus(uploadInput);

  // Перемещение окна

  // Захват окна мышью

  var moveButtonMouseDownHandler = function (downEvt) {
    downEvt.preventDefault();
    // Получаем начальные координаты мыши
    var mouseCoordinates = window.util.getMouseCoordinates(downEvt);
    var dragged = false; // флаг перемещения

    // Перемещение мыши

    var moveButtonMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      // Объявляем перемещение
      dragged = true;

      // Рассчитываем смещение мыши
      var shift = {
        x: mouseCoordinates.x - moveEvt.clientX,
        y: mouseCoordinates.y - moveEvt.clientY
      };

      // Обновляем текущие координаты
      mouseCoordinates = window.util.getMouseCoordinates(moveEvt);

      // Перемещаем окно
      window.util.setupWindow.style.left = String(window.util.setupWindow.offsetLeft - shift.x) + 'px';
      window.util.setupWindow.style.top = String(window.util.setupWindow.offsetTop - shift.y) + 'px';
    };

    // Отпускаем окно

    var moveButtonMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      // Отделяем перемещение от клика
      var buttonDraggedClickHandler = function (evt) {
        evt.preventDefault();
        buttonUpload.removeEventListener('click', buttonDraggedClickHandler);
      };

      if (dragged) {
        buttonUpload.addEventListener('click', buttonDraggedClickHandler);
      }

      // Снимаем обработчики перемещения и отпускания мыши

      document.removeEventListener('mousemove', moveButtonMouseMoveHandler);
      document.removeEventListener('mouseup', moveButtonMouseUpHandler);
    };

    // Добавляем обработчики перемещения и отпускания мыши
    document.addEventListener('mousemove', moveButtonMouseMoveHandler);
    document.addEventListener('mouseup', moveButtonMouseUpHandler);
  };

  // Добавляем обработчик захвата окна мышью
  buttonUpload.addEventListener('mousedown', moveButtonMouseDownHandler);
})();