const base = `${window.location.origin}/v1/`;

if (!localStorage.getItem('name')) {
  document.querySelector(
    '#account'
  ).innerHTML = `<button class="btn btn-danger" onclick="window.location=window.location.origin + '/signup'">Sign up</button>
<button class="btn btn-danger" onclick="window.location=window.location.origin + '/login'">Log in</button> `;
} else {
  document.querySelector(
    '#account'
  ).innerHTML = `<button class="btn btn-danger" onclick="localStorage.clear(); location.reload();">Log out</button>
  <button class="btn btn-danger" onclick="window.location=window.location.origin + '/me'">Account</button>`;
  window.addEventListener('storage', () => {
    fetch(`${base}users`)
      .then((res) => res.json())
      .then((body) => {
        if (!localStorage.getItem('name')) return;
        if (!body.users.find(user => user[0] === localStorage.getItem('name') && user[1] === localStorage.getItem('id'))) {
          localStorage.clear();
          location.reload();
        }
      });
  }, false);
  fetch(`${base}users`)
    .then((res) => res.json())
    .then((body) => {
      if (!localStorage.getItem('name')) return;
      if (!body.users.find(user => user[0] === localStorage.getItem('name') && user[1] === localStorage.getItem('id'))) {
        localStorage.clear();
        location.reload();
      }
    });
}
