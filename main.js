const table = document.createElement('table');
document.body.appendChild(table);

const tableData = [
    {
        nemzetiseg: 'Orosz',
        szerzo1: 'Gogol',
        mu1: 'A köpönyeg',
        szerzo2: 'Csehov',
        mu2: 'A csinovnyik halála'
    },
    {
        nemzetiseg: 'Cseh',
        szerzo1: 'Franz Kafka',
        mu1: 'Az átváltozás'
    },
    {
        nemzetiseg: 'Magyar',
        szerzo1: 'Örkény István',
        mu1: 'Egyperces Novellák',
        szerzo2: 'József Attila',
        mu2: 'Klárisok'
    },
    {
        nemzetiseg: 'Svájc',
        szerzo1: 'Friedrich Dürrenmatt',
        mu1: 'A fizikusok'
    }
];
generateTable(table, tableData);

const formElement = generateForm();

formElement.addEventListener('submit', function (event) {
    event.preventDefault();

    // Input elemek lekérése
    const szarmazas = document.getElementById('szarmazas');
    const szerzo1 = document.getElementById('szerzo1');
    const szerzo1mu = document.getElementById('szerzo1mu');
    const szerzo2 = document.getElementById('szerzo2');
    const szerzo2mu = document.getElementById('szerzo2mu');

    // Hibaüzenet elemek lekérése
    const errorSzarmazas = document.getElementById('error-szarmazas');
    const errorSzerzo1 = document.getElementById('error-szerzo1');
    const errorSzerzo1mu = document.getElementById('error-szerzo1mu');

    // Kötelező mezők validálása
    const validSzarmazas = validateField(szarmazas, errorSzarmazas);
    const validSzerzo1 = validateField(szerzo1, errorSzerzo1);
    const validSzerzo1mu = validateField(szerzo1mu, errorSzerzo1mu);

    if (!(validSzarmazas && validSzerzo1 && validSzerzo1mu)) {
        return;
    }

    // Opcionális mezők validálása
    if (!complexValidation(szerzo2, szerzo2mu)) {
        return;
    }

    // Új adat objektum létrehozása
    const newElement = {
        nemzetiseg: szarmazas.value,
        szerzo1: szerzo1.value,
        mu1: szerzo1mu.value,
        szerzo2: szerzo2.value,
        mu2: szerzo2mu.value
    };

    const tbody = table.querySelector('tbody');

    // Ha mindkét 2.szerző mező ki van töltve, 2 sort adunk hozzá
    if (newElement.szerzo2 && newElement.mu2) {
        const row = document.createElement('tr');
        tbody.appendChild(row);
        createCell(row, newElement.nemzetiseg, 2);
        createCell(row, newElement.szerzo1);
        createCell(row, newElement.mu1);

        const row2 = document.createElement('tr');
        tbody.appendChild(row2);
        createCell(row2, newElement.szerzo2);
        createCell(row2, newElement.mu2);
    } else {
        // Ha a 2. szerző mezők üresek, csak egy egysoros elemet fűzünk hozzá
        const row = document.createElement('tr');
        tbody.appendChild(row);
        createCell(row, newElement.nemzetiseg);
        createCell(row, newElement.szerzo1);
        createCell(row, newElement.mu1);
    }
    formElement.reset()
});