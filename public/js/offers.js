let addressOfOffers = [];
let reqs = 0;
let total = 0;
let killOffer;
let searchSetting = 'item';
const matchHtmlRegExp = /["'&<>]/;
let post;

window.onload = () => {
  const base = `${window.location.origin}/v1/`;
  if (true) {
    let offerList;
    killOffer = (id) => {
      postData(`${base}offer/remove`, {
        id,
      }).then((data) => {
        location = `${window.location.origin}/submissions/`;
      });
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

    async function insertEntry(
      title,
      author,
      date,
      tags,
      description,
      dom,
      authorid,
      id,
      comments,
      type,
      color,
      skills
    ) {
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      let skillHTML = '';
      for (let skill of skills) {
        skillHTML += `<span class="badge badge-outline-primary">${skill}</span>`;
      }
      let now = new Date(date);
      date = `${days[now.getDay()]}, ${
        months[now.getMonth()]
      } ${now.getDate()}, ${now.getFullYear()}`;
      const close = `<button style="background: #fff !important; color: #6C63FF !important; box-shadow: 0 0 3.2rem rgba(0,0,0,0) !important; text-shadow: 0 0 3.2rem rgba(0,0,0,.12);" class="btn btn-primary hover" onclick="if (localStorage.getItem('id') === '${authorid}' || localStorage.getItem('admin')) { location = '${location.origin}/submissions/open?id=${id}' }">Edit</button>`;
      const fulfill = ` <button class="btn btn-primary hover" onclick="window.location = '${
        window.location.origin
      }/submissions/open?id=${id}'">${
        type !== 'request' ? 'Ask for help' : 'Offer to help'
      }</button>`;
      document.querySelector('#cardView').innerHTML = `
      <div class="col-sm-4" style="margin-bottom: 30px;">
          <div class="card hover" style="border: none; border-top: 3px solid #6b63ffbb; box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.06) !important;"  id="${id}">
            <div class="card-body">
              <h5 class="card-title">
                <div class="d-flex">
                  <div>
                    ${
                      type.charAt(0).toUpperCase() + type.slice(1) === 'Request'
                        ? '<span title="Request"><i class="fas fa-hand-paper" style="color: #F8BB4B !important"></i><span>'
                        : '<span title="Offer"><i class="fas fa-heart" style="color: #E81224 !important"></i></span>'
                    } <b><a class="hover" style="color: #000 !important" data-toggle="tooltip" data-placement="top" title="<img src='https://ui-avatars.com/api/?background=${(
        color || 'fff'
      ).replace('#', '')}&color=${idealTextColor(color || '000').replace(
        '#',
        ''
      )}&bold=true&rounded=true&name=${author}'><br>Click to view" href="/profile?id=${authorid}">${author}</a></b>
                  </div>
                  <div class="ml-auto">
                    <span style="color: #A0AECA; font-family: 'Poppins' !important; font-family: bold;">
                      <i style="color: #A0AECA !important;" class="fas fa-comment-alt"></i> ${
                        comments || 0
                      }
                    </span>
                  </div>
                </div>
              </h5>
              <p class="card-text">
                <div class="form-group">
                  <label for="item">${type.charAt(0).toUpperCase() + type.slice(1)}</label> 
                  <label>${skillHTML}</label>
                  <input type="text" class="form-control" id="item" value="${title}" readonly="readonly">
                </div>
              </p>
              <p class="card-text" style="text-align: center; padding-bottom: 10px; padding-top: 10px;">
                ${
                  localStorage.getItem('name') === author || localStorage.getItem('admin')
                    ? close + fulfill
                    : fulfill
                }
              </p><hr>
              <p class="card-text text-center" style="color: #A0AECA">
                ${date}
              </p>
            </div>
          </div>
        </div>
      ${document.querySelector('#cardView').innerHTML}`;
    }

    async function addEntry(
      title,
      author,
      date,
      tags,
      description,
      dom,
      authorid,
      id,
      comments,
      type,
      color,
      skills
    ) {
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      let skillHTML = '';
      for (let skill of skills) {
        skillHTML += `<span class="badge badge-outline-primary">${skill}</span> `;
      }
      let now = new Date(date);
      date = `${days[now.getDay()]}, ${
        months[now.getMonth()]
      } ${now.getDate()}, ${now.getFullYear()}`;
      const close = `<button style="background: #fff !important; color: #6C63FF !important; box-shadow: 0 0 3.2rem rgba(0,0,0,0) !important; text-shadow: 0 0 3.2rem rgba(0,0,0,.12);" class="btn btn-primary hover" onclick="if (localStorage.getItem('id') === '${authorid}' || localStorage.getItem('admin')) { location = '${location.origin}/submissions/open?id=${id}' }">Edit</button>`;
      const fulfill = ` <button class="btn btn-primary hover" onclick="window.location = '${
        window.location.origin
      }/submissions/open?id=${id}'">${
        type !== 'request' ? 'Ask for help' : 'Offer to help'
      }</button>`;
      document.querySelector('#cardView').innerHTML += `
        <div class="col-sm-4" style="margin-bottom: 30px;">
          <div class="card hover" style="border: none; border-top: 3px solid #6b63ffbb; box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.06) !important;" id="${id}">
            <div class="card-body">
              <h5 class="card-title">
                <div class="d-flex">
                  <div>
                    ${
                      type.charAt(0).toUpperCase() + type.slice(1) === 'Request'
                        ? '<span title="Request"><i class="fas fa-hand-paper" style="color: #F8BB4B !important"></i><span>'
                        : '<span title="Offer"><i class="fas fa-heart" style="color: #E81224 !important"></i></span>'
                    } <b><a class="hover" style="color: #000 !important" data-toggle="tooltip" data-placement="top" title="<img src='https://ui-avatars.com/api/?background=${(
        color || '000'
      ).replace('#', '')}&color=${idealTextColor(color || 'fff').replace(
        '#',
        ''
      )}&bold=true&rounded=true&name=${author}'><br>Click to view" href="/profile?id=${authorid}">${author}</a></b>
                  </div>
                  <div class="ml-auto">
                    <span style="color: #A0AECA; font-family: 'Poppins' !important; font-family: bold;">
                      <i style="color: #A0AECA !important;" class="fas fa-comment-alt"></i> ${
                        comments || 0
                      }
                    </span>
                  </div>
                </div>
              </h5>
              <p class="card-text">
                <div class="form-group">
                  <label for="item">${type.charAt(0).toUpperCase() + type.slice(1)}</label> 
                  <label>${skillHTML}</label>
                  <input type="text" class="form-control" id="item" value="${title}" readonly="readonly">
                </div>
              </p>
              <p class="card-text" style="text-align: center; padding-bottom: 10px; padding-top: 10px;">
                ${
                  localStorage.getItem('name') === author || localStorage.getItem('admin')
                    ? close + fulfill
                    : fulfill
                }
              </p><hr>
                  <p class="card-text text-center" style="color: #A0AECA">
                    ${date}
                  </p>
          </div>
        </div>
      `;
    }

    if (window.location.href.includes('new')) {
      fetch(`${window.location.origin}/v1/counter`)
        .then((res) => res.json())
        .then(({ counter }) => {
          document.querySelector(
            '#counter'
          ).innerHTML = `Over <a>${counter}</a> and counting submissions!`;
        });
    }
    if (window.location.href.includes('requests') || window.location.href.includes('submissions')) {
      fetch(`${base}users`)
        .then((res) => res.json())
        .then(({ users }) => {
          document.querySelector('#user-count').innerText = users.length;
          document.querySelector('#req-count').innerText = total;
        });
      let counter = 0;
      fetch(`${window.location.origin}/v1/offer`)
        .then((res) => res.json())
        .then(async (body) => {
          const urlParams = new URLSearchParams(window.location.search);
          const searchItem = urlParams.get('item');
          const searchAuthor = urlParams.get('author');
          const searchDate = urlParams.get('date');
          const searchQuantity = urlParams.get('quantity');
          const searchLocation = urlParams.get('location');
          const searchType = urlParams.get('type');
          searchSetting = urlParams.get('setting');

          document.querySelector('#search-input').value =
            searchItem ||
            searchAuthor ||
            searchDate ||
            searchQuantity ||
            searchLocation ||
            searchType;

          // document.querySelector('#table').innerHTML = '';
          for (let offer of body.offerList.reverse()) {
            let {
              title,
              author,
              date,
              tags,
              id,
              authorid,
              description,
              comments,
              type,
              skills,
            } = offer;
            if (
              searchItem ||
              searchAuthor ||
              searchDate ||
              searchLocation ||
              searchQuantity ||
              searchType
            ) {
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
                  (searchType || type || 'request').split('+').join(' ')
                ) < 0.3
              )
                return;
            }
            skills = skills || [];
            const { color } = await fetch(
              `${window.location.origin}/v1/userdata?id=${authorid}`
            ).then((res) => res.json());
            if (counter >= 50) return;
            if (author === localStorage.getItem('name')) {
              insertEntry(
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
                (color || '#000').replace('#', ''),
                skills
              );
            } else {
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
                (color || '#000').replace('#', ''),
                skills
              );
            }

            $('[data-toggle="tooltip"]').tooltip({
              animated: 'fade',
              placement: 'bottom',
              html: true,
            });

            addressOfOffers.push(description);
            ++counter;
            ++total;
            document.querySelector('#req-count').innerText = total;
          }
          document.querySelector('#req-count').innerText = total;
          offerList = body.offerList.reverse();
          $('[data-toggle="tooltip"]').tooltip({
            animated: 'fade',
            placement: 'bottom',
            html: true,
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

      post = async () => {
        const { rep } = await fetch(
          `${location.origin}/v1/userdata?id=${localStorage.id}`
        ).then((res) => res.json());
        console.log(rep);
        if (!localStorage.getItem('admin')) {
          if (reqs > 5) alert('You cannot have more than 5 concurrent requests.');
          return false;
        }
        if (rep.length < 1) {
          alert('You need at least 1 rep to be able to post.');
          return false;
        }
        document.querySelector('#submission-button').disabled = true;
        postData(`${base}offer`, {
          title: esc(DOMPurify.sanitize(document.querySelector('#title').value)),
          author: esc(DOMPurify.sanitize(localStorage.getItem('name'))),
          authorid: esc(DOMPurify.sanitize(localStorage.getItem('id'))),
          description: esc(DOMPurify.sanitize(document.querySelector('#location').value)),
          email: esc(DOMPurify.sanitize(localStorage.getItem('email'))),
          date: new Date().toLocaleDateString('en-US'),
          comments: 0,
          skills: $('#skills').tagsinput('items') || [],
          type: document.querySelector('#request-radio').checked ? 'request' : 'offer',
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
  window.location = `${window.location.origin}/requests?${searchSetting || 'item'}=${
    document.querySelector('#search-input').value || ''
  }&setting=${searchSetting || 'item'}`;
}

function update(type) {
  if (type === 'range')
    document.querySelector('#tags').value = document.querySelector('#slider').value;
  if (type === 'input')
    document.querySelector('#slider').value = document.querySelector('#tags').value;
}

function idealTextColor(bgColor) {
  const nThreshold = 105;
  const components = getRGBComponents(bgColor);
  const bgDelta = components.R * 0.299 + components.G * 0.587 + components.B * 0.114;

  return 255 - bgDelta < nThreshold ? '#000000' : '#ffffff';
}

function getRGBComponents(color) {
  const r = color.substring(1, 3);
  const g = color.substring(3, 5);
  const b = color.substring(5, 7);

  return {
    R: parseInt(r, 16),
    G: parseInt(g, 16),
    B: parseInt(b, 16),
  };
}
