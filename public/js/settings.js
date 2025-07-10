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
            chemical.setStore('icon', 'img/favicon.ico');
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
    
    showNotification('Changes saved');
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
    
    showNotification('Changes saved');
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
    if (theme === 'moss') {
        notification.style.background = '#384438';
        notification.style.color = '#b2c2a8';
        notification.style.border = '1.5px solid #232b23';
    } else if (theme === 'midnight') {
        notification.style.background = '#2a3442';
        notification.style.color = '#b8c7e0';
        notification.style.border = '1.5px solid #181c24';
    } else if (theme === 'rose') {
        notification.style.background = '#6e3844';
        notification.style.color = '#e0b8c7';
        notification.style.border = '1.5px solid #2a1a1f';
    } else if (theme === 'noir') {
        notification.style.background = '#444';
        notification.style.color = '#e0e0e0';
        notification.style.border = '1.5px solid #181818';
    }

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
        showNotification('Changes saved');
    });
    
    document.getElementById("cloak-select")?.addEventListener("change", function() {
        const value = this.value;
        localStorage.setItem('tabCloak', value);
        applyCloak(value);
        showNotification('Changes saved');
    });
    
    document.getElementById("searchengine-select")?.addEventListener("change", function() {
        const value = this.value;
        applySearchEngine(value);
        showNotification('Changes saved');
    });
    
    document.getElementById("proxy-backend-select")?.addEventListener("change", function() {
        const value = this.value;
        applyProxyBackend(value);
        showNotification('Changes saved');
    });
    
    document.getElementById("theme-select")?.addEventListener("change", function() {
        const value = this.value;
        applyTheme(value);
        showNotification('Changes saved');
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
    modal.style.display = "flex";
    
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
        modal.style.display = "none";
        
        cleanupKeybindParticles();
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
            const config = particleConfigs[currentTheme] || particleConfigs.moss;
            particlesJS('credentials-particles-js', config);
        } else {
            createSimpleParticles();
        }
    }, 100);
}

function createSimpleParticles() {
    const container = document.getElementById('credentials-particles-js');
    if (container) {
        const currentTheme = localStorage.getItem('siteTheme') || 'moss';
        const themeColors = {
            moss: ['#b2c2a8', '#94e2d5', '#a6e3a1', '#89dceb'],
            midnight: ['#b8c7e0', '#81a1c1', '#5e81ac', '#88c0d0'],
            rose: ['#e0b8c7', '#f38ba8', '#eba0ac', '#f5c2e7'],
            noir: ['#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080']
        };
        const colors = themeColors[currentTheme] || themeColors.moss;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = '0.3';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1';
            container.appendChild(particle);
        }
    }
}

function initializeKeybindParticles(theme) {
    const keybindParticleConfigs = {
        moss: {
            particles: {
                number: { value: 35, density: { enable: true, value_area: 800 } },
                color: { value: ['#b2c2a8', '#94e2d5', '#a6e3a1', '#89dceb'] },
                shape: { type: 'circle' },
                opacity: { value: 0.25, random: true, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 1.8, random: true, anim: { enable: false, speed: 2, size_min: 1, sync: false } },
                line_linked: { enable: true, distance: 180, color: '#b2c2a8', opacity: 0.15, width: 0.5 },
                move: { enable: true, speed: 1.2, direction: 'none', random: true, straight: false, out_mode: 'bounce', bounce: true, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: false, mode: 'repulse' },
                    onclick: { enable: false, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 150, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        },
        midnight: {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 800 } },
                color: { value: ['#b8c7e0', '#81a1c1', '#5e81ac', '#88c0d0'] },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true, anim: { enable: false, speed: 1.5, opacity_min: 0.2, sync: false } },
                size: { value: 2, random: true, anim: { enable: false, speed: 3, size_min: 1, sync: false } },
                line_linked: { enable: true, distance: 160, color: '#b8c7e0', opacity: 0.2, width: 0.5 },
                move: { enable: true, speed: 1.5, direction: 'none', random: true, straight: false, out_mode: 'bounce', bounce: true, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: false, mode: 'grab' },
                    onclick: { enable: false, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        },
        rose: {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: ['#e0b8c7', '#f38ba8', '#eba0ac', '#f5c2e7'] },
                shape: { type: 'circle' },
                opacity: { value: 0.28, random: true, anim: { enable: false, speed: 1.2, opacity_min: 0.15, sync: false } },
                size: { value: 1.9, random: true, anim: { enable: false, speed: 2.2, size_min: 1, sync: false } },
                line_linked: { enable: true, distance: 200, color: '#e0b8c7', opacity: 0.18, width: 0.5 },
                move: { enable: true, speed: 1.4, direction: 'none', random: true, straight: false, out_mode: 'bounce', bounce: true, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: false, mode: 'bubble' },
                    onclick: { enable: false, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    bubble: { distance: 200, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        },
        noir: {
            particles: {
                number: { value: 25, density: { enable: true, value_area: 800 } },
                color: { value: ['#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080'] },
                shape: { type: 'circle' },
                opacity: { value: 0.2, random: true, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 1.6, random: true, anim: { enable: false, speed: 2.5, size_min: 1, sync: false } },
                line_linked: { enable: true, distance: 220, color: '#e0e0e0', opacity: 0.12, width: 0.5 },
                move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'bounce', bounce: true, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: false, mode: 'repulse' },
                    onclick: { enable: false, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 180, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        }
    };
    
    setTimeout(() => {
        if (typeof particlesJS !== 'undefined') {
            const config = keybindParticleConfigs[theme] || keybindParticleConfigs.moss;
            particlesJS('keybind-particles-js', config);
        } else {
            createSimpleKeybindParticles(theme);
        }
    }, 100);
}

function createSimpleKeybindParticles(theme) {
    const container = document.getElementById('keybind-particles-js');
    if (container) {
        const themeColors = {
            moss: ['#b2c2a8', '#94e2d5', '#a6e3a1', '#89dceb'],
            midnight: ['#b8c7e0', '#81a1c1', '#5e81ac', '#88c0d0'],
            rose: ['#e0b8c7', '#f38ba8', '#eba0ac', '#f5c2e7'],
            noir: ['#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080']
        };
        const colors = themeColors[theme] || themeColors.moss;
        
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = '0.25';
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
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.classList.remove('show');
        modal.style.opacity = '';
        
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
    }, 250);
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
        if (theme === 'moss') {
            n.style.background = '#384438';
            n.style.color = '#b2c2a8';
            n.style.border = '1.5px solid #232b23';
        } else if (theme === 'midnight') {
            n.style.background = '#2a3442';
            n.style.color = '#b8c7e0';
            n.style.border = '1.5px solid #181c24';
        } else if (theme === 'rose') {
            n.style.background = '#6e3844';
            n.style.color = '#e0b8c7';
            n.style.border = '1.5px solid #2a1a1f';
        } else if (theme === 'noir') {
            n.style.background = '#444';
            n.style.color = '#e0e0e0';
            n.style.border = '1.5px solid #181818';
        }
    });
    const keybindModal = document.getElementById('keybind-modal');
    if (keybindModal) {
        keybindModal.className = 'keybind-modal theme-' + theme;
        const keybindContent = keybindModal.querySelector('.keybind-content');
        if (keybindContent) keybindContent.className = 'keybind-content theme-' + theme;
        const keybindBox = keybindModal.querySelector('.keybind-box');
        if (keybindBox) keybindBox.className = 'keybind-box theme-' + theme;
        const keybindInput = keybindModal.querySelector('.keybind-url');
        if (keybindInput) keybindInput.className = 'keybind-url theme-' + theme;
        const keybindButtons = keybindModal.querySelectorAll('.keybind-buttons button');
        keybindButtons.forEach(btn => {
            btn.className = 'theme-' + theme;
        });
    }
    const credentialsModal = document.getElementById('credentials-modal');
    if (credentialsModal) {
        credentialsModal.className = 'credentials-modal theme-' + theme;
        const credentialsContent = credentialsModal.querySelector('.credentials-modal-content');
        if (credentialsContent) credentialsContent.className = 'credentials-modal-content theme-' + theme;
        const credentialsInputs = credentialsModal.querySelectorAll('input');
        credentialsInputs.forEach(input => {
            input.className = 'theme-' + theme;
        });
        const credentialsButtons = credentialsModal.querySelectorAll('.credentials-buttons button');
        credentialsButtons.forEach(btn => {
            btn.className = 'theme-' + theme;
        });
        const resetBtn = credentialsModal.querySelector('#resetcredentialsbutton');
        if (resetBtn) resetBtn.classList.add('reset-btn');
    }
}

function applyTheme(theme) {
    try {
        document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-rose', 'theme-noir');
        document.body.classList.add('theme-' + theme);
        localStorage.setItem('siteTheme', theme);
        updateThemeModals();
    } catch (error) {
        console.error('Error applying theme:', error);
        throw error;
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

    setTimeout(() => {
        const currentTheme = localStorage.getItem('siteTheme') || 'moss';
        const themeBackgrounds = {
            moss: `
                radial-gradient(circle at 20% 80%, rgba(178, 194, 168, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(148, 226, 213, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(166, 227, 161, 0.08) 0%, transparent 50%),
                linear-gradient(45deg, #232b23 0%, #202620 50%, #1e2e1e 100%)
            `,
            midnight: `
                radial-gradient(circle at 20% 80%, rgba(184, 199, 224, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(129, 161, 193, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(94, 129, 172, 0.08) 0%, transparent 50%),
                linear-gradient(45deg, #181c24 0%, #151a22 50%, #232a36 100%)
            `,
            rose: `
                radial-gradient(circle at 20% 80%, rgba(235, 188, 186, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(243, 139, 168, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(245, 194, 231, 0.08) 0%, transparent 50%),
                linear-gradient(45deg, #2d1b1b 0%, #2a1a1a 50%, #3d1f1f 100%)
            `,
            noir: `
                radial-gradient(circle at 20% 80%, rgba(224, 224, 224, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(192, 192, 192, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(160, 160, 160, 0.08) 0%, transparent 50%),
                linear-gradient(45deg, #1a1a1a 0%, #181818 50%, #222222 100%)
            `
        };
        const themeColors = {
            moss: {
                bg: '#2e362e',
                text: '#b2c2a8',
                accent: '#b2c2a8',
                border: '#384438',
                inputBg: '#384438'
            },
            midnight: {
                bg: '#2a3442',
                text: '#b8c7e0',
                accent: '#b8c7e0',
                border: '#3b4252',
                inputBg: '#3b4252'
            },
            rose: {
                bg: '#6e3844',
                text: '#e0b8c7',
                accent: '#e0b8c7',
                border: '#8b4d5a',
                inputBg: '#8b4d5a'
            },
            noir: {
                bg: '#444',
                text: '#e0e0e0',
                accent: '#e0e0e0',
                border: '#555',
                inputBg: '#555'
            }
        };
        
        modal.style.background = themeBackgrounds[currentTheme] || themeBackgrounds.moss;
        modal.style.backgroundSize = '400% 400%';
        modal.style.animation = 'gradient-move 45s ease-in-out infinite alternate';
        
        const content = modal.querySelector('.change-name-modal-content');
        if (content) {
            const c = themeColors[currentTheme] || themeColors.moss;
            content.style.backgroundColor = c.bg;
            content.style.borderColor = c.border;
            content.style.color = c.text;
            
            const h2 = content.querySelector('h2');
            const p = content.querySelector('p');
            if (h2) h2.style.color = c.text;
            if (p) p.style.color = c.text;
            
            if (input) {
                input.style.backgroundColor = c.inputBg;
                input.style.borderColor = c.accent;
                input.style.color = c.text;
            }
            
            const buttons = content.querySelectorAll('button');
            if (buttons.length > 0) {
                buttons[0].style.backgroundColor = c.accent;
                buttons[0].style.borderColor = c.accent;
                buttons[0].style.color = c.bg;
                if (buttons[1]) {
                    buttons[1].style.backgroundColor = 'transparent';
                    buttons[1].style.borderColor = c.accent;
                    buttons[1].style.color = c.text;
                }
            }
        }
    }, 10);

    setTimeout(() => {
        const currentTheme = localStorage.getItem('siteTheme') || 'moss';
        const particleConfigs = {
            moss: {
                particles: {
                    number: { value: 40, density: { enable: true, value_area: 800 } },
                    color: { value: ['#b2c2a8', '#94e2d5', '#a6e3a1', '#89dceb'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.3, random: true, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
                    size: { value: 2, random: true, anim: { enable: false, speed: 2, size_min: 1, sync: false } },
                    line_linked: { enable: true, distance: 200, color: '#b2c2a8', opacity: 0.2, width: 0.5 },
                    move: { enable: true, speed: 1.5, direction: 'none', random: true, straight: false, out_mode: 'bounce', bounce: true, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: false, mode: 'repulse' },
                        onclick: { enable: false, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                        repulse: { distance: 150, duration: 0.4 },
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            },
            midnight: {
                particles: {
                    number: { value: 50, density: { enable: true, value_area: 800 } },
                    color: { value: ['#b8c7e0', '#81a1c1', '#5e81ac', '#88c0d0'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.4, random: true, anim: { enable: false, speed: 1.5, opacity_min: 0.2, sync: false } },
                    size: { value: 2.5, random: true, anim: { enable: false, speed: 4, size_min: 1, sync: false } },
                    line_linked: { enable: true, distance: 180, color: '#b8c7e0', opacity: 0.25, width: 0.5 },
                    move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'bounce', bounce: true, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: false, mode: 'grab' },
                        onclick: { enable: false, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                        repulse: { distance: 200, duration: 0.4 },
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            },
            rose: {
                particles: {
                    number: { value: 35, density: { enable: true, value_area: 800 } },
                    color: { value: ['#e0b8c7', '#f38ba8', '#eba0ac', '#f5c2e7'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.35, random: true, anim: { enable: false, speed: 1.2, opacity_min: 0.2, sync: false } },
                    size: { value: 2.2, random: true, anim: { enable: false, speed: 2.5, size_min: 1, sync: false } },
                    line_linked: { enable: true, distance: 220, color: '#e0b8c7', opacity: 0.2, width: 0.5 },
                    move: { enable: true, speed: 1.8, direction: 'none', random: true, straight: false, out_mode: 'bounce', bounce: true, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: false, mode: 'bubble' },
                        onclick: { enable: false, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        bubble: { distance: 200, size: 40, duration: 2, opacity: 8, speed: 3 },
                        repulse: { distance: 200, duration: 0.4 },
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            },
            noir: {
                particles: {
                    number: { value: 30, density: { enable: true, value_area: 800 } },
                    color: { value: ['#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.25, random: true, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
                    size: { value: 1.8, random: true, anim: { enable: false, speed: 3, size_min: 1, sync: false } },
                    line_linked: { enable: true, distance: 250, color: '#e0e0e0', opacity: 0.15, width: 0.5 },
                    move: { enable: true, speed: 1.2, direction: 'none', random: true, straight: false, out_mode: 'bounce', bounce: true, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: false, mode: 'repulse' },
                        onclick: { enable: false, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                        repulse: { distance: 180, duration: 0.4 },
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            }
        };
        if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
            for (let i = pJSDom.length - 1; i >= 0; i--) {
                if (pJSDom[i].pJS && pJSDom[i].pJS.canvas && pJSDom[i].pJS.canvas.el && 
                    pJSDom[i].pJS.canvas.el.id === 'change-name-particles-js') {
                    pJSDom[i].pJS.fn.vendors.destroypJS();
                    pJSDom.splice(i, 1);
                    break;
                }
            }
        }
        if (typeof particlesJS !== 'undefined') {
            particlesJS('change-name-particles-js', particleConfigs[currentTheme]);
        }
    }, 50);
}

function closeChangeNameModal() {
    const modal = document.getElementById('change-name-modal');
    if (modal) modal.classList.remove('show');
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        for (let i = pJSDom.length - 1; i >= 0; i--) {
            if (pJSDom[i].pJS && pJSDom[i].pJS.canvas && pJSDom[i].pJS.canvas.el && 
                pJSDom[i].pJS.canvas.el.id === 'change-name-particles-js') {
                pJSDom[i].pJS.fn.vendors.destroypJS();
                pJSDom.splice(i, 1);
                break;
            }
        }
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
        
        showNotification('Changes saved');
    } else {
        input.style.borderColor = '#ff4444';
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
