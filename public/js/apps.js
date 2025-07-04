// Define the apps data in JSON format
const appsData = [
    { "name": "Discord", "image": "/img/apps/discord.jpg", "link": "https://discord.com/app" },
    { "name": "Tiktok", "image": "/img/apps/tiktok.png", "link": "https://tiktok.com" },
    { "name": "Youtube", "image": "/img/apps/youtube.png", "link": "https://youtube.com" },
    { "name": "Visual Studio Code", "image": "/img/apps/vsc.png", "link": "https://vscode.dev" },
    { "name": "Github", "image": "/img/apps/github.webp", "link": "https://github.com" },
    { "name": "GeForce Now", "image": "/img/apps/gfnow.png", "link": "https://nvidia.com/en-us/geforce-now/" },
    { "name": "Instagram", "image": "/img/apps/insta.png", "link": "https://instagram.com" },
    { "name": "Twitter (X)", "image": "/img/apps/twitter.png", "link": "https://twitter.com" },
    { "name": "Android OS", "image": "/img/apps/OS_Android.webp", "link": "https://now.gg/play/uncube/10005/now" },
    { "name": "Crazygames", "image": "/img/apps/crazygames.png", "link": "https://crazygames.com" },
    { "name": "Poki", "image": "/img/apps/poki.png", "link": "https://poki.com" },
    { "name": "WebRetro", "image": "/img/apps/webretro.png", "link": "https://binbashbanana.github.io/webretro/" },
];
async function renderApps(filteredApps = appsData) {
    const appsContainer = document.getElementById("apps-container");
    appsContainer.innerHTML = ""; // Clear previous cards

    filteredApps.forEach(app => {
        const appCard = document.createElement("div");
        appCard.classList.add("app-card");

        const appImage = document.createElement("img");
        appImage.src = app.image;
        appImage.alt = app.name;
        appCard.appendChild(appImage);

        const appName = document.createElement("div");
        appName.classList.add("app-name");
        appName.textContent = app.name;
        appCard.appendChild(appName);

        appCard.addEventListener("click", async () => {
            const encodedUrl = await chemical.encode(app.link, {
                service: "uv",
                autoHttps: true,
                searchEngine: "https://www.google.com/search?q=%s"
            });
            sessionStorage.setItem("encodedUrl", encodedUrl);
            window.location.href = "proxy.html";
        });

        appsContainer.appendChild(appCard);
    });
}

function filterApps() {
    const searchInput = document.getElementById("search-input").value.toLowerCase().trim();
    const filteredApps = appsData.filter(app => app.name.toLowerCase().includes(searchInput));
    renderApps(filteredApps);
}

document.getElementById("search-input").addEventListener("input", filterApps);

window.addEventListener("load", function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        if (window.location.pathname !== '/login.html') {
            window.location.href = '/login.html';
        }
        return;
    }
    renderApps();
});

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

(function() {
  const savedTheme = localStorage.getItem('siteTheme') || 'moss';
      document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir');
  document.body.classList.add('theme-' + savedTheme);
})();
