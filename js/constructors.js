'use strict';

(function () {
  window.Location = function (x, y) {
    this.x = x;
    this.y = y;
  };
  window.MinPrice = function (minPrice, errorMessage) {
    this.minPrice = minPrice;
    this.errorMessage = errorMessage;
  };
  window.UsedFilter = function (isApply, target, action) {
    this.isApply = isApply;
    this.target = target;
    this.action = action;
  };
  window.UserPhoto = function (fileChooser, preview, dropBox) {
    this.fileChooser = fileChooser;
    this.preview = preview;
    this.dropBox = dropBox;
  };
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
      var fileData = evt.dataTransfer;
      var file = fileData;
      file = file.files[0];
      uploadFile(file, preview);
    });
  };
})();
