function citySearch(event) {
  event.preventDefault();
  let searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase()
    .replace(/ /g, "_");

  window.location.href = "/results/" + searchTerm;

  getID = (data) => {
    const arrLength = data.length;
    const newData = [];
    for (i = 0; i < arrLength; i++) {
      newData.push(data[i].id);
    }
    return newData;
  };
}

async function signupFormHandler(event) {
  event.preventDefault();
  const userName = document.querySelector('#InputUser').value.trim();
  const passwords = document.querySelector('#InputPassword').value.trim();
  if(userName && passwords){
    const response = await fetch('/api/users',{
      method:'post',
      body:JSON.stringify({
        userName,
        passwords
      }),
      headers:{'Content-Type':'application/json'}
    });
        // check the response status
        if (response.ok) {
          console.log('success');
        } else {
          alert(response.statusText);
        }
  }
}
async function loginFormHandler(event) {
  event.preventDefault();

  const userName = document.querySelector('#InputUser').value.trim();
  const passwords = document.querySelector('#InputPassword').value.trim();

  if (userName && passwords) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#signin').addEventListener('submit', loginFormHandler);

document.querySelector('#signup').addEventListener('submit', signupFormHandler);
