// When the page is loaded, display the loading screen
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0'; // Fade out
        setTimeout(function() {
            loadingScreen.style.visibility = 'hidden'; // Hide completely after fade
        }, 500); // Wait for the fade to complete
    }, 0); // insta load :D
});

// Function to handle iframe load event
async function onIframeLoad() {
    const iframe = document.getElementById('proxyIframe');
    const proxySearchInput = document.getElementById('proxySearch');
  
    // Check if iframe and input exist
    if (iframe && proxySearchInput) {
      // Get the URL inside the iframe
      const iframeUrl = iframe.contentWindow.location.href;
  
      try {
        // Wait for the decoded URL (assuming chemical.decode() returns a promise)
        const decodedUrl = await chemical.decode(iframeUrl);
        // Set the decoded URL to the input field
        proxySearchInput.value = decodedUrl;
      } catch (error) {
        console.error('Error decoding URL:', error);
      }
    }
  }
  
  // Attach the onLoad event to the iframe
  const iframe = document.getElementById('proxyIframe');
  if (iframe) {
    iframe.onload = onIframeLoad;
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
    const loading = document.querySelector('.loading-screen');
    if (loading) loading.style.animationDelay = `-${progress}s`;
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

(function() {
  const savedTheme = localStorage.getItem('siteTheme') || 'moss';
  document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-classic');
  document.body.classList.add('theme-' + savedTheme);
})();