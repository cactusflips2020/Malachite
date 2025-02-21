window.addEventListener('load', function() {
    // Check if 'autoab' is active in localStorage
    if (localStorage.getItem('autoab') === 'true') {
        runAutoABFunction();
    }
});

function runAutoABFunction() {
    launchab()
}

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

  window.onload = function() {
    // Check if the user is logged in by checking localStorage
const isLoggedIn = localStorage.getItem('isLoggedIn');

if (!isLoggedIn || isLoggedIn !== 'true') {
    // If not logged in, redirect to login page
if (window.location.pathname !== '/login.html') {
    window.location.href = '/login.html';
    }
    }
};

const searchEngineUrl = localStorage.getItem('searchEngineSelectUrl') || "https://www.google.com/search?q=%s";

window.addEventListener('beforeunload', function (event) {
    let isLeaveConfirmationEnabled = localStorage.getItem('leaveConfirmation') === 'true';

    if (isLeaveConfirmationEnabled) {
        event.preventDefault();
        event.returnValue = 'Are you sure you want to leave this page?'; // Chrome requires this message
    }
});
