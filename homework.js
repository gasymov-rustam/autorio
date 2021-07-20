let CAR = JSON.parse(DATA);
delete CAR[0].consume;
delete CAR[0].seller;
// delete CAR[1].rating;

const list = document.getElementById("list");
const searchFormSquare = document.getElementById("search-form__square");
const searchFormSort = document.getElementById("sortBy");
const searchFormSearch = document.getElementById('search');
const searchCurrentResult = document.getElementById('searchResult');
const carArrLength = CAR.length;

searchFormSquare.addEventListener('click', e => {
  const currentBtn = e.target.closest('button');
  if (currentBtn) {
    const type = currentBtn.dataset.type;
    const listCurrentClass = Array.from(list.classList).find(className => className.includes('cols'));
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

// ------------------------------------------------------------------------------------------
function searchToArrCompire() {
  const searchField = Array.from(arguments);
  return searchField;
}

function searchToBtn(inpBtn) {
  const query = inpBtn.value.trim().toLowerCase().split(' ').filter(word => Boolean(word));
  return query;
}

function searchToResults(arr, inpBtn, searchField) {
  CAR = arr.filter(car => {
    return inpBtn.every(word => {
      return searchField.some(field => {
        return String(car[field]).toLowerCase().includes(word);
      })
    })
  })
  return CAR;
}

function searchShowCurrentResult(arrCurrentLength, arrConstLength) {
  if (arrCurrentLength !== arrConstLength) return true;
  else return false;
}

searchFormSearch.addEventListener('keyup', e => {
  searchToResults(JSON.parse(DATA), searchToBtn(e.target), searchToArrCompire('make', 'model', 'year', 'vin', 'country'));
  if (searchShowCurrentResult(CAR.length, carArrLength)) {
    searchCurrentResult.classList.remove('search-form_disactive');
    searchCurrentResult.value = `found ${CAR.length} results`;
  } else {
    searchCurrentResult.classList.add('search-form_disactive');
  }
  if (e.code === 'Enter') {
    searchCurrentResult.classList.add('search-form_disactive');
    printHtml(list, searchToResults(JSON.parse(DATA), searchToBtn(e.target), searchToArrCompire('make', 'model', 'year', 'vin', 'country')));
  }
})

searchFormSearch.addEventListener('submit', e => {
  e.preventDefault();
  if (!searchShowCurrentResult(CAR.length, carArrLength)) {
    printHtml(list, searchToResults(JSON.parse(DATA), searchToBtn(e.target.searchTo), searchToArrCompire('make', 'model', 'year', 'vin', 'country')));
  }
  searchCurrentResult.classList.add('search-form_disactive');
  printHtml(list, searchToResults(JSON.parse(DATA), searchToBtn(e.target.searchTo), searchToArrCompire('make', 'model', 'year', 'vin', 'country')));
})
// ---------------------------------------------------------------------------------

/* searchFormSearch.addEventListener('submit', e => {
  e.preventDefault();
  const searchField = ['make', 'model', 'year', 'vin', 'country'];
  const query = e.target.searchTo.value.trim().toLowerCase().split(' ').filter(word => Boolean(word));
  console.log(query);
  const cars = JSON.parse(DATA).filter(car => {
    return query.every(word => {
      return searchField.some( field => {
        return String(car[field]).toLowerCase().includes(word);
      })
    })
  })
  printHtml(list, cars);
})
 */

// -----------------------------------------------------------------------------------------------------
/* searchFormSearch.addEventListener('keyup', e => {
  const searchField = ['make', 'model', 'year', 'vin', 'country'];
  const query = e.target.value.trim().toLowerCase().split(' ').filter(word => !!word);
  CAR = JSON.parse(DATA).filter(car => {
    return query.every(word => {
      return searchField.some(field => {
        return String(car[field]).toLowerCase().includes(word);
      })
    })
  })

  if (CAR.length !== carArrLength) {
    searchCurrentResult.classList.remove('search-form_disactive')
    searchCurrentResult.value = `found ${CAR.length} results`;
  } else {
    searchCurrentResult.classList.add('search-form_disactive');
  }

  if (e.code === 'Enter') {
    searchCurrentResult.classList.add('search-form_disactive');
    printHtml(list, CAR);
  }
})

searchFormSearch.addEventListener('submit', e => {
  e.preventDefault();
  searchCurrentResult.classList.add('search-form_disactive');
  printHtml(list, CAR);
  if (CAR.length !== carArrLength) CAR = JSON.parse(DATA);
})
 */
printHtml(list, CAR);

function printHtml(section, arr) {
  return section.innerHTML = carArr(arr).join('');
}

function carArr(arr) {
  return arr.map(car => carCard(car));
}

function carCard(card) {
  let str = '';
  for (let i = 0; i < 5; i++) {
    if (card.rating > i + .5) {
      str += '&#9733';
    } else if (card.rating == i + .5) {
      str += '&#11240;';
    } else {
      str += '&#9734';
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
  </div>`
}

function sortTo(arr, smartKey, order) {
  if (typeof arr[0][smartKey] === 'string') {
    return (a, b) => (a[smartKey].localeCompare(b[smartKey])) * order;
  } else {
    return (a, b) => (a[smartKey] - b[smartKey]) * order;
  }
}

searchFormSort.addEventListener('change', e => {
  const currentInput = e.target.value.toLowerCase().split('/');
  const [key, order] = currentInput;
  CAR.sort(sortTo(CAR, key, order));
  printHtml(list, CAR)
})
