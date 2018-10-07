'use strict';

(function () {

  var goodCards = document.querySelector('.goods__cards');
  var goodOrder = document.querySelector('#card-order');

  // убирает сообщение о пустой корзине
  var emptyBasketMessage = function () {
    var goodsArticle = document.querySelector('.goods_card');
    var goodCardsEmpty = document.querySelector('.goods__card-empty');
    goodCards.classList.toggle('goods__cards--empty', goodsArticle === null);
    goodCardsEmpty.classList.toggle('visually-hidden', goodsArticle !== null);
  };

  window.runAddToBasketCard = function () {
    // Создает карточку товара в корзине
    var cardsOnCatalog = document.querySelectorAll('.catalog__card');

    var addBasketHandler = function (e) {
      return function (evt) {
        addCardToBasket(cardsOnCatalog[e], e);
        evt.preventDefault();
        emptyBasketMessage();
        window.addDisabledForInput();
        window.enableStoreInputs();
        headerBasketMessage(getCartTotalCount());
      };
    };

    var addCards = document.querySelectorAll('.card__btn');

    // Добавляет товары в корзину при клике на кнопку добавить
    var addBasketBtnHandler = function () {

      for (var i = 0; i < addCards.length; i++) {
        addCards[i].addEventListener('click', addBasketHandler(
            addCards[i].closest('.catalog__card').dataset.id
        ));
      }

    };
    addBasketBtnHandler();

    // добавление выбранного товара в корзину и проверка на наличие в корзине
    var addCardToBasket = function (target, i) {
      var dataAttribute = goodCards.querySelector('[data-id="' + i + '"]');

      if (dataAttribute === null) {
        var goodCard = window.catalog.data[i];
        var cardElement = goodOrder.content.cloneNode(true);

        cardElement.querySelector('.card-order__title').textContent = goodCard.name;
        cardElement.querySelector('.card-order__img').src = 'img/cards/' + goodCard.picture;
        cardElement.querySelector('.card-order__price').textContent = goodCard.price + ' ₽';

        cardElement.querySelector('.goods_card').setAttribute('data-id', i);
        var value = cardElement.querySelector('.card-order__count');
        value.setAttribute('data-id', i);
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

    };

    window.filter.getFilterNumber();

  };

  // удаление товара из корзины
  goodCards.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target.closest('.card-order__close');

    if (target === null) {
      return;
    }

    var targetCard = evt.target.closest('.card-order');
    goodCards.removeChild(targetCard);
    emptyBasketMessage();
    window.addDisabledForInput();
    headerBasketMessage(getCartTotalCount());
  });

  // смотрит на кол-во товара в корзине
  var getCartTotalCount = function () {
    var goodsInCart = document.querySelectorAll('.goods__cards .card-order__count');
    var total = 0;
    for (var i = 0; i < goodsInCart.length; i++) {
      total += +goodsInCart[i].dataset.amount;
    }
    return total;
  };

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
  var handleChangeInput = function (el) {
    el.addEventListener('change', function () {
      handleInput(el);
    });
  };

  // Увеличивает значение
  var increaseValue = function (value) {
    value.value++;
    handleInput(value);
  };

  // увеличивает кол-во товара в корзине
  var handleIncrease = function (el) {
    el.addEventListener('click', function (evt) {
      evt.preventDefault();
      var value = el.parentNode.querySelector('.card-order__count');
      increaseValue(value);
      value.setAttribute('data-amount', value.value);
      headerBasketMessage(getCartTotalCount());
    });
  };

  // уменьшает кол-во товара в корзине
  var handleDecrease = function (el) {
    el.addEventListener('click', function (evt) {
      evt.preventDefault();
      var value = el.parentNode.querySelector('.card-order__count');
      value.value--;
      handleInput(value);
      value.setAttribute('data-amount', value.value);
      headerBasketMessage(getCartTotalCount());
    });
  };

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


})();