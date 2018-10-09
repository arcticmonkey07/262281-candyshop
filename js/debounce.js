'use strict';
(function () {

  var DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var argument = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        fun.apply(null, argument);
      }, DEBOUNCE_INTERVAL);
    };

  };

})();
