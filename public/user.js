if (localStorage.getItem('name')) {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const phone = localStorage.getItem('phone');
  const location = localStorage.getItem('location');
  const id =  localStorage.getItem('id');

  document.querySelector('#name').value = name;
  document.querySelector('#email').value = email;
  document.querySelector('#phone').value = phone;
  document.querySelector('#location').value = location;
  document.querySelector('#id').value = id;
} else {
  window.location = `${window.location.origin}/login`;
}
