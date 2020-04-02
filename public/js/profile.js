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

    async function addEntry(title, author, date, tags, id, dom, authorid, comments, description, type) {
      const close = `<button class="btn btn-danger hover" onclick="if (localStorage.getItem('id') === '${authorid}' || localStorage.getItem('admin')) { if (confirm('Do you want to close request ${id}?')) { document.getElementById('${id}').remove(); killOffer('${id}') } }"><i class="fas fa-times"></i> Close</button>`;
      const fulfill = ` <button class="btn btn-danger hover" onclick="window.location = '${window.location.origin}/submissions/open?id=${id}'"><i class="fas fa-book-open"></i> Open</button>`;
      document.querySelector(dom).innerHTML += `<tr id="${id}">
        <th scope="row"><p>${(type.charAt(0).toUpperCase() + type.slice(1)) === 'Request' ? '<span title="Request"><i class="fas fa-hand-paper" style="color: #48BB78 !important"></i><span>' : '<span title="Offer"><i class="fas fa-heart" style="color: #E81224 !important"></i></span>'}</p></th>
        <td><p style="font-weight: bold; color: #000 !important">${title.replace(/(.{17})..+/, '$1…')}</p></td>
        <td><a href="${window.location.origin}/@${author || undefined}">${author}</a></td>
        <td>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #000 !important; font-weight: bold !important">
              <span class="badge badge-outline-primary"><i class="fas fa-comment-alt"></i> ${comments ||
                0}</span> Info
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdown">
              <a style="color: #000 !important; font-weight: 100; background: #fff !important;" class="hover dropdown-item"><b>Date</b>: ${date}</a>
              <a style="color: #000 !important; font-weight: 100; background: #fff !important;" class="hover dropdown-item"><b>Quantity</b>: ${tags}</a>
              <a style="background: #fff !important;" class="hover dropdown-item" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${description
                .split(' ')
                .join('+')}"><b>Location</b>: ${description.replace(/(.{17})..+/, '$1…')}</a>
            </div>
          </div>
        </td>
        <td>${
          localStorage.getItem('name') === author || localStorage.getItem('admin')
            ? fulfill + close
            : fulfill
        }</td>
      </tr>`;
    }

    const base = `${window.location.origin}/v1/`;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id === localStorage.getItem('id')) {
      document.querySelector(
        '#logoff'
      ).innerHTML = `<button class="btn btn-primary" onclick="localStorage.clear(); document.cookie = 'member=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; window.location = window.location.origin" id="logout"><i class="fas fa-sign-out-alt" style="color: #fff !important"></i> Log out</button>`;
      document.querySelector(
        '#change'
      ).innerHTML = `<button class="btn btn-primary" id="config" onclick="window.location = (window.location.origin + '/me')"><i class="fas fa-sign-out-alt" style="color: #fff !important"></i> Change Settings</button>`;
    }
    fetch(`${base}userdata?id=${id}`)
      .then((res) => res.json())
      .then((body) => {
        let { email, name, location, rep, phone, staff, verified } = body;
        let temp = name;
        if (phone.toLowerCase() === 'not configured') phone = '';
        if (location.toLowerCase() === 'not configured') location = '';
        document.querySelector('#name').value = name;
        document.querySelector('#rep').value = rep.length;
        document.querySelector('#email').value = email;
        document.querySelector('#phone').value = phone;
        document.querySelector('#location').value = location;
        name = esc(DOMPurify.sanitize(name));
        if (staff) name = `${name} <span class="badge badge-outline-primary">STAFF</span>`;
        if (verified) name = `${name} <i class="fas fa-badge-check" title="Official organization"></i>`;
        document.querySelector('#prof-head').innerHTML = `@${name}`;
        name = temp;
        document.querySelector(
          '#prof-link'
        ).innerHTML = `<b>Profile: <a href="${window.location.origin}/@${name}">${window.location.origin}/@${name}</a></b>`;
      })
      .catch((err) => {
        alert('Oops! Something went wrong...');
        location = window.location.origin;
      });
    if (document.querySelector('#give-rep')) {
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
    }

    fetch(`${window.location.origin}/v1/offer`)
      .then((res) => res.json())
      .then((body) => {
        document.querySelector('#table').innerHTML = '';
        body.offerList.reverse().forEach((offer) => {
          const { title, author, date, tags, authorid, comments, description, type } = offer;
          if (authorid !== id) return;
          // (title, author, date, tags, id, dom, authorid, comments, description
          addEntry(
            esc(DOMPurify.sanitize(title)).substring(0, 30),
            esc(DOMPurify.sanitize(author)),
            esc(DOMPurify.sanitize(date)),
            esc(DOMPurify.sanitize(tags)),
            esc(DOMPurify.sanitize(offer.id)),
            '#table',
            esc(DOMPurify.sanitize(authorid)),
            esc(DOMPurify.sanitize(comments || 0)),
            esc(DOMPurify.sanitize(description)),
            esc(DOMPurify.sanitize(type || 'request')),
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

function enable() {
  document.querySelector('#submit').disabled = false;
}
