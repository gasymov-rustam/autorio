let CAR = JSON.parse(DATA);

const list = document.getElementById("list");
const searchFormSquare = document.getElementById("search-form__square");
const searchFormSort = document.getElementById("sortBy");
const searchFormSearch = document.getElementById('search');
const searchCurrentResult = document.getElementById('searchResult');
const filterFormEl = document.getElementById('filterForm');
const allCarsBtn = document.getElementById('allCars');
const favoritesCarsBtn = document.getElementById('favoritesCars')
const deleteCarsBtn = document.getElementById('deleteCars')
const filterField = ['make', 'transmission', 'color'];
const carArrLength = CAR.length;
let newArrWithCarId = [], newCAR = [];

searchFormSquare.addEventListener('click', e => {
  const currentBtn = e.target.closets('button');
  if (currentBtn) {
    const type = currentBtn.dataset.type;
    const listCurrentClass = Array.from(list.classList).find(className => className.includes('col'));
    list.classList.remove(listCurrentClass);
    list.classList.add(`cols-${type}`);
    Array.from(searchFormSquare.children).forEach(btn => {
      if (btn === currentBtn) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    })
  }
})

searchFormSearch.addEventListener('keyup', e => {
  const searchFields = ['make', 'model', 'year', 'vin', 'country'];
  const query = e.target.value.trim().toLowerCase().split(' ').filter(word => !!word);
  console.log(query);
  CAR = JSON.parse(DATA).filter(car => {
    return query.every(word => {
      return searchFields.some(field => {
        return String(car[field]).toLowerCase().includes(word);
      })
    })
  })

  if (e.code !== 'Enter') {
    if (CAR.length !== carArrLength) {
      searchCurrentResult.classList.remove('search-form_disactive');
      searchCurrentResult.value = `found ${CAR.length} results`
    } else {
      searchCurrentResult.classList.add('search-form_disactive');
    }
  }
})

searchFormSearch.addEventListener('submit', e => {
  e.preventDefault();
  searchCurrentResult.classList.add('search-form_disactive');
  printHtml(list, CAR)
})
// -----------------------------------------------------------------------------------------------------

printHtml(list, CAR);

function printHtml(section, arr) {
  section.innerHTML = carsArray(arr).join('');
}

function carsArray(arr) {
  return arr.map(car => carCard(car));
}

function carCard(card) {
  let str = '';
  for (let i = 0; i < 5; i++) {
    if (card.rating > i + .5) {
      str += `<i class="fas fa-star"></i>&#x20`;
    } else if (card.rating === i + .5) {
      str += `<i class="fas fa-star-half-alt"></i>&#x20`;
    } else {
      str += `<i class="far fa-star"></i>&#x20`;
    }
  }

  const CONSUME = `<dl>
                    <dt class="car-info__consume_road">road: ${card.consume?.road || "not indicated"} </dt>
                    <dt class="car-info__consume_city">city: ${card.consume?.city || "not indicated"} </dt>
                    <dt class="car-info__consume_mixed">mixed: ${card.consume?.mixed || "not indicated"}</dt>
                  </dl>`;

  return `<div class="card" data-id="${card.id}">
            <img src="${card.img}" alt="${card.make} ${card.model}" class="car-photo">
          <div class="car-info">
            <h2 class="car-info__make">"${card.make}"</h2>
            <h3 class="car-info__model">"${card.model}"</h3>
            <div class="car-info__favorites">
              <label>
                      <input type="checkbox" name="${card.id}" class="car-info__favoritesInp" id="favorites" hidden>
                      <span class="firstHeart"><i class="far fa-heart"></i></span>
                      <span class="secondHeart"><i class="fas fa-heart"></i></span>
              </label>
            </div>
          <dl>
          <div class="car-info__country">
          <dt>country -</dt>
          <dd>${card.country}</dd>
          </div>
          <div class="car-info__color">
          <dt>color -</dt>
          <dd>${card.color}</dd>
          </div>
          <div class="car-info__year">
          <dt>year -</dt>
          <dd>${card.year}</dd>
          </div>
          <div class="car-info__rating">
          <!--                        <dd>${card?.rating}</dd>-->
          <dd>${str || "not inspected"}</dd>
          </div>
          <div class="car-info__price">
          <dt>price -</dt>
          <dd>${card.price}&#x20$</dd>
          </div>
          <div class="car-info__engine-volume">
          <dt>engine volume -</dt>
          <dd>&#128663; ${card.engine_volume} l.</dd>
          </div>
          <div class="car-info__transmission">
          <dt>transmission -</dt>
          <dd>&#128663; ${card.transmission}</dd>
          </div>
          <div class="car-info__odo">
          <dt>odo -</dt>
          <dd>&#9942; ${card.odo} km</dd>
          </div>
          <div class="car-info__fuel">
          <dt>fuel -</dt>
          <dd>⛽  ${card.fuel}</dd>
          </div>
          <div class="car-info__car-consume">
          <dt>consume -</dt>
          <dd>${card.consume ? CONSUME : "not indicated"}</dd>    
          </div>
          <div class="car-info__seller">
          <dt>seller -</dt>
          <dd>${card?.seller || "not indicated"}</dd>    
          </div>
          </dl>
          </div>
        </div>`;
}

function createRedHeart(selectorAccrodingToCss, itemFromStorage) {
  document.querySelectorAll(selectorAccrodingToCss).forEach(input => {
    if (window.localStorage.getItem(itemFromStorage)) {
      Array.from(JSON.parse(localStorage.getItem(itemFromStorage))).forEach(id => {
        if (input.name === id) {
          input.checked = true;
        }
      })
    }
  })
}

document.addEventListener("DOMContentLoaded", createRedHeart('#favorites', 'carsFromStorage'));

list.addEventListener('click', e => {
  newArrWithCarId = Array.from(document.querySelectorAll('#favorites')).reduce((total, input) => {
    if (input.checked) total.push(input.name);
    return total;
  }, []);

  if (!window.localStorage.getItem('carsFromStorage')) {
    window.localStorage.setItem('carsFromStorage', JSON.stringify([]));
  }

  let carsToFavorite = Array.from(new Set(Array.from(JSON.parse(window.localStorage.getItem('carsFromStorage'))).concat(newArrWithCarId)));
  window.localStorage.setItem('carsFromStorage', JSON.stringify(carsToFavorite));
  console.log(carsToFavorite);

})

allCarsBtn.addEventListener('click', e => {
  newArrWithCarId = [];
  printHtml(list, JSON.parse(DATA));

  createRedHeart('#favorites', 'carsFromStorage');
})

favoritesCarsBtn.addEventListener('click', e => {
  newCAR = [];
  let carsToFavorite = Array.from(JSON.parse(window.localStorage.getItem('carsFromStorage')));
  if (carsToFavorite.length !== 0) {
    newCAR = JSON.parse(DATA).filter(car => {
      return carsToFavorite.some(value => {
        if (value === car.id) {
          return car;
        }
      })
    })
    printHtml(list, newCAR)
    createRedHeart('#favorites', 'carsFromStorage');
  }
})

deleteCarsBtn.addEventListener('click', e=> {
  window.localStorage.removeItem('carsFromStorage');
  printHtml(list, CAR);
})













function sortTo(arr, smartKey, order) {
  if (arr.length > 0) {
    if (typeof arr[0][smartKey] === 'string') {
      return (a, b) => (a[smartKey].localeCompare(b[smartKey])) * order;
    } else {
      return (a, b) => (a[smartKey] - b[smartKey]) * order;
    }
  }
}

searchFormSort.addEventListener('change', e => {
  const currentInput = e.target.value.trim().toLowerCase().split('/');
  const [key, order] = currentInput;
  CAR.sort(sortTo(CAR, key, order));
  printHtml(list, CAR)
})

renderFilterForm(filterFormEl, CAR)

function renderFilterForm(elemForRender, dataArray) {
  const filtersHTML = `<div class="fieldsets-wrap">
                        ${createFilterFieldset(dataArray).join('')}
                      </div>`
  elemForRender.insertAdjacentHTML('afterbegin', filtersHTML)
}

function createFilterFieldset(dataArray) {
  return filterField.map(field => {
    const values = Array.from(new Set(dataArray.map(car => car[field])));
    return createFilterFielset(field, values);
  })
}

function createFilterFielset(field, values) {
  const fieldsHTML = values.map(value => createFilterField(field, value)).join('');
  return `<fieldset>
            <legend>${field}</legend>
            ${fieldsHTML}
          </fieldset>`
}

function createFilterField(field, value) {
  return `<label>
            <input type="checkbox" name="${field}" value="${value}">
            <span>${value}</span>
          </label>`
}

/* filterFormEl.addEventListener('submit', e => {
  e.preventDefault();
  const query = filterField.map(field => {
    const values = Array.from(filterFormEl[field]).map(input => input.checked && input.value).filter(word => !!word);
    return values;
  })

  CAR = JSON.parse(DATA).filter(car=> {
    return query.every(values => {
      return filterField.some(field => {
        return values.length > 0 ? values.includes(String(car[field])):true
      })
    })
  })

  printHtml(list, CAR);
}) */

filterFormEl.addEventListener('submit', e => {
  e.preventDefault();
  const query = filterField.map(field => {
    const values = Array.from(filterFormEl[field]).reduce((total, input) => {
      if (input.checked) total.push(input.value);
      return total;
    }, [])
    return values;
  })
  console.log(query);
  CAR = JSON.parse(DATA).filter(car => {
    return query.every((values, idx) => {
      return values.length > 0 ? values.includes(String(car[filterField[idx]])) : true;
    })
  })
  printHtml(list, CAR)
})