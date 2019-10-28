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
})();
