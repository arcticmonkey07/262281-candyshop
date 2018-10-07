'use strict';

(function () {

  var defaultQuery = {
    kind: {
      'Мороженое': false,
      'Газировка': false,
      'Жевательная резинка': false,
      'Мармелад': false,
      'Зефир': false
    },
    noSugar: false,
    vegetarian: false,
    gluten: false,
    minValue: 0,
    maxValue: 100,
    amount: false,
    popular: false,
    favorite: false,
    availability: false
  };

  var sortingOrder;

  var clone = function (object) {
    return JSON.parse(JSON.stringify(object));
  };

  var query = clone(defaultQuery);

  var isSomePropertyTrue = function (obj) {
    return Object.keys(obj).some(function (key) {
      return obj[key];
    });
  };

  var filterByKind = function (card) {
    var kind = !isSomePropertyTrue(query.kind) || query.kind[card.kind];

    if (!kind) {
      return false;
    } else {
      return kind;
    }

  };

  var filterBySugar = function (card) {
    var sugar = !card.nutritionFacts.sugar || !query.noSugar;

    if (!sugar) {
      return false;
    } else {
      return sugar;
    }

  };

  var filterByVegetarian = function (card) {
    var vegetarian = card.nutritionFacts.vegetarian || !query.vegetarian;

    if (!vegetarian) {
      return false;
    } else {
      return vegetarian;
    }

  };

  var filterByGlutenn = function (card) {
    var gluten = !card.nutritionFacts.gluten || !query.gluten;

    if (!gluten) {
      return false;
    } else {
      return gluten;
    }

  };

  var filterByMaxPrice = function (card) {
    var maxPrice = card.price <= query.maxValue;

    if (!maxPrice) {
      return false;
    } else {
      return maxPrice;
    }

  };

  var filterByMinPrice = function (card) {
    var minPrice = card.price >= query.minValue;

    if (!minPrice) {
      return false;
    } else {
      return minPrice;
    }

  };

  var filterByAvailability = function (card) {
    var availability = card.amount > 0 || !query.availability;

    if (!availability) {
      return false;
    } else {
      return availability;
    }

  };

  var filterByFavorite = function (card) {
    var favorite = card.favorite || !query.favorite;

    if (!favorite) {
      return false;
    } else {
      return favorite;
    }

  };

  var filterKind = document.querySelector('.catalog__filter--kind');
  var inputsKind = filterKind.querySelectorAll('input');
  var filterNtrition = document.querySelector('.catalog__filter--nutrition');
  var inputsNutrition = filterNtrition.querySelectorAll('input');
  var inputFavorite = document.querySelector('#filter-favorite');
  var inputAvailability = document.querySelector('#filter-availability');
  var filteredData;

  var sortExpensive = function (left, right) {
    return right.price - left.price;
  };

  var sortCheep = function (left, right) {
    return left.price - right.price;
  };

  var sortRating = function (left, right) {
    var rating = right.rating.value - left.rating.value;
    if (rating === 0) {
      return right.rating.number - left.rating.number;
    }
    return rating;
  };

  var sort = function (cards) {
    switch (sortingOrder) {
      case 'expensive':
        cards.sort(sortExpensive);
        break;
      case 'cheep':
        cards.sort(sortCheep);
        break;
      case 'rating':
        cards.sort(sortRating);
        break;
      case 'popular':
        cards = filteredData.slice();
        break;
    }
  };

  document.querySelector('.catalog__filter--sort').addEventListener('change', function (e) {
    var target = e.target.value;
    if (!target) {
      return;
    }
    sortingOrder = target;
    showFilteredData();
  });

  document.querySelector('#filter-favorite').addEventListener('change', function (e) {
    var favorite = e.target.dataset.favorite;
    if (!favorite) {
      return;
    }
    inputAvailability.checked = false;
    clearCheckedInput(inputsKind);
    clearCheckedInput(inputsNutrition);
    window.slider.clearSliderValue();
    query.favorite = e.target.checked;
    showFilteredData();
  });

  document.querySelector('#filter-availability').addEventListener('change', function (e) {
    var availability = e.target.dataset.avalibility;
    if (!availability) {
      return;
    } else if (e.target.checked) {
      clearCheckedInput(inputsKind);
      clearCheckedInput(inputsNutrition);
      inputFavorite.checked = false;
      showFilteredData();
    } else {
      return;
    }
  });

  document.querySelector('#filter-sugar-free').addEventListener('change', function (e) {
    var nutrition = e.target.dataset.nutrition;
    if (!nutrition) {
      return;
    }
    query.noSugar = e.target.checked;
    showFilteredData();
  });

  document.querySelector('#filter-vegetarian').addEventListener('change', function (e) {
    var vegetarian = e.target.dataset.nutrition;
    if (!vegetarian) {
      return;
    }
    query.vegetarian = e.target.checked;
    showFilteredData();
  });

  document.querySelector('#filter-gluten-free').addEventListener('change', function (e) {
    var gluten = e.target.dataset.nutrition;
    if (!gluten) {
      return;
    }
    query.gluten = e.target.checked;
    showFilteredData();
  });

  document.querySelector('.catalog__filter--kind').addEventListener('change', function (e) {
    var kind = e.target.dataset.kind;
    if (!kind) {
      return;
    }
    query.kind[kind] = e.target.checked;
    showFilteredData();
  });

  var emptyFilters = document.querySelector('#empty-filters').content.cloneNode(true);
  var catalogCardsWrap = document.querySelector('.catalog__cards-wrap');
  catalogCardsWrap.appendChild(emptyFilters);
  var catalogEmptyFilter = document.querySelector('.catalog__empty-filter');
  catalogEmptyFilter.classList.add('visually-hidden');
  window.catalogEmptyFilter = catalogEmptyFilter;

  var showFilteredData = window.debounce(function () {
    filteredData = window.catalog.data.filter(filterByKind).filter(filterBySugar).filter(filterByVegetarian).filter(filterByGlutenn).filter(filterByMaxPrice).filter(filterByMinPrice).filter(filterByAvailability).filter(filterByFavorite);
    sort(filteredData);
    catalogEmptyFilter.classList.add('visually-hidden');
    if (filteredData.length === 0) {
      catalogEmptyFilter.classList.remove('visually-hidden');
      window.catalog.appendFragment(filteredData);
    } else {
      window.catalog.appendFragment(filteredData);
    }
  });

  var filterList = document.querySelector('.catalog__sidebar');
  var filterInput = filterList.querySelectorAll('input');

  var clearCheckedInput = function (item) {
    for (var i = 0; i < item.length; i++) {
      item[i].checked = false;
      query = clone(defaultQuery);
    }
  };

  var catalogSubmit = document.querySelector('.catalog__submit');
  var filterPopular = document.querySelector('#filter-popular');
  catalogSubmit.addEventListener('click', function (evt) {
    evt.preventDefault();
    clearCheckedInput(filterInput);
    filterPopular.checked = true;
    window.catalog.appendFragment(window.catalog.data);
    window.slider.clearSliderValue();
  });

  var numberIcecream = document.querySelector('.input-btn__item-count--icecream');
  var numberSoda = document.querySelector('.input-btn__item-count--soda');
  var numberGum = document.querySelector('.input-btn__item-count--gum');
  var numberMarmalade = document.querySelector('.input-btn__item-count--marmalade');
  var numberMarshmellow = document.querySelector('.input-btn__item-count--marshmellow');
  var numberSugar = document.querySelector('.input-btn__item-count--sugar');
  var numberVegetarian = document.querySelector('.input-btn__item-count--vegetarian');
  var numberGluten = document.querySelector('.input-btn__item-count--gluten');
  var numberSlider = document.querySelector('.range__count');
  numberSlider.textContent = '(' + window.catalog.data.length + ')';
  var numberAvailability = document.querySelector('.input-btn__item-count--availability');
  var numberFavorite = document.querySelector('.input-btn__item-count--favorite');

  var getFilterNumber = function () {

    var getFilterNumberKind = function (target, value) {
      var filterData = window.catalog.data.filter(function (card) {
        return card.kind === target;
      });
      value.textContent = '(' + filterData.length + ')';
    };

    var getFilterNumberSugar = function (target, value) {
      var filterData = window.catalog.data.filter(function (card) {
        return card.nutritionFacts.sugar === target;
      });
      value.textContent = '(' + filterData.length + ')';
    };

    var getFilterNumberVegetarian = function (target, value) {
      var filterData = window.catalog.data.filter(function (card) {
        return card.nutritionFacts.vegetarian === target;
      });
      value.textContent = '(' + filterData.length + ')';
    };

    var getFilterNumberGluten = function (target, value) {
      var filterData = window.catalog.data.filter(function (card) {
        return card.nutritionFacts.gluten === target;
      });
      value.textContent = '(' + filterData.length + ')';
    };

    var getFilterNumberAvailability = function (target, value) {
      var filterData = window.catalog.data.filter(function (card) {
        return card.amount > target;
      });
      value.textContent = '(' + filterData.length + ')';
    };

    var getFilterNumberFavorite = function (target, value) {
      var filterData = window.catalog.data.filter(function (card) {
        return card.favorite === target;
      });
      value.textContent = '(' + filterData.length + ')';
    };

    getFilterNumberKind('Мороженое', numberIcecream);
    getFilterNumberKind('Газировка', numberSoda);
    getFilterNumberKind('Жевательная резинка', numberGum);
    getFilterNumberKind('Мармелад', numberMarmalade);
    getFilterNumberKind('Зефир', numberMarshmellow);
    getFilterNumberSugar(false, numberSugar);
    getFilterNumberVegetarian(true, numberVegetarian);
    getFilterNumberGluten(false, numberGluten);
    getFilterNumberAvailability(0, numberAvailability);
    getFilterNumberFavorite(true, numberFavorite);
  };

  window.slider.onUpdateMaxPrice = function (price) {
    query.maxValue = price;
    showFilteredData();
  };

  window.slider.onUpdateMinPrice = function (price) {
    query.minValue = price;
    showFilteredData();
  };

  window.filter = {
    getFilterNumber: getFilterNumber,
    filteredData: filteredData
  };

})();
