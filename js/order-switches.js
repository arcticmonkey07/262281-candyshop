'use strict';

(function () {

  var payment = document.querySelector('.payment');
  var paymentCash = payment.querySelector('.payment__cash-wrap');
  var paymentCard = payment.querySelector('.payment__card-wrap');
  var bankCard = payment.querySelector('#payment__card');
  var payCash = payment.querySelector('#payment__cash');

  var deliver = document.querySelector('.deliver');
  var courier = deliver.querySelector('.deliver__courier');
  var store = deliver.querySelector('.deliver__store');
  var storeButton = deliver.querySelector('#deliver__store');
  var courierButton = deliver.querySelector('#deliver__courier');

  window.orderSwitches = {
    // Переключение вкладок в форме оплаты
    paymentSwitch: function () {
      paymentCash.classList.toggle('visually-hidden', bankCard.checked);
      paymentCard.classList.toggle('visually-hidden', payCash.checked);
    },
    // Переключение вкладок в форме доставки
    deliverySwitch: function () {
      courier.classList.toggle('visually-hidden', storeButton.checked);
      store.classList.toggle('visually-hidden', courierButton.checked);
    }

  };

})();
