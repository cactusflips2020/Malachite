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
        const iframeUrl = iframe.contentWindow.location.href;
  
        try {
            // Decode the URL and update search bar
            const decodedUrl = await chemical.decode(iframeUrl);
            proxySearchInput.value = decodedUrl;
        } catch (error) {
            console.error('Error decoding URL:', error);
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

// Apply saved theme on page load
(function() {
    const savedTheme = localStorage.getItem('siteTheme') || 'moss';
    document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir');
    document.body.classList.add('theme-' + savedTheme);
})();