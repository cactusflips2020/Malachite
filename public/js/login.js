// Check if user is already logged in and redirect
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'index.html';
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('s-user-login-form');
    const forgotForm = document.getElementById('forgot-password-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            console.log('Form submitted'); // Debug log
            
            let username = document.getElementById('edit-mail').value;
            let password = document.getElementById('edit-pass').value;
            
            console.log('Username:', username); // Debug log
            console.log('Password:', password); // Debug log

            let storedUsername = localStorage.getItem('username') || 'malachite';
            let storedPassword = localStorage.getItem('password') || 'malachiteontop';
            
            console.log('Stored username:', storedUsername); // Debug log
            console.log('Stored password:', storedPassword); // Debug log
            
            if (username === storedUsername && password === storedPassword) {
                console.log('Login successful'); // Debug log
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'index.html';
            }
            else {
                console.log('Login failed'); // Debug log
                // Create error message element if it doesn't exist
                let errorElement = document.getElementById('error-message');
                if (!errorElement) {
                    errorElement = document.createElement('div');
                    errorElement.id = 'error-message';
                    errorElement.className = 'error-message';
                    errorElement.style.display = 'block';
                    errorElement.style.color = '#d32f2f';
                    errorElement.style.fontSize = '13px';
                    errorElement.style.margin = '16px 0';
                    errorElement.style.textAlign = 'center';
                    errorElement.style.padding = '12px';
                    errorElement.style.backgroundColor = '#ffebee';
                    errorElement.style.border = '1px solid #ffcdd2';
                    errorElement.style.borderRadius = '4px';
                    errorElement.style.clear = 'both';
                    
                    // Insert error message after the form
                    form.parentNode.insertBefore(errorElement, form.nextSibling);
                }
                
                errorElement.textContent = 'Invalid username or password';
                errorElement.style.display = 'block';
            }
            
            return false; // Prevent form submission
        });
    } else {
        console.error('Form not found!'); // Debug log
    }
    
    // Forgot password form submission
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Reset password to default values
            localStorage.setItem('username', 'malachite');
            localStorage.setItem('password', 'malachiteontop');
            
            // Clear the email field
            document.getElementById('forgot-email').value = '';
            
            return false;
        });
    }
    
    // Forgot password link functionality
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const backToLoginLink = document.getElementById('back-to-login-link');
    const signInHeader = document.querySelector('.sign-in-header');
    const forgotHeader = document.querySelector('.forgot-header');
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(event) {
            event.preventDefault();
            form.style.display = 'none';
            forgotForm.style.display = 'block';
            signInHeader.style.display = 'none';
            forgotHeader.style.display = 'block';
            
            // Hide error message when switching to forgot password
            const errorElement = document.getElementById('error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    }
    
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', function(event) {
            event.preventDefault();
            forgotForm.style.display = 'none';
            form.style.display = 'block';
            forgotHeader.style.display = 'none';
            signInHeader.style.display = 'block';
            
            // Hide any success/error messages
            const successElement = document.getElementById('success-message');
            if (successElement) {
                successElement.style.display = 'none';
            }
        });
    }
    
    // Show/hide school field functionality
    const schoolWrapper = document.getElementById('edit-school-wrapper');
    const ssoLoginLink = document.querySelector('.sso-login-link');
    const regularLoginLink = document.querySelector('.regular-login-link');
    const emailWrapper = document.getElementById('edit-mail-wrapper');
    const passwordWrapper = document.getElementById('edit-pass-wrapper');
    
    if (ssoLoginLink) {
        ssoLoginLink.addEventListener('click', function() {
            schoolWrapper.style.display = 'block';
            emailWrapper.style.display = 'none';
            passwordWrapper.style.display = 'none';
            ssoLoginLink.classList.add('hidden');
            regularLoginLink.classList.remove('hidden');
        });
    }
    
    if (regularLoginLink) {
        regularLoginLink.addEventListener('click', function() {
            schoolWrapper.style.display = 'none';
            emailWrapper.style.display = 'block';
            passwordWrapper.style.display = 'block';
            regularLoginLink.classList.add('hidden');
            ssoLoginLink.classList.remove('hidden');
        });
    }
    
    // Clear school field functionality
    const clearSchoolField = document.getElementById('clear-school-field');
    if (clearSchoolField) {
        clearSchoolField.addEventListener('click', function() {
            document.getElementById('edit-school').value = '';
        });
    }
});
