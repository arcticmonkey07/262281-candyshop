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

  var catalogCards = document.querySelector('.catalog__cards');
  var card = document.querySelector('#card');
  var catalogLoad = document.querySelector('.catalog__load');
  catalogCards.classList.remove('catalog__cards--load');
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

  var candyCards = getCandy(CARD_ALL);

  // создает карточку товара
  function renderCard(candyCard) {
    var cardElement = card.content.cloneNode(true);

    cardElement.querySelector('.card__title').textContent = candyCard.NAME;
    cardElement.querySelector('.card__img').src = candyCard.PICTURE;
    cardElement.querySelector('.star__count').textContent = '(' + candyCard.rating.number + ')';
    cardElement.querySelector('.card__price').firstChild.textContent = candyCard.price + ' ';
    cardElement.querySelector('.card__weight').textContent = '/ ' + candyCard.weight + ' Г';

    if (candyCard.amount >= 1 && candyCard.amount <= 5) {
      cardElement.querySelector('.catalog__card').classList.remove('card--in-stock');
      cardElement.querySelector('.catalog__card').classList.add('card--little');
    } else if (candyCard.amount === 0) {
      cardElement.querySelector('.catalog__card').classList.remove('card--in-stock');
      cardElement.querySelector('.catalog__card').classList.add('card--soon');
    }

    if (candyCard.nutritionFacts.sugar === true) {
      cardElement.querySelector('.card__characteristic').textContent = 'Содержит сахар' + '. ' + candyCard.nutritionFacts.energy + ' ккал';
    } else {
      cardElement.querySelector('.card__characteristic').textContent = 'Без сахара' + '. ' + candyCard.nutritionFacts.energy + ' ккал';
    }

    cardElement.querySelector('.card__composition-list').textContent = candyCard.nutritionFacts.CONTENTS.join(', ');

    var ratings = ['one', 'two', 'three', 'four', 'five'];
    var rating = 'stars__rating--' + ratings[candyCard.rating.value - 1];

    if (candyCard.rating.value) {
      cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
      cardElement.querySelector('.stars__rating').classList.add(rating);
      cardElement.querySelector('.stars__rating').textContent = 'Рейтинг: ' + candyCard.rating.value + ' звёзд';
    }

    return cardElement;
  }

  // добавляет карточку товара в DocumentFragment и добавляет на сайт
  function appendFragment(arrOfCandies, appendTo, renderFunc) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrOfCandies.length; i++) {
      fragment.appendChild(renderFunc(arrOfCandies[i]));
    }

    appendTo.appendChild(fragment);
  }

  appendFragment(candyCards, catalogCards, renderCard);

  // ---------------- корзина ----------------

  var goodCards = document.querySelector('.goods__cards');
  var goodOrder = document.querySelector('#card-order');

  // смотрит на кол-во товара в корзине
  function getCartTotalCount() {
    var goodsInCart = document.querySelectorAll('.goods__cards .card-order__count');
    var total = 0;
    for (var i = 0; i < goodsInCart.length; i++) {
      total += +goodsInCart[i].dataset.amount;
    }
    return total;
  }

  // добавляет сообщение в корзину в header
  var headerBasket = document.querySelector('.main-header__basket');

  var headerBasketMessage = function (basketNum) {

    if (basketNum < 1) {
      headerBasket.innerHTML = 'В корзине ничего нет';
    } else if (basketNum === 1) {
      headerBasket.innerHTML = 'В корзине ' + basketNum + ' товар';
    } else if (basketNum >= 5) {
      headerBasket.innerHTML = 'В корзине ' + basketNum + ' товаров';
    } else {
      headerBasket.innerHTML = 'В корзине ' + basketNum + ' товара';
    }

  };

  // убирает сообщение о пустой корзине
  var emptyBasketMessage = function () {
    var goodsArticle = document.querySelector('.goods_card');
    var goodCardsEmpty = document.querySelector('.goods__card-empty');
    goodCards.classList.toggle('goods__cards--empty', goodsArticle === null);
    goodCardsEmpty.classList.toggle('visually-hidden', goodsArticle !== null);
  };

  // Добавление выбранного товара в избранное
  var addButtons = document.querySelectorAll('.card__btn-favorite');

  for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      evt.target.classList.toggle('card__btn-favorite--selected');
    });

  }

  // добавление id
  var cardsOnCatalog = document.querySelectorAll('.catalog__card');
  var addDataId = function () {
    for (var a = 0; a < cardsOnCatalog.length; a++) {
      cardsOnCatalog[a].setAttribute('data-id', a + 1);
    }
  };
  addDataId();

  // проверяет кол-во в инпуте в корзине
  var handleInput = function (value) {
    var attribute = value.getAttribute('maxlength');

    if (parseInt(value.value, 10) > parseInt(attribute, 10)) {
      value.value = attribute;
      value.setAttribute('data-amount', value.value);
      headerBasketMessage(getCartTotalCount());
    } else if (parseInt(value.value, 10) < 1) {
      var targetCard = goodCards.querySelector('.card-order[data-id="' + value.dataset.id + '"]');
      goodCards.removeChild(targetCard);
      emptyBasketMessage();
    }

  };

  // слушает ручной ввод
  function handleChangeInput(el) {
    el.addEventListener('change', function () {
      handleInput(el);
    });
  }

  // Увеличивает значение
  var increaseValue = function (value) {
    value.value++;
    handleInput(value);
  };

  // увеличивает кол-во товара в корзине
  function handleIncrease(el) {
    el.addEventListener('click', function (evt) {
      evt.preventDefault();
      var value = el.parentNode.querySelector('.card-order__count');
      increaseValue(value);
      value.setAttribute('data-amount', value.value);
      headerBasketMessage(getCartTotalCount());
    });
  }

  // уменьшает кол-во товара в корзине
  function handleDecrease(el) {
    el.addEventListener('click', function (evt) {
      evt.preventDefault();
      var value = el.parentNode.querySelector('.card-order__count');
      value.value--;
      handleInput(value);
      value.setAttribute('data-amount', value.value);
      headerBasketMessage(getCartTotalCount());
    });
  }

  // Создает карточку товара в корзине
  function addBasketHandler(e) {
    return function (evt) {
      addCardToBasket(cardsOnCatalog[e], e);
      evt.preventDefault();
      emptyBasketMessage();
      addDisabledForInput();
      headerBasketMessage(getCartTotalCount());
    };
  }

  var addCards = document.querySelectorAll('.card__btn');

  // Добавляет товары в корзину при клике на кнопку добавить
  function addBasketBtnHandler() {

    for (var j = 0; j < addCards.length; j++) {
      addCards[j].addEventListener('click', addBasketHandler(j));
    }

  }
  addBasketBtnHandler();

  // добавление выбранного товара в корзину и проверка на наличие в корзине
  function addCardToBasket(target, y) {
    var dataAttribute = goodCards.querySelector('[data-id="' + target.dataset.id + '"]');

    if (dataAttribute === null) {
      var goodCard = candyCards[y];
      var cardElement = goodOrder.content.cloneNode(true);

      cardElement.querySelector('.card-order__title').textContent = goodCard.NAME;
      cardElement.querySelector('.card-order__img').src = goodCard.PICTURE;
      cardElement.querySelector('.card-order__price').textContent = goodCard.price + ' ₽';

      cardElement.querySelector('.goods_card').setAttribute('data-id', y + 1);
      var value = cardElement.querySelector('.card-order__count');
      value.setAttribute('data-id', y + 1);
      var input = cardElement.querySelector('.card-order__count');
      input.setAttribute('maxlength', goodCard.amount);
      var incBtn = cardElement.querySelector('.card-order__btn--increase');
      var decBtn = cardElement.querySelector('.card-order__btn--decrease');
      handleIncrease(incBtn);
      handleDecrease(decBtn);
      handleChangeInput(input);
      value.setAttribute('data-amount', value.value);
      goodCards.appendChild(cardElement);
    } else {
      value = dataAttribute.querySelector('.card-order__count');
      increaseValue(value);
      value.setAttribute('data-amount', value.value);
    }

  }

  // удаление товара из корзины
  goodCards.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target.closest('.card-order__close');

    if (target === null) {
      return;
    }

    var targetCard = evt.target.closest('.card-order');
    var value = targetCard.querySelector('.card-order__count');
    goodCards.removeChild(targetCard);
    emptyBasketMessage();
    addDisabledForInput();
    headerBasketMessage(getCartTotalCount());
  });

  // Добавляет и убирает атрибут disabled на инпуты
  var order = document.querySelector('.order');
  var inputs = order.querySelectorAll('input');

  var addDisabledForInput = function () {
    var article = document.querySelector('.goods_card');

    for (var e = 0; e < inputs.length; e++) {
      inputs[e].disabled = (article === null);
    }

  };
  addDisabledForInput();

  // ---------------- ползунок ----------------

  var sliderElem = document.querySelector('.range__filter');
  var thumbMin = document.querySelector('.range__btn--left');
  var thumbMax = document.querySelector('.range__btn--right');
  var priceMax = document.querySelector('.range__price--max');
  var priceMin = document.querySelector('.range__price--min');
  var fillLine = document.querySelector('.range__fill-line');
  var sliderCoords = getCoords(sliderElem);
  var rangeEnd = sliderElem.offsetWidth - thumbMin.offsetWidth;

  var min = parseInt(0, 10);
  var max = parseInt(100, 10);

  thumbMin.onmousedown = function (e) {
    var thumbCoords = getCoords(thumbMin);
    var shiftX = e.pageX - thumbCoords.left;

    document.onmousemove = function (ev) {
      var newLeft = ev.pageX - shiftX - sliderCoords.left;
      if (newLeft < 0) {
        newLeft = 0;
      }

      if (newLeft > max - thumbMin.offsetWidth / 2) {
        newLeft = max - thumbMin.offsetWidth / 2;
      }

      min = newLeft;
      thumbMin.style.left = newLeft + 'px';
      priceMin.textContent = Math.round(newLeft);
      fillLine.style.left = Math.round(newLeft) + 'px';
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
    return false;
  };

  thumbMax.onmousedown = function (e) {
    var thumbCoords = getCoords(thumbMax);
    var shiftX = e.pageX - thumbCoords.left;

    document.onmousemove = function (evt) {
      var newLeft = evt.pageX - shiftX - sliderCoords.left;

      // если вне слайдера
      if (newLeft < min + thumbMin.offsetWidth / 2) {
        newLeft = min + thumbMin.offsetWidth / 2;
      }

      if (newLeft > rangeEnd) {
        newLeft = rangeEnd;
      }
      max = newLeft;

      thumbMax.style.left = newLeft + 'px';
      priceMax.textContent = Math.round(newLeft);
      fillLine.style.right = 235 - Math.round(newLeft) + 'px';
    };
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
    return false;
  };

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  // ---------------- validation ----------------

  var payment = document.querySelector('.payment');
  var wrapCardNumber = payment.querySelector('.payment__input-wrap--card-number');
  var bankCard = payment.querySelector('#payment__card');
  var payCash = payment.querySelector('#payment__cash');
  var cardNumber = payment.querySelector('#payment__card-number');
  var cardDate = payment.querySelector('#payment__card-date');
  var cardCvc = payment.querySelector('#payment__card-cvc');
  var cardHolder = payment.querySelector('#payment__cardholder');
  var paymentCard = payment.querySelector('.payment__card-wrap');
  var paymentCash = payment.querySelector('.payment__cash-wrap');

  // Переключение вкладок в форме оплаты
  var paymentSwitch = function () {
    paymentCash.classList.toggle('visually-hidden', bankCard.checked === true);
    paymentCard.classList.toggle('visually-hidden', payCash.checked === true);
  };

  bankCard.addEventListener('click', function () {
    paymentSwitch();
    cardNumber.disabled = false;
    cardDate.disabled = false;
    cardCvc.disabled = false;
    cardHolder.disabled = false;
  });

  payCash.addEventListener('click', function () {
    paymentSwitch();
    cardNumber.disabled = true;
    cardDate.disabled = true;
    cardCvc.disabled = true;
    cardHolder.disabled = true;
    cardNumber.required = false;
    cardDate.required = false;
    cardCvc.required = false;
    cardHolder.required = false;
  });

  // проверка номера карты по алгоритму Луна
  cardNumber.onblur = function () {
    var num = cardNumber.value;

    function moon(cardNumber) {

      var arr = [];
      cardNumber = cardNumber.toString();

      for (var e = 0; e < cardNumber.length; e++) {
        if (e % 2 === 0) {
          var m = parseInt(cardNumber[e], 16) * 2;
          if (m > 9) {
            arr.push(m - 9);
          } else {
            arr.push(m);
          }
        } else {
          var n = parseInt(cardNumber[e], 16);
          arr.push(n);
        }
      }

      var summ = arr.reduce(function (a, b) {
        return a + b;
      });
      return Boolean(!(summ % 10));
    }

    if (!isNaN(num) && moon(num)) {
      wrapCardNumber.classList.remove('text-input--error');
      wrapCardNumber.classList.add('text-input--correct');
    } else {
      wrapCardNumber.classList.remove('text-input--correct');
      wrapCardNumber.classList.add('text-input--error');
    }

  };

  // Переключение вкладок в блоке доставки
  var deliver = document.querySelector('.deliver');
  var storeButton = deliver.querySelector('#deliver__store');
  var courierButton = deliver.querySelector('#deliver__courier');
  var store = deliver.querySelector('.deliver__store');
  var courier = deliver.querySelector('.deliver__courier');
  var deliverStreet = deliver.querySelector('#deliver__street');
  var deliverHouse = deliver.querySelector('#deliver__house');
  var deliverFloor = deliver.querySelector('#deliver__floor');
  var deliverRoom = deliver.querySelector('#deliver__room');
  var deliverDescription = deliver.querySelector('.deliver__textarea');

  var deliverySwitch = function () {
    courier.classList.toggle('visually-hidden', storeButton.checked === true);
    store.classList.toggle('visually-hidden', courierButton.checked === true);
  };

  storeButton.addEventListener('click', function () {
    deliverySwitch();
  });

  courierButton.addEventListener('click', function () {
    deliverySwitch();
  });

  var deliverStore = deliver.querySelector('.deliver__store-map-wrap');
  var deliverList = deliver.querySelector('.deliver__store-list');

  // переключение адресов самовывоза
  deliverList.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.closest('#store-academicheskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/academicheskaya.jpg';
    } else if (target.closest('#store-vasileostrovskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/vasileostrovskaya.jpg';
    } else if (target.closest('#store-rechka')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/rechka.jpg';
    } else if (target.closest('#store-petrogradskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/petrogradskaya.jpg';
    } else if (target.closest('#store-proletarskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/proletarskaya.jpg';
    } else if (target.closest('#store-vostaniya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/vostaniya.jpg';
    } else if (target.closest('#store-prosvesheniya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/prosvesheniya.jpg';
    } else if (target.closest('#store-frunzenskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/frunzenskaya.jpg';
    } else if (target.closest('#store-chernishevskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/chernishevskaya.jpg';
    } else if (target.closest('#store-tehinstitute')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/tehinstitute.jpg';
    }

  });

})();
