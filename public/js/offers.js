let addressOfOffers = [];
let reqs = 0;
let killOffer;
let searchSetting = 'item';
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

    async function addEntry(title, author, date, tags, description, dom, authorid, id, comments, type) {
      const close = `<button style="padding: 0 !important; color: #7A7A7A !important" class="btn btn-danger hover actions" onclick="if (localStorage.getItem('id') === '${authorid}' || localStorage.getItem('admin')) { if (confirm('Do you want to close request ${id}?')) { document.getElementById('${id}').remove(); killOffer('${id}') } }">Close</button>`;
      const fulfill = ` <button style="padding: 0 !important" class="btn btn-danger hover actions" onclick="window.location = '${window.location.origin}/submissions/open?id=${id}'">Open</button>`;
      document.querySelector(dom).innerHTML += `<tr id="${id}">
        <th scope="row"><p>${(type.charAt(0).toUpperCase() + type.slice(1)) === 'Request' ? '<span title="Request"><i class="fas fa-hand-paper" style="color: #48BB78 !important"></i><span>' : '<span title="Offer"><i class="fas fa-heart" style="color: #E81224 !important"></i></span>'} ${title.replace(/(.{17})..+/, '$1…')}</p></th>
        <td><a href="${window.location.origin}/profile?id=${authorid}">${author}</a></td>
        <td>
          <div style="margin: 0 !important">
            <span data-toggle="tooltip" data-placement="top" title="${date} - ${tags}x - ${description}">
              <i style="color: #000 !important" class="fas fa-info-circle"></i>
            </span>
            <span style="color: #6c63ff; font-weight: bold">
              <i class="fas fa-comment-alt"></i> ${comments || 0}
            </span>
          </div>
        </td>
        <td>${
          localStorage.getItem('name') === author || localStorage.getItem('admin')
            ? fulfill + close
            : fulfill
        }</td>
      </tr>`;
    }

    if (window.location.href.includes('new')) {
      fetch(`${window.location.origin}/v1/counter`)
        .then((res) => res.json())
        .then((body) => {
          document.querySelector(
            '#counter'
          ).innerHTML = `Over <a>${body.counter}</a> and counting submissions!`;
        });
    }
    if (window.location.href.includes('requests') || window.location.href.includes('submissions')) {
      fetch(`${base}users`)
        .then((res) => res.json())
        .then((body) => {
          document.querySelector('#user-count').innerText = body.users.length;
        });
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
          const searchType = urlParams.get('type');
          searchSetting = urlParams.get('setting');

          document.querySelector('#search-input').value =
            searchItem || searchAuthor || searchDate || searchQuantity || searchLocation || searchType;

          document.querySelector('#table').innerHTML = '';
          body.offerList.reverse().forEach((offer) => {
            const { title, author, date, tags, id, authorid, description, comments, type } = offer;
            if (searchItem || searchAuthor || searchDate || searchLocation || searchQuantity || searchType) {
              if (
                searchItem &&
                stringSimilarity.compareTwoStrings(
                  title,
                  (searchItem || title).split('+').join(' ')
                ) < 0.3
              )
                return;
              if (
                searchAuthor &&
                stringSimilarity.compareTwoStrings(
                  author,
                  (searchAuthor || author).split('+').join(' ')
                ) < 0.3
              )
                return;
              if (
                searchDate &&
                stringSimilarity.compareTwoStrings(
                  date,
                  (searchDate || date).split('+').join(' ')
                ) < 0.3
              )
                return;
              if (
                searchQuantity &&
                stringSimilarity.compareTwoStrings(
                  tags,
                  (searchQuantity || tags).split('+').join(' ')
                ) < 0.3
              )
                return;
              if (
                searchLocation &&
                stringSimilarity.compareTwoStrings(
                  description,
                  (searchLocation || description).split('+').join(' ')
                ) < 0.3
              )
                return;
              if (
                searchType &&
                stringSimilarity.compareTwoStrings(
                  type || 'request',
                  (searchType || (type || 'request')).split('+').join(' ')
                ) < 0.3
              )
                return;
            }
            if (counter >= 50) return;
            addEntry(
              esc(DOMPurify.sanitize(title)).substring(0, 30),
              esc(DOMPurify.sanitize(author)),
              esc(DOMPurify.sanitize(date)),
              esc(DOMPurify.sanitize(tags)),
              esc(DOMPurify.sanitize(description)),
              '#table',
              esc(DOMPurify.sanitize(authorid)),
              esc(DOMPurify.sanitize(id)),
              esc(DOMPurify.sanitize(comments || 0)),
              esc(DOMPurify.sanitize(type || 'request')),
            );
            addressOfOffers.push(description);
            ++counter;
          });
          offerList = body.offerList.reverse();
          $(function() {
            $('[data-toggle="tooltip"]').tooltip();
          });
        });
    }
    if (window.location.href.includes('new')) {
      fetch(`${window.location.origin}/v1/offer`)
        .then((res) => res.json())
        .then((body) => {
          body.offerList.reverse().forEach((offer) => {
            const { authorid } = offer;
            if (authorid === localStorage.getItem('id')) {
              ++reqs;
            }
          });
        });

      document.querySelector('#offers').onsubmit = () => {
        if (!localStorage.getItem('admin')) if (reqs > 5) return alert('You cannot have more than 5 concurrent requests.');
        postData(`${base}offer`, {
          title: esc(DOMPurify.sanitize(document.querySelector('#title').value)),
          author: esc(DOMPurify.sanitize(localStorage.getItem('name'))),
          authorid: esc(DOMPurify.sanitize(localStorage.getItem('id'))),
          description: esc(DOMPurify.sanitize(document.querySelector('#location').value)),
          email: esc(DOMPurify.sanitize(localStorage.getItem('email'))),
          date: new Date().toLocaleDateString('en-US'),
          comments: 0,
          type: (document.querySelector('#request-radio').checked) ? 'request' : 'offer',
          csrf: document.querySelector('#csrf').value,
          tags: esc(
            DOMPurify.sanitize(
              parseInt(document.querySelector('#tags').value.substring(0, 7)) > 1000000
                ? 1000000
                : parseInt(document.querySelector('#tags').value.substring(0, 7))
            )
          ),
        }).then((data) => {
          window.location = `${window.location.origin}/requests`;
          return false;
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
  document.querySelector('#submission-button').disabled = false;
}

function search() {
  window.location = `${window.location.origin}/requests?${searchSetting || 'item'}=${document.querySelector(
    '#search-input'
  ).value || ''}&setting=${searchSetting || 'item'}`;
}
