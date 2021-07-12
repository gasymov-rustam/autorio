const CAR = JSON.parse(DATA);
delete CAR[0].consume;
delete CAR[0].seller;
const list = document.getElementById('list');
console.log(CAR);

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

/*
printCardsHtml(list, CAR);

function printCardsHtml(section, arrCars) {
    return section.innerHTML = carsArr(arrCars).join('');
}

function carsArr(carsArr) {
    return carsArr.map(car => carInfo(car));
}

function carInfo(car) {
    return `<div class="card">
                <img src="${car.img}" alt="${car.make} ${car.model}" class="car-photo">
                <div class="car-info">
                    <h2 class="car-info__make">"${car.make}"</h2>
                    <h3 class="car-info__model">"${car.model}"</h3>
                    <p class="car-info__country">
                        country - ${car.country}
                    </p>
                    <p class="car-info__color">
                        color - ${car.color}
                    </p>
                    <p class="car-info__year">
                        year - ${car.year}
                    </p>
                    <p class="car-info__engine-volume">
                        engine volume - ${car.engine_volume}
                    </p>
                    <p class="car-info__transmission">
                        transmission - ${car.transmission}
                    </p>
                    <p class="car-info__odo">
                        odo - ${car.odo}
                    </p>
                    <p class="car-info__fuel">
                        fuel - ${car.fuel}
                    </p>
                    <p class="car-info__seller">
                        seller - ${car.seller}
                    </p>
                    <p class="car-info__price">
                        price - ${car.price}$
                    </p>
              </div>
            </div>`
}*/
