// Function to change the tab cloaking based on the selected option
function changeCloak() {
    const selectedOption = document.querySelector('.cloak-select').value;
    localStorage.setItem('tabCloak', selectedOption);  // Save the selected option to localStorage
    applyCloak(selectedOption);  // Apply the cloaking
}

// Function to apply the cloaking based on the selected option
function applyCloak(option) {
    // Log different messages based on the selected option
    switch(option) {
        case 'Google':
            chemical.setStore("title", "Google")
            chemical.setStore("icon", "../img/google.ico")
            break;
        case 'Gmail':
            chemical.setStore("title", "Inbox (236) - s37212@student.roundrockisd.org - Gmail")
            chemical.setStore("icon", "../img/gmail.ico")
            break;
        case 'Google Drive':
            chemical.setStore("title", "My Drive - Google Drive")
            chemical.setStore("icon", "../img/drive.png")
            break;
        case 'Default':
        default:
            chemical.setStore("title", "")
            chemical.setStore("icon", "")
            break;
    }
}

// Function to load the saved setting from localStorage on page load
function loadCloakSetting() {
    const savedOption = localStorage.getItem('tabCloak');
    if (savedOption) {
        // If a saved option exists, apply it
        document.querySelector('.cloak-select').value = savedOption;
        applyCloak(savedOption);
    } else {
        // If no saved option, fallback to default
        document.querySelector('.cloak-select').value = 'Default';
        applyCloak('Default');
    }
}

// Load the setting on page load
window.onload = loadCloakSetting;


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
    window.parent.window.location.replace(localStorage.getItem('panicurl') || 'https://classroom.google.com/h')
  }

// Function to change the transport based on the selected option
function changeTransport() {
    const selectedTransportOption = document.querySelector('.transport-select').value;
    localStorage.setItem('transportSelect', selectedTransportOption);  // Save the selected option to localStorage
    applyTransport(selectedTransportOption);  // Apply the transport option
}

// Function to apply the transport based on the selected option
function applyTransport(option) {
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
    const savedTransportOption = localStorage.getItem('transportSelect');
    if (savedTransportOption) {
        // If a saved option exists, apply it
        document.querySelector('.transport-select').value = savedTransportOption;
        applyTransport(savedTransportOption);
    } else {
        // If no saved option, fallback to 'libcurl' by default
        document.querySelector('.transport-select').value = 'libcurl';
        applyTransport('libcurl');
    }
}

// Load the setting on page load
window.onload = loadTransportSetting;

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
            selectElement.value = 'google'; // Set default to Google
            applySearchEngine('google'); // Apply the default value
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



