let killOffer;
let reppers = [];
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
        swal(
          `You've already repped this user!`,
          "You cannot rep someone more than once! Once you've repped someone, it is permanent",
          'warning'
        );
      }
    }

    const base = `${window.location.origin}/v1/`;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id === localStorage.getItem('id')) {
      document.querySelector(
        '#logoff'
      ).innerHTML = `<button style="color: #6C63FF; background: transparent !important" class="btn btn-primary" onclick="localStorage.clear(); document.cookie = 'member=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; window.location = window.location.origin" id="logout"><i class="fas fa-sign-out-alt"></i> Log out</button>`;
      document.querySelector(
        '#change'
      ).innerHTML = `<button class="btn btn-primary" id="config" onclick="window.location = (window.location.origin + '/me')"><i class="fas fa-cog" style="color: #fff !important"></i> Settings</button>`;
    }
    fetch(`${base}userdata?id=${id}`)
      .then((res) => res.json())
      .then((body) => {
        let { email, name, location, rep, phone, staff, verified } = body;
        reppers = rep;
        let temp = name;
        if (phone.toLowerCase() === 'not configured') phone = '';
        if (location.toLowerCase() === 'not configured') location = '';
        try {
          document.querySelector('#prof-img').src = `https://ui-avatars.com/api/?background=${
            body.color.replace('#', '') || '000'
          }&color=${idealTextColor(body.color || 'fff').replace(
            '#',
            ''
          )}&bold=true&rounded=true&name=${name}`;
        } catch (err) {
          document.querySelector(
            '#prof-img'
          ).src = `https://ui-avatars.com/api/?background=000&color=fff&bold=true&rounded=true&name=${name}`;
        }

        document.querySelector('#name').value = name;
        document.querySelector('#rep').value = rep.length;
        document.querySelector('#email').value = email;
        document.querySelector('#phone').value = phone;
        document.querySelector('#location').value = location;
        name = esc(DOMPurify.sanitize(name));
        if (staff)
          name = `${name} <i class="fas fa-shield-alt" data-toggle="tooltip" data-placement="top" title="COVID Heroes staff team"></i>`;
        if (verified)
          name = `${name} <i class="fas fa-badge-check" data-toggle="tooltip" data-placement="top" title="Official organization"></i>`;
        document.querySelector('#prof-head').innerHTML = `@${name}`;
        name = temp;
        $(() => {
          $('[data-toggle="tooltip"]').tooltip();
        });
      })
      .catch((err) => {
        swal('Oops! Something went wrong...');
        location = window.location.origin;
      });
    if (document.querySelector('#give-rep')) {
      document.querySelector('#give-rep').onclick = () => {
        if (reppers.includes(localStorage.id))
          return swal(
            `You've already repped this user!`,
            `Once you've repped someone, it is permanent.`,
            'warning'
          );
        swal(
          {
            title: 'Are you sure you want to rep this user?',
            text: 'Repping users is permanent and cannot be removed.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn-primary',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel',
            closeOnConfirm: false,
            closeOnCancel: true,
          },
          (isConfirm) => {
            if (isConfirm) {
              postData(`${base}userdata/rep`, {
                rep: localStorage.getItem('id'),
                id,
              }).then((data) => {
                location.reload();
                return false;
              });
            }
          }
        );
      };
    }

    fetch(`${window.location.origin}/v1/offer`)
      .then((res) => res.json())
      .then((body) => {
        // document.querySelector('#table').innerHTML = '';
        body.offerList.reverse().forEach((offer) => {
          const { title, author, date, tags, authorid, comments, description, type } = offer;
          if (authorid !== id) return;
          // (title, author, date, tags, id, dom, authorid, comments, description
          // addEntry(
          //   esc(DOMPurify.sanitize(title)).substring(0, 30),
          //   esc(DOMPurify.sanitize(author)),
          //   esc(DOMPurify.sanitize(date)),
          //   esc(DOMPurify.sanitize(tags)),
          //   esc(DOMPurify.sanitize(offer.id)),
          //   '#table',
          //   esc(DOMPurify.sanitize(authorid)),
          //   esc(DOMPurify.sanitize(comments || 0)),
          //   esc(DOMPurify.sanitize(description)),
          //   esc(DOMPurify.sanitize(type || 'request')),
          // );
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

document.getElementById('prof-img').ondragstart = () => false;

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
