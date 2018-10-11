'use strict';

(function () {

  // Ползунок
  var MAXIMUM_FILTER_PRICE = 100;
  var MINIMUM_FILTER_PRICE = 0;
  var START_COORDINATES = 0;
  var FINISH_COORDINATES = 1;

  var range = document.querySelector('.range');
  var rangeFilter = range.querySelector('.range__filter');
  var rangeFillLine = rangeFilter.querySelector('.range__fill-line');
  var buttonRight = rangeFilter.querySelector('.range__btn--right');
  var buttonLeft = rangeFilter.querySelector('.range__btn--left');
  buttonRight.style.right = 0;
  buttonLeft.style.left = 0;
  rangeFillLine.style.left = 0;
  rangeFillLine.style.right = 0;
  var buttonRightWidth = buttonRight.offsetWidth;
  var rangeFilllineWidth = rangeFillLine.offsetWidth - buttonRightWidth;


  var makeDraggable = function (element, getBounds, moveCallback) {

    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startPointerCoordinates = {
        x: evt.clientX
      };

      var startElementCoordinates = {
        x: element.offsetLeft
      };

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startPointerCoordinates.x - moveEvt.clientX
        };
        element.style.left = (startElementCoordinates.x - shift.x) + 'px';
        getBounds();
        moveCallback();

      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
  };

  var getSliderValue = function (button) {
    var buttonCoordinates = button.getBoundingClientRect();
    var rangeFillLineCoordinates = rangeFilter.getBoundingClientRect();
    var rangeFillLineLeftCoordinates = rangeFillLineCoordinates.left;
    var rangeFillLineRightCoordinates = rangeFillLineCoordinates.right - button.offsetWidth;
    var widthFillLine = rangeFillLineRightCoordinates - rangeFillLineLeftCoordinates;
    var coordinatesDifference = (rangeFillLineRightCoordinates - buttonCoordinates.left) / widthFillLine;
    if (buttonCoordinates === rangeFillLineRightCoordinates) {
      return FINISH_COORDINATES;
    } else if (buttonCoordinates === rangeFillLineLeftCoordinates) {
      return START_COORDINATES;
    } else {
      return FINISH_COORDINATES - coordinatesDifference;
    }
  };

  var rangePriceMaximum = document.querySelector('.range__price--max');
  rangePriceMaximum.innerText = MAXIMUM_FILTER_PRICE;
  var rangePriceMinimum = document.querySelector('.range__price--min');
  rangePriceMinimum.innerText = MINIMUM_FILTER_PRICE;

  var calculatePrice = function (sliderValue) {
    var slideValue = getSliderValue(sliderValue);
    var price = slideValue * MAXIMUM_FILTER_PRICE;
    price = Math.round(price);
    return price;
  };

  var changeRangeFillLine = function () {
    var coordinatesDifference = buttonRight.getBoundingClientRect().left - buttonLeft.getBoundingClientRect().left;
    rangeFillLine.style.width = (coordinatesDifference) + 'px';
    rangeFillLine.style.left = (buttonLeft.offsetLeft) + 'px';
  };

  var getSliderBoundMaximum = function () {

    var buttonRightCoordinates = buttonRight.getBoundingClientRect();
    var buttonLeftCoordinates = buttonLeft.getBoundingClientRect();
    var rangeFillLineCoordinates = rangeFilter.getBoundingClientRect();
    var rangeFillLineLeftCoordinates = rangeFillLineCoordinates.left;
    var rangeFillLineRightCoordinates = rangeFillLineCoordinates.right - buttonRight.offsetWidth;
    var differenceFillLineCoordinates = (rangeFillLineRightCoordinates - rangeFillLineLeftCoordinates);

    if (buttonRightCoordinates.left > rangeFillLineRightCoordinates) {
      buttonRight.style.left = (differenceFillLineCoordinates) + 'px';
    } else if (buttonRightCoordinates.left < buttonLeftCoordinates.left) {
      buttonRight.style.left = buttonLeft.style.left;
    }
  };

  var getSliderBoundMinimum = function () {

    var buttonRightCoordinates = buttonRight.getBoundingClientRect();
    var buttonLeftCoordinates = buttonLeft.getBoundingClientRect();
    var rangeFillLineCoordinates = rangeFilter.getBoundingClientRect();
    var rangeFillLineLeftCoordinates = rangeFillLineCoordinates.left;

    if (buttonLeftCoordinates.left < rangeFillLineLeftCoordinates) {
      buttonLeft.style.left = 0;
    } else if (buttonLeftCoordinates.left > buttonRightCoordinates.left) {
      buttonLeft.style.left = buttonRight.style.left;
    }
  };

  var updateMaximumPrice = function () {

    var price = calculatePrice(buttonRight);
    rangePriceMaximum.innerText = price;

    if (window.slider.updateMaximumPriceHandler) {
      window.slider.updateMaximumPriceHandler(price);
    }
    changeRangeFillLine();
  };

  var updateMinimumPrice = function () {

    var price = calculatePrice(buttonLeft);
    rangePriceMinimum.innerText = price;

    if (window.slider.updateMinimumPriceHandler) {
      window.slider.updateMinimumPriceHandler(price);
    }
    changeRangeFillLine();
  };

  var clearSliderValue = function () {
    var maximumPrice = document.querySelector('.range__price--max');
    var minimumPrice = document.querySelector('.range__price--min');
    buttonRight.style.left = rangeFilllineWidth + 'px';
    buttonLeft.style.left = 0;
    rangeFillLine.style.left = 0;
    rangeFillLine.style.width = rangeFilllineWidth + 'px';
    maximumPrice.textContent = MAXIMUM_FILTER_PRICE;
    minimumPrice.textContent = MINIMUM_FILTER_PRICE;
  };

  makeDraggable(buttonRight, getSliderBoundMaximum, updateMaximumPrice);

  makeDraggable(buttonLeft, getSliderBoundMinimum, updateMinimumPrice);

  window.slider = {
    updateMinimumPriceHandler: null,
    updateMaximumPriceHandler: null,
    clearSliderValue: clearSliderValue
  };

})();

