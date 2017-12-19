window.loadStart = new Date().getTime();
window.stopMeasure = false;
function stopTest() {
    window.stopMeasure = true;
}

function showResults() {
    const thead = document.querySelector('#result thead');
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

    const tbody = document.querySelector('#result tbody');
    while (tbody.firstChild) {
        tbody.firstChild.remove();
    }

    const testData = JSON.parse(localStorage.getItem('test:react') || '[]');
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
    });

    document.getElementById('generated').style.display = 'none';
    document.getElementById('result').style.display = '';
}