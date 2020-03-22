const base = `${window.location.origin}/v1/`;
if (localStorage.getItem('member')) {
  let offerList;
  function killOffer(id) {
    postData(`${base}offer/remove`, {
      id
    }).then((data) => {

    });
  } 

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.text(); // parses JSON response into native JavaScript objects
  }

  function addEntry(title, author, date, tags, id, dom) {
    document.querySelector(dom).innerHTML += `<tr id="${id}">
    <th scope="row">${title}</th>
    <td><a href="${window.location.origin}/profile?name=${author}">${author}</a></td>
    <td>${date}</td>
    <td>${tags}</td>
    <td>${id}</td>
    <td><button class="btn btn-danger" onclick="if (localStorage.getItem('name') === '${author}') document.getElementById('${id}').remove(); killOffer('${id}')">Close</button></td>
  </tr>`;
  }

  fetch(`${window.location.origin}/v1/offer`)
    .then((res) => res.json())
    .then((body) => {
      body.offerList.reverse().forEach((offer) => {
        const { title, author, date, tags, id } = offer;
        addEntry(title, author, date, tags, id, '#table');
      });
      offerList = body.offerList.reverse();
    });

  document.querySelector('#offers').onsubmit = () => {
    postData(`${base}offer`, {
      title: document.querySelector('#title').value,
      author: localStorage.getItem('name'),
      date: new Date().toLocaleDateString('en-US'),
      tags: document.querySelector('#title').value,
    }).then((data) => {
      location.reload();
    });
    return false;
  };
} else {
  window.location = `${window.location.origin}/login`;
}
