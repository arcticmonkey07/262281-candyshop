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

  // добавление id всем карточкам
  var cardsOnCatalog = document.querySelectorAll('.catalog__card');
  var addDataId = function () {
    for (var i = 0; i < cardsOnCatalog.length; i++) {
      cardsOnCatalog[i].setAttribute('data-id', i + 1);
    }
  };
  addDataId();

  // Создает карточку товара в корзине
  function addBasketHandler(e) {
    return function (evt) {
      addCardToBasket(cardsOnCatalog[e], e);
      evt.preventDefault();
      emptyBasketMessage();
      window.addDisabledForInput();
      window.enableStoreInputs();
      headerBasketMessage(getCartTotalCount());
    };
  }

  var addCards = document.querySelectorAll('.card__btn');

  // Добавляет товары в корзину при клике на кнопку добавить
  function addBasketBtnHandler() {

    for (var i = 0; i < addCards.length; i++) {
      addCards[i].addEventListener('click', addBasketHandler(i));
    }

  }
  addBasketBtnHandler();

  // добавление выбранного товара в корзину и проверка на наличие в корзине
  function addCardToBasket(target, y) {
    var dataAttribute = goodCards.querySelector('[data-id="' + target.dataset.id + '"]');

    if (dataAttribute === null) {
      var goodCard = window.candyCards[y];
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
    goodCards.removeChild(targetCard);
    emptyBasketMessage();
    window.addDisabledForInput();
    headerBasketMessage(getCartTotalCount());
  });

  // смотрит на кол-во товара в корзине
  function getCartTotalCount() {
    var goodsInCart = document.querySelectorAll('.goods__cards .card-order__count');
    var total = 0;
    for (var i = 0; i < goodsInCart.length; i++) {
      total += +goodsInCart[i].dataset.amount;
    }
    return total;
  }

  // Добавление выбранного товара в избранное
  var addButtons = document.querySelectorAll('.card__btn-favorite');

  for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      evt.target.classList.toggle('card__btn-favorite--selected');
    });

  }

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
