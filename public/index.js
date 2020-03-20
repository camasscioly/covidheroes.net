const base = 'http://localhost:3000/v1/';

async function query(endpoint) {
  const res = await fetch(`${base}${endpoint}`);
  const body = res.json();
  return body;
}

function addEntry(key, val) {
  document.querySelector('#table').innerHTML += `<tr>
    <th scope="row">${key}</th>
    <td>${val}</td>
  </tr>`;
}

async function init() {
  const res = await query('us');
  console.log(res);
  for (const prop in res) {
    addEntry(prop, res[prop][0]);
  }
}

init();