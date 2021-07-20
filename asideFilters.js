const filterByManufacturer = document.getElementById('filterByManufacturer');
const filterByTransmission = document.getElementById('filterByTransmission');
const filterByCountry = document.getElementById('filterByCountry');

function arrNewFromProperty(arr, smartKey) {
    let CARMake = [];
    let CARNewMake = [];
    arr.map(car => {
        return CARMake.push(car[smartKey]);
    })
    CARNewMake = CARMake.filter((item, pos) => CARMake.indexOf(item) == pos);
    return CARNewMake;
}

function filterGenerationField(section, arr) {
    return section.innerHTML = filterField(arr);
}

function filterField(arr) {
    let str = '';
    let abd = '';
    for (let i = 0; i < arr.length; i++) {
        str += `<label class="sideBarFilters__inscription"> 
                    <input class="sideBarFilters__check" type="checkbox" value="${arr[i]}">
                    <span>${arr[i]}</span>
                </label>`;
    }

    return str;
}

filterGenerationField(filterByManufacturer, arrNewFromProperty(CAR, 'make'));
filterGenerationField(filterByTransmission, arrNewFromProperty(CAR, 'transmission'));
filterGenerationField(filterByCountry, arrNewFromProperty(CAR, 'country'));

function currentFilterAllCars(id, pos) {
    let currentInp = pos.closest('input')
    let arr = [];
    Array.from(id.children).forEach(label => {
        Array.from(label.children).forEach(labelChild => {
            if (labelChild.closest('input')) {
                if (labelChild === pos) {
                    labelChild.checked;
                    arr.push(labelChild.value.trim().toLowerCase())
                } else {
                    labelChild.checked = false;
                }
            }
        })
    });
    return arr;
}

filterByManufacturer.addEventListener('change', e => {
    printHtml(list, searchToResults(JSON.parse(DATA), currentFilterAllCars(filterByManufacturer, e.target), searchToArrCompire('make', 'transmission', 'country')));
});


filterByTransmission.addEventListener('change', e => {
    printHtml(list, searchToResults(JSON.parse(DATA), currentFilterAllCars(filterByTransmission, e.target), searchToArrCompire('make', 'transmission', 'country')));
});

filterByCountry.addEventListener('change', e => {
    printHtml(list, searchToResults(JSON.parse(DATA), currentFilterAllCars(filterByCountry, e.target), searchToArrCompire('make', 'transmission', 'country')));
});