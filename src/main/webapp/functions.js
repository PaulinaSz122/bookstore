function showLoginForm() {
    document.getElementById('user').innerHTML = `
        <form id="loginForm">
            <label for="username">Login:</label><input name="username" type="text">
            <label for="password">Hasło:</label><input name="password" type="password">
            <div id="error"></div>
            <input type="button" value="Zaloguj" onclick="login()">
        </form>
        <a href="#" onclick="showRegisterForm()">Nie masz konta? Zarejestruj się!</a>
    `;
}

function showRegisterForm(){
    document.getElementById('user').innerHTML = `
        <form id="registerForm">
            <div id="correct"></div>
            <label for="username">Login:</label><input name="username" type="text">
            <div id="incorrectLogin"></div>
            <label for="email">E-mail:</label><input name="email" type="text">
            <div id="incorrectEmail"></div>
            <label for="password">Hasło:</label><input name="password" type="password">
            <div id="incorrectPassword"></div>
            <label for="passwordConfirm">Potwierdź hasło:</label><input name="passwordConfirm" type="password">
            <div id="incorrectConfirmPassword"></div>
            <input type="button" value="Zaloguj" onclick="register()">
        </form>
        <a href="#" onclick="showLoginForm()">Masz już konto? Zaloguj się!</a>
    `;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password){
    if (password.length >= 8 && password.length <= 32) {
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/
        if (password.match(re)) {
            return true;
        } else {
            document.getElementById('incorrectPassword').innerText = 'Hasło powninno zawierać co najmniej jedną dużą i małą literę oraz co najmniej jedną cyfrę!';
            return false;
        }
    } else {
        document.getElementById('incorrectPassword').innerText = 'Hasło powninno zawierać od 8 do 32 znaków';
        return false;
    }
}

function validateLogin(login) {
    var re = /^(?=.*[a-zA-z])(?=.*[a-zA-z\d]).{3,32}$/
    if (login.length >= 3 && login.length <= 32) {
        if (login.match(re)) {
            return true;
        } else {
            document.getElementById('incorrectLogin').innerText = 'Login powinien składać się z liter i cyfr, z czego pierwszy znak musi być literą!';
            return false;
        }
    } else {
        document.getElementById('incorrectLogin').innerText = 'Login powinien zawierać od 3 do 32 znaków';
        return false;
    }
}

function login() {
    var http = new XMLHttpRequest();
    var formLogin = document.getElementById('loginForm');
    var jsonForm = getLoginFormJSON(formLogin);
    http.open('POST', API_URL + '/auth/signin', true);
    http.setRequestHeader("Content-Type", "application/json");
    http.onloadend = (function () {
        if (http.readyState == XMLHttpRequest.DONE && this.status == 200) {
            sessionStorage.setItem('user', this.responseText);
            window.location.replace("/");
        } else {
            if (JSON.parse(this.responseText).error === "Unauthorized"){
                document.getElementById('error').innerText = 'Nieprawidłowy login/hasło!';
            }
        }
    });
    http.send(jsonForm);
}

function register() {
    var http = new XMLHttpRequest();
    var registerForm = document.getElementById('registerForm');
    var jsonForm = getRegisterFormJSON(registerForm);
    var msg;
    if (jsonForm) {
        http.open('POST', API_URL + '/auth/signup', true);
        http.setRequestHeader("Content-Type", "application/json");
        http.onloadend = (function () {
            console.log(this.responseText);
            msg = JSON.parse(this.responseText);
            if (http.readyState == XMLHttpRequest.DONE && this.status == 200) {
                document.getElementById('correct').innerText = msg.message;
            } else if (http.readyState == XMLHttpRequest.DONE && this.status == 400) {
                if (msg.message === "Adres e-mail został już użyty") {
                    document.getElementById('incorrectEmail').innerText = msg.message;
                } else if (msg.message === "Nazwa użytkownika jest zajęta") {
                    document.getElementById('incorrectLogin').innerText = msg.message;
                }
            }
        });
        console.log(jsonForm);
        http.send(jsonForm);
    }
}

function getLoginFormJSON(formLogin) {
    form = new LoginForm();
    form.username = formLogin.elements[0].value;
    form.password = formLogin.elements[1].value;
    return JSON.stringify(form);
}

function getRegisterFormJSON(registerForm) {
    document.getElementById('incorrectLogin').innerText = '';
    document.getElementById('incorrectEmail').innerText = '';
    document.getElementById('incorrectPassword').innerText = '';
    document.getElementById('incorrectConfirmPassword').innerText = '';
    form = new RegisterForm();
    if (validateLogin(registerForm.elements[0].value)) {
        form.username = registerForm.elements[0].value;
    } else {
        return null;
    }
    if (validateEmail(registerForm.elements[1].value)){
        form.email = registerForm.elements[1].value;
    } else {
        document.getElementById('incorrectEmail').innerText = 'E-email jest nieprawidłowy!';
        return null;
    }
    if (registerForm.elements[2].value === registerForm.elements[3].value) {
        if (validatePassword(registerForm.elements[2].value)){
            form.password = registerForm.elements[2].value;
        } else {
            return null;
        }
    } else {
        document.getElementById('incorrectConfirmPassword').innerText = 'Hasła nie są identyczne!';
        return null;
    }
    
    form.role = [ "USER" ];
    return JSON.stringify(form);
}

function logout() {
    sessionStorage.removeItem('user');
    window.location.reload();
}

function getBook(id) {
    fetch(`${API_URL}/books/` + id)
        .then(processOkResponse)
        .then(book => {
            var str = `
                    <img src="/images/${book.id}.jpg">
                    <h3>Tytuł: ${book.title}</h3>
                    <h4>Autor: ${book.author}</h4>
                    <h4>Cena: ${book.price.toFixed(2)} zł</h4>
                `; document.getElementById('book').innerHTML += str;
        });
}

function getDescription(book_id) {
    fetch(`${API_URL}/description/findOneDescription?book_id=` + book_id)
        .then(processOkResponse)
        .then(description => {
            var str = `
                    <h5>Wydawnictwo: ${description.publisher}</h5>
                    <h5>Data wydania: ${description.release_date}</h5>
                    <p>${description.description}</p>
                `; document.getElementById('description').innerHTML += str;
        });
}

function getWholeBook(id) {
    document.getElementById('books').innerHTML = `
            <div id="book"></div>
            <div id="description"></div>
        `;
    getBook(id);
    getDescription(id);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

function getAllBooks() {
    var begin = `<table id="books_table">\n`;
    var end = `<table/>\n`;
    fetch(`${API_URL}/books/all`)
        .then(processOkResponse)
        .then(booksArr => {
            document.getElementById('books').innerHTML = begin + booksArr.map(
                book => `
                    <tr>
                        <td><a href="?id=${book.id}"><img style="width: 60px" src="/images/${book.id}.jpg"></a></td>
                        <td><a href="?id=${book.id}">${book.title}</a></td>
                        <td>${book.author}</td>
                        <td>${book.price.toFixed(2)} zł</td>
                    </tr>
                `
            ).join('\n') + end;
        });
}

function processOkResponse(response = {}) {
    if (response.ok) {
        return response.json();
    }
    throw new Error(`Status not 200 (${response.status})`);
}