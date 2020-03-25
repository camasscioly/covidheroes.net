let killOffer;
const matchHtmlRegExp = /["'&<>]/;

window.onload = () => {
  if (localStorage.getItem('name')) {
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
        alert(`You've already repped this user!`);
      }
    }

    async function addEntry(title, author, date, tags, id, dom, authorid) {
      const close = `<button class="btn btn-danger" onclick="if (localStorage.getItem('id') === '${authorid}' || localStorage.getItem('admin')) { if (confirm('Do you want to close request ${id}?')) { document.getElementById('${id}').remove(); killOffer('${id}') } }"><i class="fas fa-times"></i> Close</button>`;
      const fulfill = ` <button class="btn btn-danger" onclick="window.location = '${window.location.origin}/requests/open?id=${id}'"><i class="fas fa-book-open"></i> Open</button>`;
      document.querySelector(dom).innerHTML += `<tr id="${id}">
        <th scope="row"><p>${title}</p></th>
        <td><p>${date}</p></td>
        <td><p>${tags}</p></td>
        <td>${id}</td>
        <td>${localStorage.getItem('name') === author || localStorage.getItem('admin')  ? fulfill + close : fulfill}</td>
      </tr>`;
    }

    const base = `${window.location.origin}/v1/`;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id === localStorage.getItem('id')) {
      window.location = `${window.location.origin}/me`;
      return;
    }
    fetch(`${base}userdata?id=${id}`)
      .then((res) => res.json())
      .then((body) => {
        const { email, name, location, rep } = body;
        document.querySelector('#name').value = name;
        document.querySelector('#rep').value = rep.length;
        document.querySelector('#email').value = email;
        document.querySelector('#phone').value = phone;
        document.querySelector('#location').value = location;
      })
      .catch((err) => {
        alert('Oops! Something went wrong...');
        location = window.location.origin;
      });
    document.querySelector('#give-rep').onclick = () => {
      if (!confirm('Are you sure you want to rep this user? This is permanent.')) return;
      postData(`${base}userdata/rep`, {
        rep: localStorage.getItem('id'),
        id,
      }).then((data) => {
        location.reload();
        return false;
      });
    };
    fetch(`${window.location.origin}/v1/offer`)
      .then((res) => res.json())
      .then((body) => {
        body.offerList.reverse().forEach((offer) => {
          const { title, author, date, tags, authorid } = offer;
          //if (id !== offer.id) return;
          addEntry(
            esc(DOMPurify.sanitize(title)).substring(0, 30),
            esc(DOMPurify.sanitize(author)),
            esc(DOMPurify.sanitize(date)),
            esc(DOMPurify.sanitize(tags)),
            esc(DOMPurify.sanitize(offer.id)),
            '#table',
            esc(DOMPurify.sanitize(authorid)),
          );
        });
        offerList = body.offerList.reverse();
      });
  } else {
    window.location = `${window.location.origin}/login`;
  }
};

function enable2() {
  document.querySelector('#give-rep').disabled = false;
}
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