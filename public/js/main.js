window.addEventListener('load', function() {
    if (localStorage.getItem('autoab') === 'true') {
        runAutoABFunction();
    }
});

function runAutoABFunction() {
    launchab();
}

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

window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
        if (window.location.pathname !== '/login.html') {
            window.location.href = '/login.html';
        }
    } else {
        const userName = localStorage.getItem('userName');
        const currentPath = window.location.pathname;
        
        if (!userName && currentPath !== '/index.html' && currentPath !== '/') {
            window.location.href = '/index.html';
        }
    }
};

const searchEngineUrl = localStorage.getItem('searchEngineSelectUrl') || "https://www.duckduckgo.com/?q=%s";

window.addEventListener('beforeunload', function (event) {
    let isLeaveConfirmationEnabled = localStorage.getItem('leaveConfirmation') === 'true';
    
    if (isLeaveConfirmationEnabled) {
        event.preventDefault();
        event.returnValue = 'Are you sure you want to leave this page?';
    }
});

window.addEventListener("keydown", (e) => {
    const savedKey = localStorage.getItem("redirectKey");
    const redirectUrl = localStorage.getItem("redirectUrl") || "https://www.google.com";
    if (savedKey && e.key === savedKey) {
        window.location.href = redirectUrl;
    }
});

(function() {
    const body = document.body;
    const ANIMATION_NAME = 'breathing-bg';
    const ANIMATION_DURATION = 14;
    
    let progress = parseFloat(localStorage.getItem('breathingBgProgress') || '0');
    if (!isNaN(progress)) {
        body.style.animationDelay = `-${progress}s`;
    }
    
    setInterval(() => {
        const start = performance.timing.navigationStart;
        const now = Date.now();
        let elapsed = ((now - start) / 1000 + progress) % ANIMATION_DURATION;
        
        if (getComputedStyle(body).animationName !== ANIMATION_NAME) return;
        localStorage.setItem('breathingBgProgress', elapsed.toFixed(2));
    }, 100);
})();

document.addEventListener('DOMContentLoaded', function() {
    let logo = document.querySelector('.logo-container svg');
    let proxyLogo = document.querySelector('#logo.svg-logo');
    
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
    
    if (proxyLogo) {
        proxyLogo.addEventListener('mouseenter', function() {
            proxyLogo.classList.add('logo-spin');
            proxyLogo.classList.remove('logo-reverse');
        });
        proxyLogo.addEventListener('mouseleave', function() {
            proxyLogo.classList.remove('logo-spin');
            proxyLogo.classList.add('logo-reverse');
        });
    }
});

function syncThemeSelector() {
    const savedTheme = localStorage.getItem('siteTheme') || 'moss';
    const themeSelector = document.getElementById('theme-select');
    if (themeSelector) {
        themeSelector.value = savedTheme;
    }
}

(function() {
    const savedTheme = localStorage.getItem('siteTheme') || 'moss';
            document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir', 'theme-ocean', 'theme-sunset', 'theme-solar');
    document.body.classList.add('theme-' + savedTheme);
    
    syncThemeSelector();
})();

document.addEventListener('DOMContentLoaded', syncThemeSelector);

function updateLogoAndFavicon(theme) {
    const logoPath = 'img/logo.svg';
    
    const faviconPath = 'img/favicon.svg';

    const logoImgs = Array.from(document.querySelectorAll('.logo-container img, .logo-container a img, .logo-above-title img, #logo-container img, #logo'));
    if (logoImgs.length > 0) {
        logoImgs.forEach(img => { 
            img.src = logoPath;
            img.classList.add('svg-logo');
        });
    }
    
    let tabCloak = localStorage.getItem('tabCloak') || 'Default';
    if (typeof chemical !== 'undefined' && chemical.setStore) {
        if (tabCloak === 'Default' || !tabCloak) {
            chemical.setStore('icon', faviconPath);
            chemical.setStore('title', 'Malachite');
        }
    }
}

function getCurrentTheme() {
    return (localStorage.getItem('siteTheme') || 'moss');
}

function initializeFavicon() {
    let tabCloak = localStorage.getItem('tabCloak') || 'Default';
    let theme = getCurrentTheme();
    const faviconPath = 'img/favicon.svg';
    
    if (typeof chemical !== 'undefined' && chemical.setStore) {
        if (tabCloak === 'Default' || !tabCloak) {
            chemical.setStore('icon', faviconPath);
        }
        if (tabCloak === 'Default' || !tabCloak) {
            chemical.setStore('title', 'Malachite');
        }
    }
    updateLogoAndFavicon(theme);
}

window.addEventListener('DOMContentLoaded', function() {
    initializeFavicon();
    setTimeout(initializeFavicon, 100);
    setTimeout(initializeFavicon, 500);
});

window.addEventListener('load', function() {
    initializeFavicon();
    setTimeout(initializeFavicon, 200);
});

window.addEventListener('storage', function(e) {
    if (e.key === 'siteTheme' || e.key === 'tabCloak') {
        initializeFavicon();
    }
});

(function() {
    const origSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        origSetItem.apply(this, arguments);
        if (key === 'siteTheme' || key === 'tabCloak') {
            initializeFavicon();
        }
    };
})();



