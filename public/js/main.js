window.addEventListener('load', function() {
    // Check if 'autoab' is active in localStorage
    if (localStorage.getItem('autoab') === 'true') {
        runAutoABFunction();
    }
});

function runAutoABFunction() {
    launchab()
}

function launchab() {
    const tab = window.open('about:blank', '_blank')
    const iframe = tab.document.createElement('iframe')
    const stl = iframe.style
    stl.border = stl.outline = 'none'
    stl.width = '100vw'
    stl.height = '100vh'
    stl.position = 'fixed'
    stl.left = stl.right = stl.top = stl.bottom = '0'
    iframe.src = self.location
    tab.document.body.appendChild(iframe)
    window.parent.window.location.replace('https://classroom.google.com/')
  }

  window.onload = function() {
    // Check if the user is logged in by checking localStorage
const isLoggedIn = localStorage.getItem('isLoggedIn');

if (!isLoggedIn || isLoggedIn !== 'true') {
    // If not logged in, redirect to login page
if (window.location.pathname !== '/login.html') {
    window.location.href = '/login.html';
    }
    }
};

const searchEngineUrl = localStorage.getItem('searchEngineSelectUrl') || "https://www.google.com/search?q=%s";

window.addEventListener('beforeunload', function (event) {
    let isLeaveConfirmationEnabled = localStorage.getItem('leaveConfirmation') === 'true';

    if (isLeaveConfirmationEnabled) {
        event.preventDefault();
        event.returnValue = 'Are you sure you want to leave this page?'; // Chrome requires this message
    }
});

window.addEventListener("keydown", (e) => {
    const savedKey = localStorage.getItem("redirectKey");
    const redirectUrl = localStorage.getItem("redirectUrl") || "https://www.google.com";
    if (savedKey && e.key === savedKey) {
        window.location.href = redirectUrl;
    }
});

// Persist breathing background animation state
(function() {
  const body = document.body;
  const ANIMATION_NAME = 'breathing-bg';
  const ANIMATION_DURATION = 14; // seconds
  // On load, set animation delay to match saved progress
  let progress = parseFloat(localStorage.getItem('breathingBgProgress') || '0');
  if (!isNaN(progress)) {
    body.style.animationDelay = `-${progress}s`;
  }
  // Update progress every 100ms
  setInterval(() => {
    // Get computed animation time
    const start = performance.timing.navigationStart;
    const now = Date.now();
    // Estimate progress based on elapsed time and animation duration
    let elapsed = ((now - start) / 1000 + progress) % ANIMATION_DURATION;
    // If the animation is paused or not running, skip
    if (getComputedStyle(body).animationName !== ANIMATION_NAME) return;
    localStorage.setItem('breathingBgProgress', elapsed.toFixed(2));
  }, 100);
})();

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

(function() {
  const savedTheme = localStorage.getItem('siteTheme') || 'moss';
  document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-classic');
  document.body.classList.add('theme-' + savedTheme);
})();

function updateLogoAndFavicon(theme) {
  // Logo mapping
  const logoMap = {
    moss: 'img/mosslogo.png',
    midnight: 'img/midnightlogo.png',
    rose: 'img/roselogo.png',
    classic: 'img/classiclogo.png'
  };
  // Favicon mapping
  const faviconMap = {
    moss: 'img/mossfavicon.ico',
    midnight: 'img/midnightfavicon.ico',
    rose: 'img/rosefavicon.ico',
    classic: 'img/classicfavicon.ico'
  };
  // Set logo for current theme (always)
  const logoImgs = Array.from(document.querySelectorAll('.logo-container img, .logo-container a img, .logo-above-title img, #logo-container img, #logo'));
  if (logoImgs.length > 0 && logoMap[theme]) {
    logoImgs.forEach(img => { img.src = logoMap[theme]; });
  }
  // Set favicon and title for current theme if tab cloak is Default or empty
  let tabCloak = localStorage.getItem('tabCloak') || 'Default';
  if (typeof chemical !== 'undefined' && chemical.setStore) {
    if (tabCloak === 'Default' || !tabCloak) {
      if (faviconMap[theme]) {
        chemical.setStore('icon', faviconMap[theme]);
      }
    }
    chemical.setStore('title', 'Malachite');
  }
}

function getCurrentTheme() {
  return (localStorage.getItem('siteTheme') || 'moss');
}

// Update logo and favicon on load and when theme or cloak changes
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    let tabCloak = localStorage.getItem('tabCloak') || 'Default';
    let theme = getCurrentTheme();
    const faviconMap = {
      moss: 'img/mossfavicon.ico',
      midnight: 'img/midnightfavicon.ico',
      rose: 'img/rosefavicon.ico',
      classic: 'img/classicfavicon.ico'
    };
    if (typeof chemical !== 'undefined' && chemical.setStore) {
      if (tabCloak === 'Default' || !tabCloak) {
        if (faviconMap[theme]) {
          chemical.setStore('icon', faviconMap[theme]);
        }
      }
      chemical.setStore('title', 'Malachite');
    }
    updateLogoAndFavicon(theme);
  }, 50);
});

window.addEventListener('storage', function(e) {
  if (e.key === 'siteTheme' || e.key === 'tabCloak') {
    let tabCloak = localStorage.getItem('tabCloak') || 'Default';
    let theme = getCurrentTheme();
    const faviconMap = {
      moss: 'img/mossfavicon.ico',
      midnight: 'img/midnightfavicon.ico',
      rose: 'img/rosefavicon.ico',
      classic: 'img/classicfavicon.ico'
    };
    if (typeof chemical !== 'undefined' && chemical.setStore) {
      if (tabCloak === 'Default' || !tabCloak) {
        if (faviconMap[theme]) {
          setTimeout(function() {
            chemical.setStore('icon', faviconMap[theme]);
          }, 50);
        }
      }
      chemical.setStore('title', 'Malachite');
    }
    updateLogoAndFavicon(theme);
  }
});

(function() {
  const origSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    origSetItem.apply(this, arguments);
    if (key === 'siteTheme' || key === 'tabCloak') {
      let tabCloak = localStorage.getItem('tabCloak') || 'Default';
      let theme = getCurrentTheme();
      const faviconMap = {
        moss: 'img/mossfavicon.ico',
        midnight: 'img/midnightfavicon.ico',
        rose: 'img/rosefavicon.ico',
        classic: 'img/classicfavicon.ico'
      };
      if (typeof chemical !== 'undefined' && chemical.setStore) {
        if (tabCloak === 'Default' || !tabCloak) {
          if (faviconMap[theme]) {
            setTimeout(function() {
              chemical.setStore('icon', faviconMap[theme]);
            }, 50);
          }
        }
        chemical.setStore('title', 'Malachite');
      }
      updateLogoAndFavicon(theme);
    }
  };
})();

