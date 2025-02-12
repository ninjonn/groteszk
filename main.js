const table = document.createElement('table');
document.body.appendChild(table);

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
function generateTable(table,data) {
  table.innerHTML = ''; 
  generateTableHeader(table); 
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  
  for (const item of data) {
    const row = document.createElement('tr');
    tbody.appendChild(row);
    
    const nemzetisegCell = document.createElement('td');
    nemzetisegCell.innerHTML = item.nemzetiseg;
    nemzetisegCell.rowSpan = item.szerzo2 ? 2 : 1;
    row.appendChild(nemzetisegCell);
    
    const szerzo1Cell = document.createElement('td');
    szerzo1Cell.innerHTML = item.szerzo1;
    row.appendChild(szerzo1Cell);
    
    const mu1Cell = document.createElement('td');
    mu1Cell.innerHTML = item.mu1;
    row.appendChild(mu1Cell);
    
    if (item.szerzo2) {
      const row2 = document.createElement('tr');
      tbody.appendChild(row2);
      
      const szerzo2Cell = document.createElement('td');
      szerzo2Cell.innerHTML = item.szerzo2;
      row2.appendChild(szerzo2Cell);
      
      const mu2Cell = document.createElement('td');
      mu2Cell.innerHTML = item.mu2;
      row2.appendChild(mu2Cell);
    }
  }
}

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
generateTable(table,tableData);
