const base = `${window.location.origin}/v1/`;

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}


document.querySelector('#login').onsubmit = () => {
  postData(`${base}login`, { name: document.querySelector('#name').value, password: document.querySelector('#password').value })
    .then((data) => {
      const { name, email, phone, location, password, id } = data;
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('phone', phone);
      localStorage.setItem('location', location);
      localStorage.setItem('password', password);
      localStorage.setItem('id', id);
      localStorage.setItem('member', true);
      window.location = `${window.location.origin}/me`;
    });
  return false;
}