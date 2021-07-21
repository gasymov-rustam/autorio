const filterByManufacturer = document.getElementById('filterByManufacturer');
const filterByTransmission = document.getElementById('filterByTransmission');
const filterByCountry = document.getElementById('filterByCountry');
const searchFiltersBtn = document.getElementById('formResults');

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
    // let arr = [];
    let str = '';
    Array.from(id.children).forEach(label => {
        Array.from(label.children).forEach(labelChild => {
            if (labelChild.closest('input')) {
                if (labelChild === pos) {
                    if (labelChild.checked){
                    labelChild.checked;
                    str = labelChild.value.trim().toLowerCase();
                }
                } else {
                    labelChild.checked = false;
                }
            }
        })
    });
    return str;
}

let filterResultofManufacturer = '', filterResultofTransmission = '', filterResultofCountry = '';

filterByManufacturer.addEventListener('change', e => {
   filterResultofManufacturer = currentFilterAllCars(filterByManufacturer, e.target);
});

filterByTransmission.addEventListener('change', e => {
    filterResultofTransmission = currentFilterAllCars(filterByTransmission, e.target)
});

filterByCountry.addEventListener('change', e => {
    filterResultofCountry = currentFilterAllCars(filterByCountry, e.target);
});

searchFiltersBtn.addEventListener('click', e => {
    let filterResult = [];
    filterResult.push(filterResultofManufacturer, filterResultofTransmission, filterResultofCountry);
    console.log(filterResult);
    printHtml(list, searchToResults(JSON.parse(DATA), filterResult, searchToArrCompire('make', 'transmission', 'country')));
})