const CAR = JSON.parse(DATA);
delete CAR[0].consume;
delete CAR[0].seller;
delete CAR[1].rating;
const list = document.getElementById('list');

/*
masonryBtnsEl.addEventListener('click', event => {
    const currentBtn = event.target.closest('button')
    if (currentBtn) {
        const type = currentBtn.dataset.type
        const listElCurrentClass = Array.from(listEl.classList).find(className => className.includes('cols'))
        listEl.classList.remove(listElCurrentClass)
        listEl.classList.add(`cols-${type}`)
        Array.from(masonryBtnsEl.children).forEach(btn => {
            if (btn === currentBtn) {
                btn.classList.add('active')
            } else{
                btn.classList.remove('active')
            }
        })
    }
})
*/


const abd = {
    "id": "89aed5b8c686ebd713a62873e4cd756abab7a106",
    "make": "BMW",
    "model": "M3",
    "year": 2010,
    "img": "http://dummyimage.com/153x232.jpg/cc0000/ffffff",
    "color": "Goldenrod",
    "vin": "1G6DW677550624991",
    "country": "United States",
    "rating": 1,
    "price": 2269,
    "views": 5,
    "seller": "Ellery Girardin",
    "vin_check": true,
    "top": false,
    "timestamp": 1601652988000,
    "phone": "+1 (229) 999-8553",
    "fuel": "Benzin",
    "engine_volume": 1.4,
    "transmission": "CVT",
    "odo": 394036,
    "consume": {
        "city": 12.3,
        "mixed": 8.4
    }
}

printHtml(list, CAR);

function printHtml(section, arr) {
    return section.innerHTML = carsArray(arr).join('');
}

function carsArray(cars) {
    return cars.map(car => cardInfoHtml(car));
}

function cardInfoHtml(card) {
    // let a = 3.5;
    // console.log(Math.round(a));
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


