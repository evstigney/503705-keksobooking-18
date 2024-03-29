'use strict';

/**
 * Модуль для работы с карточкой объявления
 *
 * @return {object}  набор методов
 */
window.information = (function () {
  var mapCard = document.querySelector('#card').content.querySelector('.map__card');
  var mapCardsFragment = document.createDocumentFragment();
  var filters = document.querySelector('.map__filters-container');

  /**
   * Удаление карточки
   */
  var removeCard = function () {
    var openedCard = document.querySelector('.map__card');
    if (openedCard) {
      openedCard.remove();
    }
  };

  /**
   * Получаем строку с количеством комнат и гостей для карточки
   *
   * @param  {number} rooms  количество комнат в объявлении
   * @param  {number} guests количество гостей
   * @return {string}        строка, составленнная из данного количества комнат и гостей
   */
  var getCapacityMessage = function (rooms, guests) {
    var roomsInCase = (rooms === 1) ? 'комната' : 'комнаты';
    var guestsInCase = 'гостей';
    var reRooms = /[05-9]\b/;
    if (reRooms.test(rooms.toString())) {
      roomsInCase = 'комнат';
    }
    var reGuests = /1+\b/;
    if (reGuests.test(guests.toString())) {
      guestsInCase = 'гостя';
    }
    return rooms + ' ' + roomsInCase + ' для ' + guests + ' ' + guestsInCase;
  };

  /**
   * Для доступных фичей объявления (удобств) добавляем подходящие css классы
   *
   * @param  {object} elem блок в разметке
   * @param  {object} arr  массив с доступными фичами для этого объявления
   * @return {object}      блок в размеке с фичами, к которым добавлены корректные css классы
   */
  var getPopupFeatures = function (elem, arr) {
    var features = Array.from(elem.querySelectorAll('.popup__feature'));
    for (var i = features.length - 1; i >= 0; i--) {
      if (i < arr.length) {
        var currentClassesArr = Array.from(features[i].classList);
        var reFeatureClass = /\bpopup__feature--/;
        currentClassesArr.forEach(function (currentClass) {
          if (reFeatureClass.test(currentClass)) {
            features[i].classList.remove(currentClass);
            features[i].classList.add(window.data.featuresClassesMap[arr[i]]);
          }
        });
      } else {
        features[i].remove();
      }
    }
    return features;
  };

  /**
   * Добавляем фотографии жилья в карточку
   *
   * @param  {object} elem блок в разметке, куда добавляются фотографии жилья
   * @param  {object} arr  массив с фотографиями жилья
   * @return {object}      блок в разметке, куда добавлены фотографии жилья
   */
  var getPopupPhotos = function (elem, arr) {
    if (arr.length > 0) {
      var photo = elem.querySelector('img');
      photo.src = arr[0];
      for (var i = 1; i < arr.length; i++) {
        var photoNext = photo.cloneNode(true);
        photoNext.src = arr[i];
        elem.appendChild(photoNext);
      }
    } else {
      elem.classList.add('visually-hidden');
    }
    return elem;
  };

  /**
   * Проверяем перед открытием карточки
   *
   * @param {object} nextCard карточка объявления
   * @return {boolean}        нужно ли отрисовывать новую карточку
   */
  var isCardAlreadyExists = function (nextCard) {
    var flag = true;
    var previousCard = window.data.map.querySelector('.map__card.popup');
    if (previousCard && previousCard === nextCard) {
      flag = false;
    } else if (previousCard) {
      window.data.map.removeChild(previousCard);
    }
    return flag;
  };

  return {
    /**
     * Составляем карточку для объявления
     *
     * @param  {object} ad объект из массива с объявлениями (одно объявление)
     * @return {object}    карточка объявления
     */
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
      popupType.textContent = window.data.HousingTypes[ad.offer.type.toUpperCase()];
      popupTextCapacity.textContent = getCapacityMessage(ad.offer.rooms, ad.offer.guests);
      popupTextTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      popupFeatures = getPopupFeatures(copyPopupFeatures, ad.offer.features);
      popupDescription.textContent = ad.offer.description;
      popupPhotos = getPopupPhotos(copyPopupPhotos, ad.offer.photos);
      popupAvatar.src = ad.author.avatar;
      return cardElement;
    },

    /**
     * Отрисовывем карточку по индексу пина
     *
     * @param  {object} dataArr данные
     * @param  {number} index индекс кликнутого пина
     * @return {object}       отрисованная карточка
     */
    renderCard: function (dataArr, index) {
      var card = this.getCard(dataArr[index]);
      if (isCardAlreadyExists(card)) {
        mapCardsFragment.appendChild(card);
        window.data.map.insertBefore(mapCardsFragment, filters);
      }
      return card;
    },
    removeCard: removeCard
  };
})();
