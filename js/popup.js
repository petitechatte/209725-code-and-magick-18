// Модуль поведения диалогового окна

'use strict';

(function () {
  // Коды управляющих клавиш
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  // Параметры сообщения об ошибке
  var UPLOAD_ERROR_HEADING = 'Форма не отправлена!';
  var UPOLOAD_ERROR_POSITION = 'absolute';
  var UPLOAD_ERROR_TOP = 50;
  var UPLOAD_ERROR_MARGIN = 50;
  var UPLOAD_ERROR_BORDER = '5px solid red';
  var UPLOAD_ERROR_LIFETIME = 3000;

  var FOCUS_SHADOW = '0 0 10px #fff000'; // имитация фокуса для псевдокнопок

  var dragged = false; // флаг перемещения
  var mouseCoordinates; // координаты мыши в момент перемещения окна

  // Находим элементы DOM
  var buttonSetupOpen = document.querySelector('.setup-open');
  var avatar = buttonSetupOpen.querySelector('.setup-open-icon');
  var buttonSetupClose = window.utils.setupWindow.querySelector('.setup-close');
  var setupForm = window.utils.setupWindow.querySelector('.setup-wizard-form');
  var buttonUpload = window.utils.setupWindow.querySelector('.upload');
  var setupAvatar = buttonUpload.querySelector('.setup-user-pic');
  var uploadInput = buttonUpload.querySelector('input[name="avatar"]');
  var userName = window.utils.setupWindow.querySelector('.setup-user-name');

  // Получаем исходное положение окна

  var startSetupCoordinates = {
    x: window.utils.setupWindow.style.left,
    y: window.utils.setupWindow.style.top
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
  var enterKeydownHandler = function (evt) {
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
    window.utils.setupWindow.classList.add('hidden');
    // Убираем обработчик нажатия Esc
    document.removeEventListener('keydown', escKeydownHandler);
    // Возвращаем обработчики на кнопку открытия окна
    buttonSetupOpen.addEventListener('click', openButtonClickHandler);
    buttonSetupOpen.addEventListener('keydown', enterKeydownHandler);
    buttonSetupOpen.addEventListener('focus', buttonFocusHandler);
    // Возвращаем кнопку в порядок фокуса
    buttonSetupOpen.tabIndex = '0';
    // Возвращаем исходные координаы окна
    window.utils.setupWindow.style.left = startSetupCoordinates.x;
    window.utils.setupWindow.style.top = startSetupCoordinates.y;
  };

  // Добавляем обработчики на кнопку закрытия окна

  buttonSetupClose.addEventListener('click', function () {
    closeSetupWindow();
  });

  buttonSetupClose.addEventListener('keydown', enterKeydownHandler);

  // Показываем окно настроек

  var openSetupWindow = function () {
    // Показываем окно
    window.utils.setupWindow.classList.remove('hidden');
    // Добавляем временный обработчик нажатия Esc
    document.addEventListener('keydown', escKeydownHandler);
    // Удаляем обработчики c кнопки открытия
    buttonSetupOpen.removeEventListener('click', openButtonClickHandler);
    buttonSetupOpen.removeEventListener('keydown', enterKeydownHandler);
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
  buttonSetupOpen.addEventListener('keydown', enterKeydownHandler);

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

  // Перемещение мыши

  var moveButtonMousemoveHandler = function (evt) {
    evt.preventDefault();

    // Объявляем перемещение
    dragged = true;

    // Рассчитываем смещение мыши
    var shift = {
      x: mouseCoordinates.x - evt.clientX,
      y: mouseCoordinates.y - evt.clientY
    };

    // Обновляем текущие координаты
    mouseCoordinates = window.utils.getMouseCoordinates(evt);

    // Перемещаем окно
    window.utils.setupWindow.style.left = String(window.utils.setupWindow.offsetLeft - shift.x) + 'px';
    window.utils.setupWindow.style.top = String(window.utils.setupWindow.offsetTop - shift.y) + 'px';
  };

  // Отделяем перемещение от клика

  var buttonDraggedClickHandler = function (evt) {
    evt.preventDefault();
    buttonUpload.removeEventListener('click', buttonDraggedClickHandler);
  };

  // Отпускаем окно

  var moveButtonMouseupHandler = function (evt) {
    evt.preventDefault();

    if (dragged) {
      buttonUpload.addEventListener('click', buttonDraggedClickHandler);
    }

    // Снимаем флаг перемещения
    dragged = false;

    // Снимаем обработчики перемещения и отпускания мыши
    document.removeEventListener('mousemove', moveButtonMousemoveHandler);
    document.removeEventListener('mouseup', moveButtonMouseupHandler);
  };

  // Захват окна мышью

  var moveButtonMousedownHandler = function (evt) {
    evt.preventDefault();
    // Получаем начальные координаты мыши
    mouseCoordinates = window.utils.getMouseCoordinates(evt);

    // Добавляем обработчики перемещения и отпускания мыши
    document.addEventListener('mousemove', moveButtonMousemoveHandler);
    document.addEventListener('mouseup', moveButtonMouseupHandler);
  };

  // Добавляем обработчик захвата окна мышью
  buttonUpload.addEventListener('mousedown', moveButtonMousedownHandler);

  // Отправляем форму

  var finishFormUpload = function (response) {
    // Закрываем окно настройки персонажа
    closeSetupWindow();
    // Подставляем загруженное изображение в аватар
    avatar.src = window.userpic;
    // В теории данные должны использоваться для изменения игрового персонажа
    return response;
  };

  // Сообщаем об ошибке отправки формы
  var showUploadErrorMessage = function (errorMessage) {
    // Создаем базовое сообщение
    var uploadErrorNode = window.utils.createMessage(UPLOAD_ERROR_HEADING, errorMessage);

    // Дополнительно стилизуем
    uploadErrorNode.style.position = UPOLOAD_ERROR_POSITION;
    uploadErrorNode.style.top = String(UPLOAD_ERROR_TOP) + '%';
    uploadErrorNode.style.left = String(UPLOAD_ERROR_MARGIN) + 'px';
    uploadErrorNode.style.right = String(UPLOAD_ERROR_MARGIN) + 'px';
    uploadErrorNode.style.border = UPLOAD_ERROR_BORDER;

    // Выводим сообщение
    window.utils.setupWindow.appendChild(uploadErrorNode);

    // Удаляем сообщение автоматически
    var deleteErrorMessage = function () {
      uploadErrorNode.remove();
    };

    setTimeout(deleteErrorMessage, UPLOAD_ERROR_LIFETIME);
  };

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupForm), finishFormUpload, showUploadErrorMessage);
  });

  // Экспортируем элементы окна
  window.popup = {
    setupAvatar: setupAvatar,
    uploadInput: uploadInput
  };
})();
