let killOffer;
const matchHtmlRegExp = /["'&<>]/;

window.onload = () => {
  const base = `${window.location.origin}/v1/`;
  if (true) {
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

    async function addEntry(title, author, date, tags, description, dom, authorid, id, comments) {
      const close = `<button class="btn btn-danger hover" onclick="if (localStorage.getItem('id') === '${authorid}' || localStorage.getItem('admin')) { if (confirm('Do you want to close request ${id}?')) { document.getElementById('${id}').remove(); killOffer('${id}') } }"><i class="fas fa-times"></i> Close</button>`;
      const fulfill = ` <button class="btn btn-danger hover" onclick="window.location = '${window.location.origin}/requests/open?id=${id}'"><i class="fas fa-book-open"></i> Open</button>`;
      document.querySelector(dom).innerHTML += `<tr id="${id}">
        <th scope="row"><p>${title.replace(/(.{17})..+/, '$1…')}</p></th>
        <td><a href="${window.location.origin}/@${author || undefined}">${author}</a></td>
        <td>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #000 !important; font-weight: bold !important">
              <span class="badge badge-outline-primary"><i class="fas fa-comment-alt"></i> ${comments || 0}</span> Info
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdown">
              <a style="color: #000 !important; font-weight: 100; background: #fff !important;" class="hover dropdown-item"><b>Date</b>: ${date}</a>
              <a style="color: #000 !important; font-weight: 100; background: #fff !important;" class="hover dropdown-item"><b>Quantity</b>: ${tags}</a>
              <a style="color: #000 !important; font-weight: 100; background: #fff !important;" class="hover dropdown-item" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${description
                .split(' ')
                .join('+')}"><b>Location</b>: ${description.replace(/(.{17})..+/, '$1…')}</a>
            </div>
          </div>
        </td>
        <td>${
          (localStorage.getItem('name') === author || localStorage.getItem('admin')
            ? fulfill + close
            : fulfill)
        }</td>
      </tr>`;
    }

    if (window.location.href.includes('new')) {
      fetch(`${window.location.origin}/v1/counter`)
        .then((res) => res.json())
        .then((body) => {
          document.querySelector(
            '#counter'
          ).innerHTML = `Over <b>${body.counter}</b> and counting requests!`;
        });
    }
    if (window.location.href.includes('requests')) {
      let counter = 0;
      fetch(`${window.location.origin}/v1/offer`)
        .then((res) => res.json())
        .then((body) => {
          const urlParams = new URLSearchParams(window.location.search);
          const searchItem = urlParams.get('item');
          const searchAuthor = urlParams.get('author');
          const searchDate = urlParams.get('date');
          const searchQuantity = urlParams.get('quantity');
          const searchLocation = urlParams.get('location');

          document.querySelector('#item-input').value = searchItem;
          document.querySelector('#author-input').value = searchAuthor;
          document.querySelector('#date-input').value = searchDate;
          document.querySelector('#quantity-input').value = searchQuantity;
          document.querySelector('#location-input').value = searchLocation;

          document.querySelector('#table').innerHTML = '';
          body.offerList.reverse().forEach((offer) => {
            const { title, author, date, tags, id, authorid, description, comments } = offer;
            if (searchItem || searchAuthor || searchDate || searchLocation || searchQuantity) {
              if (searchItem && stringSimilarity.compareTwoStrings(title, (searchItem || title).split('+').join(' ')) < 0.3) return;
              if (searchAuthor && stringSimilarity.compareTwoStrings(author, (searchAuthor || author).split('+').join(' ')) < 0.3) return;
              if (searchDate && stringSimilarity.compareTwoStrings(date, (searchDate || date).split('+').join(' ')) < 0.3) return;
              if (searchQuantity && stringSimilarity.compareTwoStrings(tags, (searchQuantity || tags).split('+').join(' ')) < 0.3) return;
              if (searchLocation && stringSimilarity.compareTwoStrings(description, (searchLocation || description).split('+').join(' ')) < 0.3) return;
            }
            if (counter >= 10) return;
            addEntry(
              esc(DOMPurify.sanitize(title)).substring(0, 30),
              esc(DOMPurify.sanitize(author)),
              esc(DOMPurify.sanitize(date)),
              esc(DOMPurify.sanitize(tags)),
              esc(DOMPurify.sanitize(description)),
              '#table',
              esc(DOMPurify.sanitize(authorid)),
              esc(DOMPurify.sanitize(id)),
              esc(DOMPurify.sanitize(comments || 0))
            );
            ++counter;
          });
          offerList = body.offerList.reverse();
        });
    }
    if (window.location.href.includes('new')) {
      document.querySelector('#offers').onsubmit = () => {
        fetch(`${base}users`)
          .then((res) => res.json())
          .then((body) => {
            if (!localStorage.getItem('name')) return;
            if (
              !body.users.find(
                (user) =>
                  user[0] === localStorage.getItem('name') && user[1] === localStorage.getItem('id')
              )
            ) {
              localStorage.clear();
              location.reload();
              return;
            }
          });
        postData(`${base}offer`, {
          title: esc(DOMPurify.sanitize(document.querySelector('#title').value)),
          author: esc(DOMPurify.sanitize(localStorage.getItem('name'))),
          authorid: esc(DOMPurify.sanitize(localStorage.getItem('id'))),
          description: esc(DOMPurify.sanitize(document.querySelector('#location').value)),
          email: esc(DOMPurify.sanitize(localStorage.getItem('email'))),
          date: new Date().toLocaleDateString('en-US'),
          comments: 0,
          tags: esc(
            DOMPurify.sanitize(
              parseInt(document.querySelector('#tags').value.substring(0, 7)) > 1000000
                ? 1000000
                : parseInt(document.querySelector('#tags').value.substring(0, 7))
            )
          ),
        }).then((data) => {
          window.location = `${window.location.origin}/requests`;
        });
        return false;
      };
    }
  }
};

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

function search() {
  window.location = `${window.location.origin}/requests?item=${document.querySelector('#item-input').value || ''}&author=${document.querySelector('#author-input').value}&date=${document.querySelector('#date-input').value}&quantity=${document.querySelector('#quantity-input').value}&location=${document.querySelector('#location-input').value}`;
}

/*document.querySelector('#item-input').addEventListener('change', (e) => {
  search();
});

document.querySelector('#author-input').addEventListener('change', (e) => {
  search();
});

document.querySelector('#date-input').addEventListener('change', (e) => {
  search();
});

document.querySelector('#quantity-input').addEventListener('change', (e) => {
  search();
});

document.querySelector('#location-input').addEventListener('change', (e) => {
  search();
});*/