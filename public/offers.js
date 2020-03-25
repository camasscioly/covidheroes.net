let killOffer;
const matchHtmlRegExp = /["'&<>]/;

window.onload = () => {
  const base = `${window.location.origin}/v1/`;
  if (localStorage.getItem('name')) {
    let offerList;
    killOffer = (id) => {
      postData(`${base}offer/remove`, {
        id,
      }).then((data) => {});
    };

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
        alert('Invalid Offer');
      }
    }

    async function addEntry(title, author, date, tags, description, dom, authorid, id) {
      const close = `<button class="btn btn-danger" onclick="if (localStorage.getItem('id') === '${authorid}' || localStorage.getItem('admin')) { if (confirm('Do you want to close request ${id}?')) { document.getElementById('${id}').remove(); killOffer('${id}') } }"><i class="fas fa-times"></i> Close</button>`;
      const fulfill = ` <button class="btn btn-danger" onclick="window.location = '${window.location.origin}/requests/open?id=${id}'"><i class="fas fa-book-open"></i> Open</button>`;
      document.querySelector(dom).innerHTML += `<tr id="${id}">
        <th scope="row"><p>${title}</p></th>
        <td><a href="${window.location.origin}/profile?id=${authorid || undefined}">${author}</a></td>
        <td><p>${date}</p></td>
        <td><p>${tags}</p></td>
        <td>${description}</td>
        <td>${localStorage.getItem('name') === author || localStorage.getItem('admin')  ? fulfill + close : fulfill}</td>
      </tr>`;
    }

    fetch(`${window.location.origin}/v1/offer`)
      .then((res) => res.json())
      .then((body) => {
        body.offerList.reverse().forEach((offer) => {
          const { title, author, date, tags, id, authorid, description } = offer;
          addEntry(
            esc(DOMPurify.sanitize(title)).substring(0, 30),
            esc(DOMPurify.sanitize(author)),
            esc(DOMPurify.sanitize(date)),
            esc(DOMPurify.sanitize(tags)),
            esc(DOMPurify.sanitize(description)),
            '#table',
            esc(DOMPurify.sanitize(authorid)),
            esc(DOMPurify.sanitize(id)),
          );
        });
        offerList = body.offerList.reverse();
      });

    document.querySelector('#offers').onsubmit = () => {
      fetch(`${base}users`)
        .then((res) => res.json())
        .then((body) => {
          if (!localStorage.getItem('name')) return;
          if (!body.users.find(user => user[0] === localStorage.getItem('name') && user[1] === localStorage.getItem('id'))) {
            localStorage.clear();
            location.reload();
            return;
          }
        });
      postData(`${base}offer`, {
        title: esc(DOMPurify.sanitize(document.querySelector('#title').value.replace(/[^a-z0-9]/gi, ''))),
        author: esc(DOMPurify.sanitize(localStorage.getItem('name'))),
        authorid: esc(DOMPurify.sanitize(localStorage.getItem('id'))),
        description: esc(DOMPurify.sanitize(document.querySelector('#location').value)),
        email: esc(DOMPurify.sanitize(localStorage.getItem('email'))),
        date: new Date().toLocaleDateString('en-US'),
        tags: esc(DOMPurify.sanitize(parseInt(document.querySelector('#tags').value.substring(0, 7)) > 1000000 ? 1000000 : parseInt(document.querySelector('#tags').value.substring(0, 7)))),
      }).then((data) => {
        location.reload();
      });
      return false;
    };
  } else {
    window.location = `${window.location.origin}/login`;
  }
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