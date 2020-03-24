if (!localStorage.getItem('name')) {
  document.querySelector(
    '#account'
  ).innerHTML = `<button class="btn btn-danger" onclick="window.location=window.location.origin + '/signup'"><i class="far fa-fist-raised"></i> Sign up</button>
<button class="btn btn-danger" onclick="window.location=window.location.origin + '/login'"><i class="fas fa-sign-in-alt"></i> Log in</button> `;
} else {
  const base = `${window.location.origin}/v1/`;
  document.querySelector(
    '#account'
  ).innerHTML = `<button class="btn btn-danger" onclick="localStorage.clear(); location.reload();"><i class="fas fa-sign-out-alt"></i> Log out</button>
  <button class="btn btn-danger" onclick="window.location=window.location.origin + '/me'"><i class="fas fa-user-circle"></i> Account</button>`;
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
