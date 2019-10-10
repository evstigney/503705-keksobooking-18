'use strict';

window.card = (function () {
  var mapCard = document.querySelector('#card').content.querySelector('.map__card');
  var mapCardsFragment = document.createDocumentFragment();
  var filters = document.querySelector('.map__filters-container');

  var getCapacityMessage = function (rooms, guests) {
    var roomsInCase = (rooms === 1) ? 'комната' : 'комнаты';
    var guestsInCase = 'гостей';
    var reRooms = /[05-9]\b/;
    if (reRooms.test(rooms.toString())) {
      roomsInCase = 'комнат';
    }
    var reGuests = /1{1}\b/;
    if (reGuests.test(guests.toString()) && guests !== 11) {
      guestsInCase = 'гостя';
    }
    var message = rooms + ' ' + roomsInCase + ' для ' + guests + ' ' + guestsInCase;
    return message;
  };

  var getPopupFeatures = function (elem, arr) {
    var features = elem.querySelectorAll('.popup__feature');
    for (var i = features.length - 1; i >= 0; i--) {
      if (i < arr.length) {
        var currentClassesArr = features[i].classList;
        var reFeatureClass = /\bpopup__feature--/;
        for (var j = 0; j < currentClassesArr.length; j++) {
          if (reFeatureClass.test(currentClassesArr[j])) {
            var currentClass = currentClassesArr[j];
            features[i].classList.remove(currentClass);
            features[i].classList.add(window.data.MAP_FEATURES_CLASSES[arr[i]]);
          }
        }
      } else {
        features[i].remove();
      }
    }
    return features;
  };

  var getPopupPhotos = function (elem, arr) {
    var photo = elem.querySelector('img');
    var i = 0;
    photo.src = arr[i];
    i++;
    for (i; i < arr.length; i++) {
      var photoNext = photo.cloneNode(true);
      photoNext.src = arr[i];
      elem.appendChild(photoNext);
    }
    return elem;
  };

  return {
    getCard: function (ad) {
      var cardElement = mapCard.cloneNode(true);
      var title = cardElement.querySelector('.popup__title');
      var address = cardElement.querySelector('.popup__text--address');
      var price = cardElement.querySelector('.popup__text--price');
      var popupType = cardElement.querySelector('.popup__type');
      var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
      var popupTextTime = cardElement.querySelector('.popup__text--time');
      var popupFeatures = cardElement.querySelector('.popup__features');
      var copyPopupFeatures = popupFeatures;
      var popupDescription = cardElement.querySelector('.popup__description');
      var popupPhotos = cardElement.querySelector('.popup__photos');
      var copyPopupPhotos = popupPhotos;
      var popupAvatar = cardElement.querySelector('.popup__avatar');
      title.textContent = ad.offer.title;
      address.textContent = ad.offer.address;
      price.textContent = ad.offer.price + ' ₽/ночь';
      popupType.textContent = window.data.MAP_TYPES[ad.offer.type];
      popupTextCapacity.textContent = getCapacityMessage(ad.offer.rooms, ad.offer.guests);
      popupTextTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      popupFeatures = getPopupFeatures(copyPopupFeatures, ad.offer.features);
      popupDescription.textContent = ad.offer.description;
      popupPhotos = getPopupPhotos(copyPopupPhotos, ad.offer.photos);
      popupAvatar.src = ad.author.avatar;
      return cardElement;
    },
    renderCard: function (index) {
      var card = this.getCard(window.map.mockingData.adsArr[index]);
      mapCardsFragment.appendChild(card);
      window.map.map.insertBefore(mapCardsFragment, filters);
      return card;
    }
  };
})();
