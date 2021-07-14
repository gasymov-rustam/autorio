const CAR = JSON.parse(DATA);
delete CAR[0].consume;
delete CAR[0].seller;
// delete CAR[1].rating;
const list = document.getElementById('list');
const searchFormSquare = document.getElementById('search-form__square');
const searchFormSort = document.getElementById('sort');

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

printHtml(list, CAR);

function printHtml(section, arr) {
    return section.innerHTML = carsArray(arr).join('');
}

function carsArray(cars) {
    return cars.map(car => cardInfoHtml(car));
}

function cardInfoHtml(card) {
    let str = '';
    for (let i = 1; i <= 5; i++) {
        if (card.rating >= 0) {
            if (card.rating >= i) {
                str += '&#9733;';
            } else if (Math.round(card.rating) == i && !Number.isInteger(card.rating)) {
                str += '&#11240;';
            } else {
                str += '&#9734;';
            }
        }
    }

    const CONSUME = `<dl>
                    <dt class="car-info__consume_road">road: ${card.consume?.road || 'not indicated'}</dt>
                    <dt class="car-info__consume_city">city: ${card.consume?.city || 'not indicated'}</dt>
                    <dt class="car-info__consume_mixed">mixed: ${card.consume?.mixed || 'not indicated'}</dt>
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
                        <dd>${str || 'not inspected'}</dd>
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
                        <dd>${card?.seller || 'not indicated'}</dd>    
                    </div>
                </dl>
            </div>
        </div>`
}

function sortToHighest (sortKey){
    return (a,b) => a[sortKey] - b[sortKey];
}

function sortToLowest (sortKey){
    return (a,b) => (a[sortKey] - b[sortKey]) *-1;
}

// searchFormSort.addEventListener('change', function (e) {
searchFormSort.addEventListener("change", e => {
    const currentSort = e.target.value;
    if (currentSort == 1) {
        CAR.sort(sortToHighest('price'));
        printHtml(list, CAR);
    }
    if (currentSort == 2) {
        CAR.sort(sortToLowest('price'));
        printHtml(list, CAR);
    }
    if (currentSort == 3) {
        CAR.sort(sortToLowest('rating'));
        printHtml(list, CAR);
    }
    if (currentSort == 4) {
        CAR.sort(sortToHighest('rating'));
        printHtml(list, CAR);
    }
})



