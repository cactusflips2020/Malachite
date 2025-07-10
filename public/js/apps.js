
let appsData = [
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

const appsContainer = document.getElementById('apps-container');

function loadCustomApps() {
    const customApps = localStorage.getItem('customApps');
    if (customApps) {
        const parsed = JSON.parse(customApps);
        appsData = [...appsData, ...parsed];
    }
}
async function renderApps(filteredApps = appsData) {
    appsContainer.innerHTML = "";

    const addCard = document.createElement("div");
    addCard.classList.add("app-card", "add-card");
    addCard.innerHTML = `
        <div class="add-icon">
            <i class="fa-solid fa-plus"></i>
        </div>
        <div class="app-name">Add Custom App</div>
    `;
    addCard.addEventListener("click", openAddAppModal);
    appsContainer.appendChild(addCard);
    
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

        const originalApps = [
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
        
        const isCustomApp = !originalApps.some(originalApp => 
            originalApp.name === app.name && originalApp.link === app.link
        );

        if (isCustomApp) {
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-app-btn");
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteBtn.title = "Delete App";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteCustomApp(app);
            });
            appCard.appendChild(deleteBtn);
        }

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
    
    const userName = localStorage.getItem('userName');
    if (!userName) {
        window.location.href = '/index.html';
        return;
    }
    
    loadCustomApps();
    renderApps();
});

(function() {
  const body = document.body;
  const ANIMATION_NAME = 'breathing-bg';
  const ANIMATION_DURATION = 14; // seconds
  let progress = parseFloat(localStorage.getItem('breathingBgProgress') || '0');
  if (!isNaN(progress)) {
    body.style.animationDelay = `-${progress}s`;
  }
  setInterval(() => {
    const start = performance.timing.navigationStart;
    const now = Date.now();
    let elapsed = ((now - start) / 1000 + progress) % ANIMATION_DURATION;
    if (getComputedStyle(body).animationName !== ANIMATION_NAME) return;
    localStorage.setItem('breathingBgProgress', elapsed.toFixed(2));
  }, 100);
})();

(function() {
  const savedTheme = localStorage.getItem('siteTheme') || 'moss';
      document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir', 'theme-ocean', 'theme-sunset', 'theme-solar');
  document.body.classList.add('theme-' + savedTheme);
})();

window.addEventListener('message', function(event) {
    if (event.data.type === 'theme-change') {
        const theme = event.data.theme;
        document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir', 'theme-ocean', 'theme-sunset', 'theme-solar');
        document.body.classList.add('theme-' + theme);
        
        updateNotificationThemes(theme);
    }
});

window.addEventListener('storage', function(event) {
    if (event.key === 'siteTheme') {
        const theme = event.newValue || 'moss';
        document.body.classList.remove('theme-moss', 'theme-midnight', 'theme-solarized', 'theme-rose', 'theme-noir', 'theme-ocean', 'theme-sunset', 'theme-solar');
        document.body.classList.add('theme-' + theme);
        
        updateNotificationThemes(theme);
    }
});

function updateNotificationThemes(theme) {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
        notification.className = 'notification theme-' + theme;
        
        notification.style.background = 'var(--notification-bg)';
        notification.style.color = 'var(--notification-text)';
        notification.style.border = '1.5px solid var(--notification-border)';
    });
}

function openAddAppModal() {
    const modal = document.getElementById('add-app-modal');
    modal.style.display = 'flex';
    modal.classList.add('show');
}

function closeAddAppModal() {
    const modal = document.getElementById('add-app-modal');
    modal.style.animation = 'modalFadeOut 0.3s ease-out';
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.style.animation = '';
    }, 300);
    document.getElementById('app-name').value = '';
    document.getElementById('app-link').value = '';
    document.getElementById('app-image').value = '';
}

function addCustomApp() {
    const name = document.getElementById('app-name').value.trim();
    const link = document.getElementById('app-link').value.trim();
    const image = document.getElementById('app-image').value.trim();

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

    const newApp = { name, link, image };
    
    appsData.push(newApp);
    
    const customApps = JSON.parse(localStorage.getItem('customApps') || '[]');
    customApps.push(newApp);
    localStorage.setItem('customApps', JSON.stringify(customApps));
    
    closeAddAppModal();
    renderApps();
    
    showNotification('Custom app added successfully!');
}

function deleteCustomApp(appToDelete) {
    if (!confirm(`Are you sure you want to delete "${appToDelete.name}"?`)) {
        return;
    }
    
    appsData = appsData.filter(app => 
        !(app.name === appToDelete.name && app.link === appToDelete.link)
    );
    
    const customApps = JSON.parse(localStorage.getItem('customApps') || '[]');
    const updatedCustomApps = customApps.filter(app => 
        !(app.name === appToDelete.name && app.link === appToDelete.link)
    );
    localStorage.setItem('customApps', JSON.stringify(updatedCustomApps));
    
    renderApps();
    
    showNotification('Custom app deleted successfully!');
}

function openManageAppsModal() {
    const modal = document.getElementById('manage-apps-modal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    loadCustomAppsList();
}

function closeManageAppsModal() {
    const modal = document.getElementById('manage-apps-modal');
    modal.style.animation = 'modalFadeOut 0.3s ease-out';
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.style.animation = '';
    }, 300);
}

function loadCustomAppsList() {
    const customAppsList = document.getElementById('custom-apps-list');
    const customApps = JSON.parse(localStorage.getItem('customApps') || '[]');
    
    if (customApps.length === 0) {
        customAppsList.innerHTML = '<div class="no-custom-apps">No custom apps found. Add some apps first!</div>';
        return;
    }
    
    customAppsList.innerHTML = '';
    
    customApps.forEach(app => {
        const appItem = document.createElement("div");
        appItem.classList.add("custom-app-item");
        appItem.innerHTML = `
            <div class="app-info">
                <img src="${app.image}" alt="${app.name}" class="app-thumbnail">
                <div class="app-details">
                    <h3>${app.name}</h3>
                    <p>${app.link}</p>
                </div>
            </div>
            <button class="delete-btn" onclick="deleteCustomAppFromModal('${app.name}', '${app.link}')">
                <i class="fa-solid fa-trash"></i> Delete
            </button>
        `;
        customAppsList.appendChild(appItem);
    });
}

function deleteCustomAppFromModal(appName, appLink) {
    if (!confirm(`Are you sure you want to delete "${appName}"?`)) {
        return;
    }
    
    appsData = appsData.filter(app => 
        !(app.name === appName && app.link === appLink)
    );
    
    const customApps = JSON.parse(localStorage.getItem('customApps') || '[]');
    const updatedCustomApps = customApps.filter(app => 
        !(app.name === appName && app.link === appLink)
    );
    localStorage.setItem('customApps', JSON.stringify(updatedCustomApps));
    
    loadCustomAppsList();
    
    renderApps();
    
    showNotification('Custom app deleted successfully!');
}

window.addEventListener('click', function(event) {
    const addModal = document.getElementById('add-app-modal');
    const manageModal = document.getElementById('manage-apps-modal');
    
    if (event.target === addModal) {
        closeAddAppModal();
    }
    
    if (event.target === manageModal) {
        closeManageAppsModal();
    }
});



function showNotification(message) {
    let notification = document.createElement("div");
    const theme = localStorage.getItem('siteTheme') || 'moss';
    notification.className = "notification theme-" + theme;
    notification.innerText = message;
    
    notification.style.background = 'var(--notification-bg)';
    notification.style.color = 'var(--notification-text)';
    notification.style.border = '1.5px solid var(--notification-border)';

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

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateY(-20px)";
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}
