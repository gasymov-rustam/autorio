let CAR = JSON.parse(DATA);
delete CAR[0].consume;
delete CAR[0].seller;
// delete CAR[1].rating;

const list = document.getElementById("list");
const searchFormSquare = document.getElementById("search-form__square");
const searchFormSort = document.getElementById("sortBy");
const searchFormSearch = document.getElementById('search');
const searchCurrentResult = document.getElementById('searchResult');
const filterFormEl = document.getElementById('filterForm')
const filterField = ['make', 'transmission', 'color'];
const carArrLength = CAR.length;

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
// -----------------------------------------------------------------------------------------------------

searchFormSearch.addEventListener('keyup', e => {
  const searchFields = ['make', 'model', 'year', 'vin', 'country'];
  const query = e.target.value.trim().toLowerCase().split(' ').filter(word => !!word);
  CAR = JSON.parse(DATA).filter(car => {
    return query.every(word => {
      return searchFields.some(field => {
        return String(car[field]).toLowerCase().includes(word)
      })
    })
  })
  if (e.code !== 'Enter') {
    if (CAR.length !== carArrLength) {
      searchCurrentResult.classList.remove('search-form_disactive');
      searchCurrentResult.value = `found ${CAR.length} results`;
    } else {
      searchCurrentResult.classList.add('search-form_disactive');
    }
  }
})

searchFormSearch.addEventListener('submit', e => {
  e.preventDefault();
  searchCurrentResult.classList.add('search-form_disactive');
  printHtml(list, CAR);
})

printHtml(list, CAR);

function printHtml(section, arr) {
  section.innerHTML = carsArray(arr).join('');
}

function carsArray(arr) {
  return arr.map(car => carCard(car))
}

function carCard(card) {
  let str = '';
  for (let i = 0; i < 5; i++) {
    if (card.rating > i + .5) {
      str += '';
    } else if (card.rating === i + .5) {
      str += '';
    } else {
      str += '';
    }
  }

  const CONSUME = `<dl>
                    <dt class="car-info__consume_road">road: ${card.consume?.road || "not indicated"} </dt>
                    <dt class="car-info__consume_city">city: ${card.consume?.city || "not indicated"} </dt>
                    <dt class="car-info__consume_mixed">mixed: ${card.consume?.mixed || "not indicated"}</dt>
                  </dl>`;

  return `<div class="card">
  <img src="${card.img}" alt="${card.make} ${card.model}" class="car-photo">
  <div class="car-info">
      <h2 class="car-info__make">"${card.make}"</h2>
      <h3 class="car-info__model">"${card.model}"</h3>
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
  printHtml(list, CAR);
})
// -------------------------------------------------------------

/* renderFilterForm(filterFormEl, CAR)

filterFormEl.addEventListener('submit', e => {
  e.preventDefault();
  const query = filterField.map(field => {
    const values = Array.from(filterFormEl[field]).map(input => input.checked && input.value).filter(word => !!word);
    return values;
  })

  CAR = JSON.parse(DATA).filter(car => {
    return query.every(values => {
      return filterField.some(field => {
        return values.length > 0 ? values.includes(String(car[field])) : true;
      })
    })
  })

  printHtml(list, CAR)
}) */


/* filterFormEl.addEventListener('submit', e => {
  e.preventDefault()
  const query = filterFields.map(field => {
    const values = Array.from(filterFormEl[field]).map(input => input.checked && input.value).filter(value => !!value)
    return values
  })
  console.log(query);

  // cars = JSON.parse(DATA).filter(car => {
  //   return query.every(values => {
  //     return filterFields.some(field => {
  //       return values.length > 0 ? values.includes(String(car[field])) : true
  //     })
  //   })
  // })
  cars = JSON.parse(DATA).filter(car => {
    return query.every((values, idx) => {
      return values.length > 0 ? values.includes(String(car[filterFields[idx]])) : true
    })
  })
  renderCardList(listEl, cars)
})
 */

/* function renderFilterForm(elemForRender, dataArray) {
  const filtersHTML = `<div class="fieldsets-wrap">
                            ${createFilterFieldsets(dataArray).join('')}
                      </div>`
  elemForRender.insertAdjacentHTML('afterbegin', filtersHTML)
}
 */

/* function createFilterFieldsets(carsArray) {
  return filterField.map(filed => {
    const values = Array.from(new Set(carsArray.map(car => car[field])));
    return createFilterFieldsets(field, values)
  })
} */

/* function createFilterFielset(field, values) {
  const fieldHTML = values.map(value => createFilterField(field, value)).join('');
  return `<fieldset>
            <legend>${field}</legend>
            ${fieldHTML}
          </fieldset>`
}
 */

/* function createFilterField(field, value) {
  return `<label>
            <input type="checkbox" name="${field}" value="${value}">
            <span>${value}</span>
          </label>`
} */

function renderFilterForm(elemForRender, dataArray) {
  const filtersHTML = `<div class="fieldsets-wrap">
                        ${createFilterFieldset(dataArray).join('')}
                      </div>`;
  elemForRender.insertAdjacentHTML('afterbegin', filtersHTML);
}

function createFilterFieldset(dataArray){
  return filterField.map(field => {
    const values = Array.from(new Set(dataArray.map(car => car[field])));
    return createFilterFielset(field, values);
  })
}

function createFilterFielset(field, values){
  const fieldHTML = values.map(value => createFilterField(field, value)).join('');
  return `<fieldset>
            <legend>${field}</legend>
            ${fieldHTML}
          </fieldset>`
}

function createFilterField(field, value){
  return `<label for="${value}">
            <input type="checkbox" name="${field}" value="${value}" id="${value}">
            <span>${value}</span>
          </label>`
}

renderFilterForm(filterFormEl,CAR);

filterFormEl.addEventListener('submit', e => {
  e.preventDefault();
  /* const query = filterField.map(field => {
    const values = Array.from(filterFormEl[field]).map(input => input.checked && input.value).filter(word => !!word);
    return values;
  }) */
  const query = filterField.map(field => {
    // const values = Array.from(filterFormEl[field]).reduce((total, input) >= (input.checked ? total.push(input.value): true),[])
    // const values = Array.from(filterFormEl[field]).reduce((total, input) >= (input.checked && total.push(input.value)),[]);
    const values = Array.from(filterFormEl[field]).reduce((total, input) => {
      if (input.checked) total.push(input.value);
      return total;
    }, []);
    return values;
  })

  /* CAR = JSON.parse(DATA).filter(car =>{
    return query.every(values => {
      return filterField.some(field => {
        return values.length > 0 ? (values.includes(String(car[field]))) : true;
      })
    })
  }) */

  CAR = JSON.parse(DATA).filter(car=>{
    return query.every((values, idx) => {
      return values.length > 0 ? values.includes(String(car[filterField[idx]])) : true;
    })
  })
  printHtml(list, CAR)
})