const cartButton = document.querySelector("#cart-button");



// day 1
// Authentification

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector(".close-auth");
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector ('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('user');

function toggleModalAuth () {
  modalAuth.classList.toggle('is-open');
  loginInput.style.borderColor = '';
  if (modalAuth.classList.contains ("is-open")) {
    disableScroll();
  } else {
    enableScroll();
  }
}
// Управление окном авторизации

function clearForm () {
  loginInput.style.borderColor = '';
  loginForm.reset();
}

function authorized () {
  console.log('авторизован');

  //функция, срабатывающая при нажатии на кнопку "выйти"
  function logOut () {
    login = null;
    localStorage.removeItem('user');
    //???? зачем? 40 строка
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);

    checkAuth();
  }
  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
}

function notAuthorized () {
  console.log('не авторизован');
  //функция, срабатывающая на сабмит формы авторизвции
  function logIn (event) {
    event.preventDefault();
    if (loginInput.value.trim()) {
      login = loginInput.value;
    localStorage.setItem('user', login);
    toggleModalAuth();
    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth);
    loginForm.removeEventListener('submit', logIn);
    // очищаем поля формы
    loginForm.reset();
    checkAuth();
    } else {
      loginInput.style.borderColor = 'red';
      loginInput.value = '';
    }
    
  }
  // перенесли сюда обработчики событий, т.к. событие произойдёт только если пользователь не авторизован
  buttonAuth.addEventListener('click', toggleModalAuth);
  buttonAuth.addEventListener('click', clearForm);
  closeAuth.addEventListener('click', toggleModalAuth);
  loginForm.addEventListener('submit', logIn);
  modalAuth.addEventListener('click', function (event) {
    if (event.target.classList.contains('is-open')) {
      toggleModalAuth();
    }
  })
}

// copy of const obj {...obj}

function checkAuth () {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();
// тернарный оператор используется для присвоения значения переменной в зависимости от условя