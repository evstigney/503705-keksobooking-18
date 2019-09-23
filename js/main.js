'use strict';

var TYPES_ARR = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES_ARR = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES_ARR = ['12:00', '13:00', '14:00'];
var FEATURES_ARR = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARR = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADS_QUANTITY = 8;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 100000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 10;
var GUESTS_MIN = 1;
var GUESTS_MAX = 50;

var map = document.querySelector('.map');
var filters = document.querySelector('.map__filters-container');
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCard = document.querySelector('#card').content.querySelector('.map__card');
var mapPinsFragment = document.createDocumentFragment();
var mapCardsFragment = document.createDocumentFragment();

var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (Math.floor(maxNumber) - Math.ceil(minNumber) + 1) + Math.ceil(minNumber));
};

var getRandomValue = function (arr) {
  var min = 0;
  var max = arr.length - 1;
  var index = getRandomNumber(min, max);
  return arr[index];
};

var getRandomArr = function (arr) {
  var min = 1;
  var max = arr.length - 1;
  var maxIndex = getRandomNumber(min, max);
  var randomArr = [];
  for (var i = 0; i < maxIndex; i++) {
    randomArr.push(arr[i]);
  }
  return randomArr;
};

var getAuthorAvatar = function (index) {
  index = '0' + (index + 1);
  return 'img/avatars/user' + index + '.png';
};

var getLocationParameters = function (elem) {
  var max = elem.getBoundingClientRect().width;
  var locationX = getRandomNumber(0, max);
  var locationY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);
  var location = {
    x: locationX,
    y: locationY
  };
  return location;
};

var getMockingAdsArr = function (quantity) {
  var mockingAds = [];
  for (var i = 0; i < quantity; i++) {
    var locationParameters = getLocationParameters(map);
    var ad = {
      'author': {
        'avatar': getAuthorAvatar(i)
      },
      'offer': {
        'title': 'Заголовок предложения',
        'address': locationParameters.x + ', ' + locationParameters.y,
        'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
        'type': getRandomValue(TYPES_ARR),
        'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        'checkin': getRandomValue(CHECKIN_TIMES_ARR),
        'checkout': getRandomValue(CHECKOUT_TIMES_ARR),
        'features': getRandomArr(FEATURES_ARR),
        'description': 'С точки зрения банальной эрудиции каждый индивидуум не может игнорировать критерии утопического субъективизма.',
        'photos': getRandomArr(PHOTOS_ARR)
      },
      'location': {
        'x': locationParameters.x,
        'y': locationParameters.y
      }
    };
    mockingAds.push(ad);
  }
  return mockingAds;
};

var renderPin = function (ad) {
  var pinElement = mapPin.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');
  pinElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px;';
  pinElementImg.src = ad.author.avatar;
  pinElementImg.alt = ad.offer.title;
  return pinElement;
};

var getPopupType = function (type) {
  var typeMessage = 'Непонятный тип жилья';
  if (type === 'flat') {
    typeMessage = 'Квартира';
  } else if (type === 'bungalo') {
    typeMessage = 'Бунгало';
  } else if (type === 'house') {
    typeMessage = 'Дом';
  } else {
    typeMessage = 'Дворец';
  }
  return typeMessage;
};

var getPopupFeatures = function (elem, arr) {
  var features = elem.querySelectorAll('.popup__feature');
  var i = features.length;
  while (i > arr.length) {
    i--;
    features.item([i]).remove();
  }
  return features;
};

var getPopupPhotos = function (elem, arr) {
  var photo = elem.querySelector('img');
  var i = 0;
  photo.src = arr[i];
  while (i < arr.length - 1) {
    i++;
    var photoNext = photo.cloneNode(true);
    photoNext.src = arr[i];
    elem.appendChild(photoNext);
  }
  return elem;
};

var renderCard = function (ad) {
  var cardElement = mapCard.cloneNode(true);
  var title = cardElement.querySelector('.popup__title');
  var address = cardElement.querySelector('.popup__text--address');
  var price = cardElement.querySelector('.popup__text--price');
  var popupType = cardElement.querySelector('.popup__type');
  var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  var popupTextTime = cardElement.querySelector('.popup__text--time');
  var popupFeatures = cardElement.querySelector('.popup__features');
  var popupDescription = cardElement.querySelector('.popup__description');
  var popupPhotos = cardElement.querySelector('.popup__photos');
  var popupAvatar = cardElement.querySelector('.popup__avatar');
  title.textContent = ad.offer.title;
  address.textContent = ad.offer.address;
  price.textContent = ad.offer.price + '₽/ночь';
  popupType.textContent = getPopupType(ad.offer.type);
  popupTextCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  popupTextTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  getPopupFeatures(popupFeatures, ad.offer.features);
  popupDescription.textContent = ad.offer.description;
  getPopupPhotos(popupPhotos, ad.offer.photos);
  popupAvatar.src = ad.author.avatar;
  return cardElement;
};

var toggleMapToActive = function () {
  map.classList.remove('map--faded');
};

var renderMatchingPins = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var pin = renderPin(arr[i]);
    mapPinsFragment.appendChild(pin);
  }
  mapPins.appendChild(mapPinsFragment);
};

var renderMatchingCards = function (arr) {
  var card = renderCard(arr[0]);
  mapCardsFragment.appendChild(card);
  map.insertBefore(mapCardsFragment, filters);
};

var renderMockingData = function () {
  var mockingAdsArr = getMockingAdsArr(ADS_QUANTITY);
  toggleMapToActive();
  renderMatchingPins(mockingAdsArr);
  renderMatchingCards(mockingAdsArr);
};

renderMockingData();
