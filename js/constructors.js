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
  window.UserPhoto = function (fileChooser, preview) {
    this.fileChooser = fileChooser;
    this.preview = preview;
  };
  window.UserPhoto.prototype.upload = function () {
    var fileChooser = this.fileChooser;
    var preview = this.preview;
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
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
    });
  };
})();
