if (window.location.origin.includes('herokuapp')) window.location = `https://covidheroes.net`;
if (!localStorage.getItem('name')) {
  document.querySelector(
    '#account'
  ).innerHTML = `<button class="btn btn-danger hover" onclick="window.location=window.location.origin + '/login'"><i class="fas fa-sign-in-alt"></i> Log in</button>
  <button class="btn btn-danger hover" onclick="window.location=window.location.origin + '/signup'"><i class="fas fa-hand-spock"></i> Join Us</button>`;
} else {
  const base = `${window.location.origin}/v1/`;
  document.querySelector(
    '#account'
  ).innerHTML = `<button class="btn btn-danger hover" onclick="window.location=window.location.origin + '/@' + localStorage.getItem('name')"><i class="fas fa-user"></i> Account</button>
  <button class="btn btn-danger hover" onclick="window.location=window.location.origin + '/new'"><i class="fas fa-plus"></i> Create</button>`;
  window.addEventListener(
    'storage',
    () => {
      fetch(`${base}users`)
        .then((res) => res.json())
        .then((body) => {
          if (!localStorage.getItem('name')) return;
          if (
            !body.users.find(
              (user) =>
                user[0] === localStorage.getItem('name') && user[1] === localStorage.getItem('id')
            ) ||
            document.cookie.indexOf('member=true') === -1
          ) {
            localStorage.clear();
            document.cookie = 'member=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            location.reload();
          }
        });
    },
    false
  );

  fetch(`${base}users`)
    .then((res) => res.json())
    .then((body) => {
      if (!localStorage.getItem('name')) return;
      if (
        !body.users.find(
          (user) =>
            user[0] === localStorage.getItem('name') && user[1] === localStorage.getItem('id')
        ) ||
        document.cookie.indexOf('member=true') === -1
      ) {
        localStorage.clear();
        document.cookie = 'member=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        location.reload();
      }
    });
}
setTimeout(() => {
  console.log(
    '%cHold up!',
    'color: #6C63FF; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;'
  );
  console.log(
    "%cIf someone told you to copy/paste something here you have an 11/10 chance you're being scammed.",
    'font-size: 150%;'
  );
  console.log(
    '%cPasting anything in here could give attackers access to your COVID Heroes account.',
    'color: red; font-size: 150%; font-weight: bold'
  );
  console.log(
    '%cUnless you understand exactly what you are doing, close this window and stay safe.',
    'font-size: 150%'
  );
}, 0);
