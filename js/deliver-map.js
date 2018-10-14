'use strict';

(function () {

  var MAP_IMAGE = ['img/map/academicheskaya.jpg',
    'img/map/vasileostrovskaya.jpg',
    'img/map/rechka.jpg',
    'img/map/petrogradskaya.jpg',
    'img/map/proletarskaya.jpg',
    'img/map/vostaniya.jpg',
    'img/map/prosvesheniya.jpg',
    'img/map/frunzenskaya.jpg',
    'img/map/chernishevskaya.jpg',
    'img/map/tehinstitute.jpg'];

  var deliver = document.querySelector('.deliver');
  var deliverAdress = document.querySelectorAll('input[name="store"]');
  var deliverImage = document.querySelector('.deliver__store-map-img');

  deliver.addEventListener('click', function () {

    deliverAdress.forEach(function (input, i) {

      if (input.checked) {
        deliverImage.src = MAP_IMAGE[i];
      }

    });

  });

})();
