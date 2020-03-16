class Form {
    username;
    password;
}

function showLoginForm() {
    document.getElementById('user').innerHTML = `
        <form id="loginForm" method="POST" action="/api/auth/signin">
            <label for="username">Login:</label><input name="username" type="text">
            <label for="password">Hasło:</label><input name="password" type="password">
            <button type="submit" onclick="login()">Zaloguj</button>
        </form>
    `;
}

function login(){
    var http = new XMLHttpRequest();
    var formLogin = document.getElementById('loginForm');
    var jsonForm = getLoginFormJSON(formLogin);
    var response;
    http.open(formLogin.method, formLogin.action, true);
    http.setRequestHeader("Content-Type", "application/json");
    console.log(jsonForm);
    http.onloadend = (function() {
        if (http.readyState == XMLHttpRequest.DONE) {
            alert(http.responseText);
            response = JSON.parse(http.responseText);
            if (response.hasOwnProperty('username')){
                sessionStorage.setItem('user', response.username);
            }
            window.location.replace("/");
        }
    });
    console.log(jsonForm);
    http.send(jsonForm);
    console.log(response);
}

function getLoginFormJSON(formLogin){
    console.log(formLogin.method);
    console.log(formLogin);
    form = new Form();
    form.username = formLogin.elements[0].value;
    form.password = formLogin.elements[1].value;
    return JSON.stringify(form);
}

function logout() {
    sessionStorage.removeItem('user');
    window.location.reload();
}

(function() {
    const API_URL = 'http://localhost:8080/api';
    var id = getQueryVariable("id");
    session = sessionStorage.getItem('user');
    window.onload = function() {
        if (session === null){
            document.getElementById('user').innerHTML = `
                <a href="#" onclick="showLoginForm()">Zaloguj się</a>
                <a href="#" onclick="showRegisterForm()">Zarejestruj się</a>
            `;
        } else {
            document.getElementById('user').innerHTML = `
                <div>
                    ${session.username}
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
    
    

    function getBook(id) {
        var bookHTML = fetch(`${API_URL}/books/` + id)
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

    function getDescription(book_id){
        var bookHTML = ``;
        fetch(`${API_URL}/description/findOneDescription?book_id=` + book_id)
            .then(processOkResponse)
            .then(description => {
                var str =  `
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

    function getQueryVariable(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){ return pair[1]; 
            }
        }
        return(false);
    }

    function getAllBooks () {
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
}) ();