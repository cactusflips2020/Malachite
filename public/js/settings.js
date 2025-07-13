const DEFAULT_USERNAME = "malachite";
const DEFAULT_PASSWORD = "malachiteontop";

if (!localStorage.getItem('username')) localStorage.setItem('username', DEFAULT_USERNAME);
if (!localStorage.getItem('password')) localStorage.setItem('password', DEFAULT_PASSWORD);

let tempUsername = localStorage.getItem('username') || DEFAULT_USERNAME;
let tempPassword = localStorage.getItem('password') || DEFAULT_PASSWORD;



function applyCloak(option) {
    if (typeof chemical !== 'undefined' && chemical.setStore) {
        if (option === 'Google') {
            chemical.setStore('title', 'Google');
            chemical.setStore('icon', 'img/google.ico');
        } else if (option === 'Gmail') {
            chemical.setStore('title', 'Gmail');
            chemical.setStore('icon', 'img/gmail.ico');
        } else if (option === 'Google Drive') {
            chemical.setStore('title', 'My Drive - Google Drive');
            chemical.setStore('icon', 'img/drive.png');
        } else if (option === 'Schoology') {
            chemical.setStore('title', 'Home | Schoology');
            chemical.setStore('icon', 'img/schoology.ico');
        } else if (option === 'iReady') {
            chemical.setStore('title', 'i-Ready Dashboard');
            chemical.setStore('icon', 'img/iready.ico');
        } else if (option === 'Clever') {
            chemical.setStore('title', 'Clever | Portal');
            chemical.setStore('icon', 'img/clever.ico');
        } else {
            chemical.setStore('title', 'Malachite');
            chemical.setStore('icon', 'img/favicon.svg');
        }
    }
}

function loadCloakSetting() {
    const savedCloakOption = localStorage.getItem('tabCloak');

    if (savedCloakOption) {
        const selectElement = document.getElementById('cloak-select');
        if (selectElement) {
            selectElement.value = savedCloakOption;
            applyCloak(savedCloakOption);
        }
    } else {
        const selectElement = document.getElementById('cloak-select');
        if (selectElement) {
            selectElement.value = 'Default';
            applyCloak('Default');
        }
    }
}

window.addEventListener('load', loadCloakSetting);

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
    window.parent.window.location.replace(localStorage.getItem('redirectUrl') || 'https://www.google.com/')
}



function applyTransport(option) {
    if (option === 'epoxy') {
        chemical.setTransport("epoxy");
    } else {
        chemical.setTransport("libcurl");
    }
}

function loadTransportSetting() {
    const savedTransportOption = localStorage.getItem('transportSelect');

    if (savedTransportOption) {
        const selectElement = document.getElementById('transport-select');
        if (selectElement) {
            selectElement.value = savedTransportOption;
            applyTransport(savedTransportOption);
        }
    } else {
        const selectElement = document.getElementById('transport-select');
        if (selectElement) {
            selectElement.value = 'libcurl';
            applyTransport('libcurl');
        }
    }
}

function loadSavedValues() {
    const savedTransport = localStorage.getItem('transportSelect');
    if (savedTransport) {
        const transportSelect = document.getElementById('transport-select');
        if (transportSelect) {
            transportSelect.value = savedTransport;
            applyTransport(savedTransport);
        }
    }
    
    const savedCloak = localStorage.getItem('tabCloak');
    if (savedCloak) {
        const cloakSelect = document.getElementById('cloak-select');
        if (cloakSelect) {
            cloakSelect.value = savedCloak;
            applyCloak(savedCloak);
        }
    }
    
    const savedSearchEngine = localStorage.getItem('searchEngineSelect');
    if (savedSearchEngine) {
        const searchEngineSelect = document.getElementById('searchengine-select');
        if (searchEngineSelect) {
            searchEngineSelect.value = savedSearchEngine;
            applySearchEngine(savedSearchEngine);
        }
    }
    
    const savedTheme = localStorage.getItem('siteTheme') || 'moss';
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = savedTheme;
    }

    const savedProxyBackend = localStorage.getItem('proxyBackendSelect');
    if (savedProxyBackend) {
        const proxyBackendSelect = document.getElementById('proxy-backend-select');
        if (proxyBackendSelect) {
            proxyBackendSelect.value = savedProxyBackend;
            applyProxyBackend(savedProxyBackend);
        }
    }
}

function autoab() {
    let isActive = localStorage.getItem('autoab') === 'true';

    if (isActive) {
        localStorage.setItem('autoab', 'false');
    } else {
        localStorage.setItem('autoab', 'true');
    }

    updateButtonState();
    
    showNotification('Changes saved!');
}

function updateButtonState() {
    let button = document.getElementById('autoabbutton');
    let isActive = localStorage.getItem('autoab') === 'true';
    
    if (button) {
        if (isActive) {
            button.textContent = 'Automatic About:Blank: ON';
        } else {
            button.textContent = 'Automatic About:Blank: OFF';
        }
    }
}

window.addEventListener('load', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        if (window.location.pathname !== '/login.html') {
            window.location.href = '/login.html';
        }
        return;
    }
    
    const userName = localStorage.getItem('userName');
    if (!userName) {
        window.location.href = '/index.html';
        return;
    }
    
    updateButtonState();
    
    // Ensure all modals are hidden on page load
    const modals = document.querySelectorAll('.keybind-modal, .credentials-modal, .change-name-modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
});

function signOut() {
    localStorage.removeItem('isLoggedIn');

    window.location.href = '/login.html';
}

function applySearchEngine(option) {
    if (option === 'google') {
        localStorage.setItem('searchEngineSelect', 'google');
        localStorage.setItem('searchEngineSelectUrl', 'https://www.google.com/search?q=%s');
    } else if (option === 'duckduckgo') {
        localStorage.setItem('searchEngineSelect', 'duckduckgo');
        localStorage.setItem('searchEngineSelectUrl', 'https://www.duckduckgo.com/?q=%s');
    } else if (option === 'bing') {
        localStorage.setItem('searchEngineSelect', 'bing');
        localStorage.setItem('searchEngineSelectUrl', 'https://www.bing.com/search?q=%s');
    } else if (option === 'brave') {
        localStorage.setItem('searchEngineSelect', 'brave');
        localStorage.setItem('searchEngineSelectUrl', 'https://search.brave.com/search?q=%s');
    } else if (option === 'startpage') {
        localStorage.setItem('searchEngineSelect', 'startpage');
        localStorage.setItem('searchEngineSelectUrl', 'https://www.startpage.com/sp/search?query=%s');
    } else if (option === 'ecosia') {
        localStorage.setItem('searchEngineSelect', 'ecosia');
        localStorage.setItem('searchEngineSelectUrl', 'https://www.ecosia.org/search?q=%s');
    } else if (option === 'yahoo') {
        localStorage.setItem('searchEngineSelect', 'yahoo');
        localStorage.setItem('searchEngineSelectUrl', 'https://www.search.yahoo.com/search?p=%s');
    }
}

function loadSearchEngineSetting() {
    const savedSearchEngineOption = localStorage.getItem('searchEngineSelect');

    if (savedSearchEngineOption) {
        const selectElement = document.getElementById('searchengine-select');
        if (selectElement) {
            selectElement.value = savedSearchEngineOption;
            applySearchEngine(savedSearchEngineOption);
        }
    } else {
        const selectElement = document.getElementById('searchengine-select');
        if (selectElement) {
            selectElement.value = 'duckduckgo';
            applySearchEngine('duckduckgo');
        }
    }
}

window.addEventListener('load', loadSearchEngineSetting);

function loadThemeSetting() {
    const savedTheme = localStorage.getItem('siteTheme') || 'moss';
    const selectElement = document.getElementById('theme-select');
    if (selectElement) {
        selectElement.value = savedTheme;
    }
    
    applyTheme(savedTheme);
}

loadThemeSetting();
window.addEventListener('load', loadThemeSetting);

function leaveconfirmation() {
    let button = document.getElementById('leaveconfirmbutton');

    let isLeaveConfirmationEnabled = localStorage.getItem('leaveConfirmation') === 'true';
    localStorage.setItem('leaveConfirmation', !isLeaveConfirmationEnabled);

    updateLeaveConfirmButton();
    
    showNotification('Changes saved!');
}

function updateLeaveConfirmButton() {
    let button = document.getElementById('leaveconfirmbutton');
    let isLeaveConfirmationEnabled = localStorage.getItem('leaveConfirmation') === 'true';
    
    if (button) {
        if (isLeaveConfirmationEnabled) {
            button.textContent = 'Leave Confirmation: ON';
        } else {
            button.textContent = 'Leave Confirmation: OFF';
        }
    }
}

updateLeaveConfirmButton();
window.addEventListener('load', updateLeaveConfirmButton);

let notifications = [];

function showNotification(message) {
    let audio = new Audio("/audio/notification.mp3");
    audio.play().catch(error => console.warn("Audio play failed:", error));

    let notification = document.createElement("div");
    const theme = localStorage.getItem('siteTheme') || 'moss';
    notification.className = "notification theme-" + theme;
    notification.innerText = message;  
        notification.style.background = 'var(--bg-secondary)';
        notification.style.color = 'var(--text-primary)';
        notification.style.border = '1.5px solid var(--border-primary)';

    Object.assign(notification.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 15px",
        borderRadius: "5px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        zIndex: "1000",
        fontSize: "14px",
        opacity: "1",
        transition: "opacity 0.5s ease-in-out, transform 0.3s ease-in-out",
    });

    document.body.appendChild(notification);
    notifications.push(notification);

    notifications.forEach((notif, index) => {
        notif.style.bottom = `${20 + (notifications.length - 1 - index) * 50}px`;
    });

    if (notifications.length > 3) {
        let oldest = notifications.shift();
        oldest.style.opacity = "0";
        oldest.style.transform = "translateY(-20px)";
        setTimeout(() => oldest.remove(), 500);
    }

    setTimeout(() => {
        if (notifications.includes(notification)) {
            notifications = notifications.filter(n => n !== notification);
            notification.style.opacity = "0";
            notification.style.transform = "translateY(-20px)";
            setTimeout(() => notification.remove(), 500);
        }
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    loadThemeSetting();
    
    document.getElementById("transport-select")?.addEventListener("change", function() {
        const value = this.value;
        localStorage.setItem('transportSelect', value);
        if (value === 'epoxy') {
            chemical.setTransport("epoxy");
        } else {
            chemical.setTransport("libcurl");
        }
        showNotification('Changes saved!');
    });
    
    document.getElementById("cloak-select")?.addEventListener("change", function() {
        const value = this.value;
        localStorage.setItem('tabCloak', value);
        applyCloak(value);
        showNotification('Changes saved!');
    });
    
    document.getElementById("searchengine-select")?.addEventListener("change", function() {
        const value = this.value;
        applySearchEngine(value);
        showNotification('Changes saved!');
    });
    
    document.getElementById("proxy-backend-select")?.addEventListener("change", function() {
        const value = this.value;
        applyProxyBackend(value);
        showNotification('Changes saved!');
    });
    
    document.getElementById("theme-select")?.addEventListener("change", function() {
        const value = this.value;
        applyTheme(value);
        showNotification('Changes saved!');
    });
    
    window.addEventListener('message', function(event) {
        if (event.data.type === 'theme-change') {
            const theme = event.data.theme;
            applyTheme(theme);
            
            const themeSelect = document.getElementById('theme-select');
            if (themeSelect) {
                themeSelect.value = theme;
            }
        }
    });
    
    window.addEventListener('storage', function(event) {
        if (event.key === 'siteTheme') {
            const theme = event.newValue || 'moss';
            applyTheme(theme);
            
            const themeSelect = document.getElementById('theme-select');
            if (themeSelect) {
                themeSelect.value = theme;
            }
        }
    });
    
    loadSavedValues();
    
    updateLeaveConfirmButton();
    
    updateButtonState();
});

let selectedKey = localStorage.getItem("redirectKey");
let customURL = localStorage.getItem("redirectUrl") || "https://www.google.com";
let tempKey = selectedKey;
let tempURL = customURL;

function openKeybindModal() {
    const modal = document.getElementById("keybind-modal");
    if (!modal) {
        console.error('Keybind modal not found!');
        return;
    }
    
    const currentTheme = localStorage.getItem('siteTheme') || 'moss';
    modal.className = 'keybind-modal theme-' + currentTheme;
    
    modal.classList.add("show");
    
    const keybindDisplay = document.getElementById("keybind-display");
    const keybindUrl = document.getElementById("keybind-url");
    
    if (keybindDisplay) {
        keybindDisplay.textContent = tempKey ? tempKey.toUpperCase() : "No key bound";
    }
    if (keybindUrl) {
        keybindUrl.value = tempURL;
    }
    
    initializeKeybindParticles(currentTheme);
}

function closeKeybindModal() {
    tempKey = localStorage.getItem("redirectKey");
    tempURL = localStorage.getItem("redirectUrl") || "https://www.google.com";
    const modal = document.getElementById("keybind-modal");
    if (modal) {
        modal.classList.remove("show");
        cleanupKeybindParticles();
    } else {
        console.error('Keybind modal not found for closing');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const keybindDisplay = document.getElementById("keybind-display");
    if (keybindDisplay) {
        keybindDisplay.addEventListener("click", () => {
            keybindDisplay.textContent = "Listening...";
            const listener = (e) => {
                if (e.key === "Escape") {
                    tempKey = null;
                    keybindDisplay.textContent = "No key bound";
                } else {
                    tempKey = e.key;
                    keybindDisplay.textContent = tempKey.toUpperCase();
                }
                window.removeEventListener("keydown", listener);
            };
            window.addEventListener("keydown", listener);
        });
    } else {
        console.error('Keybind display not found!');
    }
    
    const keybindUrl = document.getElementById("keybind-url");
    if (keybindUrl) {
        keybindUrl.addEventListener("blur", function() {
            let urlValue = this.value.trim();
            if (urlValue && !/^https?:\/\//i.test(urlValue)) {
                this.value = "https://" + urlValue;
            }
        });
        
        keybindUrl.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                let urlValue = this.value.trim();
                if (urlValue && !/^https?:\/\//i.test(urlValue)) {
                    this.value = "https://" + urlValue;
                }
            }
        });
    } else {
        console.error('Keybind URL input not found!');
    }
    
    const openButton = document.querySelector('button[onclick="openKeybindModal()"]');
    if (!openButton) {
        console.error('Open keybind button not found!');
    }
});

function applyKeybind() {
    const urlInput = document.getElementById("keybind-url");
    if (!urlInput) {
        console.error('Keybind URL input not found!');
        return;
    }
    
    let urlValue = urlInput.value.trim();
    
    if (urlValue && !/^https?:\/\//i.test(urlValue)) {
        urlValue = "https://" + urlValue;
    }

    customURL = urlValue || "https://www.google.com";
    localStorage.setItem("redirectUrl", customURL);

    if (tempKey) {
        selectedKey = tempKey;
        localStorage.setItem("redirectKey", selectedKey);
    } else {
        selectedKey = null;
        localStorage.removeItem("redirectKey");
    }

    closeKeybindModal();
    showNotification('Changes saved!');
}

function resetKeybind() {
    tempKey = null;
    tempURL = "https://www.google.com";
    
    localStorage.removeItem("redirectKey");
    localStorage.setItem("redirectUrl", "https://www.google.com");
    
    selectedKey = null;
    customURL = "https://www.google.com";
    
    showNotification('Changes saved!');
    
    closeKeybindModal();
}

function openCredentialsModal() {
    const modal = document.getElementById('credentials-modal');
    
    const currentTheme = localStorage.getItem('siteTheme') || 'moss';
    modal.className = 'credentials-modal theme-' + currentTheme;
    
    modal.classList.add('show');
    document.getElementById('new-username').value = tempUsername;
    document.getElementById('new-password').value = tempPassword;
    
    setTimeout(() => {
        if (typeof particlesJS !== 'undefined') {
            const getParticleColors = () => {
                const style = getComputedStyle(document.documentElement);
                const colors = [
                    style.getPropertyValue('--particle-color-1').trim(),
                    style.getPropertyValue('--particle-color-2').trim(),
                    style.getPropertyValue('--particle-color-3').trim(),
                    style.getPropertyValue('--particle-color-4').trim()
                ];
                
                return colors.map(color => color || '#b2c2a8');
            };
            
            const getParticleOpacity = () => {
                const style = getComputedStyle(document.documentElement);
                return parseFloat(style.getPropertyValue('--particle-opacity').trim()) || 0.3;
            };
            
            const getLineOpacity = () => {
                const style = getComputedStyle(document.documentElement);
                return parseFloat(style.getPropertyValue('--particle-line-opacity').trim()) || 0.2;
            };
            
            const getLineColor = () => {
                const style = getComputedStyle(document.documentElement);
                const color = style.getPropertyValue('--particle-line-color').trim();
                return color || '#b2c2a8';
            };
            
            particlesJS('credentials-particles-js', particleConfig);
        } else {
            createSimpleParticles();
        }
    }, 100);
}

function createSimpleParticles() {
    const container = document.getElementById('credentials-particles-js');
    if (container) {
        const style = getComputedStyle(document.documentElement);
        const colors = [
            style.getPropertyValue('--particle-color-1').trim() || '#b2c2a8',
            style.getPropertyValue('--particle-color-2').trim() || '#94e2d5',
            style.getPropertyValue('--particle-color-3').trim() || '#a6e3a1',
            style.getPropertyValue('--particle-color-4').trim() || '#89dceb'
        ];
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = style.getPropertyValue('--particle-opacity').trim() || '0.3';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1';
            container.appendChild(particle);
        }
    }
}

function initializeKeybindParticles(theme) {
    const getParticleColors = () => {
        const style = getComputedStyle(document.documentElement);
        const colors = [
            style.getPropertyValue('--particle-color-1').trim(),
            style.getPropertyValue('--particle-color-2').trim(),
            style.getPropertyValue('--particle-color-3').trim(),
            style.getPropertyValue('--particle-color-4').trim()
        ];
        
        return colors.map(color => color || '#b2c2a8');
    };
    
    const getParticleOpacity = () => {
        const style = getComputedStyle(document.documentElement);
        return parseFloat(style.getPropertyValue('--particle-opacity').trim()) || 0.3;
    };
    
    const getLineOpacity = () => {
        const style = getComputedStyle(document.documentElement);
        return parseFloat(style.getPropertyValue('--particle-line-opacity').trim()) || 0.2;
    };
    
    const getLineColor = () => {
        const style = getComputedStyle(document.documentElement);
        const color = style.getPropertyValue('--particle-line-color').trim();
        return color || '#b2c2a8';
    };
    
    setTimeout(() => {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('keybind-particles-js', particleConfig);
        } else {
            createSimpleKeybindParticles(theme);
        }
    }, 100);
}

function createSimpleKeybindParticles(theme) {
    const container = document.getElementById('keybind-particles-js');
    if (container) {
        const style = getComputedStyle(document.documentElement);
        const colors = [
            style.getPropertyValue('--particle-color-1').trim() || '#b2c2a8',
            style.getPropertyValue('--particle-color-2').trim() || '#94e2d5',
            style.getPropertyValue('--particle-color-3').trim() || '#a6e3a1',
            style.getPropertyValue('--particle-color-4').trim() || '#89dceb'
        ];
        
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = style.getPropertyValue('--particle-opacity').trim() || '0.3';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1';
            container.appendChild(particle);
        }
    }
}

function cleanupKeybindParticles() {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        for (let i = pJSDom.length - 1; i >= 0; i--) {
            if (pJSDom[i].pJS && pJSDom[i].pJS.canvas && pJSDom[i].pJS.canvas.el && 
                pJSDom[i].pJS.canvas.el.id === 'keybind-particles-js') {
                pJSDom[i].pJS.fn.vendors.destroypJS();
                pJSDom.splice(i, 1);
                break;
            }
        }
    }
    
    const container = document.getElementById('keybind-particles-js');
    if (container) {
        container.innerHTML = '';
    }
}

function closeCredentialsModal() {
    const modal = document.getElementById('credentials-modal');
    if (modal) {
        modal.classList.remove('show');
    } else {
        console.error('Credentials modal not found for closing');
    }
    
    // Clean up particles
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        for (let i = pJSDom.length - 1; i >= 0; i--) {
            if (pJSDom[i].pJS && pJSDom[i].pJS.canvas && pJSDom[i].pJS.canvas.el && 
                pJSDom[i].pJS.canvas.el.id === 'credentials-particles-js') {
                pJSDom[i].pJS.fn.vendors.destroypJS();
                pJSDom.splice(i, 1);
                break;
            }
        }
    }
    
    const container = document.getElementById('credentials-particles-js');
    if (container) {
        container.innerHTML = '';
    }
}

function applyCredentials() {
    let newUsername = document.getElementById('new-username').value.trim();
    let newPassword = document.getElementById('new-password').value.trim();

    if (!newUsername) newUsername = DEFAULT_USERNAME;
    if (!newPassword) newPassword = DEFAULT_PASSWORD;

    localStorage.setItem('username', newUsername);
    localStorage.setItem('password', newPassword);

    tempUsername = newUsername;
    tempPassword = newPassword;

    closeCredentialsModal();
    showNotification('Changes saved!');
}

function resetCredentials() {
    localStorage.setItem('username', DEFAULT_USERNAME);
    localStorage.setItem('password', DEFAULT_PASSWORD);

    tempUsername = DEFAULT_USERNAME;
    tempPassword = DEFAULT_PASSWORD;

    document.getElementById('new-username').value = DEFAULT_USERNAME;
    document.getElementById('new-password').value = DEFAULT_PASSWORD;

    closeCredentialsModal();
    showNotification('Changes saved!');
}

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

function changeTheme() {
    try {
        const selectedTheme = document.getElementById('theme-select').value;
        
        applyTheme(selectedTheme);
    } catch (error) {
        console.error('Error changing theme:', error);
        showNotification('Error changing theme');
    }
}

function updateThemeModals() {
    const theme = localStorage.getItem('siteTheme') || 'moss';
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(n => {
        n.className = 'notification theme-' + theme;
        n.style.background = 'var(--bg-secondary)';
        n.style.color = 'var(--text-primary)';
        n.style.border = '1.5px solid var(--border-primary)';
    });
}

// Apply custom theme if selected on load
function applyTheme(theme) {
    try {
        document.body.classList.add('theme-fade');
        document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-rose', 'theme-noir', 'theme-ocean', 'theme-sunset', 'theme-solar');
        document.body.classList.add('theme-' + theme);
        localStorage.setItem('siteTheme', theme);
        updateThemeModals();
        setTimeout(() => {
            document.body.classList.remove('theme-fade');
        }, 400);
    } catch (error) {
        console.error('Error applying theme:', error);
    }
}

function openChangeNameModal() {
    const modal = document.getElementById('change-name-modal');
    const input = document.getElementById('change-name-input');
    if (!modal || !input) return;
    input.value = localStorage.getItem('userName') || '';
    modal.classList.add('show');
    input.focus();
    input.select();
}

function closeChangeNameModal() {
    const modal = document.getElementById('change-name-modal');
    if (modal) {
        modal.classList.remove('show');
    } else {
        console.error('Change name modal not found for closing');
    }
}

function applyChangeName() {
    const input = document.getElementById('change-name-input');
    if (!input) return;
    const name = input.value.trim();
    if (name && name.length <= 20) {
        localStorage.setItem('userName', name);
        closeChangeNameModal();
        if (window.updateTimeDisplay) updateTimeDisplay();
        
        showNotification('Changes saved!');
    } else {
        input.style.borderColor = 'var(--error-color, #ff4444)';
        setTimeout(() => {
            input.style.borderColor = '';
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('change-name-modal');
    const input = document.getElementById('change-name-input');
    if (!modal || !input) return;
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('show') && e.key === 'Escape') closeChangeNameModal();
    });
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyChangeName();
    });
});

function applyProxyBackend(option) {
    localStorage.setItem('proxyBackendSelect', option);
}

function loadProxyBackendSetting() {
    const savedProxyBackendOption = localStorage.getItem('proxyBackendSelect');

    if (savedProxyBackendOption) {
        const selectElement = document.getElementById('proxy-backend-select');
        if (selectElement) {
            selectElement.value = savedProxyBackendOption;
            applyProxyBackend(savedProxyBackendOption);
        }
    } else {
        const selectElement = document.getElementById('proxy-backend-select');
        if (selectElement) {
            selectElement.value = 'uv';
            applyProxyBackend('uv');
        }
    }
}

window.addEventListener('load', loadProxyBackendSetting);

// Settings Export/Import Functions
function exportSettings() {
    try {
        // Collect all settings from localStorage
        const settings = {
            // Theme settings
            siteTheme: localStorage.getItem('siteTheme'),
            
            // Proxy settings
            transportSelect: localStorage.getItem('transportSelect'),
            proxyBackendSelect: localStorage.getItem('proxyBackendSelect'),
            searchEngineSelect: localStorage.getItem('searchEngineSelect'),
            searchEngineSelectUrl: localStorage.getItem('searchEngineSelectUrl'),
            
            // Cloaking settings
            tabCloak: localStorage.getItem('tabCloak'),
            autoab: localStorage.getItem('autoab'),
            
            // Security settings
            redirectKey: localStorage.getItem('redirectKey'),
            redirectUrl: localStorage.getItem('redirectUrl'),
            leaveConfirmation: localStorage.getItem('leaveConfirmation'),
            
            // User settings
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password'),
            userName: localStorage.getItem('userName'),
            
            // Export timestamp
            exportedAt: new Date().toISOString()
        };
        
        // Convert to JSON and then to base64
        const settingsJson = JSON.stringify(settings, null, 2);
        const settingsBase64 = btoa(unescape(encodeURIComponent(settingsJson)));
        
        // Copy to clipboard
        navigator.clipboard.writeText(settingsBase64).then(() => {
            showNotification('Changes saved!');
        }).catch(err => {
            console.error('Failed to copy to clipboard:', err);
            showNotification('Changes saved!');
        });
        
    } catch (error) {
        console.error('Error exporting settings:', error);
        showNotification('Error exporting settings');
    }
}

function importSettings() {
    try {
        // Get settings from clipboard
        navigator.clipboard.readText().then(clipboardText => {
            try {
                // Decode base64
                const settingsJson = decodeURIComponent(escape(atob(clipboardText)));
                const settings = JSON.parse(settingsJson);
                
                // Validate that this looks like our settings format
                if (!settings.exportedAt) {
                    showNotification('Invalid settings format');
                    return;
                }
                
                // Apply settings to localStorage
                let appliedCount = 0;
                
                if (settings.siteTheme) {
                    localStorage.setItem('siteTheme', settings.siteTheme);
                    appliedCount++;
                }
                
                if (settings.transportSelect) {
                    localStorage.setItem('transportSelect', settings.transportSelect);
                    appliedCount++;
                }
                
                if (settings.proxyBackendSelect) {
                    localStorage.setItem('proxyBackendSelect', settings.proxyBackendSelect);
                    appliedCount++;
                }
                
                if (settings.searchEngineSelect) {
                    localStorage.setItem('searchEngineSelect', settings.searchEngineSelect);
                    appliedCount++;
                }
                
                if (settings.searchEngineSelectUrl) {
                    localStorage.setItem('searchEngineSelectUrl', settings.searchEngineSelectUrl);
                    appliedCount++;
                }
                
                if (settings.tabCloak) {
                    localStorage.setItem('tabCloak', settings.tabCloak);
                    appliedCount++;
                }
                
                if (settings.autoab) {
                    localStorage.setItem('autoab', settings.autoab);
                    appliedCount++;
                }
                
                if (settings.redirectKey) {
                    localStorage.setItem('redirectKey', settings.redirectKey);
                    appliedCount++;
                }
                
                if (settings.redirectUrl) {
                    localStorage.setItem('redirectUrl', settings.redirectUrl);
                    appliedCount++;
                }
                
                if (settings.leaveConfirmation) {
                    localStorage.setItem('leaveConfirmation', settings.leaveConfirmation);
                    appliedCount++;
                }
                
                if (settings.username) {
                    localStorage.setItem('username', settings.username);
                    appliedCount++;
                }
                
                if (settings.password) {
                    localStorage.setItem('password', settings.password);
                    appliedCount++;
                }
                
                if (settings.userName) {
                    localStorage.setItem('userName', settings.userName);
                    appliedCount++;
                }
                
                loadSavedValues();
                loadThemeSetting();
                loadCloakSetting();
                loadSearchEngineSetting();
                loadProxyBackendSetting();
                updateButtonState();
                updateLeaveConfirmButton();
                
                showNotification(`Settings imported successfully! (${appliedCount} settings applied)`);
                
            } catch (parseError) {
                console.error('Error parsing settings:', parseError);
                showNotification('Invalid settings format in clipboard');
            }
        }).catch(err => {
            console.error('Failed to read clipboard:', err);
            showNotification('Failed to read clipboard');
        });
        
    } catch (error) {
        console.error('Error importing settings:', error);
        showNotification('Error importing settings');
    }
}

function resetInstance() {
    // List of all keys to remove (add more if needed)
    const keysToRemove = [
        'siteTheme',
        'transportSelect',
        'proxyBackendSelect',
        'searchEngineSelect',
        'searchEngineSelectUrl',
        'tabCloak',
        'autoab',
        'redirectKey',
        'redirectUrl',
        'leaveConfirmation',
        'username',
        'password',
        'userName',
        // Add any other keys you want to reset
    ];
    keysToRemove.forEach(key => localStorage.removeItem(key));
    showNotification('Changes saved!');
    setTimeout(() => {
        location.reload();
    }, 600);
}
