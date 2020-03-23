window.onload = () => {
  if (localStorage.getItem('name')) {
    const base = `${window.location.origin}/v1/`;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id === localStorage.getItem('id')) {
      window.location = `${window.location.origin}/me`;
      return;
    }
    fetch(`${base}userdata?id=${id}`)
      .then((res) => res.json())
      .then((body) => {
        const { email, name } = body;
        document.querySelector('#name').value = name;
        /*document.querySelector('#email').value = email;
        document.querySelector('#phone').value = phone;
        document.querySelector('#location').value = location;*/
        document.querySelector('#id').value = id;
        document.querySelector('#contact').onclick = () => {
          window.open(`mailto:${email}?subject=${document.getElementById('subject').value}!&body=${document.getElementById('message').value}`);
          return false;
        };
      })
      .catch((err) => {
        alert('Oops! Something went wrong...');
        location = window.location.origin;
      });
  } else {
    window.location = `${window.location.origin}/login`;
  }
};

function enable() {
  document.querySelector('#submit').disabled = false;
}