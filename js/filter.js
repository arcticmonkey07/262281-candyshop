'use strict';

(function () {

  // фильтр выбора диапазона цен
  var sliderElem = document.querySelector('.range__filter');
  var thumbMin = document.querySelector('.range__btn--left');
  var thumbMax = document.querySelector('.range__btn--right');
  var priceMax = document.querySelector('.range__price--max');
  var priceMin = document.querySelector('.range__price--min');
  var fillLine = document.querySelector('.range__fill-line');
  var sliderCoords = getCoords(sliderElem);
  var rangeEnd = sliderElem.offsetWidth - thumbMin.offsetWidth;

  var min = parseInt(36, 10);
  var max = parseInt(198, 10);

  thumbMin.onmousedown = function (e) {
    var thumbCoords = getCoords(thumbMin);
    var shiftX = e.pageX - thumbCoords.left;

    document.onmousemove = function (ev) {
      var newLeftMin = ev.pageX - shiftX - sliderCoords.left;
      if (newLeftMin < 0) {
        newLeftMin = 0;
      }

      if (newLeftMin > max) {
        newLeftMin = max;
      }

      min = newLeftMin;
      thumbMin.style.left = newLeftMin + 'px';
      priceMin.textContent = Math.round(newLeftMin);
      fillLine.style.left = Math.round(newLeftMin) + 'px';
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
    return false;
  };

  thumbMax.onmousedown = function (e) {
    var thumbCoords = getCoords(thumbMax);
    var shiftX = e.pageX - thumbCoords.left;

    document.onmousemove = function (evt) {
      var newLeftMax = evt.pageX - shiftX - sliderCoords.left;

      // если вне слайдера
      if (newLeftMax < min) {
        newLeftMax = min;
      }

      if (newLeftMax > rangeEnd) {
        newLeftMax = rangeEnd;
      }
      max = newLeftMax;

      thumbMax.style.left = newLeftMax + 'px';
      priceMax.textContent = Math.round(newLeftMax);
      fillLine.style.right = 235 - Math.round(newLeftMax) + 'px';
    };
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
    return false;
  };

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

})();
