const base = `${window.location.origin}/v1/`;

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

document.querySelector('#signup').onsubmit = () => {
  postData(`${base}signup`, {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    phone: document.querySelector('#phone').value,
    location: document.querySelector('#location').value,
    password: document.querySelector('#password').value,
  }).then((data) => {
    window.location = `${window.location.origin}/login`;
  });
  return false;
};