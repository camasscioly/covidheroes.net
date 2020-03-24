window.onload = () => {
  if (localStorage.getItem('name')) {
    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      try {
        return await response.text(); // parses JSON response into native JavaScript objects
      } catch (err) {
        alert(`You've already repped this user!`);
      }
    }

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
        const { email, name, location, rep } = body;
        document.querySelector('#name').value = name;
        document.querySelector('#rep').value = rep.length;
        /*document.querySelector('#email').value = email;
        document.querySelector('#phone').value = phone;
        document.querySelector('#location').value = location;*/
        document.querySelector('#location').value = location;
        document.querySelector('#contact').onclick = () => {
          window.open(
            `mailto:${email}?subject=${document.getElementById('subject').value}!&body=${
              document.getElementById('message').value
            }`
          );
          return false;
        };
      })
      .catch((err) => {
        alert('Oops! Something went wrong...');
        location = window.location.origin;
      });
    document.querySelector('#give-rep').onclick = () => {
      if (!confirm('Are you sure you want to rep this user? This is permanent.')) return;
      postData(`${base}userdata/rep`, {
        rep: localStorage.getItem('id'),
        id,
      }).then((data) => {
        location.reload();
        return false;
      });
    };
  } else {
    window.location = `${window.location.origin}/login`;
  }
};

function enable() {
  document.querySelector('#contact').disabled = false;
}

function enable2() {
  document.querySelector('#give-rep').disabled = false;
}