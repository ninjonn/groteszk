/**
 * Létrehoz egy dinamikus űrlapot
 * @returns {HTMLFormElement} A létrehozott űrlap elem
 */
function generateForm() {
    // Űrlap létrehozása és beállítása
    const form = document.createElement('form');
    form.id = 'form';
    form.action = '#';

    // Az űrlap mezőinek adatai
    const fields = [
        {
            label: 'Származás:',
            type: 'text',
            id: 'szarmazas',
            errorText: 'Kötelező mező'
        },
        {
            label: '1. szerző:',
            type: 'text',
            id: 'szerzo1',
            errorText: 'Kötelező mező'
        },
        {
            label: '1. szerző műve:',
            type: 'text',
            id: 'szerzo1mu',
            errorText: 'Kötelező mező'
        },
        {
            label: '2. szerző:',
            type: 'text',
            id: 'szerzo2',
            errorText: 'Ki kell tölteni'
        },
        {
            label: '2. szerző műve:',
            type: 'text',
            id: 'szerzo2mu',
            errorText: 'Ki kell tölteni'
        }
    ];

    // Mezők hozzáadása for ciklussal
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        // Div létrehozása az adott mezőhöz
        const div = document.createElement('div');

        // Label létrehozása és beállítása
        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = field.label;
        div.appendChild(label);
        div.appendChild(document.createElement('br'));

        // Input mező létrehozása 
        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        div.appendChild(input);

        // Hibajelző span létrehozása
        const span = document.createElement('span');
        span.id = 'error-' + field.id;
        span.className = 'error';
        span.textContent = field.errorText;
        div.appendChild(span);

        // Új sor beszúrása a tagoltság érdekében
        div.appendChild(document.createElement('br'));

        // A div hozzáadása az űrlaphoz, majd egy extra sortörés
        form.appendChild(div);
        form.appendChild(document.createElement('br'));
    }

    // Submit gomb létrehozása és hozzáadása az űrlaphoz
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Hozzáadás';
    form.appendChild(button);

    // Az űrlap hozzáadása a dokumentum body részéhez
    document.body.appendChild(form);
    return form;
}

/**
 * Táblázat fejlécének generálása
 * @param {HTMLTableElement} table A táblázat, amelyhez a fejlécet hozzáadja
 */
function generateTableHeader(table) {
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    thead.appendChild(headerRow);

    // Fejléc cellák címei
    const headers = ['Nemzetiség', 'Szerző', 'Mű'];
    for (const header of headers) {
        const th = document.createElement('th');
        th.innerHTML = header;
        headerRow.appendChild(th);
    }
    table.appendChild(thead);
}

/**
 * Létrehoz egy táblázati cellát, beállítja a tartalmát, valamint opcionálisan a rowSpan értékét, majd hozzáadja azt a megadott sorhoz
 * @param {HTMLTableRowElement} row - A sor, amelyhez a cellát hozzáadja
 * @param {string} content - A cella tartalma
 * @param {number} [rowSpan=1] - A cella rowSpan értéke
 * @returns {HTMLTableCellElement} Az elkészített cella
 */
function createCell(row, content, rowSpan = 1) {
    const cell = document.createElement('td');
    cell.innerHTML = content;
    cell.rowSpan = rowSpan;
    row.appendChild(cell);
    return cell;
}

/**
 * Létrehozza a Nemzetiség cellát a megfelelő rowSpan értékkel
 * @param {HTMLTableRowElement} row - A sor, amelyhez a cellát hozzáadja
 * @param {Object} item - Az adatobjektum, amely tartalmazza a nemzetiséget és esetleg a szerzőket
 */
function addNemzetisegCell(row, item) {
    const rowSpan = item.szerzo2 ? 2 : 1;
    createCell(row, item.nemzetiseg, rowSpan);
}

/**
 * Létrehozza és hozzáadja az első szerző és mű cellákat a megadott sorhoz
 * @param {HTMLTableRowElement} row - A sor, amelyhez a cellákat hozzáadja
 * @param {Object} item - Az adatobjektum, amely tartalmazza az első szerzőt és az első művet
 */
function addElssoSzerzoEsMu(row, item) {
    createCell(row, item.szerzo1);
    createCell(row, item.mu1);
}

/** 
 * Táblázat generálása a megadott adatok alapján
 * @param {HTMLTableElement} table - A táblázat, amelyhez a törzs tartalmát hozzáadja
 * @param {Array<Object>} data A táblázat sorainak adatait tartalmazó tömb
 */
function generateTable(table, data) {
    table.innerHTML = '';
    generateTableHeader(table);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (const item of data) {
        const row = document.createElement('tr');
        tbody.appendChild(row);

        // Nemzetiség cella létrehozása a megfelelő rowSpan értékkel
        addNemzetisegCell(row, item);
        // Első szerző és mű cellák hozzáadása
        addElssoSzerzoEsMu(row, item);

        if (item.szerzo2) {
            const row2 = document.createElement('tr');
            tbody.appendChild(row2);
            // Második szerző és mű cellák létrehozása (itt manuálisan hívjuk meg a createCell-t)
            createCell(row2, item.szerzo2);
            createCell(row2, item.mu2);
        }
    }
}

/**
 * Validálja az adott űrlap mezőt.
 * Ha a mező üres, megjeleníti a hozzá tartozó hibaüzenetet, és false értékkel tér vissza.
 * @param {HTMLInputElement} inputElement - Az űrlap mezője
 * @param {HTMLElement} errorElement - A mező alatti hibaüzenet elem
 * @returns {boolean} True, ha a mező nem üres, különben false
 */
function validateField(inputElement, errorElement) {
    errorElement.style.display = 'none';
    if (inputElement.value === "") {
        errorElement.style.display = 'block';
        return false;
    }
    return true;
}

/**
 * Komplex validáció az opcionális "2. szerző" mezőkre.
 * Ha a felhasználó bármelyik mezőt kitöltötte, akkor mindkettő kitöltése kötelező.
 * Ha csak az egyik üres, akkor a megfelelő hibaüzenet megjelenik.
 * @param {HTMLInputElement} szerzo2Element - A 2. szerző mezője
 * @param {HTMLInputElement} szerzo2muElement - A 2. szerző műve mezője
 * @returns {boolean} True, ha a validáció sikeres, különben false
 */
function complexValidation(szerzo2Element, szerzo2muElement) {
    const errorSzerzo2 = document.getElementById('error-szerzo2');
    const errorSzerzo2mu = document.getElementById('error-szerzo2mu');
    errorSzerzo2.style.display = 'none';
    errorSzerzo2mu.style.display = 'none';

    // Ha bármelyik mező kitöltött, akkor mindkettőt meg kell adni
    if (szerzo2Element.value || szerzo2muElement.value) {
        if (!szerzo2Element.value) {
            errorSzerzo2.style.display = 'block';
            return false;
        }
        if (!szerzo2muElement.value) {
            errorSzerzo2mu.style.display = 'block';
            return false;
        }
    }
    return true;
}
