// Function to change the tab cloaking based on the selected option
function changeCloak() {
    const selectedCloakOption = document.querySelector('.cloak-select').value;
    localStorage.setItem('tabCloak', selectedCloakOption);  // Save the selected option to localStorage
    applyCloak(selectedCloakOption);  // Apply the cloaking option
    console.log(`Saved cloak option: ${selectedCloakOption}`);  // Debugging line
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
            chemical.setStore("title", "");
            chemical.setStore("icon", "");
            break;
    }
}

// Function to load the saved tab cloaking setting from localStorage on page load
function loadCloakSetting() {
    console.log("Loading cloak setting...");  // Debugging line to see if it's being triggered
    const savedCloakOption = localStorage.getItem('tabCloak');
    console.log(`Loaded cloak option: ${savedCloakOption}`);  // Debugging line to see the loaded value

    if (savedCloakOption) {
        const selectElement = document.querySelector('.cloak-select');
        if (selectElement) {
            selectElement.value = savedCloakOption; // Set the saved value to the select dropdown
            applyCloak(savedCloakOption); // Apply the saved option
            console.log(`Dropdown set to: ${savedCloakOption}`);  // Debugging line to check dropdown value
        }
    } else {
        // If no saved option, fallback to 'Default'
        const selectElement = document.querySelector('.cloak-select');
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
    const selectedTransportOption = document.querySelector('.transport-select').value;
    localStorage.setItem('transportSelect', selectedTransportOption);  // Save the selected option to localStorage
    applyTransport(selectedTransportOption);  // Apply the transport option
    console.log(`Saved transport option: ${selectedTransportOption}`);  // Debugging line
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
        const selectElement = document.querySelector('.transport-select');
        if (selectElement) {
            selectElement.value = savedTransportOption; // Set the saved value to the select dropdown
            applyTransport(savedTransportOption); // Apply the saved option
            console.log(`Dropdown set to: ${savedTransportOption}`);  // Debugging line to confirm dropdown update
        }
    } else {
        // If no saved option, fallback to 'libcurl'
        const selectElement = document.querySelector('.transport-select');
        if (selectElement) {
            selectElement.value = 'libcurl'; // Set default to libcurl
            applyTransport('libcurl'); // Apply the default value
            console.log('Dropdown set to default (libcurl)');  // Debugging line for default
        }
    }
}

// Load the setting on page load
window.addEventListener('load', loadTransportSetting);

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
    const selectedSearchEngine = document.querySelector('.searchengine-select').value;
    applySearchEngine(selectedSearchEngine);  // Apply the selected search engine
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
        const selectElement = document.querySelector('.searchengine-select');
        if (selectElement) {
            selectElement.value = savedSearchEngineOption; // Set the saved value to the select dropdown
            applySearchEngine(savedSearchEngineOption); // Apply the saved option
        }
    } else {
        // If no saved option, fallback to 'google' by default
        const selectElement = document.querySelector('.searchengine-select');
        if (selectElement) {
            selectElement.value = 'duckduckgo'; // Set default to Google
            applySearchEngine('duckduckgo'); // Apply the default value
        }
    }
}

// Load the setting on page load
window.addEventListener('load', loadSearchEngineSetting);

function leaveconfirmation() {
    let button = document.getElementById('leaveconfirmbutton');

    // Toggle the setting in localStorage
    let isLeaveConfirmationEnabled = localStorage.getItem('leaveConfirmation') === 'true';
    localStorage.setItem('leaveConfirmation', !isLeaveConfirmationEnabled);

    // Update button appearance
    updateLeaveConfirmButton();
}

function updateLeaveConfirmButton() {
    let button = document.getElementById('leaveconfirmbutton');
    let isLeaveConfirmationEnabled = localStorage.getItem('leaveConfirmation') === 'true';
}

// Ensure the button has the correct color when the settings page loads
window.addEventListener('load', updateLeaveConfirmButton);

let notifications = [];

function showNotification() {
    // Play notification sound
    let audio = new Audio("/audio/notification.mp3");
    audio.play().catch(error => console.warn("Audio play failed:", error));

    let notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = "Changes saved!";

    // Style the notification
    Object.assign(notification.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#181825",
        color: "#cdd6f4",
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

// Add event listeners for dropdowns
document.querySelector(".transport-select").addEventListener("change", showNotification);
document.querySelector(".cloak-select").addEventListener("change", showNotification);
document.querySelector(".searchengine-select").addEventListener("change", showNotification);
document.getElementById("leaveconfirmbutton").addEventListener("click", showNotification);
document.getElementById("autoabbutton").addEventListener("click", showNotification);
document.getElementById("applykeybindbutton").addEventListener("click", showNotification);
document.getElementById("applycredentialsbutton").addEventListener("click", showNotification);
document.getElementById("resetcredentialsbutton").addEventListener("click", showNotification);

let selectedKey = localStorage.getItem("redirectKey");
let customURL = localStorage.getItem("redirectUrl") || "https://www.google.com";
let tempKey = selectedKey; // Temporary storage for unsaved key
let tempURL = customURL; // Temporary storage for unsaved URL

function openKeybindModal() {
    document.getElementById("keybind-modal").style.display = "flex";
    document.getElementById("keybind-display").textContent = tempKey
        ? tempKey.toUpperCase()
        : "No key bound";
    document.getElementById("keybind-url").value = tempURL;
}

function closeKeybindModal() {
    // Reset to last saved values when closing without applying
    tempKey = localStorage.getItem("redirectKey");
    tempURL = localStorage.getItem("redirectUrl") || "https://www.google.com";
    document.getElementById("keybind-modal").style.display = "none";
}

document.getElementById("keybind-display").addEventListener("click", () => {
    document.getElementById("keybind-display").textContent = "Listening...";
    const listener = (e) => {
        if (e.key === "Escape") {
            tempKey = null;
            document.getElementById("keybind-display").textContent = "No key bound";
        } else {
            tempKey = e.key;
            document.getElementById("keybind-display").textContent = tempKey.toUpperCase();
        }
        window.removeEventListener("keydown", listener);
    };
    window.addEventListener("keydown", listener);
});

function applyKeybind() {
    let urlInput = document.getElementById("keybind-url").value.trim();
    
    if (urlInput && !/^https?:\/\//i.test(urlInput)) {
        urlInput = "https://" + urlInput;
    }

    customURL = urlInput || "https://www.google.com";
    localStorage.setItem("redirectUrl", customURL);

    if (tempKey) {
        selectedKey = tempKey;
        localStorage.setItem("redirectKey", selectedKey);
    } else {
        selectedKey = null;
        localStorage.removeItem("redirectKey");
    }

    closeKeybindModal();
}

// Default credentials
const DEFAULT_USERNAME = "mewingacademy";
const DEFAULT_PASSWORD = "looksmaxxing123";

// Set initial values if not already set
if (!localStorage.getItem('username')) localStorage.setItem('username', DEFAULT_USERNAME);
if (!localStorage.getItem('password')) localStorage.setItem('password', DEFAULT_PASSWORD);

let tempUsername = localStorage.getItem('username') || DEFAULT_USERNAME;
let tempPassword = localStorage.getItem('password') || DEFAULT_PASSWORD;

function openCredentialsModal() {
    document.getElementById('credentials-modal').classList.add('show');
    document.getElementById('new-username').value = tempUsername;
    document.getElementById('new-password').value = tempPassword;
}

function closeCredentialsModal() {
    const modal = document.getElementById('credentials-modal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.classList.remove('show');
        modal.style.opacity = '';
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
}

function resetCredentials() {
    localStorage.setItem('username', DEFAULT_USERNAME);
    localStorage.setItem('password', DEFAULT_PASSWORD);

    tempUsername = DEFAULT_USERNAME;
    tempPassword = DEFAULT_PASSWORD;

    document.getElementById('new-username').value = DEFAULT_USERNAME;
    document.getElementById('new-password').value = DEFAULT_PASSWORD;

    closeCredentialsModal();
}
