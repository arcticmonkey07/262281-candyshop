'use strict';

(function () {
  var card = document.querySelector('#card');
  window.catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = document.querySelector('.catalog__load');
  window.catalogCards.classList.remove('catalog__cards--load');

  // создает карточку товара
  function renderCard(candyCard) {
    var cardElement = card.content.cloneNode(true);

    cardElement.querySelector('.card__title').textContent = candyCard.name;
    cardElement.querySelector('.card__img').src = 'img/cards/' + candyCard.picture;
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

    cardElement.querySelector('.card__composition-list').textContent = candyCard.nutritionFacts.contents;

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
    catalogLoad.classList.add('visually-hidden');
  }

  window.goods = [];

  // загружает массив объектов с сервера
  var successHandler = function (objects) {
    window.goods = objects;
    appendFragment(window.goods, window.catalogCards, renderCard);
    window.init();
  };

  // выдаёт ошибку если массив не загрузился
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

})();
