let state = {};
//Query Selectors
let btn = document.querySelector('#btn');
let fullName = document.querySelector('#fullname');
let avatar = document.querySelector('#avatar');
let userName = document.querySelector('#username');
let email = document.querySelector('#email');
let city = document.querySelector('#city');

let nextUser = () => {
  fetch('https://randomuser.me/api/')
    .then(handleErrors)
    .then(getData)
    .catch(printError);
};

let handleErrors = res => {
  if (!res.ok) {
    throw Error(404);
  }
  return res.json();
};

let getData = data => {
  console.log('OK!', data);
  state.firstName = capitalize(data.results[0].name.first);
  state.lastName = capitalize(data.results[0].name.last);
  state.userName = data.results[0].login.username;
  state.email = data.results[0].email;
  state.city = capitalize(data.results[0].location.city);
  state.picture = data.results[0].picture.medium;
  showUser();
};

let printError = error => console.log(error);

//Event Listener
btn.addEventListener('click', function() {
  nextUser();
});

//capitalize string items
let capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
//display to DOM
let showUser = () => {
  fullName.innerHTML = `${state.firstName} ${state.lastName}`;
  userName.innerHTML = `${state.userName}`;
  email.innerHTML = `${state.email}`;
  city.innerHTML = `${state.city}`;
  avatar.src = state.picture;
};

nextUser();
