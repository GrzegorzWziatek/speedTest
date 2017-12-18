import Data from './generate.js';

const generateCell = (text) => {
    const td = document.createElement('td');
    const textNode = document.createTextNode(text);
    td.appendChild(textNode);
    return td;
};

const generateRow = (data) => {
    const row = document.createElement('tr');
    row.appendChild(generateCell(data.id));
    row.appendChild(generateCell(data.adjective));
    row.appendChild(generateCell(data.color));
    row.appendChild(generateCell(data.thing));
    return row;
};

const tbody = document.querySelector('tbody');
const loadEnd = new Date().getTime();

let iteration = localStorage.getItem('iteration:vanilla') || 0;
const testData = JSON.parse(localStorage.getItem('test:vanilla') || '[]');

function generate() {
    let data = new Data().generate();
    const generateStart = new Date().getTime();
    data.forEach( (item) => {
        tbody.appendChild(generateRow(item));
    });
    const generateEnd = new Date().getTime();


    testData.push({
        loadTime: loadEnd - loadStart,
        generationTime: generateEnd - generateStart,
        iteration: iteration
    });

    setTimeout(() => {
        regenerate();
    }, 3000)


}

function regenerate() {
    while(tbody.firstChild) {
        tbody.firstChild.remove();
    }

    let data = new Data().generate();
    const generateStart = new Date().getTime();
    data.forEach( (item) => {
        tbody.appendChild(generateRow(item));
    });
    const generateEnd = new Date().getTime();

    testData[iteration].regenerate = generateEnd - generateStart;
    iteration++;
    localStorage.setItem('iteration:vanilla', iteration);
    localStorage.setItem('test:vanilla', JSON.stringify(testData));


    if (!stop) {
        console.log(stop);
        setTimeout(() => {
            window.location.reload();
        }, 5000)
    }

}

setTimeout(() => {
    generate()
}, 1000);
