// Define the games data in JSON format
let gamesData = [
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

// Load custom games from localStorage
function loadCustomGames() {
    const customGames = localStorage.getItem('customGames');
    if (customGames) {
        const parsed = JSON.parse(customGames);
        gamesData = [...gamesData, ...parsed];
    }
}

async function renderGames(filteredGames = gamesData) {
    const gamesContainer = document.getElementById("games-container");
    gamesContainer.innerHTML = ""; // Clear previous cards
    
    // Add the "Add Custom Game" card first
    const addCard = document.createElement("div");
    addCard.classList.add("game-card", "add-card");
    addCard.innerHTML = `
        <div class="add-icon">
            <i class="fa-solid fa-plus"></i>
        </div>
        <div class="game-name">Add Custom Game</div>
    `;
    addCard.addEventListener("click", openAddGameModal);
    gamesContainer.appendChild(addCard);
    
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

        // Check if this is a custom game (not in the original gamesData)
        const originalGames = [
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
        
        const isCustomGame = !originalGames.some(originalGame => 
            originalGame.name === game.name && originalGame.link === game.link
        );

        if (isCustomGame) {
            // Add delete button for custom games
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-game-btn");
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteBtn.title = "Delete Game";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent opening the game
                deleteCustomGame(game);
            });
            gameCard.appendChild(deleteBtn);
        }

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

// Modal functions for adding custom games
function openAddGameModal() {
    document.getElementById('add-game-modal').style.display = 'flex';
}

function closeAddGameModal() {
    document.getElementById('add-game-modal').style.display = 'none';
    // Clear form fields
    document.getElementById('game-name').value = '';
    document.getElementById('game-link').value = '';
    document.getElementById('game-image').value = '';
}

function addCustomGame() {
    const name = document.getElementById('game-name').value.trim();
    const link = document.getElementById('game-link').value.trim();
    const image = document.getElementById('game-image').value.trim();

    if (!name || !link || !image) {
        alert('Please fill in all fields');
        return;
    }

    if (!link.startsWith('http://') && !link.startsWith('https://')) {
        alert('Please enter a valid URL starting with http:// or https://');
        return;
    }

    if (!image.startsWith('http://') && !image.startsWith('https://')) {
        alert('Please enter a valid image URL starting with http:// or https://');
        return;
    }

    const newGame = { name, link, image };
    
    // Add to current games array
    gamesData.push(newGame);
    
    // Save to localStorage
    const customGames = JSON.parse(localStorage.getItem('customGames') || '[]');
    customGames.push(newGame);
    localStorage.setItem('customGames', JSON.stringify(customGames));
    
    // Close modal and re-render
    closeAddGameModal();
    renderGames();
    
    // Show success notification
    showNotification('Custom game added successfully!');
}

function deleteCustomGame(gameToDelete) {
    // Confirm deletion
    if (!confirm(`Are you sure you want to delete "${gameToDelete.name}"?`)) {
        return;
    }
    
    // Remove from current games array
    gamesData = gamesData.filter(game => 
        !(game.name === gameToDelete.name && game.link === gameToDelete.link)
    );
    
    // Remove from localStorage
    const customGames = JSON.parse(localStorage.getItem('customGames') || '[]');
    const updatedCustomGames = customGames.filter(game => 
        !(game.name === gameToDelete.name && game.link === gameToDelete.link)
    );
    localStorage.setItem('customGames', JSON.stringify(updatedCustomGames));
    
    // Re-render the games
    renderGames();
    
    // Show success notification
    showNotification('Custom game deleted successfully!');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('add-game-modal');
    if (event.target === modal) {
        closeAddGameModal();
    }
});

// Load custom games on page load
loadCustomGames();

// Notification function
function showNotification(message) {
    // Create notification element
    let notification = document.createElement("div");
    const theme = localStorage.getItem('siteTheme') || 'moss';
    notification.className = "notification theme-" + theme;
    notification.innerText = message;
    
    // Set theme-specific styling
    if (theme === 'moss') {
        notification.style.background = '#384438';
        notification.style.color = '#b2c2a8';
        notification.style.border = '1.5px solid #232b23';
    } else if (theme === 'midnight') {
        notification.style.background = '#2a3442';
        notification.style.color = '#b8c7e0';
        notification.style.border = '1.5px solid #181c24';
    } else if (theme === 'rose') {
        notification.style.background = '#6e3844';
        notification.style.color = '#e0b8c7';
        notification.style.border = '1.5px solid #2a1a1f';
    } else if (theme === 'noir') {
        notification.style.background = '#444';
        notification.style.color = '#e0e0e0';
        notification.style.border = '1.5px solid #181818';
    }

    // Style the notification
    Object.assign(notification.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 15px",
        borderRadius: "5px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        zIndex: "1000",
        fontSize: "14px",
        opacity: "1",
        transition: "opacity 0.5s ease-in-out, transform 0.3s ease-in-out",
    });

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateY(-20px)";
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}
