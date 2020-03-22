if (!localStorage.getItem('name')) {
  document.querySelector('#account').innerHTML = `<button class="btn" onclick="window.location='https://covid.skywarder.cf/signup'">Sign up</button>
  <button class="btn" onclick="window.location='https://covid.skywarder.cf/login'">Log in</button> `
} else {
  document.querySelector('#account').innerHTML = `<button class="btn" onclick="window.location='https://covid.skywarder.cf/me'">Account</button>`
}