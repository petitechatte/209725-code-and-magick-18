// Модуль загрузки аватара

'use strict';

(function () {
  // Допустимые форматы аватара
  var IMAGE_FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

  // Находим элементы формы
  var setupAvatar = window.popup.setupAvatar;
  var uploadInput = window.popup.uploadInput;

  // Добавляем обработчик загрузки файла
  uploadInput.addEventListener('change', function () {
    var file = uploadInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = IMAGE_FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        setupAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
