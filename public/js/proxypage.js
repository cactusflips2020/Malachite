// ===== PROXY PAGE FUNCTIONALITY =====

// ===== LOADING SCREEN MANAGEMENT =====

// Hide loading screen when page loads
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0'; // Fade out loading screen
        
        setTimeout(function() {
            loadingScreen.style.visibility = 'hidden'; // Hide completely after fade
        }, 500); // Wait for fade animation to complete
    }, 0); // Start immediately
});

// ===== IFRAME URL SYNC =====

// Update search bar with decoded URL when iframe loads
async function onIframeLoad() {
    const iframe = document.getElementById('proxyIframe');
    const proxySearchInput = document.getElementById('proxySearch');
  
    if (iframe && proxySearchInput) {
        // Use iframe.src instead of contentWindow.location.href to avoid cross-origin issues
        const iframeUrl = iframe.src;
        
        // Don't update search input for 404 pages, settings pages, or homepage
        if (iframeUrl.includes('404-proxy.html') || iframeUrl.includes('settings-proxy.html') || iframeUrl.includes('malachite-home.html')) {
            console.log('Special page detected (404, settings, or homepage), not updating search input');
            
            // For settings page, ensure the search bar shows malachite://settings
            if (iframeUrl.includes('settings-proxy.html')) {
                const searchInput = document.getElementById('proxySearch');
                if (searchInput) {
                    searchInput.value = "malachite://settings";
                }
            }
            
            // For homepage, ensure the search bar shows malachite://home
            if (iframeUrl.includes('malachite-home.html')) {
                const searchInput = document.getElementById('proxySearch');
                if (searchInput) {
                    searchInput.value = "malachite://home";
                }
            }
            return;
        }
        
        const proxyBackend = localStorage.getItem('proxyBackendSelect') || "uv";
  
        try {
            // Try to decode the URL based on the current proxy backend
            let decodedUrl;
            
            if (proxyBackend === "rh" && typeof chemical !== 'undefined' && chemical.decode) {
                // For Rammerhead, try to decode with service parameter
                try {
                    decodedUrl = await chemical.decode(iframeUrl, {
                        service: "rh"
                    });
                    console.log('Rammerhead decode successful:', decodedUrl);
                } catch (decodeError) {
                    console.log('Rammerhead decode failed, using original URL:', decodeError);
                    decodedUrl = iframeUrl;
                }
            } else if (typeof chemical !== 'undefined' && chemical.decode) {
                // For Ultraviolet, use normal decode
                decodedUrl = await chemical.decode(iframeUrl);
            } else {
                // Fallback to original URL if chemical.decode is not available
                decodedUrl = iframeUrl;
            }
            
            proxySearchInput.value = decodedUrl;
        } catch (error) {
            console.error('Error decoding URL:', error);
            // Fallback to original URL on error
            proxySearchInput.value = iframeUrl;
        }
    }
}
  
// Attach load event to iframe
const iframe = document.getElementById('proxyIframe');
if (iframe) {
    iframe.onload = function() {
        // Call the original onIframeLoad function
        onIframeLoad();
        
        // Show devtools only after iframe has loaded
        if (typeof window.showDevTools === 'function') {
            // Clear the interval that was hiding devtools
            if (typeof window.clearHideInterval === 'function') {
                window.clearHideInterval();
            }
            
            // Show devtools after a short delay to ensure everything is ready
            setTimeout(function() {
                window.showDevTools();
                console.log('Devtools shown after proxy iframe loaded');
            }, 1000);
        }
    };
}

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
        const loading = document.querySelector('.loading-screen');
        if (loading) loading.style.animationDelay = `-${progress}s`;
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

// ===== THEME INITIALIZATION =====

// Function to apply theme-specific scrollbar colors
function applyThemeScrollbarColors(theme) {
    const root = document.documentElement;
    console.log('Applying scrollbar colors for theme:', theme);
    
    if (theme === 'moss') {
        root.style.setProperty('--scrollbar-track', '#1a1f1a');
        root.style.setProperty('--scrollbar-thumb', '#384438');
        root.style.setProperty('--scrollbar-thumb-hover', '#4a5a4a');
        console.log('Applied moss theme scrollbar colors');
    } else if (theme === 'midnight') {
        root.style.setProperty('--scrollbar-track', '#151a22');
        root.style.setProperty('--scrollbar-thumb', '#2a3442');
        root.style.setProperty('--scrollbar-thumb-hover', '#3a4452');
        console.log('Applied midnight theme scrollbar colors');
    } else if (theme === 'rose') {
        root.style.setProperty('--scrollbar-track', '#1a1114');
        root.style.setProperty('--scrollbar-thumb', '#6e3844');
        root.style.setProperty('--scrollbar-thumb-hover', '#8e4854');
        console.log('Applied rose theme scrollbar colors');
    } else if (theme === 'noir') {
        root.style.setProperty('--scrollbar-track', '#1a1f1a');
        root.style.setProperty('--scrollbar-thumb', '#384438');
        root.style.setProperty('--scrollbar-thumb-hover', '#4a5a4a');
        console.log('Applied noir theme scrollbar colors');
    }
    
    // Force a repaint to ensure the scrollbar updates
    const tabsContainer = document.getElementById('tabs-container');
    if (tabsContainer) {
        tabsContainer.style.display = 'none';
        tabsContainer.offsetHeight; // Force reflow
        tabsContainer.style.display = '';
    }
}

// Apply saved theme on page load
(function() {
    const savedTheme = localStorage.getItem('siteTheme') || 'moss';
    document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir');
    document.body.classList.add('theme-' + savedTheme);
    
    // Apply theme-specific scrollbar colors
    applyThemeScrollbarColors(savedTheme);
})();

// Listen for theme changes from settings page
window.addEventListener('message', function(event) {
    if (event.data.type === 'theme-change') {
        const theme = event.data.theme;
        document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir');
        document.body.classList.add('theme-' + theme);
        localStorage.setItem('siteTheme', theme);
        
        // Apply theme-specific scrollbar colors
        applyThemeScrollbarColors(theme);
    }
});

// Listen for storage changes (when theme is changed in another tab/window)
window.addEventListener('storage', function(event) {
    if (event.key === 'siteTheme') {
        const theme = event.newValue || 'moss';
        document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir');
        document.body.classList.add('theme-' + theme);
        
        // Apply theme-specific scrollbar colors
        applyThemeScrollbarColors(theme);
    }
});

// Manual theme testing function (can be called from browser console)
window.testScrollbarTheme = function(theme) {
    console.log('Manually testing scrollbar theme:', theme);
    document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir');
    document.body.classList.add('theme-' + theme);
    applyThemeScrollbarColors(theme);
    
    // Log current CSS variable values
    const root = document.documentElement;
    console.log('Current CSS variables:');
    console.log('--scrollbar-track:', getComputedStyle(root).getPropertyValue('--scrollbar-track'));
    console.log('--scrollbar-thumb:', getComputedStyle(root).getPropertyValue('--scrollbar-thumb'));
    console.log('--scrollbar-thumb-hover:', getComputedStyle(root).getPropertyValue('--scrollbar-thumb-hover'));
};

// ===== CUSTOM BUTTONS FUNCTIONALITY =====

const customButtonsContainer = document.getElementById('custom-buttons-container');

function getCustomButtons() {
    return JSON.parse(localStorage.getItem('customProxyButtons') || '[]');
}

function saveCustomButtons(buttons) {
    localStorage.setItem('customProxyButtons', JSON.stringify(buttons));
}

function renderCustomButtons() {
    if (!customButtonsContainer) return;
    customButtonsContainer.innerHTML = '';

    // Render each custom button
    const buttons = getCustomButtons();
    buttons.forEach((btn, idx) => {
        const card = document.createElement('div');
        card.className = 'custom-button-card';
        card.innerHTML = `
            <div class="button-icon"><i class="${btn.icon || 'fa-solid fa-link'}"></i></div>
            <div class="button-name">${btn.name}</div>
            <button class="delete-button-btn" title="Delete" onclick="deleteCustomButton(${idx}, event)"><i class='fa-solid fa-times'></i></button>
        `;
        card.onclick = (e) => {
            if (e.target.closest('.delete-button-btn')) return;
            window.open(btn.link, '_blank');
        };
        customButtonsContainer.appendChild(card);
    });

    // Add the "+" add button card
    const addCard = document.createElement('div');
    addCard.className = 'add-button-card';
    addCard.innerHTML = `
        <div class="add-icon"><i class="fa-solid fa-plus"></i></div>
        <div class="add-text">Add Button</div>
    `;
    addCard.onclick = openAddButtonModal;
    customButtonsContainer.appendChild(addCard);
}

window.renderCustomButtons = renderCustomButtons;

// Modal logic
function openAddButtonModal() {
    document.getElementById('add-button-modal').style.display = 'flex';
}
function closeAddButtonModal() {
    document.getElementById('add-button-modal').style.display = 'none';
    document.getElementById('button-name').value = '';
    document.getElementById('button-link').value = '';
    document.getElementById('button-icon').value = '';
}
window.openAddButtonModal = openAddButtonModal;
window.closeAddButtonModal = closeAddButtonModal;

function addCustomButton() {
    const name = document.getElementById('button-name').value.trim();
    const link = document.getElementById('button-link').value.trim();
    const icon = document.getElementById('button-icon').value.trim() || 'fa-solid fa-link';
    if (!name || !link) {
        alert('Please enter a name and URL.');
        return;
    }
    if (!/^https?:\/\//.test(link)) {
        alert('Please enter a valid URL starting with http:// or https://');
        return;
    }
    const buttons = getCustomButtons();
    buttons.push({ name, link, icon });
    saveCustomButtons(buttons);
    closeAddButtonModal();
    renderCustomButtons();
}
window.addCustomButton = addCustomButton;

function deleteCustomButton(idx, event) {
    event.stopPropagation();
    if (!confirm('Delete this button?')) return;
    const buttons = getCustomButtons();
    buttons.splice(idx, 1);
    saveCustomButtons(buttons);
    renderCustomButtons();
}
window.deleteCustomButton = deleteCustomButton;

// Render on load
if (customButtonsContainer) {
    document.addEventListener('DOMContentLoaded', renderCustomButtons);
    // Also render after slide-in animation
    setTimeout(renderCustomButtons, 1000);
}

// ===== HIDE DEFAULT ERUDA LAUNCHER ICON =====
function hideErudaLauncher() {
    // Hide Eruda launcher button if present
    const erudaLauncher = document.querySelector('.eruda-launcher');
    if (erudaLauncher) {
        erudaLauncher.style.display = 'none';
        erudaLauncher.style.visibility = 'hidden';
        erudaLauncher.style.opacity = '0';
        erudaLauncher.style.pointerEvents = 'none';
    }
    // Hide any other Eruda elements that look like launchers
    const altButtons = document.querySelectorAll('[class*="eruda"], [id*="eruda"]');
    altButtons.forEach(btn => {
        if (btn.classList.contains('eruda-launcher')) return;
        if (btn.tagName === 'BUTTON' || btn.className.includes('launcher')) {
            btn.style.display = 'none';
            btn.style.visibility = 'hidden';
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
        }
    });
}

// ===== ERUDA DEVTOOLS TOGGLE BUTTON =====
let devToolsLoaded = false;
window.toggleErudaDevtools = function() {
    const proxyIframe = document.getElementById('proxyIframe');
    if (proxyIframe) {
        try {
            const innerDoc = proxyIframe.contentDocument || proxyIframe.contentWindow.document;
            const eruda = innerDoc.getElementById('eruda');
            
            if (!devToolsLoaded) {
                if (!eruda) {
                    const erudaScript = document.createElement('script');
                    erudaScript.src = "//cdn.jsdelivr.net/npm/eruda";
                    erudaScript.onload = function() {
                        const initScript = document.createElement('script');
                        initScript.innerHTML = "eruda.init();eruda.show();eruda.get('entryBtn').hide();";
                        innerDoc.head.appendChild(initScript);
                    };
                    innerDoc.head.appendChild(erudaScript);
                }
            } else {
                if (eruda) {
                    eruda.remove();
                }
            }
            devToolsLoaded = !devToolsLoaded;
        } catch (error) {
            console.error('Error toggling devtools:', error);
            alert('Cannot access iframe content. Make sure you are on a proxied site.');
        }
    } else {
        // For main page Eruda
        if (typeof eruda !== 'undefined') {
            if (eruda._isShow) {
                eruda.hide();
            } else {
                eruda.show();
                eruda.get('entryBtn').hide(); // Hide entry button when showing
            }
        } else {
            alert('Eruda devtools not loaded!');
        }
    }
};