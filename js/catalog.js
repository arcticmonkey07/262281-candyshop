'use strict';

(function () {

  var card = document.querySelector('#card');
  var catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = document.querySelector('.catalog__load');
  catalogCards.classList.remove('catalog__cards--load');

  // создает карточку товара
  var renderCard = function (candyCard) {
    var cardElement = card.content.cloneNode(true);
    cardElement.querySelector('.catalog__card').dataset.id = candyCard.id;
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

    if (card.favorite) {
      cardElement.querySelector('.card__btn-favorite').classList.add('card__btn-favorite--selected');
    }

    return cardElement;
  };

  // добавляет карточку товара в DocumentFragment и добавляет на сайт
  var appendFragment = function (cards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < cards.length; i++) {
      fragment.appendChild(renderCard(cards[i]));
    }

    // удаляем старые карты, если они есть
    var oldCards = catalogCards.querySelectorAll('article');
    Array.from(oldCards).forEach(function (it) {
      it.remove();
    });

    catalogCards.appendChild(fragment);
    catalogCards.classList.remove('catalog__cards--load');
    catalogLoad.classList.add('visually-hidden');
    window.runAddToBasketCard();
  };

  // загружает массив объектов с сервера
  var successHandler = function (objects) {
    objects.forEach(function (it, index) {
      it.id = index;
      it.favorite = false;
    });
    window.catalog.data = objects;
    appendFragment(window.catalog.data);
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

  // Добавляет и убирает товары в избранное
  catalogCards.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target.closest('.card__btn-favorite');
    if (!target) {
      return;
    }
    var cardElement = evt.target.closest('.catalog__card');
    var id = cardElement.dataset.id;
    var favCard = window.catalog.data[id];
    favCard.favorite = !favCard.favorite;

    target.classList.toggle('card__btn-favorite--selected', favCard.favorite);
  });

  // Показывает и скрывает состав
  catalogCards.addEventListener('click', function (evt) {
    evt.preventDefault();
    var cardMain = evt.target.closest('.card__main');
    var target = evt.target.closest('.card__btn-composition');
    var composition = cardMain.querySelector('.card__composition');
    if (!target) {
      return;
    }
    composition.classList.toggle('card__composition--hidden');
  });

  window.catalog = {
    appendFragment: appendFragment,
    data: []
  };

})();
