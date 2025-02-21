// Define the apps data in JSON format
const appsData = [
    {
        "name": "Discord",
        "image": "/img/apps/discord.jpg",  
        "link": "https://discord.com/app"
    },
    {
        "name": "Tiktok",
        "image": "/img/apps/tiktok.png",  
        "link": "https://tiktok.com"
    },
    {
        "name": "Youtube",
        "image": "/img/apps/youtube.png",  
        "link": "https://youtube.com"
    },
    {
        "name": "Visual Studio Code",
        "image": "/img/apps/vsc.png",  
        "link": "https://vscode.dev"
    },
    {
        "name": "Github",
        "image": "/img/apps/github.webp",  
        "link": "https://github.com"
    },   
    {
        "name": "GeForce Now",
        "image": "/img/apps/gfnow.png",  
        "link": "https://nvidia.com/en-us/geforce-now/"
    },    
    {
        "name": "Instagram",
        "image": "/img/apps/insta.png",  
        "link": "https://instagram.com"
    },    
    {
        "name": "Twitter (X)",
        "image": "/img/apps/twitter.png",  
        "link": "https:///twitter.com"
    },
    // Add more apps as needed...
];

async function renderApps() {
    const appsContainer = document.getElementById("apps-container");

    // Loop through each app and create a card element for it
    appsData.forEach(app => {
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

        // Add click functionality for each card to encode the link and open it in proxy.html
        appCard.addEventListener("click", async () => {
            // Encode the URL using ChemicalJS
            const encodedUrl = await chemical.encode(app.link, {
                service: "uv",             // Use Ultraviolet (uv) service for encoding
                autoHttps: true,           // Automatically ensure the URL uses HTTPS
                searchEngine: "https://www.google.com/search?q=%s"  // Use Google as a search engine for redirection
            });

            // Store the encoded URL in sessionStorage
            sessionStorage.setItem("encodedUrl", encodedUrl);

            // Redirect to proxy.html
            window.location.href = "proxy.html";
        });

        appsContainer.appendChild(appCard);
    });
}

window.addEventListener("load", function() {
    // Check login status
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn || isLoggedIn !== 'true') {
        if (window.location.pathname !== '/login.html') {
            window.location.href = '/login.html';
        }
        return; // Stop execution if redirecting
    }

    // If logged in, render the apps
    renderApps();
});
