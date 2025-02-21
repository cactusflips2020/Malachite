// Define the games data in JSON format
const gamesData = [
    {
        "name": "Diep.io",
        "image": "/img/games/diep.webp",  
        "link": "https://www.diep.io"
    },
    {
        "name": "Roblox",
        "image": "/img/games/roblox.jpg",  
        "link": "https://educationbluesky.com/"
    },
    {
        "name": "Eaglercraft",
        "image": "/img/games/eagler.webp",  
        "link": "https://kalibara4.github.io/eagler/1.8.8/"
    },
    {
        "name": "Basketbros.io",
        "image": "/img/games/basketbros.jpeg",  
        "link": "https://basketbros.io/"
    },
    {
        "name": "Agar.io",
        "image": "/img/games/agar.png",  
        "link": "https://agar.io/"
    },
    {
        "name": "Cookie Clicker",
        "image": "/img/games/cookieclicker.png",  
        "link": "https://eli-schwartz.github.io/cookieclicker"
    },
    {
        "name": "Retro Bowl",
        "image": "/img/games/retrobowl.webp",  
        "link": "https://game316009.konggames.com/gamez/0031/6009/live/index.html"
    },
    {
        "name": "Bitlife",
        "image": "/img/games/bitlife.jpg",  
        "link": "https://ubg365.github.io/bitlife-life-simulator/play.html"
    },
    {
        "name": "Five Nights at Freddy's",
        "image": "/img/games/fnaf.png",
        "link": "https://run3.io/popgame/fnaf/fnaf1/"
    },
    {
        "name": "Worlds Hardest Game",
        "image": "/img/games/whg.png",  
        "link": "https://watchdocumentaries.com/wp-content/uploads/games/worlds-hardest-game/"
    },
    {
        "name": "Rooftop Snipers",
        "image": "/img/games/rooftop_snipers.avif", 
        "link": "https://htmlxm.github.io/h/rooftop-snipers"
    },
    {
        "name": "Bloons Tower Defence 4",
        "image": "/img/games/bloontd4.jpg", 
        "link": "https://www.silvergames.com/en/bloons-tower-defense-4/gameframe"
    },
    {
        "name": "Subway Surfers",
        "image": "/img/games/subway.png",  
        "link": "https://subwaysurfersgame.io/subway-surfers.embed"
    },
    {
        "name": "Slope",
        "image": "/img/games/slope.png",  
        "link": "https://kdata1.com/2020/05/slope/"
    },
    {
        "name": "Time Shooter 2",
        "image": "/img/games/time-shooter-2.png", 
        "link": "https://www.twoplayergames.org/embed/time-shooter-2"
    },
    {
        "name": "The Binding of Issac",
        "image": "/img/games/tboi.avif",
        "link": "https://gnhustgames.org/the-binding-of-isaac-source/"
    },
];

async function renderGames() {
    
    const gamesContainer = document.getElementById("games-container");

    // Loop through each game and create a card element for it
    gamesData.forEach(game => {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        const gameImage = document.createElement("img");
        gameImage.src = game.image;
        gameImage.alt = game.name;
        gameCard.appendChild(gameImage);

        const gameName = document.createElement("div");
        gameName.classList.add("game-name");
        gameName.textContent = game.name;
        gameCard.appendChild(gameName);

        // Add click functionality for each card to encode the link and open it in proxy.html
        gameCard.addEventListener("click", async () => {
            // Encode the URL using ChemicalJS
            const encodedUrl = await chemical.encode(game.link, {
                service: "uv",             // Use Ultraviolet (uv) service for encoding
                autoHttps: true,           // Automatically ensure the URL uses HTTPS
                searchEngine: "https://www.google.com/search?q=%s"  // Use Google as a search engine for redirection
            });

            // Store the encoded URL in sessionStorage
            sessionStorage.setItem("encodedUrl", encodedUrl);

            // Redirect to proxy.html
            window.location.href = "proxy.html";
        });

        gamesContainer.appendChild(gameCard);
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
    renderGames();
});


