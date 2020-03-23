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

    function addEntry(title, author, date, tags, id, dom) {
      const close = `<button class="btn btn-danger" onclick="if (localStorage.getItem('name') === '${author}') { document.getElementById('${id}').remove(); killOffer('${id}') }">Close</button>`;
      const fulfill = ` <button class="btn btn-danger" onclick="if (localStorage.getItem('name') !== '${author}') { window.location = '${window.location.origin}/profile?name=${author}' }">Fullfill</button>`;
      document.querySelector(dom).innerHTML += `<tr id="${id}">
        <th scope="row"><p>${title}</p></th>
        <td><a href="${window.location.origin}/profile?name=${author}">${author}</a></td>
        <td><p>${date}</p></td>
        <td><p>${tags}</p></td>
        <td>${id}</td>
        <td>${localStorage.getItem('name') === author ? close : fulfill}</td>
      </tr>`;
    }

    fetch(`${window.location.origin}/v1/offer`)
      .then((res) => res.json())
      .then((body) => {
        body.offerList.reverse().forEach((offer) => {
          const { title, author, date, tags, id } = offer;
          addEntry(
            esc(DOMPurify.sanitize(title)),
            esc(DOMPurify.sanitize(author)),
            esc(DOMPurify.sanitize(date)),
            esc(DOMPurify.sanitize(tags)),
            esc(DOMPurify.sanitize(id)),
            '#table'
          );
        });
        offerList = body.offerList.reverse();
      });

    document.querySelector('#offers').onsubmit = () => {
      postData(`${base}offer`, {
        title: esc(DOMPurify.sanitize(document.querySelector('#title').value)),
        author: esc(DOMPurify.sanitize(localStorage.getItem('name'))),
        date: new Date().toLocaleDateString('en-US'),
        tags: esc(DOMPurify.sanitize(document.querySelector('#tags').value)),
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