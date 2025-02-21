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
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const filteredApps = appsData.filter(app => app.name.toLowerCase().startsWith(searchInput));
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
