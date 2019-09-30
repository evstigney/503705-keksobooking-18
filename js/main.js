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

var ENTER_KEYCODE = 13;

var MAP_FEATURES_CLASSES = {
  'wifi': 'popup__feature--wifi',
  'dishwasher': 'popup__feature--dishwasher',
  'parking': 'popup__feature--parking',
  'washer': 'popup__feature--washer',
  'elevator': 'popup__feature--elevator',
  'conditioner': 'popup__feature--conditioner'
};
var MAP_TYPES = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var MAP_CAPACITY = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0']
};

var map = document.querySelector('.map');
var filters = document.querySelector('.map__filters-container');
var mapPins = map.querySelector('.map__pins');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinMain = map.querySelector('.map__pin--main');
var mapPinMainButton = map.querySelector('button.map__pin--main');
var mapCard = document.querySelector('#card').content.querySelector('.map__card');
var mapPinsFragment = document.createDocumentFragment();
var mapCardsFragment = document.createDocumentFragment();
var adForm = document.querySelector('.ad-form');
var adAddressField = adForm.querySelector('#address');
var adRoomNumber = adForm.querySelector('#room_number');
var adCapacity = adForm.querySelector('#capacity');
var noticeTitle = adForm.querySelector('.notice__title');

var MAIN_PIN_X = mapPinMain.getBoundingClientRect().x;
var MAIN_PIN_Y = mapPinMain.getBoundingClientRect().y;
var MAIN_PIN_WIDTH = mapPinMain.getBoundingClientRect().width;
var MAIN_PIN_HEIGHT = mapPinMain.getBoundingClientRect().height;
var MAIN_PIN_BUTTON_HEIGHT = mapPinMainButton.getBoundingClientRect().height;

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
  var flag = true;
  for (var i = 0; i <= maxIndex; i++) {
    var currentIndex = getRandomNumber(0, arr.length - 1);
    if (i > 0) {
      for (var j = 0; j < randomArr.length; j++) {
        flag = true;
        var currentValue = arr[currentIndex];
        var randomValue = randomArr[j];
        if (currentValue === randomValue) {
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      randomArr.push(arr[currentIndex]);
    }
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
  pinElement.style = 'left: ' + (ad.location.x - pinElement.querySelector('img').style.width / 2) + 'px; top: ' + (ad.location.y - pinElement.querySelector('img').style.height) + 'px;';
  pinElementImg.src = ad.author.avatar;
  pinElementImg.alt = ad.offer.title;
  return pinElement;
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
          features[i].classList.add(MAP_FEATURES_CLASSES[arr[i]]);
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

var renderCard = function (ad) {
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
  price.textContent = ad.offer.price + '₽/ночь';
  popupType.textContent = MAP_TYPES[ad.offer.type];
  popupTextCapacity.textContent = getCapacityMessage(ad.offer.rooms, ad.offer.guests);
  popupTextTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  popupFeatures = getPopupFeatures(copyPopupFeatures, ad.offer.features);
  popupDescription.textContent = ad.offer.description;
  popupPhotos = getPopupPhotos(copyPopupPhotos, ad.offer.photos);
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
  renderMatchingPins(mockingAdsArr);
  renderMatchingCards(mockingAdsArr);
};

var addDisabled = function (htmlCollection) {
  for (var i = 0; i < htmlCollection.length; i++) {
    htmlCollection[i].setAttribute('disabled', 'disabled');
  }
};

var removeDisabled = function (htmlCollection) {
  for (var i = 0; i < htmlCollection.length; i++) {
    htmlCollection[i].removeAttribute('disabled');
  }
};

var toggleMapToDisabled = function () {
  addDisabled(adForm.children);
  noticeTitle.classList.add('ad-form--disabled');
};

var renderStartAddress = function () {
  var address = Math.round((MAIN_PIN_X + MAIN_PIN_WIDTH / 2 + pageXOffset)) + ', ' + Math.round(MAIN_PIN_Y + MAIN_PIN_HEIGHT / 2 + pageYOffset);
  adAddressField.setAttribute('placeholder', address);
};

var validateCapacity = function () {
  var capacityOptions = adCapacity.options;
  var selectedRooms = adRoomNumber.value;
  var selectedRoomsArr = MAP_CAPACITY[selectedRooms];
  for (var i = 0; i < capacityOptions.length; i++) {
    var currentOption = capacityOptions[i];
    var flag;
    for (var j = 0; j < selectedRoomsArr.length; j++) {
      if (currentOption.value === selectedRoomsArr[0]) {
        adCapacity.value = currentOption.value;
      }
      if (currentOption.value === selectedRoomsArr[j]) {
        flag = true;
        break;
      } else {
        flag = false;
      }
    }
    if (flag) {
      currentOption.removeAttribute('disabled');
    } else {
      currentOption.setAttribute('disabled', 'disabled');
    }
  }
};

toggleMapToDisabled();
renderStartAddress();

mapPinMain.addEventListener('mousedown', function () {
  toggleMapToActive();
  adForm.classList.remove('ad-form--disabled');
  removeDisabled(adForm.children);
  var address = Math.round(MAIN_PIN_X + MAIN_PIN_WIDTH / 2 + pageXOffset) + ', ' + Math.round(MAIN_PIN_Y + MAIN_PIN_HEIGHT + MAIN_PIN_BUTTON_HEIGHT + pageYOffset);
  adAddressField.setAttribute('placeholder', address);
  validateCapacity();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    toggleMapToActive();
    adForm.classList.remove('ad-form--disabled');
    removeDisabled(adForm.children);
    var address = Math.round(MAIN_PIN_X + MAIN_PIN_WIDTH / 2 + pageXOffset) + ', ' + Math.round(MAIN_PIN_Y + MAIN_PIN_HEIGHT + MAIN_PIN_BUTTON_HEIGHT + pageYOffset);
    adAddressField.setAttribute('placeholder', address);
    validateCapacity();
  }
});

adRoomNumber.addEventListener('change', function () {
  validateCapacity();
});
