// Check if user is already logged in and redirect
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'index.html';
}

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let storedUsername = localStorage.getItem('username') || 'mewingacademy';
    let storedPassword = localStorage.getItem('password') || 'looksmaxxing123';
    
    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
    }
    else {
        document.getElementById('error-message').textContent = 'Invalid username or password';
    }
});
