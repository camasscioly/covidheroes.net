if (window.location.origin.includes('herokuapp')) window.location = `https://covidheroes.net`;
if (!localStorage.getItem('name')) {
  document.querySelector(
    '#account'
  ).innerHTML = `<button class="btn btn-danger" onclick="window.location=window.location.origin + '/login'"><i class="fas fa-sign-in-alt"></i> Log in</button>
  <button class="btn btn-danger" onclick="window.location=window.location.origin + '/signup'"><i class="fas fa-hand-spock"></i> Join Us</button>`;
} else {
  const base = `${window.location.origin}/v1/`;
  document.querySelector(
    '#account'
  ).innerHTML = `<button class="btn btn-danger" onclick="window.location=window.location.origin + '/@' + localStorage.getItem('name')"><i class="fas fa-user"></i> Account</button>
  <button class="btn btn-danger" onclick="window.location=window.location.origin + '/new'"><i class="fas fa-plus"></i> New Request</button>`;
  window.addEventListener('storage', () => {
    fetch(`${base}users`)
      .then((res) => res.json())
      .then((body) => {
        if (!localStorage.getItem('name')) return;
        if (!body.users.find(user => user[0] === localStorage.getItem('name') && user[1] === localStorage.getItem('id'))) {
          localStorage.clear();
          document.cookie = 'member=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          location.reload();
        }
      });
  }, false);
  if (!localStorage.getItem('name')) document.cookie = 'member=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  fetch(`${base}users`)
    .then((res) => res.json())
    .then((body) => {
      if (!localStorage.getItem('name')) return;
      if (!body.users.find(user => user[0] === localStorage.getItem('name') && user[1] === localStorage.getItem('id'))) {
        localStorage.clear();
        document.cookie = 'member=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        location.reload();
      }
    });
}
