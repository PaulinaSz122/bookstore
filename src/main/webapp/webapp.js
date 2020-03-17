const API_URL = 'http://localhost:8080/api';

class LoginForm {
    username;
    password;
}

class RegisterForm {
    username;
    email;
    role;
    password;
}

var session;

var id = getQueryVariable("id");
session = sessionStorage.getItem('user');
var user = JSON.parse(session);
window.onload = function () {
    if (session === null) {
        document.getElementById('user').innerHTML = `
                <a href="#" onclick="showLoginForm()">Zaloguj się</a>
                <a href="#" onclick="showRegisterForm()">Zarejestruj się</a>
            `;
    } else {
        document.getElementById('user').innerHTML = `
                <div>
                    ${user.username}
                    <a href="#" onclick="logout()">Wyloguj</a>
                </div>
            `;
    }
    if (id) {
        getWholeBook(id);
    }
    else {
        getAllBooks();
    }
}

