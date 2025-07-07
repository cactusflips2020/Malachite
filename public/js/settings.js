// Default credentials - moved to top to avoid hoisting issues
const DEFAULT_USERNAME = "malachite";
const DEFAULT_PASSWORD = "malachiteontop";

// Set initial values if not already set
if (!localStorage.getItem('username')) localStorage.setItem('username', DEFAULT_USERNAME);
if (!localStorage.getItem('password')) localStorage.setItem('password', DEFAULT_PASSWORD);

// Temporary credential variables
let tempUsername = localStorage.getItem('username') || DEFAULT_USERNAME;
let tempPassword = localStorage.getItem('password') || DEFAULT_PASSWORD;

// Function to change the tab cloaking based on the selected option
function changeCloak() {
    const selectedCloakOption = document.getElementById('cloak-select').value;
    localStorage.setItem('tabCloak', selectedCloakOption);  // Save the selected option to localStorage
    applyCloak(selectedCloakOption);  // Apply the cloaking option
    console.log(`Saved cloak option: ${selectedCloakOption}`);  // Debugging line
    showNotification('Changes saved');
}

// Function to apply the cloaking based on the selected option
function applyCloak(option) {
    console.log(`Applying cloak: ${option}`);  // Debugging line to check what option is being applied
    switch(option) {
        case 'Google':
            chemical.setStore("title", "Google");
            chemical.setStore("icon", "../img/google.ico");
            break;
        case 'Gmail':
            chemical.setStore("title", "Inbox (236) - s372126@student.roundrockisd.org - Gmail");
            chemical.setStore("icon", "../img/gmail.ico");
            break;
        case 'Google Drive':
            chemical.setStore("title", "My Drive - Google Drive");
            chemical.setStore("icon", "../img/drive.png");
            break;
        case 'Default':
        default:
            chemical.setStore("title", "Malachite");
            // Don't set icon for Default - let main.js handle theme favicon
            break;
    }
}

// Function to load the saved tab cloaking setting from localStorage on page load
function loadCloakSetting() {
    console.log("Loading cloak setting...");  // Debugging line to see if it's being triggered
    const savedCloakOption = localStorage.getItem('tabCloak');
    console.log(`Loaded cloak option: ${savedCloakOption}`);  // Debugging line to see the loaded value

    if (savedCloakOption) {
        const selectElement = document.getElementById('cloak-select');
        if (selectElement) {
            selectElement.value = savedCloakOption; // Set the saved value to the select dropdown
            applyCloak(savedCloakOption); // Apply the saved option
            console.log(`Dropdown set to: ${savedCloakOption}`);  // Debugging line to check dropdown value
        }
    } else {
        // If no saved option, fallback to 'Default'
        const selectElement = document.getElementById('cloak-select');
        if (selectElement) {
            selectElement.value = 'Default'; // Default fallback
            applyCloak('Default'); // Apply the default value
            console.log('Dropdown set to default');  // Debugging line for default
        }
    }
}

// Load the setting on page load
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

// Function to change the transport based on the selected option
function changeTransport() {
    console.log('changeTransport function called');
    const selectedTransportOption = document.getElementById('transport-select').value;
    localStorage.setItem('transportSelect', selectedTransportOption);  // Save the selected option to localStorage
    applyTransport(selectedTransportOption);  // Apply the transport option
    console.log(`Saved transport option: ${selectedTransportOption}`);  // Debugging line
    showNotification('Changes saved');
}

// Function to apply the transport based on the selected option
function applyTransport(option) {
    console.log(`Applying transport: ${option}`);  // Debugging line to check which transport is being applied
    // Only set transport to valid options (either 'epoxy' or 'libcurl')
    if (option === 'epoxy') {
        chemical.setTransport("epoxy");
    } else {
        // Default to 'libcurl' if 'epoxy' is not selected
        chemical.setTransport("libcurl");
    }
}

// Function to load the saved setting from localStorage on page load
function loadTransportSetting() {
    console.log("Loading transport setting...");  // Debugging line to see if it's being triggered
    const savedTransportOption = localStorage.getItem('transportSelect');
    console.log(`Loaded transport option: ${savedTransportOption}`);  // Debugging line to check what is loaded from localStorage

    if (savedTransportOption) {
        const selectElement = document.getElementById('transport-select');
        if (selectElement) {
            selectElement.value = savedTransportOption; // Set the saved value to the select dropdown
            applyTransport(savedTransportOption); // Apply the saved option
            console.log(`Dropdown set to: ${savedTransportOption}`);  // Debugging line to confirm dropdown update
        }
    } else {
        // If no saved option, fallback to 'libcurl'
        const selectElement = document.getElementById('transport-select');
        if (selectElement) {
            selectElement.value = 'libcurl'; // Set default to libcurl
            applyTransport('libcurl'); // Apply the default value
            console.log('Dropdown set to default (libcurl)');  // Debugging line for default
        }
    }
}

// Load saved values function
function loadSavedValues() {
    // Load transport setting
    const savedTransport = localStorage.getItem('transportSelect');
    if (savedTransport) {
        const transportSelect = document.getElementById('transport-select');
        if (transportSelect) {
            transportSelect.value = savedTransport;
            applyTransport(savedTransport);
        }
    }
    
    // Load cloak setting
    const savedCloak = localStorage.getItem('tabCloak');
    if (savedCloak) {
        const cloakSelect = document.getElementById('cloak-select');
        if (cloakSelect) {
            cloakSelect.value = savedCloak;
            applyCloak(savedCloak);
        }
    }
    
    // Load search engine setting
    const savedSearchEngine = localStorage.getItem('searchEngineSelect');
    if (savedSearchEngine) {
        const searchEngineSelect = document.getElementById('searchengine-select');
        if (searchEngineSelect) {
            searchEngineSelect.value = savedSearchEngine;
            applySearchEngine(savedSearchEngine);
        }
    }
    
    // Load theme setting
    const savedTheme = localStorage.getItem('siteTheme') || 'moss';
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = savedTheme;
    }
}



function autoab() {
    // Check if 'autoab' is active in localStorage
    let isActive = localStorage.getItem('autoab') === 'true';

    // Toggle the state and save it to localStorage
    if (isActive) {
        localStorage.setItem('autoab', 'false');
    } else {
        localStorage.setItem('autoab', 'true');
    }

    // Update button state text and color
    updateButtonState();
    
    // Show notification
    showNotification('Changes saved');
}

// Helper function to update the specific button's text and color based on the state
function updateButtonState() {
    let button = document.getElementById('autoabbutton'); // Get the specific button by ID
    let isActive = localStorage.getItem('autoab') === 'true';
}

// On page load, update button state based on localStorage
window.addEventListener('load', function() {
    updateButtonState();
});


// On page load, update button state based on localStorage
window.addEventListener('load', function() {
    updateButtonState();
});

function signOut() {
    // Remove the 'isLoggedIn' item from localStorage
    localStorage.removeItem('isLoggedIn');

    // Optionally, you can also clear other user-related data here

    // Redirect to login page after signing out
    window.location.href = '/login.html';  // Redirect to login page
}

// Function to change the search engine based on the selected option
function changeSearchEngine() {
    const selectedSearchEngine = document.getElementById('searchengine-select').value;
    applySearchEngine(selectedSearchEngine);  // Apply the selected search engine
    showNotification('Changes saved');
}

// Function to apply the selected search engine
function applySearchEngine(option) {
    if (option === 'google') {
        console.log("Using Google search");
        localStorage.setItem('searchEngineSelect', 'google');  // Save the selected option to localStorage
        localStorage.setItem('searchEngineSelectUrl', 'https://www.google.com/search?q=%s');
    } else if (option === 'duckduckgo') {
        console.log("Using DuckDuckGo search");
        localStorage.setItem('searchEngineSelect', 'duckduckgo');  // Save the selected option to localStorage
        localStorage.setItem('searchEngineSelectUrl', 'https://www.duckduckgo.com/?q=%s');
    } else if (option === 'yahoo') {
        console.log("Using Yahoo search");
        localStorage.setItem('searchEngineSelect', 'yahoo');  // Save the selected option to localStorage
        localStorage.setItem('searchEngineSelectUrl', 'https://www.search.yahoo.com/search?p=%s');
    }
}

// Function to load the saved setting from localStorage on page load
function loadSearchEngineSetting() {
    const savedSearchEngineOption = localStorage.getItem('searchEngineSelect');

    if (savedSearchEngineOption) {
        const selectElement = document.getElementById('searchengine-select');
        if (selectElement) {
            selectElement.value = savedSearchEngineOption; // Set the saved value to the select dropdown
            applySearchEngine(savedSearchEngineOption); // Apply the saved option
        }
    } else {
        // If no saved option, fallback to 'google' by default
        const selectElement = document.getElementById('searchengine-select');
        if (selectElement) {
            selectElement.value = 'duckduckgo'; // Set default to Google
            applySearchEngine('duckduckgo'); // Apply the default value
        }
    }
}

// Load the setting on page load
window.addEventListener('load', loadSearchEngineSetting);

// Function to load the current theme setting on page load
function loadThemeSetting() {
    const savedTheme = localStorage.getItem('siteTheme') || 'moss';
    const selectElement = document.getElementById('theme-select');
    if (selectElement) {
        selectElement.value = savedTheme;
        console.log(`Theme dropdown set to: ${savedTheme}`);
    }
}

// Load the theme setting on page load
window.addEventListener('load', loadThemeSetting);

function leaveconfirmation() {
    let button = document.getElementById('leaveconfirmbutton');

    // Toggle the setting in localStorage
    let isLeaveConfirmationEnabled = localStorage.getItem('leaveConfirmation') === 'true';
    localStorage.setItem('leaveConfirmation', !isLeaveConfirmationEnabled);

    // Update button appearance
    updateLeaveConfirmButton();
    
    // Show notification
    showNotification('Changes saved');
}

function updateLeaveConfirmButton() {
    let button = document.getElementById('leaveconfirmbutton');
    let isLeaveConfirmationEnabled = localStorage.getItem('leaveConfirmation') === 'true';
}

// Ensure the button has the correct color when the settings page loads
window.addEventListener('load', updateLeaveConfirmButton);

let notifications = [];

function showNotification(message) {
    // Play notification sound
    let audio = new Audio("/audio/notification.mp3");
    audio.play().catch(error => console.warn("Audio play failed:", error));

    let notification = document.createElement("div");
    const theme = localStorage.getItem('siteTheme') || 'moss';
    notification.className = "notification theme-" + theme;
    notification.innerText = message;
    // Set background, text, and border color directly for each theme
    if (theme === 'moss') {
        notification.style.background = '#384438'; // old outline color
        notification.style.color = '#b2c2a8';
        notification.style.border = '1.5px solid #232b23';
    } else if (theme === 'midnight') {
        notification.style.background = '#2a3442'; // old outline color
        notification.style.color = '#b8c7e0';
        notification.style.border = '1.5px solid #181c24';
    } else if (theme === 'rose') {
        notification.style.background = '#6e3844'; // old outline color
        notification.style.color = '#e0b8c7';
        notification.style.border = '1.5px solid #2a1a1f';
    } else if (theme === 'noir') {
        notification.style.background = '#444'; // old outline color
        notification.style.color = '#e0e0e0';
        notification.style.border = '1.5px solid #181818';
    }

    // Style the notification
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

    // Adjust position of all notifications
    notifications.forEach((notif, index) => {
        notif.style.bottom = `${20 + (notifications.length - 1 - index) * 50}px`;
    });

    // If more than 3 notifications, remove the top (oldest) one
    if (notifications.length > 3) {
        let oldest = notifications.shift();
        oldest.style.opacity = "0";
        oldest.style.transform = "translateY(-20px)";
        setTimeout(() => oldest.remove(), 500);
    }

    // Remove this notification after 3 seconds
    setTimeout(() => {
        if (notifications.includes(notification)) {
            notifications = notifications.filter(n => n !== notification);
            notification.style.opacity = "0";
            notification.style.transform = "translateY(-20px)";
            setTimeout(() => notification.remove(), 500);
        }
    }, 3000);
}

// Simple dropdown setup
document.addEventListener('DOMContentLoaded', function() {
    console.log('Setting up basic dropdowns');
    
    // Basic dropdown event listeners
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
    
    document.getElementById("theme-select")?.addEventListener("change", function() {
        const value = this.value;
        applyTheme(value);
        showNotification('Changes saved');
    });
    
    // Load saved values
    loadSavedValues();
});

let selectedKey = localStorage.getItem("redirectKey");
let customURL = localStorage.getItem("redirectUrl") || "https://www.google.com";
let tempKey = selectedKey; // Temporary storage for unsaved key
let tempURL = customURL; // Temporary storage for unsaved URL

function openKeybindModal() {
    console.log('Opening keybind modal...');
    
    const modal = document.getElementById("keybind-modal");
    if (!modal) {
        console.error('Keybind modal not found!');
        return;
    }
    
    // Apply current theme to modal
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
    
    // Initialize particles for keybind modal
    initializeKeybindParticles(currentTheme);
    
    console.log('Keybind modal opened successfully');
}

function closeKeybindModal() {
    console.log('Closing keybind modal...');
    // Reset to last saved values when closing without applying
    tempKey = localStorage.getItem("redirectKey");
    tempURL = localStorage.getItem("redirectUrl") || "https://www.google.com";
    const modal = document.getElementById("keybind-modal");
    if (modal) {
        modal.classList.remove("show");
        modal.style.display = "none";
        
        // Clean up keybind modal particles
        cleanupKeybindParticles();
        
        console.log('Keybind modal closed successfully');
    }
}

// Add event listener for keybind display when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up keybind listeners...');
    
    const keybindDisplay = document.getElementById("keybind-display");
    if (keybindDisplay) {
        console.log('Keybind display found, adding click listener');
        keybindDisplay.addEventListener("click", () => {
            console.log('Keybind display clicked');
            keybindDisplay.textContent = "Listening...";
            const listener = (e) => {
                console.log('Key pressed:', e.key);
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
    
    // Add URL completion for keybind URL input
    const keybindUrl = document.getElementById("keybind-url");
    if (keybindUrl) {
        console.log('Keybind URL input found, adding completion listener');
        keybindUrl.addEventListener("blur", function() {
            let urlValue = this.value.trim();
            if (urlValue && !/^https?:\/\//i.test(urlValue)) {
                // Auto-complete the URL
                this.value = "https://" + urlValue;
                console.log('URL auto-completed to:', this.value);
            }
        });
        
        // Also complete on Enter key
        keybindUrl.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                let urlValue = this.value.trim();
                if (urlValue && !/^https?:\/\//i.test(urlValue)) {
                    this.value = "https://" + urlValue;
                    console.log('URL auto-completed on Enter to:', this.value);
                }
            }
        });
    } else {
        console.error('Keybind URL input not found!');
    }
    
    // Test if the button exists
    const openButton = document.querySelector('button[onclick="openKeybindModal()"]');
    if (openButton) {
        console.log('Open keybind button found');
    } else {
        console.error('Open keybind button not found!');
    }
});

function applyKeybind() {
    console.log('Applying keybind settings...');
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
        console.log('Keybind saved:', selectedKey, '->', customURL);
    } else {
        selectedKey = null;
        localStorage.removeItem("redirectKey");
        console.log('Keybind removed');
    }

    closeKeybindModal();
    showNotification('Changes saved!');
}

function resetKeybind() {
    console.log('Resetting keybind settings...');
    
    // Reset to default values
    tempKey = null;
    tempURL = "https://www.google.com";
    
    // Clear from localStorage
    localStorage.removeItem("redirectKey");
    localStorage.setItem("redirectUrl", "https://www.google.com");
    
    // Update global variables
    selectedKey = null;
    customURL = "https://www.google.com";
    
    console.log('Keybind settings reset to defaults');
    showNotification('Changes saved!');
    
    // Close the modal
    closeKeybindModal();
}



function openCredentialsModal() {
    console.log('Opening credentials modal...');
    const modal = document.getElementById('credentials-modal');
    
    // Apply current theme to modal
    const currentTheme = localStorage.getItem('siteTheme') || 'moss';
    modal.className = 'credentials-modal theme-' + currentTheme;
    
    modal.classList.add('show');
    document.getElementById('new-username').value = tempUsername;
    document.getElementById('new-password').value = tempPassword;
    
    // Get current theme for particles (reuse the variable)
    // const currentTheme = localStorage.getItem('siteTheme') || 'moss';
    
    // Theme-specific particle configurations
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
    
    // Initialize particles.js with a small delay to ensure DOM is ready
    setTimeout(() => {
        console.log('Checking particlesJS:', typeof particlesJS !== 'undefined');
        if (typeof particlesJS !== 'undefined') {
            console.log('Initializing particles for theme:', currentTheme);
            const config = particleConfigs[currentTheme] || particleConfigs.moss;
            particlesJS('credentials-particles-js', config);
            console.log('Particles initialized successfully');
        } else {
            console.log('ParticlesJS not available, trying alternative approach...');
            // Try to create a simple particle effect manually
            createSimpleParticles();
        }
    }, 100);
}

function createSimpleParticles() {
    console.log('Creating simple particles manually...');
    const container = document.getElementById('credentials-particles-js');
    if (container) {
        // Get current theme for particle colors
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
        console.log('Simple particles created for theme:', currentTheme);
    }
}

function initializeKeybindParticles(theme) {
    console.log('Initializing keybind particles for theme:', theme);
    
    // Theme-specific particle configurations for keybind modal
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
    
    // Initialize particles.js with a small delay to ensure DOM is ready
    setTimeout(() => {
        console.log('Checking particlesJS for keybind modal:', typeof particlesJS !== 'undefined');
        if (typeof particlesJS !== 'undefined') {
            console.log('Initializing keybind particles for theme:', theme);
            const config = keybindParticleConfigs[theme] || keybindParticleConfigs.moss;
            particlesJS('keybind-particles-js', config);
            console.log('Keybind particles initialized successfully');
        } else {
            console.log('ParticlesJS not available for keybind modal, trying alternative approach...');
            // Try to create a simple particle effect manually
            createSimpleKeybindParticles(theme);
        }
    }, 100);
}

function createSimpleKeybindParticles(theme) {
    console.log('Creating simple keybind particles manually...');
    const container = document.getElementById('keybind-particles-js');
    if (container) {
        // Get current theme for particle colors
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
        console.log('Simple keybind particles created for theme:', theme);
    }
}

function cleanupKeybindParticles() {
    console.log('Cleaning up keybind particles...');
    
    // Clean up particles.js particles
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        // Find and destroy only the keybind modal particles
        for (let i = pJSDom.length - 1; i >= 0; i--) {
            if (pJSDom[i].pJS && pJSDom[i].pJS.canvas && pJSDom[i].pJS.canvas.el && 
                pJSDom[i].pJS.canvas.el.id === 'keybind-particles-js') {
                pJSDom[i].pJS.fn.vendors.destroypJS();
                pJSDom.splice(i, 1);
                break;
            }
        }
    }
    
    // Clean up simple particles
    const container = document.getElementById('keybind-particles-js');
    if (container) {
        container.innerHTML = '';
    }
    
    console.log('Keybind particles cleaned up');
}

function closeCredentialsModal() {
    const modal = document.getElementById('credentials-modal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.classList.remove('show');
        modal.style.opacity = '';
        
        // Clean up only the credentials modal particles
        if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
            // Find and destroy only the credentials modal particles
            for (let i = pJSDom.length - 1; i >= 0; i--) {
                if (pJSDom[i].pJS && pJSDom[i].pJS.canvas && pJSDom[i].pJS.canvas.el && 
                    pJSDom[i].pJS.canvas.el.id === 'credentials-particles-js') {
                    pJSDom[i].pJS.fn.vendors.destroypJS();
                    pJSDom.splice(i, 1);
                    break;
                }
            }
        }
        
        // Clean up simple particles only in credentials modal
        const container = document.getElementById('credentials-particles-js');
        if (container) {
            container.innerHTML = '';
        }
    }, 250);
}

function applyCredentials() {
    let newUsername = document.getElementById('new-username').value.trim();
    let newPassword = document.getElementById('new-password').value.trim();

    // Fallbacks
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

function changeTheme() {
    const selectedTheme = document.getElementById('theme-select').value;
    console.log(`Theme changed to: ${selectedTheme}`);
    
    // TEMPORARILY DISABLE THEME CHANGE TO TEST DROPDOWNS
    console.log('Theme change temporarily disabled for testing');
    showNotification('Theme change temporarily disabled');
    
    /*
    // Debug: Check dropdowns before theme change
    console.log('Dropdowns before theme change:');
    console.log('Transport select:', document.getElementById('transport-select'));
    console.log('Cloak select:', document.getElementById('cloak-select'));
    console.log('Search engine select:', document.getElementById('searchengine-select'));
    console.log('Theme select:', document.getElementById('theme-select'));
    
    applyTheme(selectedTheme); // Apply the selected theme
    
    // Debug: Check dropdowns after theme change
    setTimeout(() => {
        console.log('Dropdowns after theme change:');
        console.log('Transport select:', document.getElementById('transport-select'));
        console.log('Cloak select:', document.getElementById('cloak-select'));
        console.log('Search engine select:', document.getElementById('searchengine-select'));
        console.log('Theme select:', document.getElementById('theme-select'));
    }, 100);
    */
}

function updateThemeModals() {
    const theme = localStorage.getItem('siteTheme') || 'moss';
    // Notification popup - update both classes and inline styles
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(n => {
        n.className = 'notification theme-' + theme;
        // Update inline styles to match new theme
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
    // Panic key modal and all children
    const keybindModal = document.getElementById('keybind-modal');
    if (keybindModal) {
        keybindModal.className = 'keybind-modal theme-' + theme;
        // All children
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
    // Credentials modal and all children
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
        // Always add 'reset-btn' to the reset button
        const resetBtn = credentialsModal.querySelector('#resetcredentialsbutton');
        if (resetBtn) resetBtn.classList.add('reset-btn');
    }
}

// Function to apply the theme
function applyTheme(theme) {
    console.log(`Settings.js: Applying theme: ${theme}`);  // Debugging line to check which theme is being applied
    document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir');
    document.body.classList.add('theme-' + theme);
    localStorage.setItem('siteTheme', theme);
    // Update theme classes for modals/popups
    updateThemeModals();
}
