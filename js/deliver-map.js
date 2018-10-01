'use strict';

(function () {

  var deliver = document.querySelector('.deliver');
  var deliverStore = deliver.querySelector('.deliver__store-map-wrap');
  var deliverList = deliver.querySelector('.deliver__store-list');

  deliverList.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.closest('#store-academicheskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/academicheskaya.jpg';
    } else if (target.closest('#store-vasileostrovskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/vasileostrovskaya.jpg';
    } else if (target.closest('#store-rechka')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/rechka.jpg';
    } else if (target.closest('#store-petrogradskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/petrogradskaya.jpg';
    } else if (target.closest('#store-proletarskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/proletarskaya.jpg';
    } else if (target.closest('#store-vostaniya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/vostaniya.jpg';
    } else if (target.closest('#store-prosvesheniya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/prosvesheniya.jpg';
    } else if (target.closest('#store-frunzenskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/frunzenskaya.jpg';
    } else if (target.closest('#store-chernishevskaya')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/chernishevskaya.jpg';
    } else if (target.closest('#store-tehinstitute')) {
      deliverStore.querySelector('.deliver__store-map-img').src = 'img/map/tehinstitute.jpg';
    }

  });

})();
