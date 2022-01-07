class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;

    }
}
// register User
function register() {
    let id = Math.floor(Math.random() * 1000000);
    let Name = document.getElementById('name').value;
    let email = document.getElementById('EMAIL').value;
    let password = document.getElementById('psswd').value;
    var x = document.forms["myForm"]["psswd"].value.length;
    //check if the password length is 8 or more 
    if (x <= 8) {
        alert("Password should be more than 8 numbers try again");

    } else {

        //create new user
        let newUser = new User(id, Name, email, password);

        if (localStorage.getItem('Users')) { //if i have users in local storage
            let users = []
            users = JSON.parse(localStorage.getItem('Users') || "[]");
            console.log(users);
            users.push(newUser);
            localStorage.setItem('Users', JSON.stringify(users));
            window.location = 'login.html'
            window.alert("User successfully created. Now login to continue.!");
        } else {
            //if i have not  users in local storage
            localStorage.setItem('Users', JSON.stringify([newUser]));
            window.location = 'login.html'
            window.alert("User successfully created. Now login to continue.!");
        }

    }
}

// login user
function login() {
    let email = document.getElementById('EMAIL').value;
    let password = document.getElementById('psswd').value;
    let users = JSON.parse(localStorage.getItem('Users') || "[]");
    let user;
    let isAuthUser = false;
    var i;
    for (i = 0; i < users.length; i++) {
        user = users[i];
        if (user.email === email && user.password === password) {
            isAuthUser = true;
            sessionStorage.setItem('isAuthenticated', true);
            break;
        }
    }
    if (isAuthUser) {

        sessionStorage.setItem('currUserpassword', user.password);
        sessionStorage.setItem('currUserEmail', user.email);
        sessionStorage.setItem('isAuthenticated', true);
        window.location = 'index.html';
    } else {
        window.alert("Invalid email or incorrect password. Try Again!");
    }
}