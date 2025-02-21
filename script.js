function signup() {
    let name = document.getElementById('full-name').value.trim();
    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();
    
    if (!name || !username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        alert('Username already exists. Please choose another.');
        return;
    }

    users[username] = { name, password };
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful! Please login.');
}

function login() {
    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Please enter username and password.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username].password === password) {
        localStorage.setItem('loggedInUser', username);
        showDashboard(users[username].name);
    } else {
        alert('Invalid username or password.');
    }
}

function showDashboard(name) {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('user').innerText = name;
}

function logout() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('dashboard').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
}

window.onload = function() {
    let users = JSON.parse(localStorage.getItem('users')) || {};
    let loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser && users[loggedInUser]) {
        showDashboard(users[loggedInUser].name);
    }
}
