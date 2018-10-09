'use strict';

(function () {

  // Ползунок
  var MAXIMUM_FILTER_PRICE = 100;
  var MINIMUM_FILTER_PRICE = 0;
  var START_COORD = 0;
  var FINISH_COORD = 1;

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

      var startPointerCoords = {
        x: evt.clientX
      };

      var startElementCoords = {
        x: element.offsetLeft
      };

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startPointerCoords.x - moveEvt.clientX
        };
        element.style.left = (startElementCoords.x - shift.x) + 'px';
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
    var getButtonCoords = button.getBoundingClientRect();
    var getRangeFillLineCoords = rangeFilter.getBoundingClientRect();
    var buttonCoord = getButtonCoords.left;
    var rangeFillLineLeftCoord = getRangeFillLineCoords.left;
    var rangeFillLineRightCoord = getRangeFillLineCoords.right - button.offsetWidth;
    var widthFillLine = rangeFillLineRightCoord - rangeFillLineLeftCoord;
    var differenceCoords = (rangeFillLineRightCoord - buttonCoord) / widthFillLine;
    if (buttonCoord === rangeFillLineRightCoord) {
      return FINISH_COORD;
    } else if (buttonCoord === rangeFillLineLeftCoord) {
      return START_COORD;
    } else {
      return FINISH_COORD - differenceCoords;
    }
  };

  var rangePriceMaximum = document.querySelector('.range__price--max');
  rangePriceMaximum.innerText = MAXIMUM_FILTER_PRICE;
  var rangePriceMinimum = document.querySelector('.range__price--min');
  rangePriceMinimum.innerText = MINIMUM_FILTER_PRICE;

  var calculatePrice = function (sliderValue) {
    var value = getSliderValue(sliderValue);
    var price = value * MAXIMUM_FILTER_PRICE;
    price = Math.round(price);
    return price;
  };

  var changeRangeFillLine = function () {
    var differenceCoords = buttonRight.getBoundingClientRect().left - buttonLeft.getBoundingClientRect().left;
    rangeFillLine.style.width = (differenceCoords) + 'px';
    rangeFillLine.style.left = (buttonLeft.offsetLeft) + 'px';
  };

  var getSliderBoundMaximum = function () {
    var buttonRightCoord = buttonRight.getBoundingClientRect();
    var buttonLeftCoord = buttonLeft.getBoundingClientRect();
    var rangeFillLineCoords = rangeFilter.getBoundingClientRect();
    var rangeFillLineLeftCoord = rangeFillLineCoords.left;
    var rangeFillLineRightCoord = rangeFillLineCoords.right - buttonRight.offsetWidth;
    var differenceFillLineCoords = (rangeFillLineRightCoord - rangeFillLineLeftCoord);
    if (buttonRightCoord.left > rangeFillLineRightCoord) {
      buttonRight.style.left = (differenceFillLineCoords) + 'px';
    } else if (buttonRightCoord.left < buttonLeftCoord.left) {
      buttonRight.style.left = buttonLeft.style.left;
    }
  };

  var getSliderBoundMinimum = function () {
    var buttonRightCoord = buttonRight.getBoundingClientRect();
    var buttonLeftCoord = buttonLeft.getBoundingClientRect();
    var rangeFillLineCoords = rangeFilter.getBoundingClientRect();
    var rangeFillLineLeftCoord = rangeFillLineCoords.left;
    if (buttonLeftCoord.left < rangeFillLineLeftCoord) {
      buttonLeft.style.left = 0;
    } else if (buttonLeftCoord.left > buttonRightCoord.left) {
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

