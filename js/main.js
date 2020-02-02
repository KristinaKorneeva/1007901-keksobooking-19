'use strict';

var TITLES_LIST = ['LANDABOUT TOKYO', 'First Cabin Kyobashi', 'Residential stage Higashi Shinjuku 1204', 'Capsule Hotel Transit Shinjuku', 'Shinjuku/ 3 min walk from station/incl mwifi #OH1', 'Shinjuku SaWa Colorful 2 Bedrooms', 'Sotetsu Fresa Inn Tokyo-Akasaka', 'Hotel Resol Ueno'];
var TYPES_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var TIMES_REGISTRATION = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DISCRIPTIONS = [
  'Отель с рестораном, баром, общим лаунджем и бесплатным Wi-Fi расположен в Токио, в 400 м от храма Кеммио-ин и в 600 м от храма Шуншо-ин. К услугам гостей семейные номера и терраса. Из окон открывается вид на город.',
  'Отель расположен всего в 3 минутах ходьбы от железнодорожной станции Кёбаси. В числе удобств круглосуточная стойка регистрации и бесплатная камера хранения багажа. На всей территории предоставляется бесплатный Wi-Fi.',
  'Комплекс расположен в районе Синдзюку в Токио, недалеко от храма Инари-Кио. К услугам гостей бесплатный Wi-Fi и стиральная машина. К услугам гостей собственный балкон.',
  'Капсульный отель расположен в Токио. К услугам гостей номера с кондиционером и бесплатным Wi-Fi. Отель находится примерно в 2,5 км от Токийского столичного правительственного здания и в 2,7 км от национального парка Синдзюку-Гёэн. Храм Мэйдзи Дзингу находится в 3,4 км от капсульного отеля, а дворец Акасака — в 3,9 км.',
  'До района Синдзюку — 3 минуты ходьбы. К услугам гостей станция метро. Комплекс #OH1 расположен в районе Синдзюку в Токио, в 500 м от храма Тайсо-дзи, в 700 м от площади Синдзюку-Истсайд и в 800 м от храма Госпопел-Токио. Комплекс находится менее чем в 1 км от торгового центра Shinjuku Marui Main Building и в 13 минутах ходьбы от музея Самураи.',
  'Капсульный отель расположен в Токио. К услугам гостей номера с кондиционером и бесплатным Wi-Fi. Отель находится примерно в 2,5 км от Токийского столичного правительственного здания и в 2,7 км от национального парка Синдзюку-Гёэн. Храм Мэйдзи Дзингу находится в 3,4 км от капсульного отеля, а дворец Акасака — в 3,9 км.',
  'Апартаменты с 2 спальнями расположены в районе Синдзюку в Токио, в 300 м от парка Тояма-Синдзюку, в 500 м от мемориального парка Коидзуми Якумо и в 500 м от храма Меотоги. Апартаменты находятся менее чем в 1 км от храма Синдзюку Сува и в 13 минутах ходьбы от музея Кореи.',
  'Отель Sotetsu находится всего в 50 метрах от станции метро Akasaka. К услугам гостей кофейня на первом этаже. Номера с бесплатным Wi-Fi оборудованы кондиционером и телевизором с плоским экраном.'
];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var temlatePin = document.querySelector('#pin')
.content
.querySelector('.map__pin');
var pinNode = document.querySelector('.map__pins');

var getRundomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var creatMockPin = function () {
  var location = {
    x: getRundomNumber(0, mapPins.offsetWidth),
    y: getRundomNumber(130, 630)
  };

  var item = {
    author: {
      avatar: 'img/avatars/user0' + getRundomNumber(1, 8) + '.png'
    },
    offer: {
      title: TITLES_LIST[getRundomNumber(0, TITLES_LIST.length - 1)],
      address: location.x + ', ' + location.y,
      price: getRundomNumber(1, 1000000),
      type: TYPES_HOUSING[getRundomNumber(0, TYPES_HOUSING.length - 1)],
      rooms: getRundomNumber(1, 100),
      guests: getRundomNumber(1, 100),
      checkin: TIMES_REGISTRATION[getRundomNumber(0, TIMES_REGISTRATION.length - 1)],
      checkout: TIMES_REGISTRATION[getRundomNumber(0, TIMES_REGISTRATION.length - 1)],
      features: FEATURES.slice(0, getRundomNumber(1, FEATURES.length - 1)),
      description: DISCRIPTIONS[getRundomNumber(0, DISCRIPTIONS.length - 1)],
      photos: PHOTOS.slice(0, getRundomNumber(1, PHOTOS.length - 1))
    },
    location: location
  };

  return item;
};

var createMockPinsList = function (count) {
  var adList = [];
  for (var i = 0; i < count; i++) {
    var listAd = creatMockPin();
    adList.push(listAd);
  }
  return adList;
};

// У блока .map уберает класс .map--faded
map.classList.remove('map--faded');

var renderPin = function (item) {
  var pinElement = temlatePin.cloneNode(true);

  pinElement.style.left = item.location.x - pinElement.offsetWidth / 2 + 'px';
  pinElement.style.top = item.location.y - pinElement.offsetWidth + 'px';

  var imgPin = pinElement.querySelector('img');
  imgPin.src = item.author.avatar;
  imgPin.alt = item.offer.title;

  return pinElement;
};

var renderPins = function () {
  var pinList = createMockPinsList(8);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinList.length; i++) {
    var pins = renderPin(pinList[i]);
    fragment.appendChild(pins);
  }
  pinNode.appendChild(fragment);
};
renderPins();

