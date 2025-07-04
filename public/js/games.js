// Define the games data in JSON format
const gamesData = [
    { "name": "Diep.io", "image": "/img/games/diep.webp", "link": "https://www.diep.io" },
    { "name": "Roblox", "image": "/img/games/roblox.jpg", "link": "https://educationbluesky.com/" },
    { "name": "Eaglercraft", "image": "/img/games/eagler.webp", "link": "https://kalibara4.github.io/eagler/1.8.8/" },
    { "name": "Basketbros.io", "image": "/img/games/basketbros.jpeg", "link": "https://basketbros.io/" },
    { "name": "Agar.io", "image": "/img/games/agar.png", "link": "https://agar.io/" },
    { "name": "Cookie Clicker", "image": "/img/games/cookieclicker.png", "link": "https://eli-schwartz.github.io/cookieclicker" },
    { "name": "Retro Bowl", "image": "/img/games/retrobowl.webp", "link": "https://game316009.konggames.com/gamez/0031/6009/live/index.html" },
    { "name": "Bitlife", "image": "/img/games/bitlife.jpg", "link": "https://ubg365.github.io/bitlife-life-simulator/play.html" },
    { "name": "Five Nights at Freddy's", "image": "/img/games/fnaf.png", "link": "https://run3.io/popgame/fnaf/fnaf1/" },
    { "name": "Worlds Hardest Game", "image": "/img/games/whg.png", "link": "https://watchdocumentaries.com/wp-content/uploads/games/worlds-hardest-game/" },
    { "name": "Rooftop Snipers", "image": "/img/games/rooftop_snipers.avif", "link": "https://htmlxm.github.io/h/rooftop-snipers" },
    { "name": "Bloons Tower Defence 4", "image": "/img/games/bloontd4.jpg", "link": "https://www.silvergames.com/en/bloons-tower-defense-4/gameframe" },
    { "name": "Subway Surfers", "image": "/img/games/subway.png", "link": "https://subwaysurfersgame.io/subway-surfers.embed" },
    { "name": "Slope", "image": "/img/games/slope.png", "link": "https://kdata1.com/2020/05/slope/" },
    { "name": "Time Shooter 2", "image": "/img/games/time-shooter-2.png", "link": "https://www.twoplayergames.org/embed/time-shooter-2" },
    { "name": "The Binding of Issac", "image": "/img/games/tboi.avif", "link": "https://gnhustgames.org/the-binding-of-isaac-source/" },
    { "name": "Happy Wheels", "image": "/img/games/happywheels.png", "link": "https://games-online.io/game/HappyWheels/" },
    { "name": "Moto X3M", "image": "/img/games/motox3m.avif", "link": "https://webglmath.github.io/moto-x3m//" },
    { "name": "Monkey Mart", "image": "/img/games/monkeymart.png", "link": "https://www.getgames.io/games/gm/MonkeyMart/index.html/" },
    { "name": "Bloxd.io", "image": "/img/games/bloxd.png", "link": "https://bloxd.io/" },
    { "name": "1v1.lol", "image": "/img/games/1v1lol.png", "link": "https://1v1.lol/" },
    { "name": "Deadshot.io", "image": "/img/games/deadshot-io.png", "link": "https://deadshot.io" },
];

async function renderGames(filteredGames = gamesData) {
    const gamesContainer = document.getElementById("games-container");
    gamesContainer.innerHTML = ""; // Clear previous cards
    
    filteredGames.forEach(game => {
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

        gameCard.addEventListener("click", async () => {
            const encodedUrl = await chemical.encode(game.link, {
                service: "uv",
                autoHttps: true,
                searchEngine: "https://www.google.com/search?q=%s"
            });
            sessionStorage.setItem("encodedUrl", encodedUrl);
            window.location.href = "proxy.html";
        });

        gamesContainer.appendChild(gameCard);
    });
}

function filterGames() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const filteredGames = gamesData.filter(game => game.name.toLowerCase().includes(searchInput));
    renderGames(filteredGames);
}

document.getElementById("search-input").addEventListener("input", filterGames);

window.addEventListener("load", function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        if (window.location.pathname !== '/login.html') {
            window.location.href = '/login.html';
        }
        return;
    }
    renderGames();
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
