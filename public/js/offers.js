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
        location = `${window.location.origin}/posts/`;
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
        swal(
          'Invalid Post',
          'Something went wrong when trying to post. Try reloading and contact support if this error keeps happening.',
          'warning'
        );
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
      const close = `<button style="background: #fff !important; color: #6C63FF !important; box-shadow: 0 0 3.2rem rgba(0,0,0,0) !important; text-shadow: 0 0 3.2rem rgba(0,0,0,.12);" class="btn btn-primary hover" onclick="if (localStorage.getItem('id') === '${authorid}' || localStorage.getItem('admin')) { location = '${location.origin}/posts/open?id=${id}' }">Edit</button>`;
      const fulfill = ` <button class="btn btn-primary hover" onclick="window.location = '${
        window.location.origin
      }/posts/open?id=${id}'">${type !== 'request' ? 'Ask for help' : 'Offer to help'}</button>`;
      document.querySelector('#cardView').innerHTML = `
      <div class="col-sm-4" style="margin-bottom: 30px;">
          <div class="card hover" style="border: none; border-top: 0px solid #6b63ffbb; box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.06) !important;"  id="${id}">
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
      )}&bold=true&rounded=true&name=${author}'><br>Click to view" href="/profile?id=${authorid}">${author} <span class="badge badge-outline-primary">YOU</span></a></b>
                  </div>
                  <div class="ml-auto">
                    <span style="color: #A0AECA; font-family: 'Poppins' !important;">
                      <i style="color: #A0AECA !important; font-size: 80% !important" class="fas fa-comment-alt"></i> ${
                        comments || 0
                      }
                    </span>
                  </div>
                </div>
              </h5>
              <p class="card-text">
                <div class="form-group">
                  <label for="item">${
                    type === 'request' ? 'Needs help with' : 'Can help with'
                  }</label> ${skillHTML}
                  <br><div class="description-area">${title}</div>
                </div>
              </p>
              <p class="card-text" style="text-align: right; padding-bottom: 10px; padding-top: 10px;">
                ${
                  localStorage.getItem('name') === author || localStorage.getItem('admin')
                    ? fulfill
                    : fulfill
                }
              </p><hr>
              <div class="d-flex" style="color: #A0AECA">
                <div>
                  <p class="card-text">
                    ${date}
                  </p>
                </div>
                <div class="ml-auto">
                  <a
                    class="twitter-share-button"
                    href="https://twitter.com/intent/tweet?text=COVID+Heroes+-+${title}+-+https://app.covidheroes.net/posts/open?id=${id}"
                  >
                    Tweet</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      ${document.querySelector('#cardView').innerHTML}`;
      console.log(skillHTML);
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
      const close = `<button style="background: #fff !important; color: #6C63FF !important; box-shadow: 0 0 3.2rem rgba(0,0,0,0) !important; text-shadow: 0 0 3.2rem rgba(0,0,0,.12);" class="btn btn-primary hover" onclick="if (localStorage.getItem('id') === '${authorid}' || localStorage.getItem('admin')) { location = '${location.origin}/posts/open?id=${id}' }">Edit</button>`;
      const fulfill = ` <button class="btn btn-primary hover" onclick="window.location = '${
        window.location.origin
      }/posts/open?id=${id}'">${type !== 'request' ? 'Ask for help' : 'Offer to help'}</button>`;
      document.querySelector('#cardView').innerHTML += `
        <div class="col-sm-4" style="margin-bottom: 30px;">
          <div class="card hover" style="border: none; border-top: 0px solid #6b63ffbb; box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.06) !important;" id="${id}">
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
                    <span style="color: #A0AECA; font-family: 'Poppins' !important;">
                      <i style="color: #A0AECA !important; font-size: 80% !important" class="fas fa-comment-alt"></i> ${
                        comments || 0
                      }
                    </span>
                  </div>
                </div>
              </h5>
              <p class="card-text">
                <div class="form-group">
                  <label for="item">${
                    type === 'request' ? 'Needs help with' : 'Can help with'
                  }</label> ${skillHTML}

                  <br><div class="description-area">${title}</div>
                </div>
              </p>
              <p class="card-text" style="text-align: right; padding-bottom: 10px; padding-top: 10px;">
                ${
                  localStorage.getItem('name') === author || localStorage.getItem('admin')
                    ? fulfill
                    : fulfill
                }
              </p><hr>
              <div class="d-flex" style="color: #A0AECA">
              <div>
                <p class="card-text">
                  ${date}
                </p>
              </div>
              <div class="ml-auto">
                <a
                  class="twitter-share-button"
                  href="https://twitter.com/intent/tweet?text=COVID+Heroes+-+${title}+-+https://app.covidheroes.net/posts/open?id=${id}"
                >
                  Tweet</a
                >
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (window.location.href.toLowerCase().includes('new')) {
      fetch(`${window.location.origin}/v1/counter`)
        .then((res) => res.json())
        .then(({ counter }) => {
          document.querySelector(
            '#counter'
          ).innerHTML = `Over <a>${counter}</a> and counting posts!`;
        });
    }
    if (
      window.location.href.toLowerCase().includes('requests') ||
      window.location.href.toLowerCase().includes('posts') ||
      window.location.href.toLowerCase().includes('submissions')
    ) {
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
              for (let skill of skills) {
                if (
                  searchItem &&
                  stringSimilarity.compareTwoStrings(
                    skill,
                    (searchItem || skill).split('+').join(' ')
                  ) < 0.3
                )
                  return;
              }
            }
            skills = skills || [];
            const { color } = await fetch(
              `${window.location.origin}/v1/userdata?id=${authorid}`
            ).then((res) => res.json());
            if (counter >= 50) return;
            if (author === localStorage.getItem('name')) {
              insertEntry(
                esc(DOMPurify.sanitize(title)),
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
                esc(DOMPurify.sanitize(title)),
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

      setInterval(async () => {
        fetch(`${window.location.origin}/v1/offer`)
          .then((res) => res.json())
          .then(async (body) => {
            total = 0;
            counter = 0;
            document.querySelector('#cardView').innerHTML = ``;
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
                  esc(DOMPurify.sanitize(title)),
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
                  esc(DOMPurify.sanitize(title)),
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
      }, 350000);
    }
    if (window.location.href.toLowerCase().includes('new')) {
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
        if (!localStorage.getItem('admin')) {
          if (reqs > 5) {
            swal(
              'You cannot have more than 5 concurrent posts.',
              'If you want to have more than the limit, contact support. ',
              'warning'
            );
            return false;
          }
        }
        if (rep.length < 1) {
          swal(
            'You need at least 1 rep to be able to post.',
            'This is to prevent malicious hackers to try to break our service. You can gain rep by asking other users or helping them.',
            'warning'
          );
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
          swal(
            {
              title: `Created your post!`,
              text:
                'Your post is now live! If you made a mistake, either edit or delete the post by clicking opening and selecting the cooresponding buttons.',
              type: 'info',
              confirmButtonClass: 'btn-primary',
              confirmButtonText: 'Ok',
              closeOnConfirm: false,
              closeOnCancel: false,
            },
            (isConfirm) => {
              window.location = `${window.location.origin}/requests`;
            }
          );
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
