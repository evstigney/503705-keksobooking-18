'use strict';

var typesArr = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimesArr = ['12:00', '13:00', '14:00'];
var checkoutTimesArr = ['12:00', '13:00', '14:00'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var adsQuantity = 8;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinsFragment = document.createDocumentFragment();
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomNumber = function (minNumber, maxNumber) {
  var min = Math.ceil(minNumber);
  var max = Math.floor(maxNumber);
  return Math.floor(Math.random() * (max - min + 1) + min);
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
  for (var i = 1; i <= maxIndex; i++) {
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
    'address': getAddress(100, 999),
    'price': getRandomNumber(100, 10000),
    'type': getRandomValue(typesArr),
    'rooms': getRandomNumber(1, 10),
    'guests': getRandomNumber(1, 50),
    'checkin': getRandomValue(checkinTimesArr),
    'checkout': getRandomValue(checkoutTimesArr),
    'features': getRandomArr(featuresArr),
    'description': 'Строка с описанием. Строка с описанием. Строка с описанием.',
    'photos': getRandomArr(photosArr)
  };
  return offer;
};

var getLocation = function () {
  var location = {
    'x': getRandomNumber(0, 1200),
    'y': getRandomNumber(130, 630)
  };
  return location;
};

var getMockingAdsArr = function (quantity) {
  var mockingAds = [];
  for (var i = 0; i < quantity; i++) {
    var ad = {
      'author': getAuthorInfo(i),
      'offer': getOfferInfo(),
      'location': getLocation()
    };
    mockingAds.push(ad);
  }
  return mockingAds;
};

var renderPin = function (ad) {
  var pinElement = mapPin.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');
  var location = ad.location;
  var author = ad.author;
  var offer = ad.offer;
  pinElement.style = 'left: ' + location.x + 'px; top: ' + location.y + 'px;';
  pinElementImg.src = author.avatar;
  pinElementImg.alt = offer.title;
  return pinElement;
};

map.classList.remove('map--faded');
var mockingAds = getMockingAdsArr(adsQuantity);
for (var i = 0; i < adsQuantity; i++) {
  var pin = renderPin(mockingAds[i]);
  mapPinsFragment.appendChild(pin);
}
mapPins.appendChild(mapPinsFragment);
