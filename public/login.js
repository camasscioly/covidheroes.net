const matchHtmlRegExp = /["'&<>]/;

window.onload = () => {
  if (localStorage.getItem('name')) window.location = `${window.location.origin}/me`;
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
    try {
      return await response.json(); // parses JSON response into native JavaScript objects
    } catch (err) {
      alert('Invalid Login')
    }
  }

  document.querySelector('#login').onsubmit = () => {
    postData(`${base}login`, {
      name: document.querySelector('#name').value.toLowerCase(),
      password: document.querySelector('#password').value,
    }).then((data) => {
      const { name, email, phone, location, password, id, staff } = data;
      localStorage.setItem('name', esc(DOMPurify.sanitize(name.trim())));
      localStorage.setItem('email', esc(DOMPurify.sanitize(email)));
      localStorage.setItem('phone', esc(DOMPurify.sanitize(phone)));
      localStorage.setItem('location', esc(DOMPurify.sanitize(location)));
      localStorage.setItem('password', esc(DOMPurify.sanitize(document.querySelector('#password').value)));
      localStorage.setItem('id', esc(DOMPurify.sanitize(id)));
      if (staff) localStorage.setItem('admin', true);
      localStorage.setItem('member', true);
      document.cookie = 'member=true';
      window.location = `${window.location.origin}/me`;
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

function makeid(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};
