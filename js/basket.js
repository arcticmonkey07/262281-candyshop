'use strict';

(function () {

  var goodCards = document.querySelector('.goods__cards');
  var goodOrder = document.querySelector('#card-order');

  // убирает сообщение о пустой корзине
  var showEmptyBasketMessage = function () {
    var goodsArticle = document.querySelector('.goods_card');
    document.querySelector('.goods__cards').classList.toggle('goods__cards--empty', goodsArticle === null);
    document.querySelector('.goods__card-empty').classList.toggle('visually-hidden', goodsArticle !== null);
  };

  window.addToBasketWithRerender = function () {
    // Создает карточку товара в корзине
    var cardsOnCatalog = document.querySelectorAll('.catalog__card');

    var addBasketHandler = function (e) {
      return function (evt) {
        addCardToBasket(cardsOnCatalog[e], e);
        evt.preventDefault();
        showEmptyBasketMessage();
        window.addDisabledForInput();
        window.enableStoreInputs();
        window.enablePaymentAndDeliverToggles();
        showHeaderBasketMessage(getCartTotalCount());
      };
    };

    var addButtons = document.querySelectorAll('.card__btn');

    // Добавляет товары в корзину при клике на кнопку добавить
    var addBasketButtonHandler = function () {

      for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener('click', addBasketHandler(
            addButtons[i].closest('.catalog__card').dataset.id
        ));
      }

    };
    addBasketButtonHandler();

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
        var increaseButton = cardElement.querySelector('.card-order__btn--increase');
        var decreaseButton = cardElement.querySelector('.card-order__btn--decrease');
        increaseHandler(increaseButton);
        decreaseHandler(decreaseButton);
        changeInputHandler(input);
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
    showEmptyBasketMessage();
    window.addDisabledForInput();
    window.disablePaymentAndDeliverToggles();
    showHeaderBasketMessage(getCartTotalCount());
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
  var inputHandler = function (value) {
    var attribute = value.getAttribute('maxlength');

    if (parseInt(value.value, 10) > parseInt(attribute, 10)) {
      value.value = attribute;
      value.setAttribute('data-amount', value.value);
      showHeaderBasketMessage(getCartTotalCount());
    } else if (parseInt(value.value, 10) < 1) {
      var targetCard = goodCards.querySelector('.card-order[data-id="' + value.dataset.id + '"]');
      goodCards.removeChild(targetCard);
      showEmptyBasketMessage();
    }

  };

  // слушает ручной ввод
  var changeInputHandler = function (element) {
    element.addEventListener('change', function () {
      inputHandler(element);
    });
  };

  // Увеличивает значение
  var increaseValue = function (value) {
    value.value++;
    inputHandler(value);
  };

  // увеличивает кол-во товара в корзине
  var increaseHandler = function (element) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      var value = element.parentNode.querySelector('.card-order__count');
      increaseValue(value);
      value.setAttribute('data-amount', value.value);
      showHeaderBasketMessage(getCartTotalCount());
    });
  };

  // уменьшает кол-во товара в корзине
  var decreaseHandler = function (element) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      var value = element.parentNode.querySelector('.card-order__count');
      value.value--;
      inputHandler(value);
      value.setAttribute('data-amount', value.value);
      showHeaderBasketMessage(getCartTotalCount());
    });
  };

  // добавляет сообщение в корзину в header
  var headerBasket = document.querySelector('.main-header__basket');

  var showHeaderBasketMessage = function (basketNumber) {

    if (basketNumber < 1) {
      headerBasket.innerHTML = 'В корзине ничего нет';
    } else if (basketNumber === 1) {
      headerBasket.innerHTML = 'В корзине ' + basketNumber + ' товар';
    } else if (basketNumber >= 5) {
      headerBasket.innerHTML = 'В корзине ' + basketNumber + ' товаров';
    } else {
      headerBasket.innerHTML = 'В корзине ' + basketNumber + ' товара';
    }

  };


})();
