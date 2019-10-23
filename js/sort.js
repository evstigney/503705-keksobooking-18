'use strict';

window.sort = (function () {

  var sortByType = function (arr, type) {
    arr.sort(function (a) {
      var result = 1;
      if (a.offer.type === type) {
        result = -1;
      }
      return result;
    });
    return arr;
  };

  return {
    byType: sortByType
  };
})();
