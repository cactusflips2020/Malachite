function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById("time").textContent = `${hours}:${minutes}:${seconds} (CST)`;
}

// Run clock instantly on page load
updateClock();

// Update clock every second
setInterval(updateClock, 1000);

function updateGreeting() {
    const hour = new Date().getHours();
    let greetingText = "Hello!";

    if (hour >= 5 && hour < 12) {
        greetingText = "Good morning!";
    } else if (hour >= 12 && hour < 18) {
        greetingText = "Good afternoon!";
    } else if (hour >= 18 && hour < 22) {
        greetingText = "Good evening!";
    } else {
        greetingText = "Good night!";
    }

    document.getElementById("greeting").textContent = greetingText;
}

// Run function immediately on page load
updateGreeting();