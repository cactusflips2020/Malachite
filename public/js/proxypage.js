
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        
        loadingScreen.style.opacity = '0';
        
        setTimeout(function() {
            loadingScreen.style.visibility = 'hidden';
        }, 500);
    }, 1500);
});

async function onIframeLoad() {
    const iframe = document.getElementById('proxyIframe');
    const proxySearchInput = document.getElementById('proxySearch');
  
    if (iframe && proxySearchInput) {
        const iframeUrl = iframe.src;
        
        if (iframeUrl.includes('404-proxy.html') || iframeUrl.includes('settings-proxy.html') || iframeUrl.includes('home-proxy.html')) {
            if (iframeUrl.includes('settings-proxy.html')) {
                const searchInput = document.getElementById('proxySearch');
                if (searchInput) {
                    searchInput.value = "malachite://settings";
                }
            }
            
            if (iframeUrl.includes('home-proxy.html')) {
                const searchInput = document.getElementById('proxySearch');
                if (searchInput) {
                    searchInput.value = "malachite://home";
                }
            }
            return;
        }
        
        const proxyBackend = localStorage.getItem('proxyBackendSelect') || "uv";
  
        try {
            let decodedUrl;
            
            if (proxyBackend === "rh" && typeof chemical !== 'undefined' && chemical.decode) {
                try {
                    decodedUrl = await chemical.decode(iframeUrl, {
                        service: "rh"
                    });
                } catch (decodeError) {
                    decodedUrl = iframeUrl;
                }
            } else if (typeof chemical !== 'undefined' && chemical.decode) {
                decodedUrl = await chemical.decode(iframeUrl);
            } else {    
                decodedUrl = iframeUrl;
            }
            
            proxySearchInput.value = decodedUrl;
        } catch (error) {
            console.error('Error decoding URL:', error);
            proxySearchInput.value = iframeUrl;
        }
    }
}
  
const iframe = document.getElementById('proxyIframe');
if (iframe) {
    iframe.onload = function() {
        onIframeLoad();
        
        if (typeof window.showDevTools === 'function') {
            if (typeof window.clearHideInterval === 'function') {
                window.clearHideInterval();
            }
            
            setTimeout(function() {
                window.showDevTools();
            }, 1000);
        }
    };
}

(function() {
    const body = document.body;
    const ANIMATION_NAME = 'breathing-bg';
    const ANIMATION_DURATION = 14; // seconds
    
    let progress = parseFloat(localStorage.getItem('breathingBgProgress') || '0');
    if (!isNaN(progress)) {
        body.style.animationDelay = `-${progress}s`;
        const loading = document.querySelector('.loading-screen');
        if (loading) loading.style.animationDelay = `-${progress}s`;
    }
    
    setInterval(() => {
        const start = performance.timing.navigationStart;
        const now = Date.now();
        let elapsed = ((now - start) / 1000 + progress) % ANIMATION_DURATION;
        
        if (getComputedStyle(body).animationName !== ANIMATION_NAME) return;
        localStorage.setItem('breathingBgProgress', elapsed.toFixed(2));
    }, 100);
})();

function applyThemeScrollbarColors(theme) {
    const tabsContainer = document.getElementById('tabs-container');
    if (tabsContainer) {
        tabsContainer.style.display = 'none';
        tabsContainer.offsetHeight;
        tabsContainer.style.display = '';
    }
}

(function() {
    const savedTheme = localStorage.getItem('siteTheme') || 'moss';
    document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir');
    document.body.classList.add('theme-' + savedTheme);
    
    applyThemeScrollbarColors(savedTheme);
})();

window.addEventListener('message', function(event) {
    if (event.data.type === 'theme-change') {
        const theme = event.data.theme;
        document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir', 'theme-ocean', 'theme-sunset', 'theme-solar');
        document.body.classList.add('theme-' + theme);
        localStorage.setItem('siteTheme', theme);
        
        applyThemeScrollbarColors(theme);
    }
});

window.addEventListener('storage', function(event) {
    if (event.key === 'siteTheme') {
        const theme = event.newValue || 'moss';
        document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir', 'theme-ocean', 'theme-sunset', 'theme-solar');
        document.body.classList.add('theme-' + theme);
        
        applyThemeScrollbarColors(theme);
    }
});

window.testScrollbarTheme = function(theme) {
    document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir', 'theme-ocean', 'theme-sunset', 'theme-solar');
    document.body.classList.add('theme-' + theme);
    applyThemeScrollbarColors(theme);
};

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

if (customButtonsContainer) {
    document.addEventListener('DOMContentLoaded', renderCustomButtons);
    setTimeout(renderCustomButtons, 1000);
}

function hideErudaLauncher() {
    const erudaLauncher = document.querySelector('.eruda-launcher');
    if (erudaLauncher) {
        erudaLauncher.style.display = 'none';
        erudaLauncher.style.visibility = 'hidden';
        erudaLauncher.style.opacity = '0';
        erudaLauncher.style.pointerEvents = 'none';
    }
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
        if (typeof eruda !== 'undefined') {
            if (eruda._isShow) {
                eruda.hide();
            } else {
                eruda.show();
                eruda.get('entryBtn').hide();
            }
        } else {
            alert('Eruda devtools not loaded!');
        }
    }
};