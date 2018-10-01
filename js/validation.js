'use strict';

(function () {
  var payment = document.querySelector('.payment');
  var deliverDescription = document.querySelector('.deliver__textarea');
  var courier = document.querySelector('.deliver__courier');

  window.addDisabledForInput = function () {
    var article = document.querySelector('.goods_card');

    var contact = document.querySelector('.contact-data');
    var contactInputs = contact.querySelectorAll('.text-input__input');

    for (var e = 0; e < contactInputs.length; e++) {
      contactInputs[e].disabled = (article === null);
    }

    var paymentInputs = payment.querySelectorAll('.text-input__input');

    for (var u = 0; u < paymentInputs.length; u++) {
      paymentInputs[u].disabled = (article === null);
    }

    var courierInputs = courier.querySelectorAll('.text-input__input');

    for (var o = 0; o < courierInputs.length; o++) {
      courierInputs[o].disabled = true;
      deliverDescription.disabled = true;
    }

    var buyButton = document.querySelector('.buy__submit-btn');
    buyButton.disabled = (article === null);

  };
  window.addDisabledForInput();

  var email = document.querySelector('#contact-data__email');

  // валидация имени тел и почты
  email.addEventListener('blur', function (evt) {
    var target = evt.target;
    if (!email.checkValidity()) {
      target.closest('.text-input').classList.add('text-input--error');
    } else {
      target.closest('.text-input').classList.remove('text-input--error');
    }
  });

  var wrapCardNumber = payment.querySelector('.payment__input-wrap--card-number');
  var bankCard = payment.querySelector('#payment__card');
  var payCash = payment.querySelector('#payment__cash');
  var cardNumber = payment.querySelector('#payment__card-number');
  var cardDate = payment.querySelector('#payment__card-date');
  var cardCvc = payment.querySelector('#payment__card-cvc');
  var cardHolder = payment.querySelector('#payment__cardholder');

  var paymentMessage = payment.querySelector('.payment__card-status');
  var paymentStatus = payment.querySelector('.payment__card-status-message');

  bankCard.addEventListener('click', function () {
    window.paymentSwitch();
    cardNumber.disabled = false;
    cardDate.disabled = false;
    cardCvc.disabled = false;
    cardHolder.disabled = false;
  });

  payCash.addEventListener('click', function () {
    window.paymentSwitch();
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

    function moon(number) {

      var arr = [];
      number = number.toString();

      for (var e = 0; e < number.length; e++) {
        if (e % 2 === 0) {
          var m = parseInt(number[e], 16) * 2;
          if (m > 9) {
            arr.push(m - 9);
          } else {
            arr.push(m);
          }
        } else {
          var n = parseInt(number[e], 16);
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

  cardDate.addEventListener('blur', function (evt) {
    var target = evt.target;
    if (!cardDate.checkValidity()) {
      target.closest('.text-input').classList.add('text-input--error');
    } else {
      target.closest('.text-input').classList.remove('text-input--error');
    }
  });

  cardCvc.addEventListener('blur', function (evt) {
    var target = evt.target;
    if (!cardCvc.checkValidity()) {
      target.closest('.text-input').classList.add('text-input--error');
    } else {
      target.closest('.text-input').classList.remove('text-input--error');
    }
  });

  cardHolder.addEventListener('blur', function (evt) {
    var target = evt.target;
    if (!cardHolder.checkValidity()) {
      target.closest('.text-input').classList.add('text-input--error');
    } else {
      target.closest('.text-input').classList.remove('text-input--error');
    }
  });

  // проверяет валидацию всех форм в блоке банковской карты
  var setCardValidity = function () {
    if (cardNumber.checkValidity() && cardDate.checkValidity() && cardCvc.checkValidity() && cardHolder.checkValidity()) {
      paymentMessage.textContent = 'ОДОБРЕН';
      paymentStatus.classList.remove('payment__card-status--not-active');
      paymentStatus.classList.add('payment__card-status--active');
    } else {
      paymentMessage.textContent = 'НЕ ОПРЕДЕЛЁН';
      paymentStatus.classList.remove('payment__card-status--active');
      paymentStatus.classList.add('payment__card-status--not-active');
    }
  };

  // следит за изменениями в инпутах
  cardNumber.addEventListener('change', setCardValidity);
  cardDate.addEventListener('change', setCardValidity);
  cardCvc.addEventListener('change', setCardValidity);
  cardHolder.addEventListener('change', setCardValidity);

  // Переключение вкладок в блоке доставки
  var deliver = document.querySelector('.deliver');
  var storeButton = deliver.querySelector('#deliver__store');
  var courierButton = deliver.querySelector('#deliver__courier');
  var store = deliver.querySelector('.deliver__store');
  var deliverStreet = deliver.querySelector('#deliver__street');
  var deliverHouse = deliver.querySelector('#deliver__house');
  var deliverFloor = deliver.querySelector('#deliver__floor');
  var deliverRoom = deliver.querySelector('#deliver__room');

  storeButton.addEventListener('click', function () {
    window.deliverySwitch();
    deliverStreet.disabled = true;
    deliverHouse.disabled = true;
    deliverFloor.disabled = true;
    deliverRoom.disabled = true;
    deliverDescription.disabled = true;
    deliverStreet.required = false;
    deliverHouse.required = false;
    deliverRoom.required = false;
    window.enableStoreInputs();
  });

  // блокирует инпуты в блоке выбора метро самовывоза
  var disableStoreInputs = function () {
    var storeInputs = store.querySelectorAll('.input-btn__input');

    for (var e = 0; e < storeInputs.length; e++) {
      storeInputs[e].disabled = true;
    }
  };
  disableStoreInputs();

  window.enableStoreInputs = function () {
    var storeInputs = store.querySelectorAll('.input-btn__input');

    for (var e = 0; e < storeInputs.length; e++) {
      storeInputs[e].disabled = false;
    }
  };

  courierButton.addEventListener('click', function () {
    window.deliverySwitch();
    deliverStreet.disabled = false;
    deliverHouse.disabled = false;
    deliverFloor.disabled = false;
    deliverRoom.disabled = false;
    deliverDescription.disabled = false;
    deliverStreet.required = true;
    deliverHouse.required = true;
    deliverRoom.required = true;
    disableStoreInputs();
  });

})();
