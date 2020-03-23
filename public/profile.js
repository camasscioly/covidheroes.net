window.onload = () => {
  if (localStorage.getItem('name')) {
    const base = `${window.location.origin}/v1/`;
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    if (name === localStorage.getItem('name')) window.location = `${window.location.origin}/me`;
    fetch(`${base}userdata?name=${name}`)
      .then((res) => res.json())
      .then((body) => {
        const { email, phone, location, id } = body;
        document.querySelector('#name').value = name;
        /*document.querySelector('#email').value = email;
        document.querySelector('#phone').value = phone;
        document.querySelector('#location').value = location;*/
        document.querySelector('#id').value = id;
        document.querySelector('#contact').onclick = () => {
          window.open(`mailto:${email}?subject=${document.getElementById('subject').value}!&body=${document.getElementById('message').value}`);
          return false;
        };
      });
  } else {
    window.location = `${window.location.origin}/login`;
  }
};

function enable() {
  document.querySelector('#submit').disabled = false;
}