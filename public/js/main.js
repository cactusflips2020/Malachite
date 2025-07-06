// ===== MALACHITE MAIN FUNCTIONALITY =====

// ===== AUTO ABOUT:BLANK FUNCTIONALITY =====

// Check for auto about:blank on page load
window.addEventListener('load', function() {
    if (localStorage.getItem('autoab') === 'true') {
        runAutoABFunction();
    }
});

function runAutoABFunction() {
    launchab();
}

// Launch about:blank cloak
function launchab() {
    const tab = window.open('about:blank', '_blank');
    const iframe = tab.document.createElement('iframe');
    const stl = iframe.style;
    stl.border = stl.outline = 'none';
    stl.width = '100vw';
    stl.height = '100vh';
    stl.position = 'fixed';
    stl.left = stl.right = stl.top = stl.bottom = '0';
    iframe.src = self.location;
    tab.document.body.appendChild(iframe);
    window.parent.window.location.replace('https://classroom.google.com/');
}

// ===== AUTHENTICATION CHECK =====

// Redirect to login if not authenticated
window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
        if (window.location.pathname !== '/login.html') {
            window.location.href = '/login.html';
        }
    }
};

// ===== SEARCH ENGINE CONFIGURATION =====

// Get user's preferred search engine
const searchEngineUrl = localStorage.getItem('searchEngineSelectUrl') || "https://www.google.com/search?q=%s";

// ===== PAGE PROTECTION =====

// Leave confirmation dialog
window.addEventListener('beforeunload', function (event) {
    let isLeaveConfirmationEnabled = localStorage.getItem('leaveConfirmation') === 'true';
    
    if (isLeaveConfirmationEnabled) {
        event.preventDefault();
        event.returnValue = 'Are you sure you want to leave this page?';
    }
});

// Panic key functionality
window.addEventListener("keydown", (e) => {
    const savedKey = localStorage.getItem("redirectKey");
    const redirectUrl = localStorage.getItem("redirectUrl") || "https://www.google.com";
    if (savedKey && e.key === savedKey) {
        window.location.href = redirectUrl;
    }
});

// ===== BREATHING ANIMATION PERSISTENCE =====

// Maintain breathing background animation state across page reloads
(function() {
    const body = document.body;
    const ANIMATION_NAME = 'breathing-bg';
    const ANIMATION_DURATION = 14; // seconds
    
    // Restore animation progress from localStorage
    let progress = parseFloat(localStorage.getItem('breathingBgProgress') || '0');
    if (!isNaN(progress)) {
        body.style.animationDelay = `-${progress}s`;
    }
    
    // Update progress every 100ms
    setInterval(() => {
        const start = performance.timing.navigationStart;
        const now = Date.now();
        let elapsed = ((now - start) / 1000 + progress) % ANIMATION_DURATION;
        
        // Only update if animation is running
        if (getComputedStyle(body).animationName !== ANIMATION_NAME) return;
        localStorage.setItem('breathingBgProgress', elapsed.toFixed(2));
    }, 100);
})();

// ===== LOGO ANIMATION =====

// Add spin animation to logo on hover
document.addEventListener('DOMContentLoaded', function() {
    let logo = document.querySelector('.logo-container img');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            logo.classList.add('logo-spin');
            logo.classList.remove('logo-reverse');
        });
        logo.addEventListener('mouseleave', function() {
            logo.classList.remove('logo-spin');
            logo.classList.add('logo-reverse');
        });
    }
});

// ===== THEME INITIALIZATION =====

// Function to sync theme selector with current theme
function syncThemeSelector() {
    const savedTheme = localStorage.getItem('siteTheme') || 'moss';
    const themeSelector = document.querySelector('.theme-select');
    if (themeSelector) {
        themeSelector.value = savedTheme;
        console.log('Main.js: Theme selector synced to:', savedTheme);
    }
}

    // Apply saved theme on page load
(function() {
    const savedTheme = localStorage.getItem('siteTheme') || 'moss';
    document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir');
    document.body.classList.add('theme-' + savedTheme);
    
    // Also update theme selector if it exists (for settings page)
    syncThemeSelector();
})();

// Sync theme selector when DOM is loaded
document.addEventListener('DOMContentLoaded', syncThemeSelector);

// ===== LOGO AND FAVICON MANAGEMENT =====

// Update logo and favicon based on current theme
function updateLogoAndFavicon(theme) {
    // Logo mapping for each theme
    const logoMap = {
        moss: 'img/mosslogo.png',
        midnight: 'img/midnightlogo.png',
        rose: 'img/roselogo.png',
        noir: 'img/noirlogo.png'
    };
    
    // Favicon mapping for each theme
    const faviconMap = {
        moss: 'img/mossfavicon.ico',
        midnight: 'img/midnightfavicon.ico',
        rose: 'img/rosefavicon.ico',
        noir: 'img/noirfavicon.ico'
    };
    
    // Update all logo images on the page
    const logoImgs = Array.from(document.querySelectorAll('.logo-container img, .logo-container a img, .logo-above-title img, #logo-container img, #logo'));
    if (logoImgs.length > 0 && logoMap[theme]) {
        logoImgs.forEach(img => { img.src = logoMap[theme]; });
    }
    
    // Update favicon and title if using default tab cloak
    let tabCloak = localStorage.getItem('tabCloak') || 'Default';
    if (typeof chemical !== 'undefined' && chemical.setStore) {
        if (tabCloak === 'Default' || !tabCloak) {
            if (faviconMap[theme]) {
                chemical.setStore('icon', faviconMap[theme]);
            }
            chemical.setStore('title', 'Malachite');
        }
    }
}

// Get current theme from localStorage
function getCurrentTheme() {
    return (localStorage.getItem('siteTheme') || 'moss');
}

// Initialize favicon and logo with multiple attempts for reliability
function initializeFavicon() {
    let tabCloak = localStorage.getItem('tabCloak') || 'Default';
    let theme = getCurrentTheme();
    const faviconMap = {
        moss: 'img/mossfavicon.ico',
        midnight: 'img/midnightfavicon.ico',
        rose: 'img/rosefavicon.ico',
        noir: 'img/noirfavicon.ico'
    };
    
    if (typeof chemical !== 'undefined' && chemical.setStore) {
        if (tabCloak === 'Default' || !tabCloak) {
            if (faviconMap[theme]) {
                chemical.setStore('icon', faviconMap[theme]);
            }
        }
        // Only set title if tab cloak is Default to avoid conflicts
        if (tabCloak === 'Default' || !tabCloak) {
            chemical.setStore('title', 'Malachite');
        }
    }
    updateLogoAndFavicon(theme);
}

// ===== FAVICON INITIALIZATION =====

// Multiple initialization attempts to ensure favicon loads
window.addEventListener('DOMContentLoaded', function() {
    initializeFavicon();
    setTimeout(initializeFavicon, 100);
    setTimeout(initializeFavicon, 500);
});

window.addEventListener('load', function() {
    initializeFavicon();
    setTimeout(initializeFavicon, 200);
});

// ===== THEME AND CLOAK CHANGE HANDLERS =====

// Update favicon when theme or cloak changes
window.addEventListener('storage', function(e) {
    if (e.key === 'siteTheme' || e.key === 'tabCloak') {
        initializeFavicon();
    }
});

// Override localStorage.setItem to catch theme/cloak changes
(function() {
    const origSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        origSetItem.apply(this, arguments);
        if (key === 'siteTheme' || key === 'tabCloak') {
            initializeFavicon();
        }
    };
})();

