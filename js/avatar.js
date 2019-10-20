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

    // Проверяем формат загруженного файла
    var matches = IMAGE_FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        // Подставляем новое изображение форму
        setupAvatar.src = reader.result;
        // Экспортируем Data URL изображения для аватара на странице игры
        window.userpic = reader.result;
      });

      // Переводим файл в Data URL
      reader.readAsDataURL(file);
    }
  });
})();
