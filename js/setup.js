'use strict';

(function () {
  window.setup = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var FOCUS_SHADOW = '0 0 10px #fff000'; // имитация фокуса для псевдокнопок

  var buttonSetupOpen = document.querySelector('.setup-open');
  var avatar = buttonSetupOpen.querySelector('.setup-open-icon');
  var buttonSetupClose = window.util.setupWindow.querySelector('.setup-close');
  var buttonUpload = window.util.setupWindow.querySelector('.upload');
  var setupAvatar = buttonUpload.querySelector('.setup-user-pic');
  var uploadInput = buttonUpload.querySelector('input[name="avatar"]');
  var userName = window.util.setupWindow.querySelector('.setup-user-name');
  var heroCoat = window.util.setupWindow.querySelector('.wizard-coat');
  var heroEyes = window.util.setupWindow.querySelector('.wizard-eyes');
  var fireball = window.util.setupWindow.querySelector('.setup-fireball-wrap');
  var heroCoatInput = window.util.setupWindow.querySelector('input[name="coat-color"]');
  var heroEyesInput = window.util.setupWindow.querySelector('input[name="eyes-color"]');
  var fireballInput = window.util.setupWindow.querySelector('input[name="fireball-color"]');

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
    window.similar.removeSimilarWizards();
    // Убираем обработчик нажатия Esc
    document.removeEventListener('keydown', escKeydownHandler);
    // Возвращаем обработчики на кнопку открытия окна
    buttonSetupOpen.addEventListener('click', openButtonClickHandler);
    buttonSetupOpen.addEventListener('keydown', enterKydownHandler);
    buttonSetupOpen.addEventListener('focus', buttonFocusHandler);
    // Возвращаем кнопку в порядок фокуса
    buttonSetupOpen.tabIndex = '0';
  };

  // Добавляем обработчики на кнопку закрытия окна

  buttonSetupClose.addEventListener('click', function () {
    closeSetupWindow();
  });

  buttonSetupClose.addEventListener('keydown', enterKydownHandler);

  // Показываем окно настроек

  var openSetupWindow = function () {
    // Генерируем новых случайных персонажей
    window.similar.showSimilarWizards();
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

  // Меняем по клику цвет для выбранного элемента персонажа

  var changeHeroColor = function (element, input, properties) {
    element.addEventListener('click', function () {
      if (element.tagName === 'DIV') {
        element.style.background = window.util.changeValue(input, properties);
      } else {
        element.style.fill = window.util.changeValue(input, properties);
      }
    });
  };

  changeHeroColor(heroCoat, heroCoatInput, window.setup.COAT_COLORS);
  changeHeroColor(heroEyes, heroEyesInput, window.setup.EYES_COLORS);
  changeHeroColor(fireball, fireballInput, window.setup.FIREBALL_COLORS);
})();
