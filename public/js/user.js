const matchHtmlRegExp = /["'&<>]/;
const base = `${window.location.origin}/v1/`;

window.onload = async () => {
  if (localStorage.getItem('name')) {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const location = localStorage.getItem('location');
    const id = localStorage.getItem('id');
    const color = localStorage.getItem('color');
    const password = localStorage.getItem('password');

    document.querySelector('#name').value = DOMPurify.sanitize(name);
    document.querySelector('#email').value = DOMPurify.sanitize(email);
    if (window.location.href.includes('configure')) {
      if (location === 'Not Configured') {
        document.querySelector('#location').placeholder = DOMPurify.sanitize(location);
        document.querySelector('#location').value = '';
      } else document.querySelector('#location').value = DOMPurify.sanitize(location);
    } else {
      document.querySelector('#location').value = DOMPurify.sanitize(location);
    }
    document.querySelector('#phone').value = DOMPurify.sanitize(phone);
    document.querySelector('#password').value = DOMPurify.sanitize(password);
    try {
      if (document.querySelector('#color').value) document.querySelector('#color').value = color;
    } catch (err) {
      console.log(err);
    }
    // document.querySelector('#id').value = DOMPurify.sanitize(id);
    // const { rep } = await fetch(`${base}userdata?id=${DOMPurify.sanitize(id)}`)
    //   .then((res) => res.json())
    // document.querySelector('#rep').value = DOMPurify.sanitize(rep.length);
  } else {
    window.location = `${window.location.origin}/login`;
  }
  document.querySelector('#submit').onsubmit = (event) => {
    event.preventDefault();
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
        return await response.text(); // parses JSON response into native JavaScript objects
      } catch (err) {
        alert('Oops, something went wrong.');
      }
    }
    const base = `${window.location.origin}/v1/`;

    function validateEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if (!window.location.href.includes('configure')) {
      if (
        esc(DOMPurify.sanitize(document.querySelector('#name').value))
          .substring(0, 50)
          .toLowerCase()
          .replace(/[^a-z0-9]/gi, '')
          .replace(/\s/g, '') !==
        esc(DOMPurify.sanitize(document.querySelector('#name').value)).substring(0, 50)
      ) {
        alert('Username must be alphanumeric, lowercase, and contain no spaces.');
        return false;
      }

      if (
        !validateEmail(
          esc(DOMPurify.sanitize(document.querySelector('#email').value)).substring(0, 50)
        )
      ) {
        if (document.querySelector('#email').value !== localStorage.getItem('email')) {
          alert('Invalid Email');
          return false;
        }
      }

      if (
        !esc(DOMPurify.sanitize(document.querySelector('#phone').value))
          .substring(0, 50)
          .match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
      ) {
        if (document.querySelector('#phone').value !== localStorage.getItem('phone')) {
          alert('Invalid Phone Number');
          return false;
        }
      }

      if (
        localStorage.getItem('password') !==
        esc(DOMPurify.sanitize(document.querySelector('#password').value)).substring(0, 50)
      ) {
        let userPass = prompt('What is your current password?');
        if (localStorage.getItem('password') !== userPass) {
          alert('Incorrect password.');
          return false;
        }
      }
    }

    if (
      window.location.href.includes('configure') &&
      (document.querySelector('#location').value === '' ||
        document.querySelector('#location').value.toLowerCase() === 'not configured' ||
        document.querySelector('#location').value.length < 3)
    ) {
      alert('Please set a real location.');
      return false;
    }
    let col;
    try {
      col = document.querySelector('#color').value;
    } catch (err) {
      col = '#000000';
    }
    postData(`${base}update`, {
      name: esc(DOMPurify.sanitize(document.querySelector('#name').value))
        .substring(0, 50)
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, '')
        .replace(/\s/g, '')
        .trim(),
      email: esc(DOMPurify.sanitize(document.querySelector('#email').value)).substring(0, 50),
      phone: esc(DOMPurify.sanitize(document.querySelector('#phone').value)).substring(0, 50),
      location: esc(DOMPurify.sanitize(document.querySelector('#location').value)).substring(
        0,
        100
      ),
      color: col,
      password: esc(DOMPurify.sanitize(document.querySelector('#password').value)).substring(0, 50),
      id: localStorage.getItem('id'),
      original: localStorage.getItem('name'),
      csrf: document.querySelector('#csrf').value,
    }).then((data) => {
      if (data === 'Error!') return alert('Oops! Something went wrong.');
      if (data === 'Already Registered') return alert('Username already taken');
      localStorage.setItem(
        'name',
        esc(DOMPurify.sanitize(document.querySelector('#name').value))
          .substring(0, 50)
          .toLowerCase()
          .replace(/[^a-z0-9]/gi, '')
          .replace(/\s/g, '')
      );
      localStorage.setItem(
        'email',
        esc(DOMPurify.sanitize(document.querySelector('#email').value)).substring(0, 50)
      );
      localStorage.setItem(
        'phone',
        esc(DOMPurify.sanitize(document.querySelector('#phone').value)).substring(0, 50)
      );
      localStorage.setItem(
        'location',
        esc(DOMPurify.sanitize(document.querySelector('#location').value)).substring(0, 100)
      );
      localStorage.setItem(
        'password',
        esc(DOMPurify.sanitize(document.querySelector('#password').value)).substring(0, 50)
      );
      try {
        localStorage.setItem('color', document.querySelector('#color').value);
      } catch (err) {
        localStorage.setItem('color', '#000000');
      }
      if (window.location.href.includes('configure')) location = `${location.origin}/submissions`;
      else location.reload();
      return false;
    });
  };
};

function enable() {
  document.querySelector('#save').disabled = false;
}

function esc(string) {
  const str = `${string}`;
  const match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  let escape;
  let html = '';
  let index = 0;
  let lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
