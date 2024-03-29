if (!window.localStorage.getItem('carsFromStorage')) window.localStorage.setItem('carsFromStorage', JSON.stringify([]));
let carsFromStorage = JSON.parse(window.localStorage.getItem('carsFromStorage'));

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
let carArrLength = 0,
  currency = 0;
let CAR = [],
  newCars = [],
  url = ['./data/data.json', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'];

function createNewDataFromFetch(url) {
  url.forEach(link => {
    fetch(link)
      .then(result => result.json())
      .then(data => {
        CAR.push(data)
        if (CAR.length > 1) {
          [CAR, currency] = CAR;
          currency = currency.find(res => res.ccy === 'USD').sale;
          printHtml(list, CAR);
          renderFilterForm(filterFormEl, CAR);
        }
      })
      .catch(error => console.warn(error));
  })
}
createNewDataFromFetch(url);


// async function loadCarsArray() {
//   try {
//     const cars = await fetch('/data/data.json');
//     CAR = await cars.json();
//     const value = await (await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')).json()
//     currency = value.find(res => res ?.ccy === 'USD')?.sale;
//     // currency = +currency?.sale;
//     // currency = +currency.toFixed(2);
//     printHtml(list, CAR);
//     renderFilterForm(filterFormEl, CAR);
//   } catch {
//     console.warn(error);
//   }
// }
// loadCarsArray();

function printHtml(section, dataArray) {
  section.innerHTML = carsArray(dataArray).join('');
}

function carsArray(dataArray) {
  return dataArray.map(car => carCard(car));
}

function carCard(card) {
  let str = '';
  for (let i = 0; i < 5; i++) {
    if (card.rating > i + .5) {
      str += `<i class="fas fa-star"></i></i>&#x20`;
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
                <input type="checkbox" ${carsFromStorage.includes(card.id) ? 'checked' : ''} class="car-info__favoritesInp" hidden>
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
                  <dd>${str || "not inspected"}</dd>
                </div>
                <div class="car-info__price">
                  <dt>price in dollars -</dt>
                  <dd>${card.price}&#x20$</dd>
                  <dt>price in hryvnia -</dt>
                  <dd>${Math.round(card.price * currency)}&#x20&#8372;</dd>
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

searchFormSquare.addEventListener('click', e => {
  const currentBtn = e.target.closest('button');
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

function sortTo(arr, smartKey, order) {
  if (arr.length > 0) {
    if (typeof arr[0][smartKey] === 'string') {
      return (a, b) => (a[smartKey].localeCompare(b[smartKey])) * order;
    } else {
      return (a, b) => (a[smartKey] - (b[smartKey])) * order;
    }
  }
}

searchFormSort.addEventListener('change', e => {
  const currentInput = e.target.value.trim().toLowerCase().split('/');
  const [key, order] = currentInput;
  if (newCars.length === 0) {
    CAR.sort(sortTo(CAR, key, order));
    printHtml(list, CAR)
  } else {
    newCars.sort(sortTo(newCars, key, order));
    printHtml(list, newCars)
  }
})

searchFormSearch.addEventListener('keyup', e => {
  const searchFields = ['make', 'model', 'year', 'vin', 'country'];
  const query = e.target.value.trim().toLowerCase().split(' ').filter(word => !!word);
  newCars = CAR.filter(car => {
    return query.every(word => {
      return searchFields.some(field => {
        return String(car[field]).toLowerCase().includes(word);
      })
    })
  })

  if (e.code !== 'Enter') {
    if (newCars.length !== carArrLength) {
      searchCurrentResult.classList.remove('search-form_disactive');
      searchCurrentResult.value = `found ${newCars.length} results`;
    } else {
      searchCurrentResult.classList.add('search-form_disactive');
    }
  }
})

searchFormSearch.addEventListener('submit', e => {
  e.preventDefault();
  searchCurrentResult.classList.add('search-form_disactive');
  if (e.target.searchTo.value.length === 0) {
    printHtml(list, CAR);
  } else {
    newCars.length === 0 ? printHtml(list, CAR) : printHtml(list, newCars);
  }
  setTimeout(() => {
    document.querySelectorAll('form').forEach(element => element.reset())
  }, 500);
  // e.target.searchTo.value = '';
  /*  document.querySelectorAll('form').forEach(element => {
     if (e.code !== 'Enter'){
       element.reset()};
     }) */
  // e.target.reset();
})

// -----------------------------------------------------------------------------------------------------


function renderFilterForm(section, dataArray) {
  const fieldsHTML = `<div class="fieldsets-wrap">
                        ${createFilterFieldset(dataArray).join('')}
                      </div>`
  section.insertAdjacentHTML('afterbegin', fieldsHTML);
}

function createFilterFieldset(dataArray) {
  return filterField.map(field => {
    const values = Array.from(new Set(dataArray.map(car => car[field])));
    return createFilterFielset(field, values);
  })
}

function createFilterFielset(field, values) {
  const fieldHTML = values.map(value => createFilterField(field, value)).join('');
  return `<fieldset>
            <legend>${field}</legend>
            ${fieldHTML}
          </fieldset>`
}

function createFilterField(field, value) {
  return `<label>
            <input type="checkbox" name="${field}" value="${value}">
            <span>${value}</span>
          </label>`
}

// filterFormEl.addEventListener('submit', e => {
//   e.preventDefault();
//   const query = filterField.map(field => {
//     const values = Array.from(filterFormEl[field]).map(input => input.checked && input.value).filter(word => !!word);
//     return values;
//   })
//   newCars = CAR.filter(car => {
//     return query.every(values => {
//       return filterField.some(field => {
//         return values.length > 0 ? values.includes(String(car[field])) : true;
//       })
//     })
//   })
//   printHtml(list, newCars);
// document.querySelectorAll('form').forEach(element => element.reset());
// })

filterFormEl.addEventListener('submit', e => {
  e.preventDefault();
  const query = filterField.map(field => {
    const values = Array.from(filterFormEl[field]).reduce((total, input) => {
      if (input.checked) total.push(input.value);
      return total;
    }, [])
    return values;
  })
  newCars = CAR.filter(car => {
    return query.every((values, idx) => {
      return values.length > 0 ? values.includes(car[filterField[idx]]) : true;
    })
  })
  printHtml(list, newCars);
  document.querySelectorAll('form').forEach(element => element.reset());
})

list.addEventListener('click', e => {
  const currentInput = e.target.closest('.car-info__favoritesInp');
  if (currentInput) {
    const carId = currentInput.closest('.card').dataset.id;
    const carIdx = carsFromStorage.findIndex(id => id === carId);
    if (carIdx === -1) {
      carsFromStorage.push(carId);
    } else {
      carsFromStorage.splice(carIdx, 1);
    }
    window.localStorage.setItem('carsFromStorage', JSON.stringify(carsFromStorage));
  }
})

favoritesCarsBtn.addEventListener('click', e => {
  newCars = carsFromStorage.map(id => {
    return CAR.find(car => car.id === id);
  })
  printHtml(list, newCars);
})

deleteCarsBtn.addEventListener('click', e => {
  window.localStorage.removeItem('carsFromStorage');
  carsFromStorage = [];
  printHtml(list, CAR);
})

allCarsBtn.addEventListener('click', e => {
  printHtml(list, CAR);
})