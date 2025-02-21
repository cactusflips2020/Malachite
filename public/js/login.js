document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Simulate checking username and password
    if (username === 'mewingacademy' && password === 'looksmaxxing123') {
        // Save user information to localStorage to simulate login
        localStorage.setItem('isLoggedIn', 'true');

        // Redirect to the homepage (index.html)
        window.location.href = 'index.html';
    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password';
    }
});
