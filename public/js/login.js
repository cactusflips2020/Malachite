if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('s-user-login-form');
    const forgotForm = document.getElementById('forgot-password-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            let username = document.getElementById('edit-mail').value;
            let password = document.getElementById('edit-pass').value;

            let storedUsername = localStorage.getItem('username') || 'malachite';
            let storedPassword = localStorage.getItem('password') || 'malachiteontop';
            
            if (username === storedUsername && password === storedPassword) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'index.html';
            }
            else {
                const schoolWrapper = document.getElementById('edit-school-wrapper');
                if (schoolWrapper && schoolWrapper.style.display === 'block') {
                    return false;
                }
                
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
                    
                    form.parentNode.insertBefore(errorElement, form.nextSibling);
                }
                
                errorElement.textContent = 'Invalid username or password';
                errorElement.style.display = 'block';
                
                setTimeout(function() {
                    if (errorElement) {
                        errorElement.style.display = 'none';
                    }
                }, 3000);
            }
            
            return false;
        });
    } else {
        console.error('Form not found!'); 
    }
    
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            localStorage.setItem('username', 'malachite');
            localStorage.setItem('password', 'malachiteontop');
            
            document.getElementById('forgot-email').value = '';
            
            return false;
        });
    }
    
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
            
            const successElement = document.getElementById('success-message');
            if (successElement) {
                successElement.style.display = 'none';
            }
        });
    }
    
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
    
    const clearSchoolField = document.getElementById('clear-school-field');
    if (clearSchoolField) {
        clearSchoolField.addEventListener('click', function() {
            document.getElementById('edit-school').value = '';
        });
    }
});
