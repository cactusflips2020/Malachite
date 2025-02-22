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
  