'use strict';

(function () {

  var defaultFilterValues = {
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
    minimumValue: 0,
    maximumValue: 100,
    amount: false,
    popular: false,
    favorite: false,
    availability: false
  };

  var sortingOrder;

  var clone = function (object) {
    return JSON.parse(JSON.stringify(object));
  };

  var currentFilterValues = clone(defaultFilterValues);

  var isSomePropertyTrue = function (obj) {
    return Object.keys(obj).some(function (key) {
      return obj[key];
    });
  };

  var filterByKind = function (card) {
    var kind = !isSomePropertyTrue(currentFilterValues.kind) || currentFilterValues.kind[card.kind];

    if (!kind) {
      return false;
    }

    return kind;
  };

  var filterBySugar = function (card) {
    var sugar = !card.nutritionFacts.sugar || !currentFilterValues.noSugar;

    if (!sugar) {
      return false;
    }

    return sugar;
  };

  var filterByVegetarian = function (card) {
    var vegetarian = card.nutritionFacts.vegetarian || !currentFilterValues.vegetarian;

    if (!vegetarian) {
      return false;
    }

    return vegetarian;
  };

  var filterByGlutenn = function (card) {
    var gluten = !card.nutritionFacts.gluten || !currentFilterValues.gluten;

    if (!gluten) {
      return false;
    }

    return gluten;
  };

  var filterByMaxPrice = function (card) {
    var maxPrice = card.price <= currentFilterValues.maximumValue;

    if (!maxPrice) {
      return false;
    }

    return maxPrice;
  };

  var filterByMinPrice = function (card) {
    var minPrice = card.price >= currentFilterValues.minimumValue;

    if (!minPrice) {
      return false;
    }

    return minPrice;
  };

  var filterByAvailability = function (card) {
    var availability = card.amount > 0 || !currentFilterValues.availability;

    if (!availability) {
      return false;
    }

    return availability;
  };

  var filterByFavorite = function (card) {
    var favorite = card.favorite || !currentFilterValues.favorite;

    if (!favorite) {
      return false;
    }

    return favorite;
  };

  var filterKind = document.querySelector('.catalog__filter--kind');
  var inputsKind = filterKind.querySelectorAll('input');
  var filterNutrition = document.querySelector('.catalog__filter--nutrition');
  var inputsNutrition = filterNutrition.querySelectorAll('input');
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
    currentFilterValues.favorite = e.target.checked;
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
    }

    return;
  });

  document.querySelector('#filter-sugar-free').addEventListener('change', function (e) {
    var nutrition = e.target.dataset.nutrition;
    if (!nutrition) {
      return;
    }
    currentFilterValues.noSugar = e.target.checked;
    showFilteredData();
  });

  document.querySelector('#filter-vegetarian').addEventListener('change', function (e) {
    var vegetarian = e.target.dataset.nutrition;
    if (!vegetarian) {
      return;
    }
    currentFilterValues.vegetarian = e.target.checked;
    showFilteredData();
  });

  document.querySelector('#filter-gluten-free').addEventListener('change', function (e) {
    var gluten = e.target.dataset.nutrition;
    if (!gluten) {
      return;
    }
    currentFilterValues.gluten = e.target.checked;
    showFilteredData();
  });

  document.querySelector('.catalog__filter--kind').addEventListener('change', function (e) {
    var kind = e.target.dataset.kind;
    if (!kind) {
      return;
    }
    currentFilterValues.kind[kind] = e.target.checked;
    showFilteredData();
  });

  var emptyFilters = document.querySelector('#empty-filters').content.cloneNode(true);
  var catalogCardsWrap = document.querySelector('.catalog__cards-wrap');
  catalogCardsWrap.appendChild(emptyFilters);
  var catalogEmptyFilter = document.querySelector('.catalog__empty-filter');
  catalogEmptyFilter.classList.add('visually-hidden');
  window.catalogEmptyFilter = catalogEmptyFilter;

  var getFiltersList = function () {

    var filtersList = [];
    for (var key in defaultFilterValues) {
      if (JSON.stringify(defaultFilterValues[key]) !== JSON.stringify(currentFilterValues[key])) {
        filtersList.push(key);
      }
    }

    return filtersList;
  };

  var filterFunctionsObject = {
    'kind': filterByKind,
    'sugar': filterBySugar,
    'glutenn': filterByGlutenn,
    'vegeterian': filterByVegetarian,
    'maxprice': filterByMaxPrice,
    'minprice': filterByMinPrice,
    'availability': filterByAvailability,
    'favorite': filterByFavorite,
  };

  var filterData = function (filters) {

    return window.catalog.data.filter(function (element) {
      return filters.every(function (filter) {
        return filterFunctionsObject[filter](element);
      });
    });

  };

  var showFilteredData = window.debounce(function () {
    filteredData = filterData(getFiltersList());
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
      currentFilterValues = clone(defaultFilterValues);
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

    var getNumberKind = function (target, value) {
      filterData = window.catalog.data.filter(function (card) {
        return card.kind === target;
      });
      value.textContent = '(' + filterData.length + ')';
    };

    var getNumberSugar = function (target, value) {
      filterData = window.catalog.data.filter(function (card) {
        return card.nutritionFacts.sugar === target;
      });
      value.textContent = '(' + filterData.length + ')';
    };

    var getNumberVegetarian = function (target, value) {
      filterData = window.catalog.data.filter(function (card) {
        return card.nutritionFacts.vegetarian === target;
      });
      value.textContent = '(' + filterData.length + ')';
    };

    var getNumberGluten = function (target, value) {
      filterData = window.catalog.data.filter(function (card) {
        return card.nutritionFacts.gluten === target;
      });
      value.textContent = '(' + filterData.length + ')';
    };

    var getNumberAvailability = function (target, value) {
      filterData = window.catalog.data.filter(function (card) {
        return card.amount > target;
      });
      value.textContent = '(' + filterData.length + ')';
    };

    var getNumberFavorite = function (target, value) {
      filterData = window.catalog.data.filter(function (card) {
        return card.favorite === target;
      });
      value.textContent = '(' + filterData.length + ')';
    };

    getNumberKind('Мороженое', numberIcecream);
    getNumberKind('Газировка', numberSoda);
    getNumberKind('Жевательная резинка', numberGum);
    getNumberKind('Мармелад', numberMarmalade);
    getNumberKind('Зефир', numberMarshmellow);
    getNumberSugar(false, numberSugar);
    getNumberVegetarian(true, numberVegetarian);
    getNumberGluten(false, numberGluten);
    getNumberAvailability(0, numberAvailability);
    getNumberFavorite(true, numberFavorite);
  };

  window.slider.updateMaximumPriceHandler = function (price) {
    currentFilterValues.maximumValue = price;
    showFilteredData();
  };

  window.slider.updateMinimumPriceHandler = function (price) {
    currentFilterValues.minimumValue = price;
    showFilteredData();
  };

  window.filter = {
    getFilterNumber: getFilterNumber,
    filteredData: filteredData
  };

})();
