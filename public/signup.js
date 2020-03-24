const matchHtmlRegExp = /["'&<>]/;

window.onload = () => {
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
      name: esc(DOMPurify.sanitize(document.querySelector('#name').value)).substring(0, 50),
      email: esc(DOMPurify.sanitize(document.querySelector('#email').value)).substring(0, 50),
      phone: esc(DOMPurify.sanitize(document.querySelector('#phone').value)).substring(0, 50),
      location: esc(DOMPurify.sanitize(document.querySelector('#location').value)).substring(0, 100),
      password: esc(DOMPurify.sanitize(document.querySelector('#password').value)).substring(0, 50),
    }).then((data) => {
      if (data === 'Already Registered') return alert('This username is already taken.');
      window.location = `${window.location.origin}/login`;
    });
    return false;
  };
};

function esc(string) {
  const str = `${string}`;
  const match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str
  }

  let escape;
  let html = '';
  let index = 0;
  let lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;'
        break
      case 38: // &
        escape = '&amp;'
        break
      case 39: // '
        escape = '&#39;'
        break
      case 60: // <
        escape = '&lt;'
        break
      case 62: // >
        escape = '&gt;'
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escape
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html
}

function enable() {
  document.querySelector('#submit').disabled = false;
}