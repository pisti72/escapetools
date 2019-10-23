const api = './api.php';

function newuser() {
  visible('newuser');
  hide('login');
}

function cancel() {
  visible('login');
  hide('newuser');
}

function register() {
  var name = f('name').value;
  var email = f('email').value;
  var password = f('password').value;
  try {
    const data = await postData('http://example.com/answer', { answer: 42 });
    console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
  } catch (error) {
    console.error(error);
  }

  async function postData(url = api, data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }
}

function visible(n) {
  f(n).style.display = 'block';
}

function hide(n) {
  f(n).style.display = 'none';
}

function f(n) {
  return document.getElementById(n);
}