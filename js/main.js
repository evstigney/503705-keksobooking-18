'use strict';

var TYPES_ARR = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIMES_ARR = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES_ARR = ['12:00', '13:00', '14:00'];
var FEATURES_ARR = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARR = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADS_QUANTITY = 8;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var ADDRESS_MIN = 100;
var ADDRESS_MAX = 999;
var PRICE_MIN = 100;
var PRICE_MAX = 10000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 10;
var GUESTS_MIN = 1;
var GUESTS_MAX = 50;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinsFragment = document.createDocumentFragment();
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

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

var getAuthorInfo = function (index) {
  var author = {
    'avatar': getAuthorAvatar(index)
  };
  return author;
};

var getAddress = function (minNumber, maxNumber) {
  var locationX = getRandomNumber(minNumber, maxNumber);
  var locationY = getRandomNumber(minNumber, maxNumber);
  return locationX + ', ' + locationY;
};

var getOfferInfo = function () {
  var offer = {
    'title': 'Заголовок предложения',
    'address': getAddress(ADDRESS_MIN, ADDRESS_MAX),
    'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
    'type': getRandomValue(TYPES_ARR),
    'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
    'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
    'checkin': getRandomValue(CHECKIN_TIMES_ARR),
    'checkout': getRandomValue(CHECKOUT_TIMES_ARR),
    'features': getRandomArr(FEATURES_ARR),
    'description': 'Строка с описанием. Строка с описанием. Строка с описанием.',
    'photos': getRandomArr(PHOTOS_ARR)
  };
  return offer;
};

var getLocation = function (parentElement, childElement, yMin, yMax) {
  var parentPositionInfo = parentElement.getBoundingClientRect();
  var childPositionInfo = childElement.getBoundingClientRect();
  var positionX = getRandomNumber(0, parentPositionInfo.width) - childPositionInfo.width / 2;
  var positionY = getRandomNumber(yMin, yMax) - childPositionInfo.height;
  var location = {
    'x': positionX,
    'y': positionY
  };
  return location;
};

var getMockingAdsArr = function (quantity) {
  var mockingAds = [];
  for (var i = 0; i < quantity; i++) {
    var ad = {
      'author': getAuthorInfo(i),
      'offer': getOfferInfo(),
      'location': getLocation(map, mapPin, LOCATION_Y_MIN, LOCATION_Y_MAX)
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

var toggleMapToActive = function () {
  map.classList.remove('map--faded');
};

var renderMatchingPins = function () {
  var mockingAds = getMockingAdsArr(ADS_QUANTITY);
  for (var i = 0; i < ADS_QUANTITY; i++) {
    var pin = renderPin(mockingAds[i]);
    mapPinsFragment.appendChild(pin);
  }
  mapPins.appendChild(mapPinsFragment);
};

toggleMapToActive();
renderMatchingPins();
