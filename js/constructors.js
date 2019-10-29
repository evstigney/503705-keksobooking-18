'use strict';

/**
 * Модуль с конструкторами
 *
 * @return {object} набор конструкторов
 */
(function () {

  /**
   * Координаты
   * @constructor
   * @this {Location}
   * @param  {number} x
   * @param  {number} y
   */
  window.Location = function (x, y) {
    this.x = x;
    this.y = y;
  };

  /**
   * Валидация цены
   *
   * @constructor
   * @this {MinPrice}
   * @param  {string} minPrice
   * @param  {string} errorMessage
   */
  window.MinPrice = function (minPrice, errorMessage) {
    this.minPrice = minPrice;
    this.errorMessage = errorMessage;
  };

  /**
   * Фильтр
   *
   * @constructor
   * @this {UsedFilter}
   * @param  {boolean} isApply применен ли
   * @param  {object} target
   * @param  {function} action  функция фильтра
   */
  window.UsedFilter = function (isApply, target, action) {
    this.isApply = isApply;
    this.target = target;
    this.action = action;
  };

  /**
   * Фото пользователя для загрузки
   *
   * @constructor
   * @this {UserPhoto}
   * @param  {object} fileChooser input type="file"
   * @param  {object} preview     img
   * @param  {object} dropBox     область для перетаскивания
   */
  window.UserPhoto = function (fileChooser, preview, dropBox) {
    this.fileChooser = fileChooser;
    this.preview = preview;
    this.dropBox = dropBox;
  };

  /**
   * Загрузка файла в превью
   *
   * @param  {object} file
   * @param  {object} preview img
   */
  window.UserPhoto.prototype._uploadFile = function (file, preview) {
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = window.util.FILE_TYPES.some(function (type) {
        return fileName.endsWith(type);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    }
  };

  /**
   * Загрузка по клику
   *
   * @this {UserPhoto}
   */
  window.UserPhoto.prototype.uploadByClick = function () {
    var fileChooser = this.fileChooser;
    var preview = this.preview;
    var uploadFile = this._uploadFile;
    fileChooser.addEventListener('change', function () {
      preview.classList.remove('visually-hidden');
      var file = fileChooser.files[0];
      uploadFile(file, preview);
    });
  };

  /**
   * Загрузка с помощью Drag and Drop
   *
   * @this {UserPhoto}
   */
  window.UserPhoto.prototype.uploadByDnD = function () {
    var dropBox = this.dropBox;
    var preview = this.preview;
    var uploadFile = this._uploadFile;
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (evtName) {
      dropBox.addEventListener(evtName, function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      });
    });
    dropBox.addEventListener('drop', function (evt) {
      preview.classList.remove('visually-hidden');
      var file = evt.dataTransfer;
      file = file.files[0];
      uploadFile(file, preview);
    });
  };
})();
