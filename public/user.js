const base = `${window.location.origin}/v1/`;

window.onload = async () => {
  if (localStorage.getItem('name')) {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const location = localStorage.getItem('location');
    const id = localStorage.getItem('id');

    document.querySelector('#name').value = DOMPurify.sanitize(name);
    document.querySelector('#email').value = DOMPurify.sanitize(email);
    document.querySelector('#phone').value = DOMPurify.sanitize(phone);
    document.querySelector('#location').value = DOMPurify.sanitize(location);
    document.querySelector('#id').value = DOMPurify.sanitize(id);
    const { rep } = await fetch(`${base}userdata?id=${DOMPurify.sanitize(id)}`)
      .then((res) => res.json())
    document.querySelector('#rep').value = DOMPurify.sanitize(rep.length);

  } else {
    window.location = `${window.location.origin}/login`;
  }
};

function enable() {
  document.querySelector('#submit').disabled = false;
}