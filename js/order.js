'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var order = document.querySelector('.buy').querySelector('form');
  var orderSuccessModal = document.querySelector('.order__success');
  var orderErrorModal = document.querySelector('.order__error');
  var modalSuccessClose = orderSuccessModal.querySelector('.modal__close');
  var modalErrorClose = orderErrorModal.querySelector('.modal__close');

  // успех
  var modalSuccsessEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccsessOrder();
    }
  };

  var orderSuccess = function () {
    orderSuccessModal.classList.remove('modal--hidden');
    document.addEventListener('keydown', modalSuccsessEscPressHandler);
    order.reset();
  };

  var closeSuccsessOrder = function () {
    orderSuccessModal.classList.add('modal--hidden');
    document.removeEventListener('keydown', modalSuccsessEscPressHandler);
  };

  modalSuccessClose.addEventListener('click', function () {
    closeSuccsessOrder();
  });
  //

  // ошибка
  var modalErrorEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeErrorOrder();
    }
  };

  var orderError = function (errorMessage) {
    orderErrorModal.classList.remove('modal--hidden');
    document.addEventListener('keydown', modalErrorEscPressHandler);
    var orderErrorCode = orderErrorModal.querySelector('.modal__error');
    orderErrorCode.textContent = errorMessage;
  };

  var closeErrorOrder = function () {
    orderErrorModal.classList.add('modal--hidden');
    document.removeEventListener('keydown', modalErrorEscPressHandler);
  };

  modalErrorClose.addEventListener('click', function () {
    closeErrorOrder();
  });
  //

  // отправка на сервер
  order.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(order), orderSuccess, orderError);
    evt.preventDefault();
  });

})();
