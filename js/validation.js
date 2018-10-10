'use strict';

(function () {

  var payment = document.querySelector('.payment');
  var deliverDescription = document.querySelector('.deliver__textarea');
  var courier = document.querySelector('.deliver__courier');

  var addDisabledForInput = function () {
    var article = document.querySelector('.goods_card');

    var contact = document.querySelector('.contact-data');
    var contactInputs = contact.querySelectorAll('.text-input__input');

    for (var i = 0; i < contactInputs.length; i++) {
      contactInputs[i].disabled = (article === null);
    }

    var paymentInputs = payment.querySelectorAll('.text-input__input');

    for (var j = 0; j < paymentInputs.length; j++) {
      paymentInputs[j].disabled = (article === null);
    }

    var courierInputs = courier.querySelectorAll('.text-input__input');

    for (var k = 0; k < courierInputs.length; k++) {
      courierInputs[k].disabled = true;
      deliverDescription.disabled = true;
    }

    var buyButton = document.querySelector('.buy__submit-btn');
    buyButton.disabled = (article === null);

  };
  addDisabledForInput();

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
    window.orderSwitches.paymentSwitch();
    cardNumber.disabled = false;
    cardDate.disabled = false;
    cardCvc.disabled = false;
    cardHolder.disabled = false;
  });

  payCash.addEventListener('click', function () {
    window.orderSwitches.paymentSwitch();
    cardNumber.disabled = true;
    cardDate.disabled = true;
    cardCvc.disabled = true;
    cardHolder.disabled = true;
  });

  // проверка номера карты по алгоритму Луна
  var getLuhnNumber = function (number) {

    var array = [];
    number = number.toString();

    for (var i = 0; i < number.length; i++) {
      if (i % 2 === 0) {
        var digit = parseInt(number[i], 16) * 2;
        if (digit > 9) {
          array.push(digit - 9);
        } else {
          array.push(digit);
        }
      } else {
        var numeric = parseInt(number[i], 16);
        array.push(numeric);
      }
    }

    var sum = array.reduce(function (a, b) {
      return a + b;
    });
    return Boolean(!(sum % 10));
  };

  cardNumber.addEventListener('change', function () {
    if (!isNaN(cardNumber.value) && getLuhnNumber(cardNumber.value)) {
      wrapCardNumber.classList.remove('text-input--error');
      wrapCardNumber.classList.add('text-input--correct');
    } else {
      wrapCardNumber.classList.remove('text-input--correct');
      wrapCardNumber.classList.add('text-input--error');
    }
  });

  var cardInputsValidity = function (input) {
    input.addEventListener('change', function (evt) {
      var target = evt.target;
      if (!input.checkValidity()) {
        target.closest('.text-input').classList.remove('text-input--correct');
        target.closest('.text-input').classList.add('text-input--error');
      } else {
        target.closest('.text-input').classList.remove('text-input--error');
        target.closest('.text-input').classList.add('text-input--correct');
      }
    });
  };

  cardInputsValidity(cardDate);
  cardInputsValidity(cardCvc);
  cardInputsValidity(cardHolder);

  // проверяет валидацию всех форм в блоке банковской карты
  var setCardValidity = function () {
    if (getLuhnNumber(cardNumber.value) && cardDate.checkValidity() && cardCvc.checkValidity() && cardHolder.checkValidity()) {
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
    window.orderSwitches.deliverySwitch();
    deliverStreet.disabled = true;
    deliverHouse.disabled = true;
    deliverFloor.disabled = true;
    deliverRoom.disabled = true;
    deliverDescription.disabled = true;
    window.validation.enableStoreInputs();
  });

  // блокирует инпуты в блоке выбора метро самовывоза
  var disableStoreInputs = function () {
    var storeInputs = store.querySelectorAll('.input-btn__input');

    for (var i = 0; i < storeInputs.length; i++) {
      storeInputs[i].disabled = true;
    }

  };
  disableStoreInputs();

  var enableStoreInputs = function () {
    var storeInputs = store.querySelectorAll('.input-btn__input');

    for (var i = 0; i < storeInputs.length; i++) {
      storeInputs[i].disabled = false;
    }

  };

  var disablePaymentAndDeliverToggles = function () {

    var deliverToggles = document.querySelectorAll('.toggle-btn__input');

    for (var i = 0; i < deliverToggles.length; i++) {
      deliverToggles[i].disabled = true;
    }

  };
  disablePaymentAndDeliverToggles();

  var enablePaymentAndDeliverToggles = function () {

    var deliverToggles = document.querySelectorAll('.toggle-btn__input');

    for (var i = 0; i < deliverToggles.length; i++) {
      deliverToggles[i].disabled = false;
    }

  };

  courierButton.addEventListener('click', function () {
    window.orderSwitches.deliverySwitch();
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

  window.validation = {
    addDisabledForInput: addDisabledForInput,
    enableStoreInputs: enableStoreInputs,
    disablePaymentAndDeliverToggles: disablePaymentAndDeliverToggles,
    enablePaymentAndDeliverToggles: enablePaymentAndDeliverToggles
  };

})();
