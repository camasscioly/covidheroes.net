if (localStorage.getItem('member')) {
  const base = `${window.location.origin}/v1/`;
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  fetch(`${base}userdata?name=${name}`)
    .then((res) => res.json())
    .then(body => {
      const { email, phone, location, id } = body;
      document.querySelector('#name').value = name;
      document.querySelector('#email').value = email;
      document.querySelector('#phone').value = phone;
      document.querySelector('#location').value = location;
      document.querySelector('#id').value = id;
    });

} else {
  window.location = `${window.location.origin}/login`;
}
