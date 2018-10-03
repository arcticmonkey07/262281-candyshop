'use strict';

(function () {

  var CARD_ALL = 26;

  var NAME = ['Чесночные сливки',
    'Огуречный педант',
    'Молочная хрюша',
    'Грибной шейк',
    'Баклажановое безумие',
    'Паприколу итальяно',
    'Нинзя-удар васаби',
    'Хитрый баклажан',
    'Горчичный вызов',
    'Кедровая липучка',
    'Корманный портвейн',
    'Чилийский задира',
    'Беконовый взрыв',
    'Арахис vs виноград',
    'Сельдерейная душа',
    'Початок в бутылке',
    'Чернющий мистер чеснок',
    'Раша федераша',
    'Кислая мина',
    'Кукурузное утро',
    'Икорный фуршет',
    'Новогоднее настроение',
    'С пивком потянет',
    'Мисс креветка',
    'Бесконечный взрыв',
    'Невинные винные',
    'Бельгийское пенное',
    'Острый язычок'];

  var PICTURE = ['img/cards/gum-cedar.jpg',
    'img/cards/gum-chile.jpg',
    'img/cards/gum-eggplant.jpg',
    'img/cards/gum-mustard.jpg',
    'img/cards/gum-portwine.jpg',
    'img/cards/gum-wasabi.jpg',
    'img/cards/ice-eggplant.jpg',
    'img/cards/ice-cucumber.jpg',
    'img/cards/ice-garlic.jpg',
    'img/cards/ice-italian.jpg',
    'img/cards/ice-mushroom.jpg',
    'img/cards/ice-pig.jpg',
    'img/cards/marmalade-beer.jpg',
    'img/cards/marmalade-caviar.jpg',
    'img/cards/marmalade-corn.jpg',
    'img/cards/marmalade-new-year.jpg',
    'img/cards/marmalade-sour.jpg',
    'img/cards/marshmallow-bacon.jpg',
    'img/cards/marshmallow-beer.jpg',
    'img/cards/marshmallow-shrimp.jpg',
    'img/cards/marshmallow-spicy.jpg',
    'img/cards/marshmallow-wine.jpg',
    'img/cards/soda-bacon.jpg',
    'img/cards/soda-celery.jpg',
    'img/cards/soda-cob.jpg',
    'img/cards/soda-garlic.jpg',
    'img/cards/soda-peanut-grapes.jpg',
    'img/cards/soda-russian.jpg'];

  var CONTENTS = ['молоко',
    'сливки',
    'вода',
    'пищевой краситель',
    'патока',
    'ароматизатор бекона',
    'ароматизатор свинца',
    'ароматизатор дуба, идентичный натуральному',
    'ароматизатор картофеля',
    'лимонная кислота',
    'загуститель',
    'эмульгатор',
    'консервант: сорбат калия',
    'посолочная смесь: соль, нитрит натрия',
    'ксилит',
    'карбамид',
    'вилларибо',
    'виллабаджо'];

  window.catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = document.querySelector('.catalog__load');
  window.catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');

  // создает массив неповторяющихся картинок
  var pictures = getRandomArray(PICTURE, CARD_ALL);

  // функция создает массив случайных значений из другого массива со случайной длинной
  function getRandomArray(sitems, itemCount) {
    // делаем копию массива элементов состава
    var arrayCopy = sitems.slice(0, sitems.length);
    // случайное количество элементов состава, которое будет у этого товара
    itemCount = itemCount > 0 ? itemCount : 1;
    var newArray = [];

    for (var i = 0; i < itemCount; i++) {
      // берем случайное число
      var randInt = Math.floor(Math.random() * arrayCopy.length);
      // если выпадает такое же число что и было на прошлой итерации, то он его не может добавить в массив newArray т.к. этот элемент уже удален из массива arrayCopy
      newArray.push(arrayCopy[randInt]);
      // удаляем уже выбранный элемент из скопированного массива
      arrayCopy.splice(randInt, 1);
    }

    return newArray;
  }

  // отдает случайное число в массиве
  function getCandyAttribute(array) {
    var randInt = Math.floor(Math.random() * array.length);
    return array[randInt];
  }

  // добавляет в массив charArray все элементы
  function getCandy(cardsAmount) {
    var charArray = [];

    for (var i = 0; i < cardsAmount; i++) {
      charArray.push({
        NAME: getCandyAttribute(NAME),
        PICTURE: pictures[i],
        amount: Math.round(Math.random() * 20),
        price: Math.round(100 + (Math.random() * 1500)),
        weight: Math.round(30 + (Math.random() * 300)),
        rating: {
          value: Math.round(1 + (Math.random() * 5)),
          number: Math.round(10 + (Math.random() * 900)),
        },
        nutritionFacts: {
          sugar: Boolean(Math.round(Math.random())),
          energy: Math.round(70 + (Math.random() * 500)),
          CONTENTS: getRandomArray(CONTENTS, Math.floor(Math.random() * CONTENTS.length)),
        },
        orderedAmount: 1,
      });
    }

    return charArray;
  }

  window.candyCards = getCandy(CARD_ALL);

})();
