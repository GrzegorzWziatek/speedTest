const loadStart = new Date().getTime();
var stop = false;
function stopTest() {
    stop = true;
}

function showResults() {
    const thead = document.querySelector('thead');
    while (thead.firstChild) {
        thead.firstChild.remove();
    }
    let th = document.createElement('th');
    th.innerText = 'Iteration';
    thead.appendChild(th);
    th = document.createElement('th');
    th.innerText = 'Load time';
    thead.appendChild(th);
    th = document.createElement('th');
    th.innerText = 'Generate time';
    thead.appendChild(th);
    th = document.createElement('th');
    th.innerText = 'Regenearte time';
    thead.appendChild(th);

    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
        tbody.firstChild.remove();
    }

    const testData = JSON.parse(localStorage.getItem('test:vanilla') || '[]');
    testData.forEach((item) => {
        const tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerText = item.iteration;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerText = item.loadTime;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerText = item.generationTime;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerText = item.regenerate;
        tr.appendChild(td);

        tbody.appendChild(tr);
    })
}