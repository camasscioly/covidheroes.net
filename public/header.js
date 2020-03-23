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
}
console.log('Header Loaded');

