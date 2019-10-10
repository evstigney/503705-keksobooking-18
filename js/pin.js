'use strict';
window.pin = (function () {
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

  return {
    renderPin: function (ad) {
      var pinElement = mapPin.cloneNode(true);
      var pinElementImg = pinElement.querySelector('img');
      pinElement.style = 'left: ' + (ad.location.x - pinElement.querySelector('img').style.width / 2) + 'px; top: ' + (ad.location.y - pinElement.querySelector('img').style.height) + 'px;';
      pinElementImg.src = ad.author.avatar;
      pinElementImg.alt = ad.offer.title;
      return pinElement;
    },
    isPin: function (elem) {
      var flag = (elem.classList.contains('map__pin--main')) ? false : true;
      return flag;
    }
  };
})();
